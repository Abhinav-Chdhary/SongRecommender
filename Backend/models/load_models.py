import joblib

model = joblib.load("trained_genre_classifier.joblib")
scaler = joblib.load("scalar.joblib")
similarity = joblib.load("similarity.joblib")
