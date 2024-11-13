import React, { createContext, useContext, useState, useEffect } from "react";

let openModalGlobally;
let addNotificationGlobally;
let updateNotificationGlobally;

const ModalContext = createContext();

export const ModalProvider = ({ children }) => {
  const [modalContent, setModalContent] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [closable, setClosable] = useState(false);
  const [notificationQueue, setNotificationQueue] = useState([]);

  const openModal = (content, isClosable = false) => {
    setClosable(isClosable);
    setModalContent(content);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setModalContent(null);
    setIsModalOpen(false);
  };

  const addNotification = (content, type, onClick) => {
    const id = Date.now();
    setNotificationQueue((prevQueue) => [
      ...prevQueue,
      { id, content, type, show: true, onClick },
    ]);
    return id;
  };

  const updateNotification = (id, content, type) => {
    setNotificationQueue((prevQueue) =>
      prevQueue.map((notification) =>
        notification.id === id
          ? { ...notification, content, type, show: true }
          : notification
      )
    );
  };

  const removeNotification = (id) => {
    setNotificationQueue((prevQueue) =>
      prevQueue.filter((notification) => notification.id !== id)
    );
  };

  useEffect(() => {
    notificationQueue.forEach((notification) => {
      if (notification.show) {
        setTimeout(() => {
          setNotificationQueue((prevQueue) =>
            prevQueue.map((n) =>
              n.id === notification.id ? { ...n, show: false } : n
            )
          );
          setTimeout(() => removeNotification(notification.id), 200);
        }, 4000);
      }
    });
  }, [notificationQueue]);

  openModalGlobally = openModal;
  addNotificationGlobally = addNotification;
  updateNotificationGlobally = updateNotification;

  return (
    <ModalContext.Provider
      value={{
        modalContent,
        isModalOpen,
        openModal,
        closeModal,
        closable,
        notificationQueue,
        addNotification,
        updateNotification,
        removeNotification,
      }}
    >
      {children}
    </ModalContext.Provider>
  );
};

export const useModal = () => useContext(ModalContext);

export const openGlobalModal = (content, closable = false) => {
  if (openModalGlobally) {
    openModalGlobally(content, closable);
  } else {
    console.error("Modal context not initialized yet");
  }
};

export const addGlobalNotification = (content, type, onClick) => {
  if (addNotificationGlobally) {
    return addNotificationGlobally(content, type, onClick);
  } else {
    console.error("Notification context not initialized yet");
  }
};

export const updateGlobalNotification = (id, content, type) => {
  if (updateNotificationGlobally) {
    updateNotificationGlobally(id, content, type);
  } else {
    console.error("Notification context not initialized yet");
  }
};
