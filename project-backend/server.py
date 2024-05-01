from flask import Flask, request, redirect, url_for, render_template, jsonify
import requests
from mongodb import update_db, delete_db
import json
import pymongo 
from pymongo import MongoClient
import random
from flask_cors import CORS

app = Flask(__name__)

CORS(app)  # Enable CORS for all routes

cluster = MongoClient("mongodb+srv://tylerlui:D6FWuClyUZAPHIYB@moviecluster.ybu1heb.mongodb.net/")

db = cluster["all_movies"]

collection = db["movies"]

@app.route("/")
def route():
    return render_template("index.html")

@app.route("/api")
def apiCall():
    url = "https://api.themoviedb.org/3/authentication"

    headers = {"accept": "application/json",
            "Authorization": "Bearer TOKEN"}

    response = requests.get(url, headers=headers)

    return response.text


@app.route("/delete") #this will delete all db entries. Keeping this here for debugging purposes. 
def delete():         #as this delete_db() function is already called at the /updateDatabase endpoint.
    delete_db()
    return "delete successful"

@app.route("/updateDatabase") #UPDATES Database
def updateDatabase():
    delete_db()
    update_db()
    return "UPDATE SUCCESS"


@app.route("/recommendation", methods = ["POST"])
def recommendation():
    if request.method == "POST":
        uploaded_json = request.json

        genre = uploaded_json.get("genre").split()
        date = uploaded_json.get("year")
        rating = uploaded_json.get("rating")

        pipeline = []
        convertGenre = {"Action": 28, "Adventure": 12, "Animation": 16, "Comedy": 35, "Crime": 80, "Documentary": 99, 
                        "Drama": 18, "Family": 10751, "Fantasy": 14, "History": 36, "Horror": 27, "Music": 10402,
                        "Mystery": 9648, "Romance": 10749, "Science Fiction": 878, "TV Movie": 10770, "Thriller": 53,
                        "War": 10752, "Western": 37}
        
        if genre != "":   #if genre is not empty
            searchGenre = []
            for i in genre:
                searchGenre.append(convertGenre[i]) #convert the list of genres into ids to search
            
            for key in searchGenre: #adds search query into pipeline
                pipeline.append(
                    {
                        "$match":{
                            "genre_ids": {
                                "$in": [key]
                            }
                        }
                    }
                )

        if date != "":
            pipeline.append({
                "$match":{
                    "year": date
                }
            })

        if rating != "":
            pipeline.append({
                "$match": {
                    "rating": int(rating)
                }
            })

        pipeline.append({
            "$match": {
                "votes": {"$ne": 0}
            }
        })
        pipeline.append({
            "$match": {
                "synopsis": {"$ne": ""}
            }
        })

        pipeline.append({"$sort": {"votes": -1}})
        pipeline.append({"$limit": 30})

        query = collection.aggregate(pipeline=pipeline)

        results = list(query)
        
        return results

@app.route("/search", methods=["POST"])
def find():
    
    if request.method == "POST":
        uploaded_json = request.json
        title = uploaded_json.get("title")

        partialMatch = collection.aggregate([
            {
                "$match":{
                    "title": {
                        "$regex": title,
                        "$options": "i"
                    }
                }
            },
            {"$sort": {"votes": -1}},
            {"$limit": 1}
        ])
        
        getGenre = list(partialMatch)
        genre = []
        for doc in getGenre:
            matchGenre = doc.get("genre_ids")
            if matchGenre:
                genre.extend(matchGenre)

        query = collection.aggregate([
            {"$addFields": {
                "matches": {"$size": {"$setIntersection": ["$genre_ids", genre]}}
            }},
            {"$sort": {"matches": -1, "votes": -1}},
            {"$match": {"votes": {"$ne": ""}}},
            {"$match": {"synopsis": {"$ne": ""}}},
            {"$limit": 30}
        ])

        result = list(query)

        return result, 202
        

@app.route("/random")
def randomMovie():
    highest_id = collection.find_one({}, sort=[('_id', -1)])
    lowest_id = collection.find_one({}, sort=[('_id', 1)])

    randomNum = random.randint(lowest_id.get("_id"), highest_id.get("_id"))

    query = collection.aggregate([
        {"$addFields": {"abs_difference": {"$abs": {"$subtract": ["$_id", randomNum]}}}},
        {"$sort": {"abs_difference": 1}},
        {"$match": {"votes": {"$ne": ""}}},
        {"$match": {"synopsis": {"$ne": ""}}},
        {"$limit": 1}
    ])

    results = list(query)

    return results, 202


@app.route("/popular") #displays popular movies
def popular():
    movielist = collection.aggregate([
        {"$sort": {"votes": -1}},
        {"$match": {"votes": {"$ne": ""}}},
        {"$match": {"synopsis": {"$ne": ""}}},
        {"$limit": 100}
    ])
    
    result = list(movielist)
    return result, 202