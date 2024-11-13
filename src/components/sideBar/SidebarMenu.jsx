// SidebarMenu.js
import React, { useRef } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import styles from "./SidebarMenu.module.css";
import barConfig from "../../common/barConfig";
import LogoBigBall from "../../assets/LogoBigBall.svg";
import { ClickAwayListener } from "@mui/material";

function SidebarMenu({ visibleSideBar, setVisibleSideBar, type }) {
  const navigate = useNavigate();
  const location = useLocation();
  const barRef = useRef();

  const outSideClickHandler = () => {
    const { left } = barRef.current.getBoundingClientRect();
    left > -250 && setVisibleSideBar(false);
  };

  const barItems =
    type === "company" ? barConfig.companyBar : barConfig.talentBar;

  return (
    <ClickAwayListener
      mouseEvent="onMouseDown"
      touchEvent="onTouchStart"
      onClickAway={() => outSideClickHandler()}
    >
      <div
        ref={barRef}
        className={
          visibleSideBar ? styles.bar : `${styles.bar} ${styles.bar_hiden}`
        }
      >
        {window.innerWidth < 1380 && (
          <div className={styles.close_btn}>
            <button onClick={() => setVisibleSideBar(false)}>X</button>
          </div>
        )}

        <div className={styles.logo}>
          <img src={LogoBigBall} />
          <p className="text-m-semibold">Globemee</p>
        </div>
        <ul className={styles.bar_list}>
          {barItems.map((item, index) => (
            <li
              key={index}
              className={`${styles.bar_item} ${
                location.pathname === `/${item.path}` ? styles.active : ""
              }`}
              onClick={() => {
                item.external
                  ? // ? (window.location.href = `${item.path}`)
                    window.open(`${item.path}`, "_blank", "noopener,noreferrer")
                  : navigate(item.path);
              }}
            >
              <img className={styles.bar_icon} src={item.icon} />
              <p className="text-m-semibold">{item.name}</p>
            </li>
          ))}
        </ul>
      </div>
    </ClickAwayListener>
  );
}

export default SidebarMenu;
