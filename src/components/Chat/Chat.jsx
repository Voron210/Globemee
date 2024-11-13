import React, { useRef, useState } from "react";
import styles from "./Chat.module.css";
import NoMessageImage from "../../assets/NoMessageImage.png";
import { useCompany } from "../../context/CompanyContext/CompanyContext";
import axiosInstance from "../../lib/axios/AxiosConfig";
import InterviewCalendar from "../../components/InterviewCalendar/InterviewCalendar";
import Modal from "../Modal/Modal";
// import { toZonedTime } from "date-fns-tz";
import { de, enGB } from "date-fns/locale";
import { format } from "date-fns";
import { useUser } from "../../context/TalentContext/UserContext";
import { addGlobalNotification } from "../../context/ModalContext/ModalContext";

function toZonedTime(date, timeZone) {
  const options = {
    timeZone,
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: false,
  };

  const formatter = new Intl.DateTimeFormat([], options);
  const parts = formatter.formatToParts(date);

  const values = {};
  parts.forEach(({ type, value }) => {
    values[type] = value;
  });

  return new Date(`${values.year}-${values.month}-${values.day}T${values.hour}:${values.minute}:${values.second}`);
}

const Chat = ({ type = "", match }) => {
  const companyContext = useCompany();
  const userContext = useUser();
  const inputRef = useRef(null);

  const userData = type === "talent" ? userContext.userData : null;
  const companyData = type === "company" ? companyContext.companyData : null;

  const sendMessage =
    type === "company" ? companyContext.sendMessage : userContext.sendMessage;

  const companyPhotos =
    type === "company" ? companyContext.companyPhotos : null;

  const [selectedFile, setSelectedFile] = useState(null);
  const [modalActive, setModalActive] = useState(false);
  const [modalContent, setModalContent] = useState(null);
  const [modalWidth, setModalWidth] = useState("500px");

  const [inputMessage, setInputMessage] = useState("");

  const timeZone = "Europe/Berlin";
  const formatter = new Intl.DateTimeFormat("en-GB", {
    timeZone: "Europe/Berlin",
    hour: "2-digit",
    minute: "2-digit",
    timeZoneName: "short",
  });

  const formatterCET = new Intl.DateTimeFormat("en-GB", {
    timeZone: "Europe/Berlin",
    timeZoneName: "short",
  });

  const handleFileChange = (event) => {
    const file = event.target.files[0];

    if (file) {
      const maxSize = 10 * 1024 * 1024; // 10 MB

      if (file.size > maxSize) {
        addGlobalNotification(
          `${
            type === "talent"
              ? "File too large. Max 10MB."
              : "Datei zu groß. Max 10MB."
          }`,
          "warning"
        );
        event.target.value = null;
        setSelectedFile(null);
        return;
      }

      setSelectedFile(file);
    }
  };

  const opentModal = (content, width) => {
    setModalWidth(width);
    setModalContent(content);
    setModalActive(true);
  };

  const handleSendClick = () => {
    if (selectedFile) {
      sendMessage(match.matchId, "text", inputMessage, selectedFile);
      setSelectedFile(null);
      inputRef.current.value = "";
      setInputMessage("");
    } else {
      sendMessage(match.matchId, "text", inputMessage);
      setInputMessage("");
      setSelectedFile(null);
      inputRef.current.value = "";
    }
  };

  const handleSelectInterview = (props) => {
    setModalActive(false);
    sendMessage(match.matchId, "interview", "", "", props);
  };

  const handleDownloadFile = async (id) => {
    try {
      const response = await axiosInstance.get(
        `/file/match/${id}?matchId=${match.matchId}`,
        {
          headers: {
            role: type,
          },
          responseType: "blob",
        }
      );

      const contentDisposition = response.headers["content-disposition"];
      var fileNameMatch = contentDisposition.split("filename=", 2)[1];

      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement("a");
      link.href = url;

      let fileName = "downloaded-file";

      if (contentDisposition) {
        if (fileNameMatch) fileName = fileNameMatch;
      }

      link.setAttribute("download", fileName);
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (error) {}
  };

  let lastInterView =
    match &&
    match.messages &&
    Array.isArray(match.messages) &&
    match.messages.filter((mes) => mes.type === "interview").length > 0
      ? match.messages.filter((mes) => mes.type === "interview").pop()
      : null;

  return (
    <>
      <div className={styles.chat}>
        {match.messages.length === 0 ? (
          // EMPTY MESSAGE
          <div className="center column flexOne">
            <img
              src={NoMessageImage}
              style={{ width: "290px" }}
              alt="NoMessageImage"
            />
            <h5>It's quiet here. </h5>
            <p className="center text-s-regular">
              The company has expressed interest in you.
            </p>
            <p className="center text-s-regular">
              Take the first step and send a message!
            </p>
          </div>
        ) : (
          //MESSAGE LIST
          <>
            <div className={styles.messageList}>
              {[...match.messages].reverse().map((item, index) => (
                //MESSAGE
                <div key={index} className={styles.messageWrapper}>
                  <div
                    className={`${styles.messageContainer} `}
                    style={{
                      flexDirection: item.role === type ? "row" : "row-reverse",
                    }}
                  >
                    {/* MESSAGE CONTAINER */}
                    <div
                      className={`${styles.message} ${
                        item.role === type
                          ? styles.outMessage
                          : styles.inMessage
                      }`}
                    >
                      {/* TEXT CONTAINER */}
                      {item.text && (
                        <p className="text-s-regular">
                          {item.text.split("\n").map((line, index) => (
                            <React.Fragment key={index}>
                              {line}
                              <br />
                            </React.Fragment>
                          ))}
                        </p>
                      )}

                      {/* DOCUMENT CONTAINER */}
                      {item.fileName && (
                        <div
                          className="center"
                          onClick={() => handleDownloadFile(item.fileId)}
                          style={{
                            cursor: "pointer",
                            color: "var(--petrol-100)",
                          }}
                        >
                          <p className="material-symbols-outlined">draft</p>
                          <p className="text-s-medium">{item.fileName}</p>
                        </div>
                      )}

                      {/* INTERVIEW CONTAINER */}
                      {item.interview && (
                        <>
                          <p className="text-s-regular">
                            {type === "talent" &&
                              (item.role === "company"
                                ? "Interview suggestions:"
                                : "Interview Invitation accepted:")}
                            {type === "company" &&
                              (item.role === "talent"
                                ? "Interviewvorschlag angenommen:"
                                : "Interviewvorschläge gesendet:")}
                          </p>

                          <div className="column gap-8">
                            {item.interview.map((time, index) => {
                              // console.log(time.startAt);
                              const zonedstartAt = toZonedTime(
                                new Date(time.startAt),
                                timeZone
                              );
                              // console.log(zonedstartAt);
                              const formattedDate = format(
                                zonedstartAt,
                                "dd. MMMM yyyy, ",
                                {
                                  locale: type === "talent" ? enGB : de,
                                }
                              );

                              const zonedendAt = formatter.format(
                                new Date(time.endAt)
                              );
                              const formattedTimeRange = `${format(
                                zonedstartAt,
                                "HH:mm"
                              )} - ${zonedendAt}`;

                              return (
                                <div
                                  key={index}
                                  className={`${
                                    type === "talent" &&
                                    item.role === "company" &&
                                    lastInterView.messageId ===
                                      item.messageId &&
                                    styles.newInterview
                                  }`}
                                  onClick={() =>
                                    type === "talent" &&
                                    item.role === "company" &&
                                    lastInterView.messageId ===
                                      item.messageId &&
                                    opentModal(
                                      <div className="column gap-32">
                                        <div className="column gap-16">
                                          <h5>Accept interview?</h5>
                                          <p>
                                            The interview will take place on{" "}
                                            {formattedDate} {formattedTimeRange}
                                          </p>
                                        </div>
                                        <div className="row end gap-16">
                                          <button
                                            type="button"
                                            className="secondary small"
                                            onClick={() =>
                                              setModalActive(false)
                                            }
                                          >
                                            Cancel
                                          </button>
                                          <button
                                            type="button"
                                            className="primary small"
                                            onClick={() => {
                                              handleSelectInterview([time]);
                                            }}
                                          >
                                            Accept
                                          </button>
                                        </div>
                                      </div>
                                    )
                                  }
                                >
                                  <p
                                    className="text-s-medium"
                                    style={{ color: "var(--grey-100)" }}
                                  >
                                    {formattedDate}
                                  </p>
                                  <p
                                    className="text-s-medium"
                                    style={{ color: "var(--grey-100)" }}
                                  >
                                    {formattedTimeRange}
                                  </p>
                                </div>
                              );
                            })}
                          </div>
                        </>
                      )}
                    </div>

                    {/* USER\COMPANY ICON */}
                    <div className={styles.chatlogo}>
                      {type === "company" &&
                        (item.role === "talent" ? (
                          <p className="text-xs-medium">
                            {match.talentNameSurname
                              .split(" ")
                              .map((name) => name[0].toUpperCase())
                              .join("")}
                          </p>
                        ) : (
                          <>
                            <img
                              src={companyPhotos?.logo?.file}
                              className={styles.logo}
                            />
                          </>
                        ))}
                      {type === "talent" &&
                        (item.role === "talent" ? (
                          <p className="text-xs-medium">
                            {`${userData.name.charAt(
                              0
                            )}${userData.surname.charAt(0)}`}
                          </p>
                        ) : (
                          <img src={match.logo} className={styles.logo} />
                        ))}
                    </div>
                  </div>

                  {/* TIME UNDER MESSAGE */}
                  <p
                    className="text-xxs"
                    style={{
                      textAlign: item.role === type ? "start" : "end",
                    }}
                  >
                    {formatter.format(new Date(item.timestamp))}
                  </p>
                </div>
              ))}
            </div>
            {lastInterView &&
              lastInterView.role === "company" &&
              type === "talent" && (
                <div className={styles.timeZoneInfo}>
                  <div className="row gap-8">
                    <i
                      className="material-symbols-outlined"
                      style={{ color: "var(--petrol-100)" }}
                    >
                      info
                    </i>
                    {(() => {
                      const timezone = formatterCET
                        .formatToParts(new Date(lastInterView.timestamp))
                        .find((part) => part.type === "timeZoneName").value;

                      return (
                        <p className="text-s-medium">
                          Interview takes place at{" "}
                          {timezone === "CET"
                            ? "Central European Time"
                            : "Central European Summer Time"}{" "}
                          ({timezone}).
                        </p>
                      );
                    })()}
                  </div>
                  <p className="text-xs-regular">
                    Please double check your local time before you accept an
                    interview invitation.
                  </p>
                </div>
              )}
          </>
        )}

        {/* CHAT CONTROLLER (INPUT, Buttons) */}
        <div className={styles.inputWrapper}>
          <textarea
            // ref={inputRef}
            autoFocus
            className={styles.chatInput}
            placeholder="Type your message here..."
            value={inputMessage}
            onChange={(e) => setInputMessage(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault();
                handleSendClick();
              }
            }}
          />
          <div className={styles.chatInstrument}>
            <input
              ref={inputRef}
              type="file"
              accept=".pdf, .jpeg, .jpg, .png"
              style={{ display: "none" }}
              id="file-upload"
              onChange={handleFileChange}
            />
            <label
              style={{ alignItems: "center", display: "flex" }}
              htmlFor="file-upload"
            >
              <i
                className="material-symbols-outlined"
                style={{
                  transform: "rotate(-45deg)",
                  cursor: "pointer",
                }}
              >
                attachment
              </i>
            </label>
            {type === "company" && (
              <div
                className="center"
                onClick={() =>
                  opentModal(
                    <InterviewCalendar onSelect={handleSelectInterview} />
                  )
                }
                style={{
                  cursor: "pointer",
                  color: "var(--petrol-100)",
                  borderLeft: "1px solid var(--grey-20)",
                  paddingLeft: "4px",
                  marginLeft: "4px",
                  gap: "4px",
                }}
              >
                <p className="material-symbols-outlined">event</p>
                Interview vereinbaren
              </div>
            )}
            <div className="flexOne" />
            <i
              className="material-symbols-outlined"
              onClick={() => handleSendClick()}
            >
              send
            </i>
          </div>
          {selectedFile && (
            <div className={styles.uploadWrapper}>
              <p className="text-m-medium">{selectedFile.name}</p>
              <p
                className="material-symbols-outlined"
                onClick={() => {
                  setSelectedFile(null);
                  inputRef.current.value = "";
                }}
                style={{ cursor: "pointer" }}
              >
                close
              </p>
            </div>
          )}
        </div>
      </div>

      <Modal
        active={modalActive}
        setActive={setModalActive}
        children={modalContent}
        width={modalWidth}
      />
    </>
  );
};

export default Chat;
