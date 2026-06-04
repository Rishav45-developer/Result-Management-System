#  Result Management System

A full-stack Result Management System built using FastAPI, MongoDB, and React. The application allows administrators to manage student records, generate result reports, and efficiently maintain academic data.

## Features

* Add new student records
* View all student results
* Update student information
* Delete student records
* MongoDB database integration
* RESTful API with FastAPI
* PDF report generation
* React frontend interface
* Environment variable configuration using `.env`

##  Tech Stack

### Backend

* FastAPI
* Python
* MongoDB
* PyMongo
* ReportLab
* Python-Dotenv
* Uvicorn

### Frontend

* React.js
* JavaScript
* HTML5
* CSS3

##  Project Structure

```text
ResultManagementSystem/
│
├── backend/
│   ├── main.py
│   ├── routes.py
│   ├── database.py
│   ├── requirements.txt
│   └── .env
│
├── frontend/
│   ├── src/
│   ├── public/
│   └── package.json
│
├── README.md
└── .gitignore
```

##  Installation

### Clone the Repository

```bash
git clone https://github.com/Rishav45-developer/Result-Management-System.git
cd Result-Management-System
```

### Backend Setup

```bash
cd backend

python -m venv venv

# Windows
venv\Scripts\activate

pip install -r requirements.txt
```

Create a `.env` file:

```env
MONGO_URI=mongodb://localhost:-----
DATABASE_NAME=----
COLLECTION_NAME=---
```

Run the backend:

```bash
uvicorn main:app --reload
```

### Frontend Setup

```bash
cd frontend

npm install

npm start
```

## API Endpoints

| Method | Endpoint       | Description      |
| ------ | -------------- | ---------------- |
| GET    | /students      | Get all students |
| POST   | /students      | Add a student    |
| PUT    | /students/{id} | Update a student |
| DELETE | /students/{id} | Delete a student |

## Security

* Environment variables are stored using `.env`
* Sensitive files are excluded through `.gitignore`
* MongoDB connection configuration is separated from source code

## Future Improvements

* JWT Authentication
* Role-Based Access Control
* Dashboard Analytics
* Excel Export
* Email Notifications
* Cloud Deployment

## Author

**Rishav Mandal**

GitHub: https://github.com/Rishav45-developer

---

⭐ If you found this project useful, consider giving it a star.
