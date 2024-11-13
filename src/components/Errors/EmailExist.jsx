import React from "react";
import ErrorIcon from "../../assets/ErrorIcon.svg";
import styles from "./Errors.module.css";
import { useNavigate } from "react-router-dom";

const EmailExist = ({ onClose }) => {
  const navigate = useNavigate();
  return (
    <div className={styles.error_content}>
      <img src={ErrorIcon} className="modal_img" />
      <h3 className="center">E-Mail already exists</h3>
      <div className="column">
        <p className="center">Please go to Login or </p>
        <p className="center">Sign Up with a different E-Mail Adress</p>
      </div>
      <div className={styles.row}>
        <button
          className={`secondary medium ${styles.btn}`}
          onClick={() => navigate("/talent-login")}
        >
          To login
        </button>
        <button
          className={`secondary medium ${styles.btn}`}
          onClick={() => onClose()}
        >
          Try Sign Up again
        </button>
      </div>
    </div>
  );
};

export default EmailExist;
