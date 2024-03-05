from flask import Flask


app = Flask(__name__)

@app.route("/")
def main():
    return main()

@app.route("/api",methods =["POST"])
def api():
    return api()


if __name__ == "__main__":
    app.run(debug=True)