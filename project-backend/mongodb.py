import pymongo 
from pymongo import MongoClient
import json
import requests



def delete_db(): #this will delete all database entries
   cluster = MongoClient("mongodb+srv://NguyenJimmy:AIr4QUj1LUWmPxs8@filmfinder.ecxy83f.mongodb.net/")
   db = cluster["Movies"]
   db["Popular"].delete_many({})


def update_db():

   movieList = [] #holds the list of the movie objects
   id_set = set() #this set holds duplicate ids

   cluster = MongoClient("mongodb+srv://NguyenJimmy:AIr4QUj1LUWmPxs8@filmfinder.ecxy83f.mongodb.net/")
   
   db = cluster["Movies"]

   collection = db["popular"]

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
               print(f"Adding movie ID {movie['id']} to id_set")  # Debugging adding the non duplicate movie
               movieList.append(movie)
               id_set.add(movie['id'])  # Add movie ID to set
         else:
               print(f"Skipping duplicate movie ID {movie['id']}")  # Debugging the movie duplicated

      print(f"Length of testList: {len(movieList)}")  # Debugging amount of entries in list
   
   for entries in movieList:
      post = {
         "_id" : entries['id'],
         "genre_ids": entries["genre_ids"],
         "title": entries["original_title"],
         "language": entries["original_language"],
         "synopsis": entries["overview"],
         "poster_path": "https://image.tmdb.org/t/p/w500"+ entries["poster_path"],
         "release_date": entries["release_date"],
         "rating": entries["vote_average"]
      } 
      collection.insert_one(post)
      print(f"Added {post["title"]}")
   print("---ALL MOVIES UPDATED IN DATABASE---")

def search_movie_title(movie):
   cluster = MongoClient("mongodb+srv://tylerlui:D6FWuClyUZAPHIYB@moviecluster.ybu1heb.mongodb.net/")
   
   db = cluster["Movies"]

   collection = db["Popular"] 

   match = collection.find({"title": movie})

   matches =[] #list of matches found from searching database

   for i in match:
      matches.append(i) #appending all matches to list

   return matches
   
