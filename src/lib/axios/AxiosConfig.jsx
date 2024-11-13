import axios from "axios";
import { baseUrl } from "../../config";
import { openGlobalModal } from "../../context/ModalContext/ModalContext";
import SessionExpired from "../../components/SessionExpired/SessionExpired";

import { addGlobalNotification } from "../../context/ModalContext/ModalContext";

const axiosInstance = axios.create({
  baseURL: baseUrl,
  withCredentials: true, // Cookie
});

axiosInstance.interceptors.request.use(
  async (config) => {
    //creating notification
    // if (config.notification) {
    //   let waitingMessage = "Waiting...";

    //   if (typeof config.notification === "object") {
    //     waitingMessage = config.notification.waitingMessage || waitingMessage;
    //   }

    //   // Adding a yellow notification - reserved for better times

    //   // config.notificationId = await addGlobalNotification(
    //   //   waitingMessage,
    //   //   "warning"
    //   // );
    // }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

axiosInstance.interceptors.response.use(
  (response) => {
    //Editing notifications
    // if (response.config.notificationId) {
    //   let successMessage = "Success!!";

    //   if (typeof response?.config?.notification === "string") {
    //     successMessage = response?.config?.notification;
    //   } else if (typeof response?.config?.notification === "object") {
    //     successMessage =
    //       response?.config?.notification.successMessage || successMessage;
    //   }

    //   updateGlobalNotification(
    //     response.config.notificationId,
    //     successMessage,
    //     "success"
    //   );
    // }

    //Creating notifications
    if (response.config.notification) {
      let successMessage = "Success!!";

      if (typeof response?.config?.notification === "string") {
        successMessage = response?.config?.notification;
      } else if (typeof response?.config?.notification === "object") {
        successMessage =
          response?.config?.notification.successMessage || successMessage;
      }

      addGlobalNotification(successMessage, "success");
    }

    return response;
  },
  async (error) => {
    const excludedPaths = [
      "/company-login",
      "/company-signup",
      "/talent-login",
      "/talent-signup",
      "/adminportal",
    ];

    if (
      error?.response?.status === 401 &&
      !excludedPaths.includes(window.location.pathname)
    ) {
      openGlobalModal(<SessionExpired />);
    }
    // if (error.code === "ERR_NETWORK") {
    //   openGlobalModal(<>Network Error</>);
    // }
    return Promise.reject(error);
  }
);

export default axiosInstance;
