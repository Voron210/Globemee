import React, { useEffect, useState } from "react";
import styles from "./LoginPage.module.css";
import { useNavigate, useSearchParams } from "react-router-dom";
import axiosInstance from "../../lib/axios/AxiosConfig";
import { SocialAuth } from "../../components/social/socialAuth";
import logo from "../../assets/textLogoBlack.svg";
import { useUser } from "../../context/TalentContext/UserContext";
import { useForm } from "react-hook-form";
import Footer from "../../components/footer/Footer";
import StrangeLine from "../../assets/LoginSrangeLine.svg";
import World from "../../assets/LoginWorld.svg";
import Modal from "../../components/Modal/Modal";
import RestorePasswordForm from "../../components/RestorePasswordForm/RestorePasswordForm";
import ConfirmEmail from "../../components/ConfirmEmail";
import ErrorIcon from "../../assets/ErrorIcon.svg";
import EmailNotConfirmed from "../../components/Errors/EmailNotConfirmed";
import ConfirmEmailForm from "../../components/ConfirmEmailForm/ConfirmEmailForm";

function LoginPage() {
  const { authentication } = useUser();
  const navigate = useNavigate();
  const [active, setActive] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();
  const [modalContent, setModalContent] = useState();

  // useEffect(() => {
  //   openModal(
  //     <ConfirmEmail
  //       onClose={() => setActive(false)}
  //       setSearchParams={setSearchParams}
  //     />
  //   );
  // }, []);

  const {
    register,
    handleSubmit,
    formState: { errors },
    getValues,
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
      await axiosInstance.post("/t_authentication/login", data);
      // authorize session
      authentication();
    } catch (error) {
      // console.error("Error occurred:", error);
      if (error?.response?.status === 400) {
        openModal(
          <>
            <form className="center">
              <img src={ErrorIcon} className="modal_img" />
              <h4 className="center">Login failed</h4>
              <p className="center text-m-semibold">
                Please check your email address and password or register with
                Globemee first
              </p>
              <div className="row space-between">
                <button
                  className="secondary medium"
                  type="button"
                  onClick={() => setActive(false)}
                >
                  Try again
                </button>
                <button
                  className="secondary medium"
                  type="button"
                  onClick={() => navigate("/talent-signup")}
                >
                  Register
                </button>
              </div>
            </form>
          </>
        );
      }
      if (error?.response?.status === 403) {
        openModal(
          <EmailNotConfirmed
            email={getValues("userEmail")}
            onClose={() => setActive(false)}
            onResend={() =>
              openModal(
                <ConfirmEmailForm
                  email={getValues("userEmail")}
                  talentUserId=""
                />
              )
            }
          />
        );
      }
    }
  };

  // useEffect(() => {
  //   if (!userData) return;

  //   switch (userData.registrationStep) {
  //     case 100:
  //       navigate("/talent-profile");
  //       break;
  //     case 0:
  //       navigate("/talent-onboarding");
  //       break;
  //     default:
  //       break;
  //   }
  // }, [userData, navigate]);

  return (
    <>
      <div className={styles.page}>
        <div className={styles.left_image}>
          <img src={StrangeLine} alt="StrangeLine" />
        </div>
        <div className={styles.right_image}>
          <img src={World} alt="StrangeLine" />
        </div>
        <form
          className={styles.form_container}
          onSubmit={handleSubmit(onSubmit)}
        >
          <div className={styles.logo}>
            <img src={logo} alt="Globemee" />
          </div>
          <div>
            <h3 className="highlight_full">Log in</h3>
          </div>
          <p>Log in with one of your existent accounts:</p>
          <SocialAuth type="login" />
          <div className={styles.separator}>or</div>

          <input
            type="email"
            placeholder="E-Mail Address"
            {...register("userEmail", { required: true })}
            className={errors.userEmail ? "error" : ""}
          />
          {/* {errors.userEmail && (
            <p className={styles.errorMessage}>Email is required</p>
          )} */}

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
                    type={"talent"}
                  />
                )
              }
            >
              Forgot password?
            </p>
          </div>
          <button type="submit" className="primary medium full">
            Log in
          </button>
          <p
            className="underline text-m-semibold link"
            onClick={() => navigate("/talent-signup")}
          >
            New user? Create your account
          </p>
        </form>
      </div>
      <Footer />
      <Modal
        active={active}
        setActive={setActive}
        children={modalContent}
        width={"500px"}
      />
    </>
  );
}

export default LoginPage;
