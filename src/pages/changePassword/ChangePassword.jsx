import React, { useState } from "react";
import StrangeLine from "../../assets/LoginSrangeLine.svg";
import World from "../../assets/LoginWorld.svg";
import styles from "./ChangePassword.module.css";
import KeyIcon from "../../assets/KeyIcon.svg";
import SuccessIcon from "../../assets/SuccessIcon.svg";
import { useForm } from "react-hook-form";
import { useNavigate, useSearchParams } from "react-router-dom";
import axiosInstance from "../../lib/axios/AxiosConfig";

function ChangePassword() {
  const [changed, setChanged] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();
  const resetToken = searchParams.get("resetToken");
  const user_type = searchParams.get("user_type");
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
    getValues,
  } = useForm({
    defaultValues: {
      password: "",
      confirm_password: "",
      resetToken: resetToken,
    },
  });

  const onSubmit = async (data) => {
    try {
      if (user_type === "talent") {
        await axiosInstance.post(
          "/t_authentication/change_restore_password",
          data
        );
      }
      if (user_type === "company") {
        await axiosInstance.post(
          "/c_authentication/change_restore_password",
          data
        );
      }
      setChanged(true);
    } catch (error) {}
  };

  return (
    <>
      <div className={styles.left_image}>
        <img src={StrangeLine} alt="StrangeLine" />
      </div>
      <div className={styles.right_image}>
        <img src={World} alt="StrangeLine" />
      </div>
      <div className={styles.page}>
        {!changed && (
          <div className={styles.container}>
            {user_type === "talent" && (
              <>
                <form onSubmit={handleSubmit(onSubmit)}>
                  <div className="column">
                    <img src={KeyIcon} className="modal_img" />
                    <h3>Set a new password</h3>
                  </div>
                  <div className="column">
                    <p className="left text-m-semibold">New password*</p>
                    <input
                      type="password"
                      {...register("password", {
                        required: "Password is required",
                      })}
                    />
                    {errors.password && (
                      <span className={styles.error}>
                        {errors.password.message}
                      </span>
                    )}
                  </div>
                  <div className="column">
                    <p className="left text-m-semibold">Repeat new password*</p>
                    <input
                      type="password"
                      {...register("confirm_password", {
                        required: "Please confirm your password",
                        validate: (value) =>
                          value === getValues("password") ||
                          "Passwords do not match",
                      })}
                    />
                    {errors.confirm_password && (
                      <span className={styles.error}>
                        {errors.confirm_password.message}
                      </span>
                    )}
                  </div>
                  <button className="primary medium" type="submit">
                    Save and Login
                  </button>
                </form>
              </>
            )}
            {user_type === "company" && (
              <>
                <form onSubmit={handleSubmit(onSubmit)}>
                  <div className="column">
                    <img src={KeyIcon} className="modal_img" />
                    <h3>Ein neues Passwort festlegen</h3>
                  </div>
                  <div className="column">
                    <p className="left text-m-semibold">Neues Passwort*</p>
                    <input
                      type="password"
                      {...register("password", {
                        required: "Password is required",
                      })}
                    />
                    {errors.password && (
                      <span className={styles.error}>
                        {errors.password.message}
                      </span>
                    )}
                  </div>
                  <div className="column">
                    <p className="left text-m-semibold">
                      Wiederholung des neuen Passworts*
                    </p>
                    <input
                      type="password"
                      {...register("confirm_password", {
                        required: "Please confirm your password",
                        validate: (value) =>
                          value === getValues("password") ||
                          "Passwords do not match",
                      })}
                    />
                    {errors.confirm_password && (
                      <span className={styles.error}>
                        {errors.confirm_password.message}
                      </span>
                    )}
                  </div>
                  <button className="primary medium" type="submit">
                    Speichern und Anmelden
                  </button>
                </form>
              </>
            )}
          </div>
        )}
        {changed && (
          <div className={styles.succes_msg}>
            <img src={SuccessIcon} className="modal_img" />
            {user_type === "talent" && (
              <>
                <h3>Password updated successfully</h3>
                <button
                  className="secondary medium"
                  onClick={() => navigate("/talent-login")}
                >
                  To Login
                </button>
              </>
            )}
            {user_type === "company" && (
              <>
                <h3>Passwort erfolgreich aktualisiert</h3>
                <button
                  className="secondary medium"
                  onClick={() => navigate("/company-login")}
                >
                  Zum Login
                </button>
              </>
            )}
          </div>
        )}
      </div>
    </>
  );
}

export default ChangePassword;
