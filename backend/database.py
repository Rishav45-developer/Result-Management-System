from pymongo import MongoClient

client = MongoClient("mongodb://localhost:27017")

db = client["student_results"]   # ← correct database name
collection = db["students"]      # ← correct collection name