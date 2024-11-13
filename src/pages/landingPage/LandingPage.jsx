import React from "react";
import { Link, useNavigate } from "react-router-dom";
import Logo1 from "../../assets/textLogoBlack.svg";
import CompanyIcon from "../../assets/CompanyIcon.svg";
import TalentIcon from "../../assets/TalentIcon.svg";
import styles from "./landingPage.module.css";

function LandingPage() {
  const navigate = useNavigate();

  return (
    <div className={styles.container}>
      <div className={styles.logo}>
        <img src={Logo1} alt="GlobemeeImage" />
      </div>
      <div className={styles.block}>
        <div className={styles.box}>
          <img className={styles.img} src={TalentIcon} alt="TalentIcon" />
          <h3>I’m here Seeking Job</h3>
          <button
            className="primary medium"
            onClick={() => navigate("/talent-signup")}
          >
            Signup as Talent
          </button>
          <p className="text-m-regular">Already have an account?</p>
          <button
            className="tertiary small"
            onClick={() => navigate("/talent-login")}
          >
            Login here
          </button>
        </div>
        <div className={styles.box}>
          <img className={styles.img} src={CompanyIcon} alt="CompanyIcon" />

          <h3>I’m here for Hiring</h3>
          <button
            className="primary medium"
            onClick={() =>
              (window.location.href = "https://globemee.com/demo-buchen/")
            }
          >
            Signup as Company
          </button>
          <p className="text-m-regular">Already have an account?</p>
          <button
            className="tertiary small"
            onClick={() => navigate("/company-login")}
          >
            Login here
          </button>
        </div>
      </div>
    </div>
  );
}

export default LandingPage;
