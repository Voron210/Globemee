import React, { useRef, useState } from "react";
import styles from "./NotFoundPage.module.css";
import Tyomik from "../../assets/video/tyomik.mp4";
import { useNavigate } from "react-router-dom";

function NotFoundPage() {
  const navigate = useNavigate();
  const videoRef = useRef(null);
  const [isMuted, setIsMuted] = useState(true);

  const handleMuteToggle = () => {
    if (videoRef.current) {
      videoRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  return (
    <div className={styles.page}>
      <div className={styles.container}>
        <div className="column">
          <h3 className="center">Oops! Page Not Found</h3>
          <p className="text-m-semibold center">
            It seems the page you're looking for doesn't exist or has been
            moved. You can go back to the homepage or go back to the previous
            page.
          </p>
        </div>
        <div className="row center gap">
          <button
            className="secondary medium"
            type="button"
            onClick={() => navigate("/")}
          >
            To landing page
          </button>
          <button
            className="secondary medium"
            type="button"
            onClick={() => navigate(-1)}
          >
            To previous page
          </button>
        </div>
        <video
          ref={videoRef}
          autoPlay
          loop
          muted={isMuted}
          className={styles.video}
        >
          <source src={Tyomik} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
        <button className="tertiary medium" onClick={handleMuteToggle}>
          {isMuted ? "Turn on sound" : "Turn off sound"}
        </button>
      </div>
    </div>
  );
}

export default NotFoundPage;
