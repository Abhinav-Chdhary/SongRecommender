from flask import Blueprint, request, jsonify, send_from_directory
from models.load_models import similarity
import os

similarity_blueprint = Blueprint("similarity", __name__)
ALL_SONGS_DIR = "E:/Documents/GitHub/SongRecommender/Backend/AllSongs"


@similarity_blueprint.route("/findSimilarSongs", methods=["GET"])
def find_similar_songs():
    name = request.args.get("name")
    if not name:
        return jsonify({"error": "No song name provided"}), 400

    if name not in similarity:
        return jsonify({"error": "Song not found in the similarity matrix"}), 404

    series = similarity[name].sort_values(ascending=False)
    series = series.drop(name)
    top_5_songs = series.head(5).index.tolist()

    return jsonify({"similarSongs": top_5_songs}), 200


@similarity_blueprint.route("/audio/<filename>")
def get_audio(filename):
    try:
        return send_from_directory(ALL_SONGS_DIR, filename)
    except FileNotFoundError:
        return jsonify({"error": "File not found"}), 404
