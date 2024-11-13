import React from "react";
import ErrorIcon from "../../assets/ErrorIcon.svg";
import styles from "./Errors.module.css";
import axiosInstance from "../../lib/axios/AxiosConfig";
import EmailReceiveIcon from "../../assets/EmailReceiveIcon.svg";

const EmailNotConfirmed = ({ email, onResend }) => {
  const resendEmailLink = async () => {
    try {
      await axiosInstance.post(
        "/t_authentication/signup/send_email_confirmation",
        {
          userEmail: email,
          talentUserId: "",
        }
      );
      onResend();
    } catch (error) {}
  };

  return (
    <div className={styles.error_content}>
      <img src={EmailReceiveIcon} className="modal_img" />
      <h3 className="center">Your e-mail address has not been confirmed</h3>
      <div className="column">
        <p className="center">
          We will send you another link to your e-mail inbox.
        </p>
        <p className="center">
          Please confirm your identity by clicking on the link contained in the
          e-mail.
        </p>
      </div>
      <div className={styles.row}>
        <button
          className={`secondary medium ${styles.btn}`}
          onClick={() => resendEmailLink()}
        >
          Send confirmation link
        </button>
      </div>
    </div>
  );
};

export default EmailNotConfirmed;
