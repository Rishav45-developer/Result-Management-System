from pymongo import MongoClient
from dotenv import load_dotenv
import os

# Load environment variables from .env
load_dotenv()

# Get values from .env
MONGO_URI = os.getenv("MONGO_URI")
DATABASE_NAME = os.getenv("DATABASE_NAME")
COLLECTION_NAME = os.getenv("COLLECTION_NAME")

# Create MongoDB client
client = MongoClient(MONGO_URI)

# Database
db = client[DATABASE_NAME]

# Collection
collection = db[COLLECTION_NAME]