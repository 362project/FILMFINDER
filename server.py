from flask import Flask, request, redirect, url_for
import requests

app = Flask(__name__)

@app.route("/")
def route():
    print("Hello world")