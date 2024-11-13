import React, { useState } from "react";
import EmailReceiveIcon from "../../assets/EmailReceiveIcon.svg";
import { useForm } from "react-hook-form";
import axiosInstance from "../../lib/axios/AxiosConfig";

const RestorePasswordForm = ({ onClose, type }) => {
  const [sent, setSent] = useState(false);
  const { register, handleSubmit, reset } = useForm({
    defaultValues: {
      userEmail: "",
    },
  });

  const Close = () => {
    onClose();
    setSent(false);
  };

  const onSubmit = async (data) => {
    try {
      if (type === "company") {
        await axiosInstance.post(
          "/c_authentication/send_email_restore_password",
          data
        );
      }

      if (type === "talent") {
        await axiosInstance.post(
          "/t_authentication/send_email_restore_password",
          data
        );
      }

      setSent(true);
      // console.log("Response:", response.data);
      // alert("Your request has been sent successfully!");
      reset();
    } catch (error) {
      // console.error("Error:", error);
      // alert("There was an error sending your request.");
    }
  };
  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <img src={EmailReceiveIcon} className="modal_img" />
        {type === "talent" && (
          <>
            {sent ? (
              <>
                <h4 className="center">Link sent</h4>
                <p className="center text-m-semibold">
                  A password recovery link has been sent to your email address.
                  Click the link to set a new password.
                </p>

                <button
                  className="secondary medium full"
                  type="button"
                  onClick={() => Close()}
                >
                  Ok
                </button>
              </>
            ) : (
              <>
                <h4 className="center">Forgot password</h4>
                <p className="center text-m-semibold">
                  We will send you a link to recover your password to your
                  e-mail address. Please give us your e-mail address & click on
                  the link contained therein to assign a new password.
                </p>
                <input
                  type="email"
                  placeholder="E-mail"
                  {...register("userEmail", { required: true })}
                />

                <button className="primary medium full" type="submitt">
                  Reset password
                </button>
              </>
            )}
          </>
        )}

        {type === "company" && (
          <>
            {sent ? (
              <>
                <h4 className="center">Link gesendet</h4>
                <p className="center text-m-semibold">
                  Wir haben Ihnen einen Link zur Wiederherstellung des Passworts
                  an Ihre E-Mail Adresse gesendet. Bitte klicken Sie auf den
                  Link um ein neues Passwort zu vergeben.
                </p>

                <button
                  className="secondary medium full"
                  type="button"
                  onClick={() => Close()}
                >
                  Ok
                </button>
              </>
            ) : (
              <>
                <h4 className="center">Passwort vergessen</h4>
                <p className="center text-m-semibold">
                  Wir senden Ihnen einen Link zur Wiederherstellung Ihres
                  Passwortes an Ihre E-Mail Adresse. Bitte geben Sie uns Ihre
                  E-Mail Adresse & klicken Sie auf den darin enthaltenen Link,
                  um ein neues Passwort zu vergeben.
                </p>
                <input
                  type="email"
                  placeholder="E-Mail Adresse eingeben"
                  {...register("userEmail", { required: true })}
                />

                <button className="primary medium full" type="submitt">
                  Passwort zurücksetzen
                </button>
              </>
            )}
          </>
        )}
      </form>
    </>
  );
};

export default RestorePasswordForm;
