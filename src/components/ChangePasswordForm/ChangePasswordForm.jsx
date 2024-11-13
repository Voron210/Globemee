import React, { useState } from "react";
import { useForm } from "react-hook-form";
import axiosInstance from "../../lib/axios/AxiosConfig";
import { useNavigate } from "react-router-dom";
import Modal from "../Modal/Modal";

const ChangePasswordForm = ({ onClose, type, logout }) => {
  const [modalActive, setModalActive] = useState();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
    getValues,
  } = useForm({
    defaultValues: {
      password: "",
      newPassword: "",
      confirmNewPassword: "",
    },
  });

  const onSubmit = async (data) => {
    try {
      if (type === "company") {
        await axiosInstance.post("/c_authentication/change_password", data);
      } else {
        await axiosInstance.post("/t_authentication/change_password", data);
      }
      reset();
      logout();
    } catch (error) {
      setModalActive(true);
      // console.error("Error:", error);
      // alert("There was an error sending your request.");
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        {type === "company" && (
          <>
            <h4>Passwort ändern</h4>
            <p className="text-m-semibold ">Aktuelles Passwort</p>
            <input
              type="password"
              placeholder="Hier eingeben"
              {...register("password", { required: true })}
            />
            <p className="text-m-semibold ">Neues Passwort</p>
            <input
              type="password"
              placeholder="Hier eingeben"
              {...register("newPassword", { required: true })}
              className={errors.confirmNewPassword ? "error" : ""}
            />
            <p className="text-m-semibold ">Neues Passwort bestätigen</p>
            <input
              type="password"
              placeholder="Hier eingeben"
              {...register("confirmNewPassword", {
                required: true,
                validate: (value) =>
                  value === getValues("newPassword") ||
                  "Passwörter stimmen nicht überein",
              })}
              className={errors.confirmNewPassword ? "error" : ""}
            />
            {errors.confirmNewPassword && (
              <p className="error">{errors.confirmNewPassword.message}</p>
            )}
            <div className="row space-between">
              <button
                className="primary medium"
                type="button"
                onClick={onClose}
              >
                Abbrechen
              </button>
              <button className="secondary medium" type="submit">
                Speichern
              </button>
            </div>
          </>
        )}
        {type === "talent" && (
          <>
            <h4>Change Password</h4>
            <p className="text-m-semibold ">Current Password</p>
            <input
              type="password"
              placeholder="Enter here"
              {...register("password", { required: true })}
            />
            <p className="text-m-semibold ">New Password</p>
            <input
              type="password"
              placeholder="Enter here"
              {...register("newPassword", { required: true })}
              className={errors.confirmNewPassword ? "error" : ""}
            />
            <p className="text-m-semibold ">Confirm new Password</p>
            <input
              type="password"
              placeholder="Enter here"
              {...register("confirmNewPassword", {
                required: true,
                validate: (value) =>
                  value === getValues("newPassword") ||
                  "Passwords do not match",
              })}
              className={errors.confirmNewPassword ? "error" : ""}
            />
            {errors.confirmNewPassword && (
              <p className="error">{errors.confirmNewPassword.message}</p>
            )}
            <div className="row space-between">
              <button
                className="primary medium"
                type="button"
                onClick={onClose}
              >
                Cancel
              </button>
              <button className="secondary medium" type="submit">
                Save
              </button>
            </div>
          </>
        )}
      </form>
      <Modal active={modalActive} setActive={setModalActive}>
        <>
          {type === "talent" && (
            <>
              <h5>Wrong password</h5>
              <button
                className="primary medium"
                type="button"
                onClick={() => setModalActive(false)}
              >
                Ok
              </button>
            </>
          )}
          {type === "company" && (
            <>
              <h5>Falsches Passwort</h5>
              <button
                className="primary medium"
                type="button"
                onClick={() => setModalActive(false)}
              >
                Ok
              </button>
            </>
          )}
        </>
      </Modal>
    </>
  );
};

export default ChangePasswordForm;
