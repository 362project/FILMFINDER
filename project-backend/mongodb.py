import pymongo 
from pymongo import MongoClient
import json
import requests
from itertools import combinations
cluster = MongoClient("mongodb+srv://tylerlui:D6FWuClyUZAPHIYB@moviecluster.ybu1heb.mongodb.net/")

db = cluster["all_movies"]

collection = db["movies"]

def delete_db(): #this will delete all database entries
   collection.delete_many({})


def update_db():

   movieList = [] #holds the list of the movie objects
   id_set = set() #this set holds duplicate ids

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
      votes = entries["vote_average"]/2    

      vote_average = round(votes, 1)
      if vote_average > 5:
          vote_average = 5
    
      post = {
         "_id" : entries['id'],
         "genre_ids": entries["genre_ids"],
         "title": entries["original_title"],
         "language": entries["original_language"],
         "synopsis": entries["overview"],
         "poster_path": "https://image.tmdb.org/t/p/w500"+ entries["poster_path"],
         "release_date": entries["release_date"],
         "year": entries["release_date"][:4],
         "votes": entries["vote_average"],
         "rating": vote_average
      } 
      collection.insert_one(post)
      print(f"Added {post["title"]}")
   print("---ALL MOVIES UPDATED IN DATABASE---")

def search_movie_title(movie):


   match = collection.find(
       {
         "title": {
               "$regex": movie,
               "$options": "i"
         }
       }
   )

   matches = list(match)

   return matches

def generate_genre_combos(genres):
   combinations_list =[]
   for r in range(len(genres), 1, -1):
      for combination in combinations(genres, r):
         combinations_list.append({"genres": {"$all":list(combination)}})
   return combinations_list