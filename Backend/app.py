from flask import Flask
from flask_cors import CORS
from routes.upload import upload_blueprint
from routes.genre import genre_blueprint
from routes.suggest import suggest_blueprint
from routes.similarity import similarity_blueprint

app = Flask(__name__)
CORS(app)

# Register blueprints
app.register_blueprint(upload_blueprint, url_prefix='/api')
app.register_blueprint(genre_blueprint, url_prefix='/api')
app.register_blueprint(suggest_blueprint, url_prefix='/api')
app.register_blueprint(similarity_blueprint, url_prefix='/api')

if __name__ == "__main__":
    app.run(debug=True, port=5000)
