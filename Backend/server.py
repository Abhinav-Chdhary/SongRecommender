from flask import Flask, request, jsonify
import numpy as np
import joblib
from flask_cors import CORS
from sklearn.metrics.pairwise import cosine_similarity
import librosa
import os
from werkzeug.utils import secure_filename

app = Flask(__name__)
CORS(app)

# Load the trained model and scaler once at the start
model = joblib.load("trained_genre_classifier.joblib")
scaler = joblib.load("scalar.joblib")
similarity = joblib.load("similarity.joblib")

UPLOAD_FOLDER = "savedSongs"
os.makedirs(UPLOAD_FOLDER, exist_ok=True)


@app.route("/api/uploadFile", methods=["POST"])
def upload_file():
    if "file" not in request.files:
        return jsonify({"error": "No file part"}), 400

    file = request.files["file"]

    if file.filename == "":
        return jsonify({"error": "No selected file"}), 400

    if file and file.filename.endswith(".wav"):
        filepath = os.path.join(UPLOAD_FOLDER, file.filename)
        file.save(filepath)
        return jsonify({"message": "File saved", "filePath": filepath}), 200

    return jsonify({"error": "Invalid file type"}), 400


@app.route("/api/getGenre", methods=["POST"])
def genre_prediction():
    return "POP"


@app.route("/api/suggestSongs", methods=["POST"])
def suggest_songs():
    return "SUGGEST"


if __name__ == "__main__":
    app.run(debug=True, port=5000)
