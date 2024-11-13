import React, {
  createContext,
  useState,
  useContext,
  useEffect,
  useRef,
} from "react";
import axiosInstance from "../../lib/axios/AxiosConfig";
import { useLocation, useNavigate } from "react-router-dom";
import io from "socket.io-client";
import { baseUrl } from "../../config";
import { addGlobalNotification } from "../../context/ModalContext/ModalContext";

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const [userData, setUserData] = useState();
  const [matchData, setMatchData] = useState();

  const socketRef = useRef(null);
  const locationRef = useRef(location);

  useEffect(() => {
    locationRef.current = location;
  }, [location]);

  const authentication = async () => {
    try {
      if (
        location.pathname === "/talent-login" ||
        location.pathname === "/talent-signup"
      ) {
        const response = await axiosInstance.get("/t_talent");
        setUserData(response.data);
        connectToRooms();
      } else {
        await Promise.all([getData(), connectToRooms()]);
      }
    } catch (error) {}
  };

  const getData = async () => {
    try {
      const response = await axiosInstance.get("/t_talent");
      setUserData(response.data);
    } catch (error) {}
  };

  const getMatchData = async () => {
    try {
      const response = await axiosInstance.get("/t_match/match_all");
      setMatchData(response.data);
    } catch (error) {
      console.error("Failed to fetch match data:", error);
    }
  };

  const connectToRooms = () => {
    try {
      initializeWebSocket();
    } catch (error) {}
  };

  const logout = async () => {
    try {
      await axiosInstance.post("/t_authentication/logout");
      disconnectWebSocket();
      setUserData(null);
      setMatchData(null);
      navigate("/talent-login");
    } catch (error) {}
  };

  const patchData = async (Data) => {
    try {
      const response = await axiosInstance.patch("/t_talent", Data);
      // console.log(response.data);
      await getData();
    } catch (error) {
      // console.error("Error updating user data:", error);
      // throw new Error("Failed to update user data.");
    }
  };

  const joinRoom = async () => {
    try {
      const response = await axiosInstance.get("/t_match/match_all");
      setMatchData(response.data);

      if (response.data.length > 0) {
        socketRef.current.emit("join", {
          matchId: response.data.map((item) => item.matchId),
        });
      }
    } catch (error) {}
  };

  const initializeWebSocket = () => {
    if (!socketRef.current) {
      socketRef.current = io(baseUrl, {
        extraHeaders: {
          Role: "talent",
        },
        withCredentials: true,
      });

      socketRef.current.on("connect", () => {
        joinRoom();
      });

      socketRef.current.on("status", function (data) {});

      socketRef.current.on("disconnect", (reason) => {});

      socketRef.current.on("error", (error) => {});

      socketRef.current.on("message", (message) => {});

      socketRef.current.on("receive_message", (message) => {});

      socketRef.current.on("new_message", (message) => {
        addMessage(message);
      });
    }
  };

  const disconnectWebSocket = () => {
    if (socketRef.current) {
      socketRef.current.disconnect();
      socketRef.current = null;
    }
  };

  const addMessage = async (message) => {
    if (message.role === "company") {
      const matchId =
        locationRef.current.pathname.match(/\/match\/([^/]+)/)?.[1];

      if (!matchId) {
        const navigateToMessage = () => {
          navigate(`/talent-home/match/${message.matchId}`);
        };

        addGlobalNotification("New message from company", "success", () =>
          navigateToMessage(message.matchId)
        );
      } else {
        let response = await axiosInstance.post(
          `/t_match/${matchId}/read_message_time`
        );

        setMatchData((prevData) =>
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
    setMatchData((prevData) =>
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
      setMatchData((prevData) =>
        prevData.map((match) =>
          match.matchId === message.matchId
            ? {
                ...match,
                talentMatchStatus: 30,
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

  // Function to send a message
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
    <UserContext.Provider
      value={{
        userData,
        setUserData,
        patchData,
        setMatchData,
        // visibleSideBar,
        // setVisibleSideBar,

        matchData,
        getMatchData,
        connectToRooms,

        getData,
        logout,

        initializeWebSocket,
        // socket,

        sendMessage,

        authentication,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => useContext(UserContext);
