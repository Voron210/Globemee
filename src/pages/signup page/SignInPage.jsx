import React, { useState } from "react";
import styles from "./SignUpPage.module.css";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../../lib/axios/AxiosConfig";
import { SocialAuth } from "../../components/social/socialAuth";
import logo from "../../assets/textLogoBlack.svg";
import { useUser } from "../../context/TalentContext/UserContext";
import { useForm } from "react-hook-form";
import Footer from "../../components/footer/Footer";
import StrangeLine from "../../assets/LoginSrangeLine.svg";
import World from "../../assets/LoginWorld.svg";
import Modal from "../../components/Modal/Modal";
import ConfirmEmailForm from "../../components/ConfirmEmailForm/ConfirmEmailForm";
import EmailExist from "../../components/Errors/EmailExist";
import EmailNotConfirmed from "../../components/Errors/EmailNotConfirmed";

function SignUpPage() {
  const { getData } = useUser();
  const navigate = useNavigate();
  const [active, setActive] = useState(false);
  const [modalContent, setModalContent] = useState();
  const talentUserId = "";

  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors },
  } = useForm({
    defaultValues: {
      userEmail: "",
      password: "",
      confirmPassword: "",
      name: "",
      surname: "",
    },
  });

  const showModal = (props) => {
    setModalContent(props);
    setActive(true);
  };

  const onSubmit = async (data) => {
    try {
      const response = await axiosInstance.post(
        "/t_authentication/signup",
        data
      );
      await axiosInstance.post(
        "/t_authentication/signup/send_email_confirmation",
        {
          talentUserId: response.data.talentUserId,
          userEmail: getValues("userEmail"),
        }
      );
      showModal(
        <ConfirmEmailForm
          email={getValues("userEmail")}
          // talentUserId={response.data.talentUserId}
          talentUserId=""
        />
      );
    } catch (error) {
      switch (error.response?.status) {
        case 400:
          showModal(<EmailExist onClose={() => setActive(false)} />);
          break;
        case 403:
          showModal(
            <EmailNotConfirmed
              email={getValues("userEmail")}
              onClose={() => setActive(false)}
              onResend={() =>
                showModal(
                  <ConfirmEmailForm
                    email={getValues("userEmail")}
                    talentUserId=""
                  />
                )
              }
            />
          );
          break;
        default:
          console.error("Error occurred:", error);
          break;
      }
    }
  };

  // console.log(errors);

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
            <h3 className="highlight_full">Sign Up</h3>
          </div>
          <p>Sign up with one of your existent accounts:</p>
          <SocialAuth type="login" />
          <div className={styles.separator}>or</div>

          <input
            type="text"
            placeholder="First name, e.g John"
            {...register("name", { required: true })}
            className={errors.name ? "error" : ""}
          />
          <input
            type="text"
            placeholder="Last name, e.g Smith"
            {...register("surname", { required: true })}
            className={errors.surname ? "error" : ""}
          />
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

          <div>
            <input
              type="password"
              placeholder="Confirm password"
              {...register("confirmPassword", {
                required: true,
                validate: (value) =>
                  value === getValues("password") || "Passwords do not match",
              })}
              className={errors.confirmPassword ? "error" : ""}
            />
            {errors.confirmPassword && (
              <p className="error">{errors.confirmPassword.message}</p>
            )}
          </div>

          <div>
            <div className={styles.checkbox}>
              <input
                type="checkbox"
                {...register("terms", { required: true })}
                className={errors.terms ? "error" : ""}
              />
              <p className="text-s-regular">
                By clicking "Create Account", you confirm that you have read and
                accept the{" "}
                <span
                  className={styles.link}
                  onClick={() => navigate("/agb?lang=en")}
                >
                  Terms & conditions
                </span>
                {" and "}
                <span
                  className={styles.link}
                  onClick={() => navigate("/privacy-policy?lang=en")}
                >
                  Privacy Policy
                </span>
                .
              </p>
            </div>
            {errors.terms && (
              <p className="error">You must accept the terms and conditions</p>
            )}
          </div>
          <button type="submit" className="primary medium full">
            Sign Up
          </button>
          <p
            className="underline text-m-semibold link"
            onClick={() => navigate("/talent-login")}
          >
            Already have an account? Login
          </p>
        </form>
      </div>
      <Footer />
      <Modal active={active} setActive={setActive} children={modalContent} />
    </>
  );
}

export default SignUpPage;
