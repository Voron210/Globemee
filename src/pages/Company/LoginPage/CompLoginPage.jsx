import React, { useEffect, useState } from "react";
import styles from "./CompLoginPage.module.css";
import { useNavigate, useSearchParams } from "react-router-dom";
import axiosInstance from "../../../lib/axios/AxiosConfig";
import { SocialAuth } from "../../../components/social/socialAuth";
import logo from "../../../assets/textLogoBlack.svg";
import { useCompany } from "../../../context/CompanyContext/CompanyContext";
import { useForm } from "react-hook-form";
import Footer from "../../../components/footer/Footer";
import Modal from "../../../components/Modal/Modal";
import RestorePasswordForm from "../../../components/RestorePasswordForm/RestorePasswordForm";
import ConfirmEmail from "../../../components/ConfirmEmail";
import ErrorIcon from "../../../assets/ErrorIcon.svg";

function CompLoginPage() {
  const {
    getCompanyData,
    companyData,
    getCompanyMatch,
    getPhotos,
    getCompanyProfile,
    authentication,
  } = useCompany();
  const navigate = useNavigate();
  const [active, setActive] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();
  const [modalContent, setModalContent] = useState();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      userEmail: "",
      password: "",
    },
  });

  const openModal = (props) => {
    setModalContent(props);
    setActive(true);
  };

  useEffect(() => {
    const userId = searchParams.get("userId");
    const signupEmailConfirmation = searchParams.get("signupEmailConfirmation");

    if (signupEmailConfirmation === "1") {
      openModal(
        <ConfirmEmail
          userId={userId}
          onClose={() => setActive(false)}
          setSearchParams={setSearchParams}
        />
      );
    }
  }, []);

  const onSubmit = async (data) => {
    try {
      //get session
      await axiosInstance.post("/c_authentication/login", data);

      //check session
      authentication();
      // await getCompanyData(companyData);
      // getCompanyProfile();
      // getCompanyMatch();
      // getPhotos();
      // console.log();
      // navigate("/company-home");
    } catch (error) {
      if (error?.response?.status === 400) {
        openModal(
          <>
            <form className="center">
              <img src={ErrorIcon} className="modal_img" />
              <h4 className="center">Login fehlgeschlagen</h4>
              <p className="center text-m-semibold">
                Bitte prüfen Sie Ihre E-Mail Adresse und Passwort oder
                registrieren Sie sich zuerst bei Globemee.
              </p>
              <div className="row space-between">
                <button
                  className="secondary medium"
                  type="button"
                  onClick={() => setActive(false)}
                >
                  Erneut versuchen
                </button>
                <button
                  className="secondary medium"
                  type="button"
                  onClick={() =>
                    (window.location.href = "https://globemee.com/demo-buchen/")
                  }
                >
                  Registrieren
                </button>
              </div>
            </form>
          </>
        );
      }
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
            <h3 className="highlight_full">Anmelden</h3>
          </div>

          <input
            type="email"
            placeholder="E-Mail Address"
            {...register("userEmail", { required: true })}
            className={errors.userEmail ? "error" : ""}
          />
          <input
            type="password"
            placeholder="Password"
            {...register("password", { required: true })}
            className={errors.password ? "error" : ""}
          />

          <div className="forgot-password">
            <p
              className="underline link"
              onClick={() =>
                openModal(
                  <RestorePasswordForm
                    onClose={() => setActive(false)}
                    type={"company"}
                  />
                )
              }
            >
              Passwort vergessen?
            </p>
          </div>
          <button type="submit" className="primary medium full">
            Jetzt anmelden
          </button>
          {/* <p
            className="underline text-m-semibold link"
            onClick={() => navigate("/company-signup")}
          >
            New user? Create your account
          </p> */}
        </form>
        <Footer />
      </div>
      <Modal
        active={active}
        setActive={setActive}
        children={modalContent}
        width={"500px"}
      />
    </>
  );
}

export default CompLoginPage;
