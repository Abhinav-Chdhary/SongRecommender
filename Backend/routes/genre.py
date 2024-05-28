from flask import Blueprint, request, jsonify

genre_blueprint = Blueprint("genre", __name__)


@genre_blueprint.route("/getGenre", methods=["POST"])
def genre_prediction():
    # Placeholder implementation
    return jsonify({"genre": "POP"}), 200
