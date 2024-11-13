import React, { useState } from "react";
import styles from "./CompanyOnboarding.module.css";
import logo from "../../../assets/textLogoBlack.svg";
import { useForm } from "react-hook-form";
import Modal from "../../../components/Modal/Modal";
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";
import VisibilityIcon from "@mui/icons-material/Visibility";
import SurpriseIcon from "../../../assets/SurpriseIcon.svg";
import axiosInstance from "../../../lib/axios/AxiosConfig";
import { useNavigate, useSearchParams } from "react-router-dom";
import Footer from "../../../components/footer/Footer";

function CompanyOnboarding() {
  const [modalActive, setModalActive] = useState();
  const [showPassword, setShowPassword] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();
  const companyUserId = searchParams.get("companyUserId");
  const [modalContent, setModalContent] = useState();

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm({
    defaultValues: {
      email: "",
      password: "",
      companyUserId: companyUserId,
    },
  });

  if (!companyUserId) {
    return <></>;
  }

  const onSubmit = async (data) => {
    try {
      await axiosInstance.post(
        "/c_authentication/change_company_credentials",
        data
      );
      setModalContent(
        <div className="column">
          <img src={SurpriseIcon} className="modal_img" />
          <h3 className="center">Willkommen!</h3>
          <p className="center">
            Wir haben soeben einen Bestätigungslink an Ihre E-Mail-Adresse
            gesendet. Bitte klicken Sie in der E-Mail auf den Bestätigungslink,
            um Ihre E-Mail-Adresse zu aktivieren.
          </p>
        </div>
      );
      setModalActive(true);
    } catch (error) {
      //   console.log(error);
      setModalContent(
        <div className="column">
          <p className="center">{error?.response?.data?.error}</p>
        </div>
      );
      setModalActive(true);
    }
  };

  return (
    <>
      <div className={styles.page}>
        <div className={styles.top_line}></div>
        <div className={styles.logo_wrapper}>
          <img src={logo} alt="Globemee" className={styles.logo} />
        </div>
        <form
          className={styles.form_container}
          onSubmit={handleSubmit(onSubmit)}
        >
          <div>
            <h3 className="highlight_full">Account bestätigen</h3>
          </div>
          <p>
            Bitte geben Sie die Benutzerdaten ein, mit denen Sie Globemee nutzen
            möchten.{" "}
          </p>

          <div>
            <p>E-Mail</p>
            <input
              type="email"
              placeholder="E-Mail Address"
              {...register("email", { required: true })}
              className={errors.email ? "error" : ""}
            />
          </div>
          <div>
            <p>Passwort</p>
            <div className={styles.password_wrapper}>
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                {...register("password", { required: true })}
                className={errors.password ? "error" : ""}
              />
              {showPassword ? (
                <i
                  onClick={() => setShowPassword(!showPassword)}
                  className={`material-symbols-outlined ${styles.password_icon}`}
                >
                  visibility
                </i>
              ) : (
                <i
                  onClick={() => setShowPassword(!showPassword)}
                  className={`material-symbols-outlined ${styles.password_icon}`}
                >
                  visibility_off
                </i>
              )}
            </div>
          </div>
          <div className="row">
            <input
              id="agreement"
              type="checkbox"
              required
              style={{ alignSelf: "flex-start" }}
            />
            <label htmlFor="agreement">
              <p>
                Indem Sie auf „Daten bestätigen" klicken, bestätigen Sie, dass
                Sie die Nutzungsbedingungen und die Datenschutzrichtlinien
                gelesen haben und diese akzeptieren.
              </p>
            </label>
          </div>

          <button type="submit" className="primary medium full">
            Daten bestätigen
          </button>
        </form>

        <Footer />
        <Modal
          active={modalActive}
          setActive={setModalActive}
          // closable={false}
          width={"500px"}
          children={modalContent}
        ></Modal>
      </div>
    </>
  );
}

export default CompanyOnboarding;
