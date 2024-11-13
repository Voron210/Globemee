import React, { useEffect, useRef } from "react";
import styles from "./Modal.module.css";

const Modal = ({ active, setActive, children, width, closable = true }) => {
  const modalRef = useRef(null);

  useEffect(() => {
    if (active) {
      const scrollBarWidth =
        window.innerWidth - document.documentElement.clientWidth;
      // var root = document.getElementsByTagName("html")[0];
      // document.body.classList.add("no-scroll");
      document.documentElement.classList.add("no_scroll");
      // document.documentElement.style.paddingRight = `${scrollBarWidth}px`;
      // root.setAttribute("class", "no_scroll");

      if (modalRef.current) {
        const windowHeight = window.innerHeight;
        const modalHeight = modalRef.current.scrollHeight;

        if (modalHeight === windowHeight) {
          modalRef.current.style.alignItems = "center";
        } else {
          modalRef.current.style.alignItems = "flex-start";
        }
      }
    } else {
      // document.body.classList.remove("no-scroll");
      document.documentElement.classList.remove("no_scroll");
      // document.documentElement.style.paddingRight = "";
    }

    // Cleanup effect
    return () => {
      // document.body.classList.remove("no-scroll");
      document.documentElement.classList.remove("no_scroll");
      // document.documentElement.style.paddingRight = "";
    };
  }, [active]);

  return (
    <div
      className={active ? `${styles.modal} ${styles.active}` : styles.modal}
      onClick={() => closable && setActive(false)}
      ref={modalRef}
    >
      <div
        className={styles.content}
        style={{ width }}
        onClick={(e) => e.stopPropagation()}
      >
        {children}
      </div>
    </div>
  );
};

export default Modal;
