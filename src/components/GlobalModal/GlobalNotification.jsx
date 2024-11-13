import React, { useEffect, useState } from "react";
import { useModal } from "../../context/ModalContext/ModalContext";
import styles from "./GlobalNotification.module.css";
import CloseIcon from "@mui/icons-material/Close";

const GlobalNotification = () => {
  const { notificationQueue, removeNotification } = useModal();
  const [visibleNotifications, setVisibleNotifications] = useState([]);

  useEffect(() => {
    setVisibleNotifications(notificationQueue);
  }, [notificationQueue]);

  const handleRemove = (id) => {
    removeNotification(id);
  };

  return (
    <div className={styles.notificationContainer}>
      {visibleNotifications.map((notification) => (
        <div
          key={notification.id}
          className={`${styles.notification} ${styles[notification.type]} ${
            notification.show ? styles.show : styles.hide
          }`}
          style={{ cursor: `${notification.onClick && "pointer"}` }}
          onClick={() => {
            if (notification.onClick) {
              notification.onClick();
              handleRemove(notification.id);
            }
          }}
        >
          <div className="center midGap space-between">
            <p className="text-m-semibold">{notification.content}</p>
            <CloseIcon
              onClick={(e) => {
                e.stopPropagation();
                handleRemove(notification.id);
              }}
              style={{ cursor: "pointer" }}
            />
          </div>
        </div>
      ))}
    </div>
  );
};

export default GlobalNotification;
