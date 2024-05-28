from flask import Blueprint, request, jsonify
from models.load_models import similarity

similarity_blueprint = Blueprint('similarity', __name__)

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
