import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./dropdown.module.css";
import axiosInstance from "../../lib/axios/AxiosConfig";
import { useUser } from "../../context/TalentContext/UserContext";
import { ClickAwayListener } from "@mui/material";
import { useCompany } from "../../context/CompanyContext/CompanyContext";

const DropdownMenu = ({ setDropdownVision, type }) => {
  const navigate = useNavigate();

  const companyContext = useCompany();
  const userContext = useUser();

  const userData = type === "talent" ? userContext.userData : null;
  const companyData = type === "company" ? companyContext.companyData : null;

  const userLogout = type === "talent" ? userContext.logout : null;
  const companyLogout = type === "company" ? companyContext.logout : null;

  const name = userData
    ? userData.name
    : companyData
    ? companyData.contact.contactName
    : "";
  const surname = userData
    ? userData.surname
    : companyData
    ? companyData.surname
    : "";
  const email = userData
    ? userData.userEmail
    : companyData
    ? companyData.userEmail
    : "";

  useEffect(() => {
    const handleScroll = () => setDropdownVision(false);

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [setDropdownVision]);

  const handleLogout = async () => {
    try {
      if (type === "talent") {
        userLogout();
        // await axiosInstance.post("/t_authentication/logout");
        // navigate("/talent-login");
      }
      if (type === "company") {
        companyLogout();
        // await axiosInstance.post("/c_authentication/logout");
        // navigate("/company-login");
      }
    } catch (error) {}
  };

  return (
    <ClickAwayListener onClickAway={() => setDropdownVision(false)}>
      <div className={styles.dropdown}>
        <div className={styles.content}>
          <div className={styles.head}>
            <h4 className="white">{`${name} ${surname}`}</h4>
            <p style={{ color: "white" }}>{email}</p>
          </div>
          <div>
            <hr className={styles.line} />
            <ul className={styles.list}>
              {type === "talent" && (
                <>
                  <li
                    className={styles.item}
                    onClick={() => navigate("/talent-account")}
                  >
                    Settings
                  </li>

                  <li
                    className={styles.item}
                    onClick={() => navigate("/talent-faqs")}
                  >
                    Help
                  </li>
                </>
              )}
              {type === "company" && (
                <>
                  <li
                    className={styles.item}
                    onClick={() => navigate("/company-account")}
                  >
                    Kontoeinstellung
                  </li>

                  <li
                    className={styles.item}
                    onClick={() => navigate("/company-faqs")}
                  >
                    Hilfe
                  </li>
                </>
              )}
            </ul>
            <hr className={styles.line} />
            <ul className={styles.list}>
              {type === "company" && (
                <>
                  <li
                    className={styles.item}
                    onClick={() => navigate("/privacy-policy?lang=de")}
                  >
                    Datenschutz
                  </li>
                  <li
                    className={styles.item}
                    onClick={() => navigate("/imprint?lang=de")}
                  >
                    Impressum
                  </li>
                  <li
                    className={styles.item}
                    onClick={() => navigate("/agb?lang=de")}
                  >
                    AGB
                  </li>
                </>
              )}
              {type === "talent" && (
                <>
                  <li
                    className={styles.item}
                    onClick={() => navigate("/privacy-policy?lang=en")}
                  >
                    Data Protection
                  </li>
                  <li
                    className={styles.item}
                    onClick={() => navigate("/imprint?lang=en")}
                  >
                    Imprint
                  </li>
                  <li
                    className={styles.item}
                    onClick={() => navigate("/agb?lang=en")}
                  >
                    Terms & Conditions
                  </li>
                </>
              )}
            </ul>
            <hr className={styles.line} />
            <ul className={styles.list}>
              {type === "talent" && (
                <>
                  <li className={styles.item} onClick={handleLogout}>
                    Logout
                  </li>
                </>
              )}
              {type === "company" && (
                <>
                  <li className={styles.item} onClick={handleLogout}>
                    Abmelden
                  </li>
                </>
              )}
            </ul>
          </div>
        </div>
      </div>
    </ClickAwayListener>
  );
};

export default DropdownMenu;
