import React, { useState } from "react";
// import { useUser } from "../../context/TalentContext/UserContext";
import styles from "./header.module.css";
import TalentIcon from "../../assets/TalentIcon.svg";
import DropdownMenu from "../profileDropdown/profileDropdown";
import { Dehaze } from "@mui/icons-material";
import textLogoBlack from "../../assets/textLogoBlack.svg";
import headerConfig from "../../common/headerConfig";
import { useLocation, useNavigate } from "react-router-dom";

function TopMenu({ visibleSideBar, setVisibleSideBar, type, width }) {
  const navigate = useNavigate();
  const location = useLocation();
  // const { userData } = useUser();
  const [dropdownVision, setDropdownVision] = useState(false);
  // const { visibleSideBar, setVisibleSideBar } = useUser();
  // console.log(width);

  return (
    <div className={styles.header}>
      <div className={styles.container}>
        {width <= 900 && (
          <Dehaze
            fontSize="large"
            onClick={() => setVisibleSideBar(!visibleSideBar)}
          />
        )}

        {width > 900 && <img className={styles.logo} src={textLogoBlack} />}
        <div className="flexOne" />
        {width > 900 && (
          <div className={styles.headerBar}>
            {(type === "talent"
              ? headerConfig.talentHeader
              : headerConfig.companyHeader
            ).map((item, index) => (
              <div
                key={index}
                className={`${styles.headerBarItem} ${
                  location.pathname.startsWith(`/${item.path}`)
                    ? styles.active
                    : ""
                }`}
                onClick={() => {
                  item.external
                    ? // ? (window.location.href = `${item.path}`)
                      window.open(
                        `${item.path}`,
                        "_blank",
                        "noopener,noreferrer"
                      )
                    : navigate(item.path);
                }}
              >
                <i className="material-symbols-outlined">{item.icon}</i>
                {item.name}
              </div>
            ))}
          </div>
        )}
        {width <= 900 && <img className={styles.logo} src={textLogoBlack} />}
        <div className="flexOne" />
        <div className="row midGap">
          {width > 900 && (
            <button
              type="button"
              className={`material-symbols-outlined ${styles.roundBtn}`}
              onClick={() => {
                type === "talent"
                  ? navigate("/talent-faqs")
                  : navigate("/company-faqs");
              }}
            >
              help_outline
            </button>
          )}
          <button
            type="button"
            className={`material-symbols-outlined ${styles.roundBtn}`}
            onClick={() => setDropdownVision(true)}
          >
            account_circle
          </button>
        </div>

        {/* <img
          className={styles.logo}
          src={TalentIcon}
          onClick={() => setDropdownVision(true)}
        /> */}

        {dropdownVision && (
          <DropdownMenu setDropdownVision={setDropdownVision} type={type} />
        )}
      </div>
    </div>
  );
}

export default TopMenu;
