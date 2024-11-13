import React, { useEffect, useState } from "react";
import { useCompany } from "../../../context/CompanyContext/CompanyContext";
import styles from "./CompanyTalentOverview.module.css";
import { useNavigate, useParams } from "react-router-dom";
import axiosInstance from "../../../lib/axios/AxiosConfig";
import Language from "../../../common/Language";
import Chat from "../../../components/Chat/Chat";
import NoMessageImage from "../../../assets/NoMessageImage.png";
import workLevel from "../../../common/workLevel";
import { addGlobalNotification } from "../../../context/ModalContext/ModalContext";

function CompanyTalentOverview() {
  const { companyMatch, setCompanyMatch } = useCompany();
  const { matchId } = useParams();
  const navigate = useNavigate();
  const [talentInfo, setTalentInfo] = useState(null);
  const [additionalSectionStatus, setAdditionalSectionStatus] = useState(0);
  const additionalSectionStatuses = [{ title: "Chat" }, { title: "Notizen" }];
  const [note, setNote] = useState("");
  const [talentPreview, setTalentPreview] = useState(null);

  const getMatch = async (matchId) => {
    try {
      const response = await axiosInstance.get(`c_match/${matchId}`);
      setTalentInfo(response.data);
    } catch (error) {}
  };

  const sendReedMessage = async (matchId) => {
    let response = await axiosInstance.post(
      `/c_match/${matchId}/read_message_time`
    );

    setCompanyMatch((prevData) =>
      prevData?.map((match) =>
        match.matchId === matchId
          ? {
              ...match,
              lastReadMessageTime: response.data.lastReadMessageTime,
            }
          : match
      )
    );
  };

  useEffect(() => {
    if (matchId && companyMatch) {
      if (companyMatch.find((matchItem) => matchItem.matchId === matchId)) {
        getMatch(matchId);
      } else {
        navigate("/company-home");
      }
    }
  }, [matchId, companyMatch]);

  useEffect(() => {
    if (companyMatch) {
      setTalentPreview(companyMatch.find((match) => match.matchId === matchId));
    }
  }, [companyMatch]);

  useEffect(() => {
    if (matchId) {
      sendReedMessage(matchId);
    }
  }, [matchId]);

  if (!talentInfo || !talentPreview) {
    return <>Loading...</>;
  }

  function formatDateString(dateStr) {
    // Создаем объект даты из строки
    const date = new Date(dateStr);

    // Извлекаем компоненты даты и времени
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0"); // Месяцы идут от 0 до 11, поэтому прибавляем 1
    const year = date.getFullYear();
    const hours = String(date.getHours()).padStart(2, "0");
    const minutes = String(date.getMinutes()).padStart(2, "0");

    // Форматируем дату в нужный формат
    return `${day}.${month}.${year} um ${hours}:${minutes} Uhr`;
  }

  const changeStatus = async (id, status) => {
    try {
      const response = await axiosInstance.post(
        `c_match/${id}/interested`,
        {
          interested: status,
        },
        {
          notification: {
            successMessage: status
              ? `Die Stelle wurde in die Registerkarte "Vorauswahl" verschoben`
              : `Die Stelle wurde in die Registerkarte "Abgelehnt" verschoben`,
          },
        }
      );

      setCompanyMatch((prevData) =>
        prevData.map((match) =>
          match.matchId === id
            ? {
                ...match,
                companyMatchPosition: response.data.companyMatchPosition,
                companyMatchStatus: response.data.companyMatchStatus,
              }
            : match
        )
      );

      if (status === false) {
        navigate("/company-home");
      } else {
      }
    } catch (error) {}
  };

  const createNewNote = async () => {
    if (note) {
      try {
        const response = await axiosInstance.post(`/c_match/${matchId}/notes`, {
          content: note,
        });

        setCompanyMatch((prevData) =>
          prevData.map((match) =>
            match.matchId === matchId
              ? {
                  ...match,
                  notes: [...match.notes, response.data],
                }
              : match
          )
        );

        setTalentPreview((prevData) => ({
          ...prevData,
          notes: [...prevData.notes, response.data],
        }));
        setNote("");
      } catch (error) {}
    }
  };

  const handleFileUpload = async (event) => {
    const file = event.target.files[0];

    if (file) {
      const maxSize = 10 * 1024 * 1024; // 10 MB

      if (file.size > maxSize) {
        addGlobalNotification("Datei zu groß. Max 10MB.", "warning");
        event.target.value = "";
        return;
      }

      if (file.type !== "application/pdf") {
        addGlobalNotification(
          "Bitte laden Sie die Datei im PDF-Format hoch.",
          "warning"
        );
        event.target.value = "";
        return;
      }

      const reader = new FileReader();
      reader.onload = async () => {
        const base64File = reader.result.split(",")[1];
        try {
          const response = await axiosInstance.post(
            `/c_match/${matchId}/upload_contract`,
            {
              file: base64File,
              fileName: file.name,
            }
          );

          setCompanyMatch((prevData) =>
            prevData.map((match) =>
              match.matchId === matchId
                ? {
                    ...match,
                    contract: response.data.contract,
                  }
                : match
            )
          );
        } catch (error) {
          // console.error("Ошибка при загрузке файла:", error);
        }
      };

      reader.readAsDataURL(file);
    }
  };

  const handleDownloadFile = async (id) => {
    try {
      const response = await axiosInstance.get(
        `/file/match/${id}?matchId=${matchId}`,
        {
          headers: {
            role: "company",
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

  const deleteNote = async (noteId) => {
    try {
      await axiosInstance.delete(
        `/c_match/${talentInfo.matchId}/notes/${noteId}`
      );
      setCompanyMatch((prevData) =>
        prevData.map((match) =>
          match.matchId === talentInfo.matchId
            ? {
                ...match,
                notes: match.notes.filter((note) => note.noteId !== noteId),
              }
            : match
        )
      );
      setTalentPreview((prevData) => ({
        ...prevData,
        notes: prevData.notes.filter((note) => note.noteId !== noteId),
      }));
    } catch (error) {}
  };

  return (
    <>
      <div className={styles.talentPage}>
        <button type="button" onClick={() => navigate("/company-home")}>
          <i className="material-symbols-outlined">arrow_back_ios</i>
          Back to job overview
        </button>

        <div className={styles.talentWrapper}>
          <div className={`${styles.talentInfo} ${styles.leftBorder}`}>
            {/* General information */}
            <div className="column" style={{ gap: "24px" }}>
              <div className="column ">
                <h4>{talentInfo.talentNameSurname}</h4>
                <p className="text-m-regular">
                  Interesse an:{" "}
                  <span style={{ color: "var(--petrol-100)" }}>
                    {talentPreview.jobTitle}
                  </span>
                </p>
              </div>

              <div className="column minGap">
                <div className="row start" style={{ gap: "24px" }}>
                  {talentInfo.nationality.length > 0 && (
                    <div className="center minGap">
                      <i
                        className="material-symbols-outlined"
                        style={{ color: "var(--yellow-100)" }}
                      >
                        location_on
                      </i>
                      {talentInfo.nationality.map((item, index) => (
                        <p key={index} className="text-s-regular">
                          {item}
                        </p>
                      ))}
                    </div>
                  )}
                  {talentInfo.startDate && (
                    <div className="center minGap">
                      <i
                        className="material-symbols-outlined"
                        style={{ color: "var(--yellow-100)" }}
                      >
                        calendar_today
                      </i>
                      <p className="text-s-regular">{talentInfo.startDate}</p>
                    </div>
                  )}
                  <div className="center minGap">
                    <i
                      className="material-symbols-outlined"
                      style={{ color: "var(--yellow-100)" }}
                    >
                      language
                    </i>
                    {talentInfo.languages.map((value, index) => (
                      <div key={index}>
                        <p className="text-s-regular">
                          {value.language}{" "}
                          {
                            Language.filter(
                              (lang) => lang.level === value.level
                            )[0].short
                          }
                          {index < talentInfo.languages.length - 1 && `,`}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="center start minGap">
                  <i
                    className="material-symbols-outlined"
                    style={{ color: "var(--yellow-100)" }}
                  >
                    euro
                  </i>
                  <p className="text-s-regular">
                    {talentInfo.salary === 0
                      ? "Unter Ihrer Gehaltsspanne"
                      : talentInfo.salary === 1
                      ? "Entspricht Ihrer Gehaltsspanne"
                      : "Über Ihrer Gehaltsspanne"}
                  </p>
                </div>
              </div>
            </div>

            {/* Button to match */}
            {talentPreview.companyMatchStatus === 10 &&
              talentPreview.companyMatchPosition !== 7 && (
                <>
                  <div className="row gap">
                    <button
                      className="primary medium full"
                      type="button"
                      onClick={() => changeStatus(talentInfo.matchId, true)}
                      style={{ color: "white" }}
                    >
                      <div className="center midGap">
                        <i className="material-symbols-outlined">thumb_up</i>
                        <p
                          style={{ color: "white" }}
                          className="text-m-semibold"
                        >
                          Ich bin interessiert
                        </p>
                      </div>
                    </button>
                    <button
                      className="secondary medium full"
                      type="button"
                      onClick={() => changeStatus(talentInfo.matchId, false)}
                    >
                      <div className="center midGap">
                        <i className="material-symbols-outlined">thumb_down</i>
                        <p className="text-m-semibold">Kein Interesse</p>
                      </div>
                    </button>
                  </div>
                </>
              )}

            {/* Button to upload contract */}
            {talentPreview.companyMatchStatus === 40 &&
              (!talentPreview.contract.documentId ? (
                <div>
                  <input
                    type="file"
                    id="file-upload"
                    style={{ display: "none" }}
                    accept=".pdf"
                    onChange={(e) => handleFileUpload(e)}
                  />
                  <button
                    className="primary medium"
                    type="button"
                    onClick={() =>
                      document.getElementById("file-upload").click()
                    }
                  >
                    <span className="material-symbols-outlined">
                      upload_file
                    </span>
                    Arbeitsvertrag hochladen
                  </button>
                </div>
              ) : (
                <div className={styles.contractField}>
                  <div className="row center start gap-8">
                    <i className="material-symbols-outlined">draft</i>
                    <p
                      style={{ cursor: "pointer" }}
                      className="text-s-medium underline"
                      onClick={() =>
                        handleDownloadFile(talentPreview.contract.documentId)
                      }
                    >
                      {talentPreview.contract.documentName}
                    </p>
                  </div>
                  <i className="material-symbols-outlined">check_circle</i>
                </div>
              ))}

            {/* Skillset */}
            <div className="column minGap">
              <h5>Skills</h5>
              <div className="column">
                {talentInfo.skills.map((item, index) => (
                  <div key={index}>
                    <p>{item.skillName} </p>
                    <p>
                      (
                      {
                        workLevel.filter(
                          (workLevel) => workLevel.text === item.skillLevel
                        )[0].longDe
                      }
                      )
                    </p>
                  </div>
                ))}
              </div>
            </div>
            {/* Career */}

            <div className="column minGap">
              <div className="row space-between">
                {talentInfo.curriculumVitae.workExperience.length > 0 && (
                  <h5>Berufserfahrung</h5>
                )}
                <div />
                {talentInfo.cvId && (
                  <div
                    className="row center end gap-8"
                    style={{ color: "var(--petrol-100)", cursor: "pointer " }}
                    onClick={() => handleDownloadFile(talentInfo.cvId)}
                  >
                    <p className="material-symbols-outlined">downloading</p>
                    <p className="text-s-medium underline">
                      Lebenslauf herunterladen
                    </p>
                  </div>
                )}
              </div>

              {talentInfo.curriculumVitae.workExperience.length > 0 && (
                <div className="column">
                  {talentInfo.curriculumVitae.workExperience.map(
                    (item, index) => (
                      <div key={index}>
                        <div className="column">
                          <div className="row space-between">
                            <p className="text-m-semibold">{item.position}</p>
                            <p className="text-m-regular">
                              {item.startDate} -
                              {item.untilToday
                                ? " today"
                                : ` ${item.finishDate}`}
                            </p>
                          </div>
                          <p className="text-m-regular">{item.companyName}</p>
                          <p className="text-m-regular">{item.location}</p>
                        </div>
                        {talentInfo.curriculumVitae.workExperience.length >
                          index + 1 && <hr className={styles.hr} />}
                      </div>
                    )
                  )}
                </div>
              )}
            </div>

            {/* Education */}
            {talentInfo.curriculumVitae.education.length > 0 && (
              <div className="column minGap">
                <h5>Ausbildung</h5>
                <div className="column">
                  {talentInfo.curriculumVitae.education.map((item, index) => (
                    <div key={index}>
                      <div className="column">
                        <div className="row space-between">
                          <p className="text-m-semibold">{item.fieldStudy}</p>
                          <p className="text-m-regular">
                            {item.startDate} -
                            {item.untilToday ? " today" : ` ${item.finishDate}`}
                          </p>
                        </div>
                        <p className="text-m-regular">{item.nameUniversity}</p>
                        <p className="text-m-regular">
                          {item.city}, {item.country}
                        </p>
                      </div>
                      {talentInfo.curriculumVitae.education.length >
                        index + 1 && <hr className={styles.hr} />}
                    </div>
                  ))}
                </div>
              </div>
            )}
            {/* apprenticeship */}
            {talentInfo.curriculumVitae.education.length > 0 && (
              <div className="column minGap">
                <h5>Apprenticeship</h5>
                <div className="column">
                  {talentInfo.curriculumVitae.apprenticeship.map(
                    (item, index) => (
                      <div key={index}>
                        <div className="column">
                          <div className="row space-between">
                            <p className="text-m-semibold">{item.position}</p>
                            {/* <p className="text-m-regular">
                              {item.startDate} -
                              {item.untilToday
                                ? " today"
                                : ` ${item.finishDate}`}
                            </p> */}
                          </div>
                          <p className="text-m-regular">
                            {item.nameUniversity}
                          </p>
                        </div>
                        {talentInfo.curriculumVitae.apprenticeship.length >
                          index + 1 && <hr className={styles.hr} />}
                      </div>
                    )
                  )}
                </div>
              </div>
            )}
          </div>

          {/* Chat */}
          {talentPreview.companyMatchStatus >= 20 && (
            <div className={styles.chatWrapper}>
              <div
                className={styles.selector}
                style={{ width: "200px", height: "30px" }}
              >
                {additionalSectionStatuses.map((item, index) => (
                  <div
                    key={index}
                    className={`${styles.selectorItem} ${
                      additionalSectionStatus === index ? styles.active : ""
                    }`}
                    onClick={() => setAdditionalSectionStatus(index)}
                  >
                    <p
                      className={`${styles.selectorItem} ${
                        additionalSectionStatus === index
                          ? "text-m-semibold"
                          : "text-m-regular"
                      }`}
                    >
                      {item.title}
                    </p>
                  </div>
                ))}
              </div>
              {additionalSectionStatus === 0 && (
                <Chat type={"company"} match={talentPreview} />
              )}
              {additionalSectionStatus === 1 && (
                <div className={styles.notize}>
                  {talentPreview.notes.length === 0 ? (
                    <div className="center column flexOne">
                      <img src={NoMessageImage} style={{ width: "290px" }} />
                      <h5>Keine Notizen vorhanden.</h5>
                      <p className="center text-s-regular">
                        Erstellen Sie Notizen zu Ihren Bewerbern, um den
                        Überblick zu behalten und Ihre Entscheidungsfindung zu
                        erleichtern
                      </p>
                    </div>
                  ) : (
                    <div className={styles.notes}>
                      {talentPreview.notes.map((note, index) => (
                        <div key={index}>
                          <p>{note.content}</p>
                          <div className="row space-between">
                            <p className="text-xs-regular">
                              {formatDateString(note.createdAt)}
                            </p>
                            <p
                              className="text-xs-regular"
                              onClick={() => deleteNote(note.noteId)}
                            >
                              Löschen
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}

                  <div className="column midGap">
                    <div className={styles.inputWrapper}>
                      <textarea
                        className={styles.chatInput}
                        placeholder="Type your message here..."
                        value={note}
                        onChange={(e) => setNote(e.target.value)}
                      />
                    </div>
                    <button
                      className="secondary small full"
                      type="button"
                      onClick={createNewNote}
                    >
                      Notiz speichern
                    </button>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default CompanyTalentOverview;
