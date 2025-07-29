# Pneumonia Detection Web App

A full-stack AI project that detects pneumonia from chest X-ray images using deep learning.

The backend uses **FastAPI** served on Python with a pretrained **VGG16** transfer learning model built in TensorFlow/Keras.  
The frontend is built in **React** and provides an intuitive interface to upload chest X-ray images and receive real-time predictions.

---

## Project Overview

Pneumonia detection from chest X-rays is crucial for early diagnosis and treatment.  
This app demonstrates an end-to-end pipeline combining deep learning, API development, and frontend integration.

Users upload X-ray images and get predictions with confidence scores to indicate pneumonia presence.

---

## Features

- Transfer learning with pretrained VGG16 model for accurate classification
- FastAPI backend with REST endpoint `/predict/` for image inference
- React frontend with modern UI, image preview, and result display
- Automatic model downloading from Google Drive to avoid large file commits
- CORS enabled for frontend-backend communication
- Ready for cloud deployment on Render, Railway, or similar

---
---
## Live App
link to PneumoDetect App: https://pneumodetectapp.onrender.com/ 
## Model Performance

- **Training Accuracy:** Approximately 94.5%  
- **Test Accuracy:** Approximately 90%  
- **Precision / Recall:** High recall (~98%) for pneumonia detection ensures most pneumonia cases are caught, with a slight tradeoff in specificity.  
- These metrics indicate the model performs well on seen and unseen data, though some generalization gap exists, which is typical in medical imaging.


## Technologies Used

### Backend

- Python 3.11
- FastAPI
- TensorFlow / Keras
- Pillow, NumPy
- gdown (for model download)
- Uvicorn

### Frontend

- React
- JavaScript (ES6+)
- Fetch API for HTTP requests

### Dev & Deployment Tools

- Git & GitHub
- Conda for environment management
- Render/Railway/Heroku cloud platforms

---

## Setup Instructions

### Backend Setup

cd backend
conda activate pneumonia-env # or activate your Python env

pip install -r requirements.txt

uvicorn main:app --reload

### Frontend Setup

cd frontend
npm install
npm start


The frontend runs at: `http://localhost:3000`

Make sure the backend is running; frontend communicates with backend API.

---

## How To Use

- Open frontend URL in browser
- Upload a chest X-ray image (.jpg/.png)
- Click "Detect Pneumonia"
- View prediction and confidence score

---

## What I Learned

- Implemented transfer learning for medical image classification
- Developed RESTful API serving ML models with FastAPI
- Built interactive React frontend consuming ML backend API
- Managed large model files with runtime downloading (Google Drive + gdown)
- Enabled CORS for smooth frontend-backend communication
- Prepared project structure for seamless cloud deployment

---

## License

This project is for educational and demo purposes only.  
Not to be used as medical advice or diagnosis tool.

---

Feel free to contribute or raise issues!



