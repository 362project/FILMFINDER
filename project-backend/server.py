from flask import Flask, request, redirect, url_for, render_template
import requests
from mongodb import update_db, delete_db, search_movie_title
import json
app = Flask(__name__)

@app.route("/")
def route():
    return render_template("index.html")

@app.route("/api")
def apiCall():
    url = "https://api.themoviedb.org/3/authentication"

    headers = {"accept": "application/json",
            "Authorization": "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI3MWYyYmQxZTgwNTMzNTdlN2ZiN2NlZWI0YTIzN2IxYyIsInN1YiI6IjY1YzE4ZmQ5YTA2NjQ1MDE2MTVkODM0YiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.MylPZUvgDbWY9wheuA6PfkzGWovHcS4LaZs-q8Gju-E"}

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

@app.route("/searchMovieTitle") #search movie title
def searchTitle():
    movie_title = request.args.get('title')
    matches = search_movie_title(movie_title)
    return f"Movie Title: {movie_title} Results: {matches}"
    






@app.route("/apiTEST") # TESTING API RETURN
def test():
    testList = []
    id_set = set()  # Set to keep track of movie IDs
    finalList =[]

    for i in range(1,31): #change range here to add more pages of the popular movies to the database
        url = f"https://api.themoviedb.org/3/movie/popular?language=en-US&page={i}" #popular page 

        headers = {
            "accept": "application/json", #put your token after Bearer
            "Authorization": "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI3MWYyYmQxZTgwNTMzNTdlN2ZiN2NlZWI0YTIzN2IxYyIsInN1YiI6IjY1YzE4ZmQ5YTA2NjQ1MDE2MTVkODM0YiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.MylPZUvgDbWY9wheuA6PfkzGWovHcS4LaZs-q8Gju-E" 
        }                        
        
        response = requests.get(url, headers=headers)   

        data = json.loads(response.text)   

        for movie in data['results']:
            if movie['id'] not in id_set:
                print(f"Adding movie ID {movie['id']} to id_set")  # Debugging output
                testList.append(movie)
                id_set.add(movie['id'])  # Add movie ID to set
            else:
                print(f"Skipping duplicate movie ID {movie['id']}")  # Debugging output

        print(f"Length of testList: {len(testList)}")  # Debugging output

    for entries in testList:
        post = {
            "_id" : entries['id'],
            "genre_ids": entries["genre_ids"],
            "title": entries["original_title"],
            "language": entries["original_language"],
            "synopsis": entries["overview"],
            "poster_path": entries["poster_path"],
            "release_date": entries["release_date"],
            "rating": entries["vote_average"]
        } 
        finalList.append(post)

    return finalList