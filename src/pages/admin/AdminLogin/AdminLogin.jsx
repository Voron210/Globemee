import React from "react";
import { useForm } from "react-hook-form";
import styles from "./AdminLogin.module.css";
import { useNavigate } from "react-router-dom";
import logo from "../../../assets/textLogoBlack.svg";
import axiosInstance from "../../../lib/axios/AxiosConfig";
import { useAdmin } from "../../../context/AdminContext/AdminContext";

function AdminLogin() {
  const navigate = useNavigate();
  const { authentication } = useAdmin();
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm({
    defaultValues: {
      userEmail: "",
      password: "",
    },
  });

  const onSubmit = async (data) => {
    try {
      await axiosInstance.post("a_authentication/login", data);
      // navigate("/admin-dashboard");
      authentication();
    } catch (error) {}
  };

  return (
    <>
      <div className={styles.page}>
        <form
          className={styles.form_container}
          onSubmit={handleSubmit(onSubmit)}
        >
          <div className={styles.logo}>
            <img src={logo} alt="Globemee" />
            <h4>ADMINPORTAL</h4>
          </div>

          <input
            type="text"
            placeholder="Benutzername"
            {...register("userEmail", { required: true })}
            className={errors.userEmail ? "error" : ""}
          />
          <input
            type="password"
            placeholder="Passwort"
            {...register("password", { required: true })}
            className={errors.password ? "error" : ""}
          />
          <div className="center">
            <button type="submit" className="primary medium ">
              Jetzt anmelden
            </button>
          </div>
        </form>
      </div>
    </>
  );
}

export default AdminLogin;
