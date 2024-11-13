import React from "react";
import styles from "./Footer.module.css";
import { useNavigate } from "react-router-dom";
import FooterConfig from "../../common/FooterConfig";
import textLogoBlack from "../../assets/textLogoBlack.svg";

const Footer = ({ type, width }) => {
  const navigate = useNavigate();
  const { talentFooter } = FooterConfig;

  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        {width > 900 && <img className={styles.logo} src={textLogoBlack} />}
        <div className={styles.footerLinks}>
          {(type === "talent"
            ? FooterConfig.talentFooter
            : FooterConfig.companyFooter
          ).map((item, index) => (
            <p
              key={index}
              onClick={() => navigate(item.path)}
              className={styles.link}
            >
              {item.name}
            </p>
          ))}
        </div>
      </div>
    </footer>
  );
};

export default Footer;
