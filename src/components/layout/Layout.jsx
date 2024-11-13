import { React, useEffect, useRef, useState } from "react";
import SidebarMenu from "../sideBar/SidebarMenu";
import TopMenu from "../header/header";
import { Outlet } from "react-router-dom";
import styles from "./layout.module.css";
import Footer from "../footer/Footer";
import WorldImage from "../../assets/WorldImage.svg";

const Layout = ({ type }) => {
  const [visibleSideBar, setVisibleSideBar] = useState(false);

  const ref = useRef();
  const [width, setWidth] = useState(window.innerWidth);

  const resizeHandler = () => {
    const { clientHeight, clientWidth } = ref.current || {};
    clientWidth > 900 && setVisibleSideBar(false);
    setWidth(clientWidth);
  };

  useEffect(() => {
    window.addEventListener("resize", resizeHandler);
    resizeHandler();
    return () => {
      window.removeEventListener("resize", resizeHandler);
    };
  }, []);

  return (
    <div ref={ref} className={styles.layout}>
      <TopMenu
        type={type}
        visibleSideBar={visibleSideBar}
        setVisibleSideBar={setVisibleSideBar}
        width={width}
      />

      <SidebarMenu
        type={type}
        visibleSideBar={visibleSideBar}
        setVisibleSideBar={setVisibleSideBar}
      />

      <div className={styles.containerWrapper}>
        <div className={styles.container}>
          <Outlet />
        </div>

        <img src={WorldImage} className={styles.backgroundImage} />
      </div>
      <Footer type={type} width={width} />
    </div>
  );
};

export default Layout;
