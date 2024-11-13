import React from "react";
import SurpriseIcon from "../assets/SurpriseIcon.svg";
import axiosInstance from "../lib/axios/AxiosConfig";

const ConfirmEmail = ({ onClose, userId, setSearchParams }) => {
  const handleClick = () => {
    axiosInstance
      .post("/t_authentication/signup/confirm_email_confirmation", {
        talentUserId: userId,
      })
      .then((response) => {
        // console.log("Email confirmation sent:", response);
        setSearchParams({});
        onClose();
      })
      .catch((error) => {
        // console.error("Error sending email confirmation:", error);
      });
  };
  return (
    <>
      <form>
        <img src={SurpriseIcon} className="modal_img" />

        <h3 className="center">One more click to <br/> confirm your E-Mail.</h3>

        <p className="center text-m-semibold">Please click here and Login</p>
        <button
          className="primary medium"
          type="button"
          onClick={() => handleClick()}
        >
          Confirm and login
        </button>
      </form>
    </>
  );
};

export default ConfirmEmail;
