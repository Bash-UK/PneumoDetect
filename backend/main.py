from fastapi import FastAPI, UploadFile, File
from fastapi.middleware.cors import CORSMiddleware
import numpy as np 
from PIL import Image 
import io
import tensorflow as tf 
import os
import gdown
app = FastAPI()
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],  # or ["*"] for development
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

model_path = "pneumonia_vgg16_model.h5"
if not os.path.exists(model_path):
    # Update the link with your own Google Drive file ID
    gdown.download("https://drive.google.com/uc?id=1vc5DPAWGPgEotv32yDFgwANYdVHbQbrv", model_path, quiet=False)

model = tf.keras.models.load_model("pneumonia_vgg16_model.h5")

@app.post("/predict/")
async def predict(file: UploadFile = File(...)):
  content  = await file.read()
  img = Image.open(io.BytesIO(content)).convert("RGB")
  img = img.resize((224,224))
  img_array = np.array(img)/255.0
  img_array = np.expand_dims(img_array,axis = 0)
  pred = model.predict(img_array)[0][0]
  label =  "Pneumonia" if pred > 0.5 else "Normal"
  confidence = float(pred if pred > 0.5 else 1 - pred)
  return{"prediction":label,"confidence":round(confidence,3)}
  