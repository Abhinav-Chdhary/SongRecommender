from flask import Blueprint, request, jsonify

suggest_blueprint = Blueprint("suggest", __name__)


@suggest_blueprint.route("/suggestSongs", methods=["POST"])
def suggest_songs():
    # Placeholder implementation
    return jsonify({"suggestions": "SUGGEST"}), 200
