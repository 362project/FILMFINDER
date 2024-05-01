import pymongo 
from pymongo import MongoClient
import json
import requests
from itertools import combinations
cluster = MongoClient("mongodb+srv://tylerlui:D6FWuClyUZAPHIYB@moviecluster.ybu1heb.mongodb.net/")

db = cluster["all_movies"]

collection = db["movies"]

headers = {
   "accept": "application/json", #put your token after Bearer
   "Authorization": "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI3MWYyYmQxZTgwNTMzNTdlN2ZiN2NlZWI0YTIzN2IxYyIsInN1YiI6IjY1YzE4ZmQ5YTA2NjQ1MDE2MTVkODM0YiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.MylPZUvgDbWY9wheuA6PfkzGWovHcS4LaZs-q8Gju-E" 
}   

def delete_db(): #this will delete all database entries
   collection.delete_many({})

def get_details(movie_id):
   url = f"https://api.themoviedb.org/3/movie/{movie_id}?language=en-US"
                
   response = requests.get(url, headers=headers) 

   return response

def calc_runtime(runtime):
   hours = runtime//60
   minutes = runtime%60
   total_runtime = f'{hours}h {minutes}m'
   return total_runtime

def get_actors(movie_id):
   actor_list = []
   crew_list = []
   url = f"https://api.themoviedb.org/3/movie/{movie_id}/credits?language=en-US"

   response = requests.get(url, headers=headers).json()

   if len(response["cast"]) >= 4:
      for r in response["cast"][:4]:
         actor = {}
         actor["name"] = r["name"]
         actor["character"] = r["character"]
         try:
            actor["picture"] = "https://image.tmdb.org/t/p/w500" + r["profile_path"]
         except TypeError:
            actor["picture"] = "https://images.squarespace-cdn.com/content/v1/63ee61c2b8ac47609ed5bbbf/b56d2823-dc10-4a72-8358-61abbdac98f4/placeholder_bio-photo_500x700.png"
            
         actor_list.append(actor)

   if len(response["crew"]) >= 4:
      for i in response["crew"][:4]:
         crew={}
         crew["name"] = i["name"]
         crew["job"] = i["job"]
         try:
            crew["picture"] = "https://image.tmdb.org/t/p/w500" + i["profile_path"]
         except TypeError:
            crew["picture"] = "https://images.squarespace-cdn.com/content/v1/63ee61c2b8ac47609ed5bbbf/b56d2823-dc10-4a72-8358-61abbdac98f4/placeholder_bio-photo_500x700.png"
         crew_list.append(crew)

   return crew_list, actor_list

    

def update_db():

   movieList = [] #holds the list of the movie objects
   id_set = set() #this set holds duplicate ids

   for i in range(1,90): #change range here to add more pages of the popular movies to the database
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

      video_url = f"https://api.themoviedb.org/3/movie/{entries['id']}/videos?language=en-US"

      headers = {
         "accept": "application/json",
         "Authorization": "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI3MWYyYmQxZTgwNTMzNTdlN2ZiN2NlZWI0YTIzN2IxYyIsInN1YiI6IjY1YzE4ZmQ5YTA2NjQ1MDE2MTVkODM0YiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.MylPZUvgDbWY9wheuA6PfkzGWovHcS4LaZs-q8Gju-E"
      }

      response = requests.get(video_url, headers=headers)

      data = json.loads(response.text)    
      
      try:
         key_result = data["results"][0]["key"]
      except IndexError:
         key_result = 0
      
      convertGenre = {
         28: "Action",
         12: "Adventure",
         16: "Animation",
         35: "Comedy",
         80: "Crime",
         99: "Documentary",
         18: "Drama",
         10751: "Family",
         14: "Fantasy",
         36: "History",
         27: "Horror",
         10402: "Music",
         9648: "Mystery",
         10749: "Romance",
         878: "Science Fiction",
         10770: "TV Movie",
         53: "Thriller",
         10752: "War",
         37: "Western"
      }


      if entries["genre_ids"] != "":   #if genre is not empty
         searchGenre = []
         for i in entries["genre_ids"]:
               searchGenre.append(convertGenre[i]) 
          
      votes = entries["vote_average"]/2  

      votes_rounded = round(votes,1)
      if votes_rounded > 5:
          votes_rounded = 5

      rating = round(votes)
      if rating > 5:
          rating = 5
      
      movie_details = get_details(entries['id']).json()

      movie_runtime = calc_runtime(movie_details["runtime"])
      
      movie_crew, movie_actors = get_actors(entries['id'])


      post = {
         "_id" : entries['id'],
         "genre_ids": entries["genre_ids"],
         "title": entries["original_title"],
         "language": entries["original_language"],
         "synopsis": entries["overview"],
         "poster_path": "https://image.tmdb.org/t/p/w500"+ entries["poster_path"],
         "release_date": entries["release_date"],
         "year": entries["release_date"][:4],
         "votes": votes_rounded,
         "rating": rating,
         "trailer_key": key_result,
         "genres_list": searchGenre,
         "runtime": movie_runtime,
         "director": movie_crew,
         "actors": movie_actors
      } 
      collection.insert_one(post)
      print(f"Added {post["title"]}")
   print("---ALL MOVIES UPDATED IN DATABASE---")

