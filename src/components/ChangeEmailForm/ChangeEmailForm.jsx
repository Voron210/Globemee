import React, { useState } from "react";
import { useForm } from "react-hook-form";
import axiosInstance from "../../lib/axios/AxiosConfig";
import { useNavigate } from "react-router-dom";
import Modal from "../Modal/Modal";
import ErrorIcon from "../../assets/ErrorIcon.svg";

const ChangeEmailForm = ({ onClose, type, logout }) => {
  const navigate = useNavigate();
  const [answer, setAnswer] = useState("");
  const [modalActive, setModalActive] = useState(false);
  const { register, handleSubmit, reset, getValues } = useForm({
    defaultValues: {
      newUserEmail: "",
      emailResetToken: null,
    },
  });

  const onSubmit = async (data) => {
    try {
      if (type === "talent") {
        const response = await axiosInstance.post(
          "/t_authentication/confirm_new_email_confirmation",
          data
        );
        logout();
      } else {
        const response = await axiosInstance.post(
          "/c_authentication/confirm_new_email_confirmation",
          data
        );
        logout();
      }
      reset();
      setAnswer("");
    } catch (error) {}
  };

  const sendCode = async () => {
    try {
      if (type === "talent") {
        const response = await axiosInstance.post(
          "/t_authentication/send_email_new_email_confirmation",
          { newUserEmail: getValues("newUserEmail") }
        );
        setAnswer(response.data?.message);
      } else {
        const response = await axiosInstance.post(
          "/c_authentication/send_email_new_email_confirmation",
          { newUserEmail: getValues("newUserEmail") }
        );
        setAnswer(response.data?.message);
      }
    } catch (error) {
      if (error.response.status === 400) {
        setModalActive(true);
      }
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        {type === "talent" && (
          <>
            <h4>Change E-Mail Address</h4>
            <div className="column midGap">
              <p className="text-m-semibold ">New E-Mail Address</p>
              <div className="row gap">
                <input
                  type="email"
                  placeholder="New E-Mail Address"
                  {...register("newUserEmail", { required: true })}
                />
                <button
                  className="primary medium"
                  type="button"
                  onClick={() => sendCode()}
                >
                  Send confirmation code
                </button>
              </div>
            </div>
            <p>{answer && "Erfolgreich gesendet"}</p>
          </>
        )}
        {type === "company" && (
          <>
            <h4>E-Mail Adresse ändern</h4>
            <div className="column midGap">
              <p className="text-m-semibold ">Neue E-Mail Adresse</p>
              <div className="row gap">
                <input
                  type="email"
                  placeholder="Neue E-Mail Adresse"
                  {...register("newUserEmail", { required: true })}
                />
                <button
                  className="primary medium"
                  type="button"
                  onClick={() => sendCode()}
                >
                  Bestätigungscode senden
                </button>
              </div>
            </div>
            <p>{answer}</p>
          </>
        )}
      </form>
      <form onSubmit={handleSubmit(onSubmit)}>
        {type === "talent" && (
          <>
            <div className="column midGap">
              <p className="text-m-semibold ">Enter code</p>
              <div className="row gap">
                <input
                  type="text"
                  placeholder="Enter code here"
                  {...register("emailResetToken", { required: true })}
                />
                <button className="primary medium" type="submit">
                  Change E-mail
                </button>
              </div>
            </div>
          </>
        )}
        {type === "company" && (
          <>
            <div className="column midGap">
              <p className="text-m-semibold ">Code eingeben</p>
              <div className="row gap">
                <input
                  type="text"
                  placeholder="Code hier eingeben"
                  {...register("emailResetToken", { required: true })}
                />
                <button className="primary medium" type="submit">
                  E-Mail ändern
                </button>
              </div>
            </div>
          </>
        )}
      </form>

      {type === "company" && (
        <div className="column midGap" style={{ padding: "30px 0 0 0" }}>
          <p className="text-m-semibold">
            Was passiert nach der Änderung der E-Mail-Adresse?
          </p>
          <ul>
            <li>
              Als Inhaber der alten E-Mail-Adresse gewähren Sie dem Inhaber der
              neuen E-Mail-Adresse vollen Zugriff auf alle Informationen in
              Ihrem Globemee Profil.
            </li>
            <li>
              Das alte E-Mail-Konto wird keine Benachrichtigungen mehr erhalten.
              Diese werden an die neue E-Mail-Adresse weitergeleitet.
            </li>
            <li>
              Sie müssen Ihre neue E-Mail-Adresse validieren, indem Sie den
              Ihnen zugesendeten Code eingeben.
            </li>
            <li>
              Sobald der Validierungsprozess abgeschlossen ist, haben Sie keinen
              Zugriff mehr auf Ihr Konto mit der alten E-Mail-Adresse.
            </li>
          </ul>

          <p className="text-m-semibold">Ich bestätige hiermit, dass:</p>
          <ul>
            <li>Ich bin der Inhaber der neuen E-Mail-Adresse</li>
            <li>
              Ich bin der Inhaber dieses Globemee-Accounts und beantrage die
              Änderung der Account-E-Mail-Adresse.
            </li>
          </ul>
        </div>
      )}

      {type === "talent" && (
        <div className="column midGap" style={{ padding: "30px 0 0 0" }}>
          <p className="text-m-semibold">
            What happens after changing the email address?
          </p>
          <ul>
            <li>
              As the owner of the old email address, you grant the owner of the
              new email address full access to all information in your Globemee
              profile.
            </li>
            <li>The old email account will no longer receive notifications.</li>
            <li>
              You will need to validate your new email address by entering the
              code sent to you.
            </li>
            <li>
              Once the validation process is complete, you will no longer have
              access to your account with the old email address.
            </li>
          </ul>
          <p className="text-m-semibold">I hereby confirm that:</p>
          <ul>
            <li>I am the owner of the new email address</li>
            <li>
              I am the owner of this Globemee account and request the account
              email address change.
            </li>
          </ul>
        </div>
      )}
      <Modal active={modalActive} setActive={setModalActive} width={"500px"}>
        <div className="column gap">
          <img src={ErrorIcon} className="modal_img" />
          <p className="center text-m-semibold">
            {type === "talent"
              ? "Email already exists"
              : "E-Mail existiert bereits"}
          </p>
          <button
            className="primary medium"
            type="button"
            onClick={() => setModalActive(false)}
          >
            Ok
          </button>
        </div>
      </Modal>
    </>
  );
};

export default ChangeEmailForm;
