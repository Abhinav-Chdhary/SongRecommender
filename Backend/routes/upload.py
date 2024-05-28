from flask import Blueprint, request, jsonify
import os
from config import UPLOAD_FOLDER
from werkzeug.utils import secure_filename

upload_blueprint = Blueprint("upload", __name__)


@upload_blueprint.route("/uploadFile", methods=["POST"])
def upload_file():
    if "file" not in request.files:
        return jsonify({"error": "No file part"}), 400

    file = request.files["file"]

    if file.filename == "":
        return jsonify({"error": "No selected file"}), 400

    if file and file.filename.endswith(".wav"):
        filepath = os.path.join(UPLOAD_FOLDER, secure_filename(file.filename))
        file.save(filepath)
        return jsonify({"message": "File saved", "filePath": filepath}), 200

    return jsonify({"error": "Invalid file type"}), 400
