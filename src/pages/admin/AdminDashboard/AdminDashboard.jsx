import React, { useState } from "react";
import styles from "./AdminDashboard.module.css";
import axiosInstance from "../../../lib/axios/AxiosConfig";

function AdminDashboard() {
  const [uploadStatus, setUploadStatus] = useState("");
  const fileInputRef = React.useRef(null); // Реф для скрытого инпута
  const [link, setLink] = useState("");

  const handleFileChange = async (event) => {
    const selectedFile = event.target.files[0];
    if (selectedFile) {
      const base64File = await toBase64(selectedFile);
      const fileData = {
        cv: "1",
        name: selectedFile.name,
        file: base64File.split(",")[1], // Берем только Base64 часть
      };
      handleUpload(fileData);
      fileInputRef.current.value = null;
    }
  };

  const toBase64 = (file) =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });

  const handleUpload = async (fileData) => {
    if (!fileData) return;
    setUploadStatus("loading");
    setLink("");
    try {
      const response = await axiosInstance.post("/a_cv/upload", fileData, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      setUploadStatus("success");
      setLink(response.data.link);
    } catch (error) {
      setUploadStatus("error");
    }
  };

  return (
    <div className="gap-32 column">
      <h2>Admin Portal</h2>
      <div className={styles.cvGenWrapper}>
        <div
          style={{
            width: "100%",
            display: "flex",
            justifyContent: "flex-start",
          }}
        >
          <h3>CV Generator</h3>
        </div>
        <div className="row start center gap-64" style={{ width: "100%" }}>
          {/* Скрытый input */}
          <input
            type="file"
            accept="application/pdf"
            onChange={handleFileChange}
            ref={fileInputRef} // Присваиваем реф
            style={{ display: "none" }} // Скрываем input
          />
          {/* Кнопка для вызова input */}
          <button
            className="primary medium"
            onClick={() => fileInputRef.current.click()}
          >
            Upload CV
          </button>
          <h5
            style={{
              whiteSpace: "nowrap",
              color:
                uploadStatus === "loading"
                  ? "orange"
                  : uploadStatus === "success"
                  ? "green"
                  : uploadStatus === "error"
                  ? "red"
                  : "black",
            }}
          >
            {uploadStatus === "loading" ? (
              <span>
                Processing
                <span className={styles.dots}>
                  <span>.</span>
                  <span>.</span>
                  <span>.</span>
                </span>
              </span>
            ) : uploadStatus === "success" ? (
              <a href={link} target="_blank" rel="noopener noreferrer">
                Click here to view
              </a>
            ) : uploadStatus === "error" ? (
              "Something went wrong, try again or contact Andrew"
            ) : (
              "Ready"
            )}
          </h5>
        </div>
      </div>
    </div>
  );
}

export default AdminDashboard;
