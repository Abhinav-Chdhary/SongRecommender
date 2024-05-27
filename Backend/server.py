from flask import Flask, request, jsonify
import numpy as np
import joblib
from flask_cors import CORS
from sklearn.metrics.pairwise import cosine_similarity
import librosa
import os

app = Flask(__name__)
CORS(app)

def extract_features(file_path):
    y, sr = librosa.load(file_path, sr=None)
    y, _ = librosa.effects.trim(y)

    mfccs = librosa.feature.mfcc(y=y, sr=sr, n_mfcc=13)
    chroma = librosa.feature.chroma_stft(y=y, sr=sr)
    mel = librosa.feature.melspectrogram(y=y, sr=sr)
    contrast = librosa.feature.spectral_contrast(y=y, sr=sr)
    tonnetz = librosa.feature.tonnetz(y=librosa.effects.harmonic(y), sr=sr)

    features = np.hstack(
        [
            np.mean(mfccs, axis=1),
            np.mean(chroma, axis=1),
            np.mean(mel, axis=1),
            np.mean(contrast, axis=1),
            np.mean(tonnetz, axis=1),
        ]
    )

    return features

def predict_genre(file_path):
    features = extract_features(file_path)
    model = joblib.load("trained_genre_classifier.joblib")
    scaler = joblib.load("scaler.joblib")

    features = scaler.transform([features])
    genre = model.predict(features)

    return genre[0]

def find_similar_songs(file_path):
    features = extract_features(file_path)
    scaler = joblib.load("scaler.joblib")

    features = scaler.transform([features])
    similarity_matrix = joblib.load("similarity.joblib")

    similarities = cosine_similarity(features, similarity_matrix)
    similarities = similarities[0]

    # Get the indices of the most similar songs
    similar_songs_indices = similarities.argsort()[::-1][1:6]  # Exclude the song itself

    similar_songs = similarity_matrix.columns[similar_songs_indices]

    return similar_songs.tolist()

@app.route("/")
def helloWorld():
    return "Hello World"

@app.route("/api/getGenre", methods=["POST"])
def genre_prediction():
    if 'file' not in request.files:
        return jsonify({"error": "No file part"}), 400
    file = request.files['file']
    if file.filename == '':
        return jsonify({"error": "No selected file"}), 400
    file_path = os.path.join('Backend/savedSongs', file.filename)
    file.save(file_path)

    genre = predict_genre(file_path)
    return jsonify({'genre': genre})

@app.route("/api/suggestSongs", methods=["POST"])
def suggest_songs():
    if 'file' not in request.files:
        return jsonify({"error": "No file part"}), 400
    file = request.files['file']
    if file.filename == '':
        return jsonify({"error": "No selected file"}), 400
    file_path = os.path.join('Backend/savedSongs', file.filename)
    file.save(file_path)

    similar_songs = find_similar_songs(file_path)
    return jsonify({'similar_songs': similar_songs})

if __name__ == "__main__":
    os.makedirs('Backend/savedSongs', exist_ok=True)
    app.run(debug=True)
