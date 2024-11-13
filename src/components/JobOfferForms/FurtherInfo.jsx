import React from "react";
import { useFormContext } from "react-hook-form";
import ClearIcon from "@mui/icons-material/Clear";
import UploadIcon from "../../assets/UploadIcon.svg";
import { addGlobalNotification } from "../../context/ModalContext/ModalContext";

const FurtherInfo = () => {
  const { register, setValue, getValues, watch } = useFormContext();

  const documents = getValues("documents");

  const fileInputContainerStyle = {
    width: "330px",
    height: "100px",
    backgroundColor: "#fff7e6",
    padding: "16px",
    borderRadius: "8px",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    cursor: "pointer",
    flexDirection: "column",
    position: "relative",
  };

  const fileInputStyle = {
    height: "100%",
    width: "100%",
    position: "absolute",
    cursor: "pointer",
    opacity: "0",
    boxSizing: "border-box",
  };

  const fileInputLabelStyle = {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    cursor: "pointer",
  };

  const handleFileChange = async (event) => {
    const files = Array.from(event.target.files);
    const maxSize = 10 * 1024 * 1024; // 10 MB

    for (const file of files) {
      if (file.type !== "application/pdf") {
        addGlobalNotification(
          "Bitte laden Sie nur Dateien im PDF-Format hoch.",
          "warning"
        );
        return;
      }

      if (file.size > maxSize) {
        addGlobalNotification(
          `Die Datei ${file.name} ist zu groß. Die maximale Dateigröße beträgt 10 MB.`,
          "warning"
        );
        return;
      }
    }

    const updatedFiles = [];

    for (const file of files) {
      const base64 = await toBase64(file);

      const isDuplicate = documents.some(
        (doc) => doc.name === file.name && doc.file === base64.split(",")[1]
      );

      if (!isDuplicate) {
        updatedFiles.push({ name: file.name, file: base64.split(",")[1] });
      }
    }

    setValue("documents", [...documents, ...updatedFiles]);
  };

  const handleDelete = (index) => {
    const updatedDocuments = documents.filter((_, i) => i !== index);
    setValue("documents", updatedDocuments);
  };

  const toBase64 = (file) =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });

  return (
    <>
      <div className="column gap">
        <div className="column">
          <p className="text-m-semibold">
            Individuelle Informationen und Hinweise
          </p>
          <p>
            Hier können Sie uns noch zusätzliche Informationen geben, die für
            die Stellenbesetzung wichtig sein können.
          </p>
          <textarea {...register("hardFacts.jobDescription.individualInfo")} />
        </div>

        <div className="column">
          <p className="text-m-semibold">
            Upload Stellenausschreibung (PDF-Datei)
          </p>
          <p>
            Hier können Sie uns noch zusätzliche Informationen geben, die für
            die Stellenbesetzung wichtig sein können.
          </p>

          <div style={fileInputContainerStyle}>
            <input
              accept=".pdf"
              style={fileInputStyle}
              id="file-upload"
              type="file"
              multiple
              onChange={handleFileChange}
            />
            <label htmlFor="file-upload" style={fileInputLabelStyle}>
              <img src={UploadIcon} alt="Upload Icon" width="50" height="50" />
              {/* <span>Dateien hochladen</span> */}
            </label>
          </div>
        </div>
        <div>
          <ul>
            {watch("documents") &&
              documents.map((file, index) => (
                <li key={index}>
                  <div className="start">
                    <ClearIcon
                      onClick={() => handleDelete(index)}
                      color="warning"
                    />
                    {file.name}
                  </div>
                </li>
              ))}
          </ul>
        </div>
      </div>
    </>
  );
};

export default FurtherInfo;
