from cs50 import SQL
from flask import Flask, flash, redirect, render_template, request, session
from flask_session import Session

app = Flask(__name__)
db = SQL("sqlite:///songs.db")

app.config["SESSION_PERMANENT"] = False
app.config["SESSION_TYPE"] = "filesystem"
Session(app)

@app.route("/")
@app.route("/home")
def home():
    return render_template("home.html")

@app.route("/playlist")
def play():
    data = db.execute("Select * from files")
    return render_template("playlist.html", data = data)

@app.route("/aboutus")
def about():
    return render_template("about.html")

@app.route("/sow")
def sow():
    return render_template("sow.html")

@app.route("/search", methods=["GET", "POST"])
def search():
    if request.method == "GET":
        return render_template("home.html")
    else:
        song = request.form.get("songs")
        if not song:
            flash("No song entered!")
            return render_template("home.html")
        
        data = db.execute("SELECT s.id, s.name AS song_name, s.artist_id, s.duration_ms, a.artist AS artist_name FROM songs s JOIN artists a ON s.artist_id = a.id WHERE UPPER(s.name) LIKE ?",
                          ('%' + song.upper() + '%',))
        
        if not data:
            return render_template("home.html")
        
        songs = []
        for item in data:
            song_dict = {
                "name": item["song_name"],
                "duration_ms": round((item["duration_ms"] / 60000), 2),
                "artist_name": item["artist_name"],
                "artist_id": item["artist_id"]
            }
            songs.append(song_dict)
        
        return render_template("result.html", songs=songs)

@app.route("/add", methods = ["GET", "POST"])
def add():
    if request.method == "GET":
        data = db.execute("Select * from toadd")
        return render_template("add.html", data=data)
    else:
        id = request.form.get("adding")
        if not id:
            return render_template("home.html")
        m = db.execute("Select * from toadd where id = ?", id)
        db.execute("insert into files (name, artist, imgloc, audloc) values(?, ?, ?, ?)", m[0]["name"], m[0]["artist"], m[0]["imgloc"], m[0]["audloc"])
        db.execute("Delete from toadd where id = ?", id)
        data = db.execute("Select * from files")
        return render_template("playlist.html", data = data)
    
@app.route("/remove", methods = ["GET", "POST"])
def remove():
    if request.method == "GET":
        data = db.execute("Select * from files")
        return render_template("remove.html", data=data)
    else:
        id = request.form.get("remove")
        if not id:
            return render_template("home.html")
        m = db.execute("select * from files where id = ?", id)
        db.execute("insert into toadd (name, artist, imgloc, audloc) values(?, ?, ?, ?)", m[0]["name"], m[0]["artist"], m[0]["imgloc"], m[0]["audloc"])
        db.execute("Delete from files where id = ?", id)
        data = db.execute("Select * from files")
        return render_template("playlist.html", data = data)