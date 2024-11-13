import React, {
  createContext,
  useState,
  useContext,
  useEffect,
  useRef,
} from "react";
import axiosInstance from "../../lib/axios/AxiosConfig";
import { useLocation, useNavigate } from "react-router-dom";
import { addGlobalNotification } from "../../context/ModalContext/ModalContext";

import io from "socket.io-client";
import { baseUrl } from "../../config";

const CompanyContext = createContext();

export const CompanyProvider = ({ children }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const [companyData, setCompanyData] = useState();
  const [jobOffers, setJobOffers] = useState();
  const [companyProfile, setCompanyProfile] = useState();
  const [companyPhotos, setCompanyPhotos] = useState();
  const [companyMatch, setCompanyMatch] = useState();

  const socketRef = useRef(null);

  const locationRef = useRef(location);

  useEffect(() => {
    locationRef.current = location;
  }, [location]);

  const authentication = async () => {
    try {
      if (
        location.pathname === "/company-login" ||
        location.pathname === "/company-signup"
      ) {
        const response = await axiosInstance.get("/c_company/context");
        setCompanyData(response.data);
        await Promise.all([
          getcompanyJobOffers(),
          getPhotos(),
          getCompanyProfile(),
          connectToRooms(),
        ]);
      } else {
        await Promise.all([
          getCompanyData(),
          getcompanyJobOffers(),
          getPhotos(),
          getCompanyProfile(),
          connectToRooms(),
        ]);
      }
    } catch (error) {}
  };

  const connectToRooms = () => {
    try {
      initializeWebSocket();
    } catch (error) {}
  };

  const getCompanyMatch = async () => {
    try {
      const response = await axiosInstance.get("/c_match/match_all");
      setCompanyMatch(response.data);
    } catch (error) {}
  };

  const getcompanyJobOffers = async () => {
    try {
      const response = await axiosInstance.get("/c_jobOffer");
      setJobOffers(response.data);
    } catch (error) {}
  };

  const getCompanyData = async () => {
    try {
      const response = await axiosInstance.get("/c_company/context");
      setCompanyData(response.data);
      getcompanyJobOffers();
    } catch (error) {
      // console.log(error);
      if (error.response && error.response.status === 401) {
        await logout();
      }
    }
  };

  const getPhotos = async () => {
    try {
      const response = await axiosInstance.get("/c_company/all_photos");
      setCompanyPhotos(response.data);
    } catch (error) {
      if (error.response && error.response.status === 401) {
        await logout();
      }
    }
  };

  const getCompanyProfile = async () => {
    try {
      const response = await axiosInstance.get("/c_company");
      setCompanyProfile(response.data);
    } catch (error) {
      if (error.response && error.response.status === 401) {
        await logout();
      }
    }
  };

  const logout = async () => {
    try {
      await axiosInstance.post("/c_authentication/logout");
      disconnectWebSocket();
      setCompanyData(null);
      setCompanyProfile(null);
      setJobOffers(null);
      setCompanyMatch(null);
      setCompanyPhotos(null);
      navigate("/company-login");
    } catch (error) {}
  };

  const patchCompanyData = async (Data) => {
    try {
      const response = await axiosInstance.patch("/c_company", Data);
      // console.log(response.data);
      await getCompanyData();
    } catch (error) {
      console.error("Error updating company data:", error);
      throw new Error("Failed to update company data.");
    }
  };

  const joinRoom = async () => {
    try {
      const response = await axiosInstance.get("/c_match/match_all");
      setCompanyMatch(response.data);

      if (response.data.length > 0) {
        socketRef.current.emit("join", {
          matchId: response.data.map((item) => item.matchId),
        });
      }
    } catch (error) {}
  };

  const disconnectWebSocket = () => {
    if (socketRef.current) {
      socketRef.current.disconnect();
      socketRef.current = null;
    }
  };

  const initializeWebSocket = () => {
    if (!socketRef.current) {
      socketRef.current = io(baseUrl, {
        extraHeaders: {
          Role: "company",
        },
        withCredentials: true,
      });

      socketRef.current.on("connect", () => {
        joinRoom();
      });

      socketRef.current.on("disconnect", (reason) => {});

      socketRef.current.on("status", (message) => {});

      socketRef.current.on("connect_error", (err) => {});

      socketRef.current.on("message", (message) => {});

      socketRef.current.on("receive_message", (message) => {});

      socketRef.current.on("new_message", (message) => {
        addMessage(message);
      });
    }
  };

  const addMessage = async (message) => {
    if (message.role === "talent") {
      const matchId =
        locationRef.current.pathname.match(/\/match\/([^/]+)/)?.[1];

      if (!matchId) {
        const navigateToMessage = () => {
          navigate(`/company-home/match/${message.matchId}`);
        };
        addGlobalNotification("New message from talent", "success", () =>
          navigateToMessage(message.matchId)
        );
      } else {
        let response = await axiosInstance.post(
          `/c_match/${matchId}/read_message_time`
        );

        setCompanyMatch((prevData) =>
          prevData.map((match) =>
            match.matchId === matchId
              ? {
                  ...match,
                  lastReadMessageTime: response.data.lastReadMessageTime,
                }
              : match
          )
        );
      }
    }

    setCompanyMatch((prevData) =>
      prevData.map((match) =>
        match.matchId === message.matchId
          ? {
              ...match,
              messages: [...match.messages, message],
            }
          : match
      )
    );

    if (message.role === "talent" && message.type === "interview") {
      setCompanyMatch((prevData) =>
        prevData.map((match) =>
          match.matchId === message.matchId
            ? {
                ...match,
                acceptedInterview: [
                  ...match.acceptedInterview,
                  message.interview[0],
                ],
              }
            : match
        )
      );
    }
  };

  const sendMessage = async (roomId, type, message, file, interview) => {
    if (socketRef.current && roomId && type) {
      if (type === "interview") {
        socketRef.current.emit("send_message", {
          matchId: roomId,
          type: type,
          interview: interview,
        });
      }
      if (type === "text") {
        if (message || file) {
          let base64File = null;
          if (file) {
            base64File = await convertFileToBase64(file);

            if (file.type === "application/pdf") {
              base64File = base64File.split(",")[1];
            }
          }

          socketRef.current.emit("send_message", {
            matchId: roomId,
            type: type,
            text: message,
            file: file ? base64File : "",
            fileName: file ? file.name : "",
          });
        }
      }
    } else {
      console.error("Socket is not initialized");
    }
  };

  const convertFileToBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });
  };

  return (
    <CompanyContext.Provider
      value={{
        getCompanyProfile,
        companyProfile,
        companyData,
        getcompanyJobOffers,
        jobOffers,
        setCompanyData,
        patchCompanyData,
        // visibleSideBar,
        // setVisibleSideBar,
        getCompanyData,
        logout,
        getPhotos,
        companyPhotos,
        setCompanyPhotos,

        getCompanyMatch,
        companyMatch,
        setCompanyMatch,

        sendMessage,
        authentication,
      }}
    >
      {children}
    </CompanyContext.Provider>
  );
};

export const useCompany = () => useContext(CompanyContext);
