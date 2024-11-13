import React, { useState, useEffect } from "react";
import Cookies from "js-cookie";
import styles from "./CookieBanner.module.css";

const CookieBanner = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const cookieConsent = Cookies.get("cookieConsent");
    if (!cookieConsent) {
      setIsVisible(true);
    }
  }, []);

  const handleAccept = () => {
    Cookies.set("cookieConsent", "true", { expires: 365 });
    setIsVisible(false);
  };

  if (!isVisible) return null;

  return (
    <div className={styles.cookieBanner}>
      <p className="text-m-regular" style={{ color: "white" }}>
        Diese Website verwendet Cookies, um Ihnen das bestmögliche Erlebnis auf
        unserer Website zu ermöglichen{" "}
        <a href="/privacy-policy" className={styles.learnMore}>
          Erfahren Sie mehr
        </a>
      </p>
      <button onClick={handleAccept} className={styles.acceptButton}>
        Ich verstehe!
      </button>
    </div>
  );
};

export default CookieBanner;
