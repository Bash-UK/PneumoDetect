import React, { useState, useRef } from "react";

const cardStyle = {
  maxWidth: 430,
  margin: "60px auto",
  padding: "36px 28px",
  background: "white",
  borderRadius: "20px",
  boxShadow: "0 2px 32px rgba(60, 72, 99, 0.15)",
  textAlign: "center",
  fontFamily: "'Segoe UI', Arial, sans-serif"
};

const buttonStyle = {
  background: "#099aff",
  color: "white",
  padding: "13px 34px",
  border: "none",
  borderRadius: "7px",
  cursor: "pointer",
  fontSize: "1.13rem",
  marginTop: "16px"
};

const imgStyle = {
  width: "180px",
  margin: "28px auto 15px",
  borderRadius: "9px",
  boxShadow: "0 2px 10px #e3e8ee"
};

const fileButtonStyle = {
  display: "inline-block",
  padding: "13px 34px",
  borderRadius: "6px",
  background: "#dbeafe",
  color: "#124ea7",
  fontWeight: 600,
  cursor: "pointer",
  fontSize: "1rem",
  marginTop: "0",
  border: "none"
};

export default function App() {
  const [file, setFile] = useState(null);
  const [imgURL, setImgURL] = useState(null);
  const [prediction, setPrediction] = useState(null);
  const [confidence, setConfidence] = useState(null);
  const [loading, setLoading] = useState(false);
  const [errMsg, setErrMsg] = useState("");
  const fileInputRef = useRef();

  const handleFile = (e) => {
    const file = e.target.files[0];
    setFile(file);
    setErrMsg("");
    setPrediction(null);
    setConfidence(null);
    if (file) setImgURL(URL.createObjectURL(file));
    else setImgURL(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!file) return;
    setLoading(true);
    setErrMsg("");
    setPrediction(null);
    setConfidence(null);
    try {
      const formData = new FormData();
      formData.append("file", file);
      const res = await fetch("https://pneumodetect.onrender.com/predict/", {
        method: "POST",
        body: formData
      });
      if (!res.ok) throw new Error("Server error");
      const data = await res.json();
      setPrediction(data.prediction);
      setConfidence(data.confidence);
    } catch (e) {
      setErrMsg("Failed to get prediction — is the backend running?");
    } finally {
      setLoading(false);
    }
  };

  // Custom visually hidden file input field + styled label
  const handleChooseFile = () => fileInputRef.current.click();

  return (
    <div style={cardStyle}>
      <h1 style={{ color: "#099aff", marginBottom: 17 }}>Pneumonia Detector</h1>
      <form onSubmit={handleSubmit} style={{ marginBottom: 0 }}>
        <input
          type="file"
          accept="image/*"
          onChange={handleFile}
          required
          style={{ display: "none" }}
          ref={fileInputRef}
        />
        <button
          type="button"
          onClick={handleChooseFile}
          style={fileButtonStyle}
        >
          {file ? "Change X-ray Image" : "Choose X-ray Image"}
        </button>
        {file && (
          <div style={{ fontSize: "1rem", color: "#444", margin: "10px 0" }}>
            {file.name}
          </div>
        )}
        {imgURL && (
          <img src={imgURL} alt="Preview" style={imgStyle} />
        )}
        <br />
        <button type="submit" disabled={!file || loading} style={buttonStyle}>
          {loading ? "Predicting..." : "Detect Pneumonia"}
        </button>
      </form>
      {errMsg && (
        <div style={{ color: "#e53939", marginTop: 16, fontWeight: 500 }}>
          {errMsg}
        </div>
      )}
      {prediction && (
        <div style={{
          background: prediction === "Pneumonia" ? "#ffeaea" : "#e9fff8",
          color: "#212a32",
          borderRadius: 11,
          padding: "18px 12px",
          marginTop: 30
        }}>
          <h2 style={{
            fontWeight: 700,
            color: prediction === "Pneumonia" ? "#e54c37" : "#26a993"
          }}>
            {prediction}
          </h2>
          <p style={{ fontSize: "1.1rem" }}>
            Confidence: <b>{(confidence * 100).toFixed(1)}%</b>
          </p>
        </div>
      )}
      <div style={{ fontSize: 13, color: "#8c93a7", marginTop: 22 }}>
        <span>For demonstration use only</span>
      </div>
    </div>
  );
}
