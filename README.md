# 🚦 TrafficVisionAI  
## Smart City Traffic Prediction & Congestion Management System

---

## 📖 Overview

TrafficVisionAI is a Smart City Traffic Prediction and Congestion Management System developed as part of the **Infosys Springboard / Upskill Campus Internship**.

The project focuses on digitizing traffic management by providing a centralized platform to monitor traffic conditions, analyze congestion patterns, manage users, and predict traffic congestion using Machine Learning techniques.

The system provides secure authentication, role-based access control, interactive dashboards, traffic analytics, and ML-based prediction capabilities to support smart city traffic management.

---

# 🎯 Objectives

- Develop a centralized traffic monitoring system.
- Replace manual traffic monitoring with a digital solution.
- Provide secure authentication and authorization.
- Implement role-based access control.
- Monitor traffic conditions through dashboards.
- Analyze historical traffic data.
- Predict congestion levels using Machine Learning.

---

# ✨ Features

## 🔐 Authentication System

- User login functionality.
- Secure password handling.
- Role-Based Access Control (RBAC).

### User Roles

### 👨‍💼 Administrator

- Manage users.
- Monitor traffic data.
- View analytics.
- Access all system modules.

### 👮 Traffic Operator

- Monitor traffic conditions.
- Update traffic information.
- Track congestion levels.

---

# 📊 Traffic Dashboard & Analytics

The system provides:

- Traffic statistics visualization.
- Congestion monitoring.
- Historical traffic analysis.
- Junction-wise traffic information.
- Interactive charts and reports.

---

# 🚗 Traffic Management Module

Features include:

- Store traffic records.
- View historical traffic data.
- Monitor vehicle count.
- Analyze congestion patterns.

---

# 🤖 Machine Learning Traffic Prediction

TrafficVisionAI uses a Machine Learning model to predict traffic congestion.

### ML Workflow

```
Traffic Dataset
       |
       |
Data Preprocessing
       |
       |
Feature Engineering
       |
       |
Machine Learning Model
       |
       |
Congestion Prediction
```

### Model Information

- Dataset: Smart City Traffic Patterns Dataset
- Model Type: Machine Learning Classification Model
- Framework: Scikit-learn

Model file:

```
backend/ml_models/traffic_model.pkl
```

Note:
The trained ML model file is excluded from GitHub because it exceeds GitHub's file size limit.

---

# 🏗️ System Architecture

```
              React Frontend
                    |
                    |
              FastAPI Backend
                    |
        -------------------------
        |                       |
   MySQL Database        ML Prediction Model
```

---

# 🛠️ Technology Stack

## Frontend

- React.js
- JavaScript
- HTML5
- CSS3
- React Router

## Backend

- Python
- FastAPI
- SQLAlchemy
- Pydantic

## Database

- MySQL

## Machine Learning

- Python
- Pandas
- NumPy
- Scikit-learn

## Tools

- Visual Studio Code
- Git
- GitHub
- Postman
- MySQL Workbench

---

# 📂 Project Structure

```
TrafficVisionAI/

│
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   └── services/
│   └── package.json
│
├── backend/
│   ├── models/
│   ├── routers/
│   ├── schemas/
│   ├── utils/
│   ├── ml_models/
│   ├── database.py
│   ├── main.py
│   └── requirements.txt
│
├── README.md
└── .gitignore
```

---

# 🚀 Installation & Setup

## Clone Repository

```bash
git clone https://github.com/Madhu2006-hub/TrafficVisionAI.git
```

---

# Backend Setup

Navigate to backend:

```bash
cd backend
```

Create virtual environment:

```bash
python -m venv .venv
```

Activate virtual environment:

Windows:

```bash
.venv\Scripts\activate
```

Install dependencies:

```bash
pip install -r requirements.txt
```

Run backend server:

```bash
uvicorn main:app --reload
```

Backend URL:

```
http://127.0.0.1:8000
```

API Documentation:

```
http://127.0.0.1:8000/docs
```

---

# Frontend Setup

Navigate to frontend:

```bash
cd frontend
```

Install dependencies:

```bash
npm install
```

Start React application:

```bash
npm start
```

Frontend URL:

```
http://localhost:3000
```

---

# 🗄️ Database Configuration

Database:

```
MySQL 8.0
```

Database Name:

```
trafficvision
```

Database is used to store:

- User information
- Traffic records
- Prediction records

---

# 🔌 API Endpoints

## Authentication

```
POST /login
```

## Traffic Records

```
GET /traffic
POST /traffic
```

## Dashboard

```
GET /dashboard
```

## Analytics

```
GET /analytics
```

## Prediction

```
POST /predict
```

---

# 📈 Future Enhancements

- Real-time traffic monitoring.
- Google Maps integration.
- Live congestion alerts.
- AI-based traffic forecasting.
- Smart route recommendations.
- Mobile application support.

---

# 📸 Screenshots

(Add project screenshots here)

Example:

```
Dashboard Screenshot

![Dashboard](screenshots/dashboard.png)


Analytics Screenshot

![Analytics](screenshots/analytics.png)
```

---

# 👩‍💻 Author

**Madhu Varshini Garikipati**

GitHub:

https://github.com/Madhu2006-hub

---

# 📜 License

This project is developed for educational and internship purposes.
