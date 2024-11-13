import React from "react";
import EmailReceiveIcon from "../../assets/EmailReceiveIcon.svg";
import axiosInstance from "../../lib/axios/AxiosConfig";

const ConfirmEmailForm = ({ email, talentUserId }) => {
  const resendEmail = async () => {
    try {
      await axiosInstance.post(
        "/t_authentication/signup/send_email_confirmation",
        {
          talentUserId: talentUserId,
          userEmail: email,
        }
      );
    } catch (error) {
      console.error("Error occurred:", error);
    }
  };

  return (
    <>
      <form>
        <img src={EmailReceiveIcon} className="modal_img" />
        <h3 className="center">Confirm your E-Mail Address</h3>
        <p className="center">
          An e-mail was sent to this address to confirm your account:
        </p>
        <p className="center text-m-semibold">{email}</p>
        <p className="center">
          Please confirm the E-Mail address by clicking on the link in the
          E-Mail and check your spam folder if you have not received an email.
        </p>
        <button className="secondary medium" type="button" onClick={() => resendEmail()}>
          Resend Mail
        </button>
      </form>
    </>
  );
};

export default ConfirmEmailForm;
