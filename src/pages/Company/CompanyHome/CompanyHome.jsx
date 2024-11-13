import React, { useEffect, useMemo, useRef, useState } from "react";
import { useCompany } from "../../../context/CompanyContext/CompanyContext";
import styles from "./CompanyHome.module.css";
import { useNavigate, useParams } from "react-router-dom";
import KanbanBoard from "../../../components/KanbanBoard/KanbanBoard";
import GlobemeeGodImage from "../../../assets/GlobemeeGodImage.png";
// import { toZonedTime } from "date-fns-tz";
import { de } from "date-fns/locale";
import { format } from "date-fns";

import Modal from "../../../components/Modal/Modal";
import SimpleDropdown from "../../../components/SimpleDropdown/SimpleDropdown";
import axiosInstance from "../../../lib/axios/AxiosConfig";
import Language from "../../../common/Language";
import Chat from "../../../components/Chat/Chat";
import NoMessageImage from "../../../assets/NoMessageImage.png";
import workLevel from "../../../common/workLevel";

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

function CompanyHome() {
  const { companyData, jobOffers, companyMatch, setCompanyMatch } =
    useCompany();
  const [dashboardStatus, setDashboardStatus] = useState(0);
  const navigate = useNavigate();
  const [modalActive, setModalActive] = useState(false);
  const [modalContent, setModalContent] = useState(null);
  const [talentInfo, setTalentInfo] = useState(null);
  const [modalWidth, setModalWidth] = useState("500px");
  const [filterJobOfferId, setFilterJobOfferId] = useState(null);

  const [items, setItems] = useState([]);
  const [columns, setColumns] = useState([]);

  useEffect(() => {
    if (companyMatch) {
      let items = !filterJobOfferId
        ? companyMatch?.map((item) => ({
            ...item,
            id: item.matchId,
          }))
        : companyMatch
            ?.filter((item) => item.jobOfferId === filterJobOfferId)
            .map((item) => ({
              ...item,
              id: item.matchId,
            }));

      let initialColumns = [
        {
          id: "column-1",
          title: "Matches",
          items: items?.filter((item) => item.companyMatchPosition === 1),
        },
        {
          id: "column-2",
          title: "Vorauswahl",
          items: items?.filter((item) => item.companyMatchPosition === 2),
        },
        {
          id: "column-3",
          title: "1. Interview",
          items: items?.filter((item) => item.companyMatchPosition === 3),
        },
        {
          id: "column-4",
          title: "2. Interview",
          items: items?.filter((item) => item.companyMatchPosition === 4),
        },
        {
          id: "column-5",
          title: "Angebot",
          items: items?.filter((item) => item.companyMatchPosition === 5),
        },
        {
          id: "column-6",
          title: "Einstellung",
          items: items?.filter((item) => item.companyMatchPosition === 6),
        },
        {
          id: "column-7",
          title: "Abgelehnt",
          items: items?.filter((item) => item.companyMatchPosition === 7),
        },
      ];

      setColumns(initialColumns);
    }
  }, [companyMatch, filterJobOfferId]);

  const { matchId } = useParams();
  useEffect(() => {
    if (matchId && companyMatch && !talentInfo) {
      if (companyMatch.find((matchItem) => matchItem.matchId === matchId)) {
        getMatch(matchId);
      } else {
        navigate("/company-home");
      }
    }
  }, [matchId, companyMatch]);

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
    if (matchId) {
      sendReedMessage(matchId);
    }
  }, [matchId]);

  if (!companyData || !jobOffers) {
    return <div>Loading...</div>;
  }

  const countNewMessage = () => {
    if (companyMatch?.length > 0) {
      let count = 0;

      companyMatch.forEach((item) => {
        const lastRead = new Date(item.lastReadMessageTime);
        const newCompanyMessages = item.messages.filter(
          (message) =>
            message.role === "talent" && new Date(message.timestamp) > lastRead
        );
        if (newCompanyMessages.length > 0) {
          count++;
        }
      });
      return count;
    }
    return 0;
  };

  // const countInterview = () => {
  //   if (companyMatch.length > 0) {
  //     let count = 0;
  //     let now = new Date();
  //     // let next24Hours = new Date(now.getTime() + 24 * 60 * 60 * 1000); // Следующие 24 часа

  //     companyMatch.forEach((item) => {
  //       if (item.acceptedInterview.length > 0) {
  //         // Проверяем, есть ли интервью в ближайшие 24 часа
  //         const hasUpcomingInterview = item.acceptedInterview.some(
  //           (interview) => {
  //             const interviewStart = new Date(interview.startAt);
  //             // return interviewStart >= now && interviewStart <= next24Hours;
  //             return interviewStart >= now;
  //           }
  //         );

  //         if (hasUpcomingInterview) {
  //           count++;
  //         }
  //       }
  //     });
  //     return count;
  //   }
  //   return 0;
  // };

  const countInterview = () => {
    if (!Array.isArray(companyMatch) || companyMatch.length === 0) {
      return 0;
    }
    let count = 0;
    let now = new Date();
    companyMatch.forEach((item) => {
      if (
        Array.isArray(item.acceptedInterview) &&
        item.acceptedInterview.length > 0 &&
        item.talentMatchStatus !== 0
      ) {
        const hasUpcomingInterview = item.acceptedInterview.some(
          (interview) => {
            if (interview && interview.startAt) {
              const interviewStart = new Date(interview.startAt);
              return interviewStart >= now;
            }
            return false;
          }
        );

        if (hasUpcomingInterview) {
          count++;
        }
      }
    });

    return count;
  };

  const dashboardStatuses = [
    { title: "Alle", notificationCount: 0 },
    {
      title: "Ungelesene Nachrichten",
      notificationCount: countNewMessage(),
    },
    { title: "Anstehende Interviews", notificationCount: countInterview() },
  ];

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
              ? "The job has been moved to the Pending tab."
              : "The job has been hidden",
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
        // setTalentInfoVision(false);
        setModalActive(false);
        navigate("/company-home");
      } else {
        // setTalentPreview((prevData) => ({
        //   ...prevData,
        //   companyMatchStatus: response.data.companyMatchStatus,
        // }));
      }
    } catch (error) {}
  };

  const setMatchPosition = async (id, position) => {
    try {
      const response = await axiosInstance.post(`c_match/${id}/position`, {
        companyMatchPosition: position,
      });

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
    } catch (error) {}
  };

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

  const handleFileUpload = async (event) => {
    const file = event.target.files[0];
    if (file) {
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
        } catch (error) {}
      };

      reader.readAsDataURL(file);
    }
  };

  // const TalentInfo = () => {
  //   const [note, setNote] = useState("");
  //   const [talentPreview, setTalentPreview] = useState(
  //     companyMatch.find((match) => match.matchId === matchId)
  //   );

  //   useEffect(() => {
  //     if (talentInfoVision && talentPreview) {
  //       setTalentPreview(
  //         companyMatch.find((match) => match.matchId === talentPreview.matchId)
  //       );
  //     }
  //   }, [companyMatch]);

  //   if (!talentInfo) {
  //     return <>Loading...</>;
  //   }

  //   const createNewNote = async () => {
  //     if (note) {
  //       try {
  //         const response = await axiosInstance.post(
  //           `/c_match/${matchId}/notes`,
  //           {
  //             content: note,
  //           }
  //         );

  //         setCompanyMatch((prevData) =>
  //           prevData.map((match) =>
  //             match.matchId === matchId
  //               ? {
  //                   ...match,
  //                   notes: [...match.notes, response.data],
  //                 }
  //               : match
  //           )
  //         );

  //         setTalentPreview((prevData) => ({
  //           ...prevData,
  //           notes: [...prevData.notes, response.data],
  //         }));
  //       } catch (error) {}
  //     }
  //   };

  //   const deleteNote = async (noteId) => {
  //     try {
  //       await axiosInstance.delete(
  //         `/c_match/${talentInfo.matchId}/notes/${noteId}`
  //       );
  //       setCompanyMatch((prevData) =>
  //         prevData.map((match) =>
  //           match.matchId === talentInfo.matchId
  //             ? {
  //                 ...match,
  //                 notes: match.notes.filter((note) => note.noteId !== noteId),
  //               }
  //             : match
  //         )
  //       );
  //       setTalentPreview((prevData) => ({
  //         ...prevData,
  //         notes: prevData.notes.filter((note) => note.noteId !== noteId),
  //       }));
  //     } catch (error) {}
  //   };

  //   return (
  //     <div className={styles.talentPage}>
  //       <button type="button" onClick={() => navigate("/company-home")}>
  //         <i className="material-symbols-outlined">arrow_back_ios</i>
  //         Back to job overview
  //       </button>

  //       <div className={styles.talentWrapper}>
  //         <div className={`${styles.talentInfo} ${styles.leftBorder}`}>
  //           {/* General information */}
  //           <div className="column" style={{ gap: "24px" }}>
  //             <div className="column ">
  //               <h4>{talentInfo.talentNameSurname}</h4>
  //               <p className="text-m-regular">
  //                 Interesse an:{" "}
  //                 <span style={{ color: "var(--petrol-100)" }}>
  //                   {talentPreview.jobTitle}
  //                 </span>
  //               </p>
  //             </div>

  //             <div className="column minGap">
  //               <div className="row start" style={{ gap: "24px" }}>
  //                 {talentInfo.nationality.length > 0 && (
  //                   <div className="center minGap">
  //                     <i
  //                       className="material-symbols-outlined"
  //                       style={{ color: "var(--yellow-100)" }}
  //                     >
  //                       location_on
  //                     </i>
  //                     {talentInfo.nationality.map((item, index) => (
  //                       <p key={index} className="text-s-regular">
  //                         {item}
  //                       </p>
  //                     ))}
  //                   </div>
  //                 )}
  //                 {talentInfo.startDate && (
  //                   <div className="center minGap">
  //                     <i
  //                       className="material-symbols-outlined"
  //                       style={{ color: "var(--yellow-100)" }}
  //                     >
  //                       calendar_today
  //                     </i>
  //                     <p className="text-s-regular">{talentInfo.startDate}</p>
  //                   </div>
  //                 )}
  //                 <div className="center minGap">
  //                   <i
  //                     className="material-symbols-outlined"
  //                     style={{ color: "var(--yellow-100)" }}
  //                   >
  //                     language
  //                   </i>
  //                   {talentInfo.languages.map((value, index) => (
  //                     <div key={index}>
  //                       <p className="text-s-regular">
  //                         {value.language}{" "}
  //                         {
  //                           Language.filter(
  //                             (lang) => lang.level === value.level
  //                           )[0].short
  //                         }
  //                         {index < talentInfo.languages.length - 1 && `,`}
  //                       </p>
  //                     </div>
  //                   ))}
  //                 </div>
  //               </div>
  //               <div className="center start minGap">
  //                 <i
  //                   className="material-symbols-outlined"
  //                   style={{ color: "var(--yellow-100)" }}
  //                 >
  //                   euro
  //                 </i>
  //                 <p className="text-s-regular">
  //                   {talentInfo.salary === 0
  //                     ? "Unter Ihrer Gehaltsspanne"
  //                     : talentInfo.salary === 1
  //                     ? "Entspricht Ihrer Gehaltsspanne"
  //                     : "Über Ihrer Gehaltsspanne"}
  //                 </p>
  //               </div>
  //             </div>
  //           </div>

  //           {/* Button to match */}
  //           {talentPreview.companyMatchStatus === 10 &&
  //             talentPreview.companyMatchPosition !== 7 && (
  //               <>
  //                 <div className="row gap">
  //                   <button
  //                     className="primary medium full"
  //                     type="button"
  //                     onClick={() => changeStatus(talentInfo.matchId, true)}
  //                   >
  //                     <div className="center midGap">
  //                       <i className="material-symbols-outlined">thumb_up</i>
  //                       <p className="text-m-semibold">Ich bin interessiert</p>
  //                     </div>
  //                   </button>
  //                   <button
  //                     className="secondary medium full"
  //                     type="button"
  //                     onClick={() => changeStatus(talentInfo.matchId, false)}
  //                   >
  //                     <div className="center midGap">
  //                       <i className="material-symbols-outlined">thumb_down</i>
  //                       <p className="text-m-semibold">Kein Interesse</p>
  //                     </div>
  //                   </button>
  //                 </div>
  //               </>
  //             )}

  //           {/* Button to upload contract */}
  //           {talentPreview.companyMatchStatus === 40 &&
  //             (!talentPreview.contract ? (
  //               <div>
  //                 <input
  //                   type="file"
  //                   id="file-upload"
  //                   style={{ display: "none" }}
  //                   accept=".pdf"
  //                   onChange={(e) => handleFileUpload(e)}
  //                 />
  //                 <button
  //                   className="primary medium"
  //                   type="button"
  //                   onClick={() =>
  //                     document.getElementById("file-upload").click()
  //                   }
  //                 >
  //                   <span className="material-symbols-outlined">
  //                     upload_file
  //                   </span>
  //                   Arbeitsvertrag hochladen
  //                 </button>
  //               </div>
  //             ) : (
  //               <div className={styles.contractField}>
  //                 <div className="row center start gap-8">
  //                   <i className="material-symbols-outlined">draft</i>
  //                   <p
  //                     style={{ cursor: "pointer" }}
  //                     className="text-s-medium underline"
  //                     onClick={() =>
  //                       handleDownloadFile(talentPreview.contract.documentId)
  //                     }
  //                   >
  //                     {talentPreview.contract.documentName}
  //                   </p>
  //                 </div>
  //                 <i className="material-symbols-outlined">check_circle</i>
  //               </div>
  //             ))}

  //           {/* Skillset */}
  //           <div className="column minGap">
  //             <h5>Skills</h5>
  //             <div className="column">
  //               {talentInfo.skills.map((item, index) => (
  //                 <div key={index}>
  //                   <p>{item.skillName} </p>
  //                   <p>
  //                     (
  //                     {
  //                       workLevel.filter(
  //                         (workLevel) => workLevel.text === item.skillLevel
  //                       )[0].longDe
  //                     }
  //                     )
  //                   </p>
  //                 </div>
  //               ))}
  //             </div>
  //           </div>
  //           {/* Career */}
  //           {talentInfo.curriculumVitae.workExperience.length > 0 && (
  //             <div className="column minGap">
  //               <div className="row space-between">
  //                 <h5>Berufserfahrung</h5>
  //                 <div
  //                   className="row center end gap-8"
  //                   style={{ color: "var(--petrol-100)" }}
  //                   onClick={() => handleDownloadFile(talentInfo.cvId)}
  //                 >
  //                   <p className="material-symbols-outlined">downloading</p>
  //                   <p className="text-s-medium underline">
  //                     Lebenslauf herunterladen
  //                   </p>
  //                 </div>
  //               </div>
  //               <div className="column">
  //                 {talentInfo.curriculumVitae.workExperience.map(
  //                   (item, index) => (
  //                     <div key={index}>
  //                       <div className="column">
  //                         <div className="row space-between">
  //                           <p className="text-m-semibold">{item.position}</p>
  //                           <p className="text-m-regular">
  //                             {item.startDate} -
  //                             {item.untilToday
  //                               ? " today"
  //                               : ` ${item.finishDate}`}
  //                           </p>
  //                         </div>
  //                         <p className="text-m-regular">{item.companyName}</p>
  //                         <p className="text-m-regular">{item.location}</p>
  //                       </div>
  //                       {talentInfo.curriculumVitae.workExperience.length >
  //                         index + 1 && <hr className={styles.hr} />}
  //                     </div>
  //                   )
  //                 )}
  //               </div>
  //             </div>
  //           )}
  //           {/* Education */}
  //           {talentInfo.curriculumVitae.education.length > 0 && (
  //             <div className="column minGap">
  //               <h5>Ausbildung</h5>
  //               <div className="column">
  //                 {talentInfo.curriculumVitae.education.map((item, index) => (
  //                   <div key={index}>
  //                     <div className="column">
  //                       <div className="row space-between">
  //                         <p className="text-m-semibold">{item.fieldStudy}</p>
  //                         <p className="text-m-regular">
  //                           {item.startDate} -
  //                           {item.untilToday ? " today" : ` ${item.finishDate}`}
  //                         </p>
  //                       </div>
  //                       <p className="text-m-regular">{item.nameUniversity}</p>
  //                       <p className="text-m-regular">
  //                         {item.city}, {item.country}
  //                       </p>
  //                     </div>
  //                     {talentInfo.curriculumVitae.education.length >
  //                       index + 1 && <hr className={styles.hr} />}
  //                   </div>
  //                 ))}
  //               </div>
  //             </div>
  //           )}
  //           {/* apprenticeship */}
  //           {talentInfo.curriculumVitae.education.length > 0 && (
  //             <div className="column minGap">
  //               <h5>Apprenticeship</h5>
  //               <div className="column">
  //                 {talentInfo.curriculumVitae.apprenticeship.map(
  //                   (item, index) => (
  //                     <div key={index}>
  //                       <div className="column">
  //                         <div className="row space-between">
  //                           <p className="text-m-semibold">{item.position}</p>
  //                           {/* <p className="text-m-regular">
  //                             {item.startDate} -
  //                             {item.untilToday
  //                               ? " today"
  //                               : ` ${item.finishDate}`}
  //                           </p> */}
  //                         </div>
  //                         <p className="text-m-regular">
  //                           {item.nameUniversity}
  //                         </p>
  //                       </div>
  //                       {talentInfo.curriculumVitae.apprenticeship.length >
  //                         index + 1 && <hr className={styles.hr} />}
  //                     </div>
  //                   )
  //                 )}
  //               </div>
  //             </div>
  //           )}
  //         </div>

  //         {/* Chat */}
  //         {talentPreview.companyMatchStatus >= 20 && (
  //           <div className={styles.chatWrapper}>
  //             <div
  //               className={styles.selector}
  //               style={{ width: "200px", height: "30px" }}
  //             >
  //               {additionalSectionStatuses.map((item, index) => (
  //                 <div
  //                   key={index}
  //                   className={`${styles.selectorItem} ${
  //                     additionalSectionStatus === index ? styles.active : ""
  //                   }`}
  //                   onClick={() => setAdditionalSectionStatus(index)}
  //                 >
  //                   <p
  //                     className={`${styles.selectorItem} ${
  //                       additionalSectionStatus === index
  //                         ? "text-m-semibold"
  //                         : "text-m-regular"
  //                     }`}
  //                   >
  //                     {item.title}
  //                   </p>
  //                 </div>
  //               ))}
  //             </div>
  //             {additionalSectionStatus === 0 && (
  //               <Chat type={"company"} match={talentPreview} />
  //             )}
  //             {additionalSectionStatus === 1 && (
  //               <div className={styles.notize}>
  //                 {talentPreview.notes.length === 0 ? (
  //                   <div className="center column flexOne">
  //                     <img src={NoMessageImage} style={{ width: "290px" }} />
  //                     <h5>Keine Notizen vorhanden.</h5>
  //                     <p className="center text-s-regular">
  //                       Erstellen Sie Notizen zu Ihren Bewerbern, um den
  //                       Überblick zu behalten und Ihre Entscheidungsfindung zu
  //                       erleichtern
  //                     </p>
  //                   </div>
  //                 ) : (
  //                   <div className={styles.notes}>
  //                     {talentPreview.notes.map((note, index) => (
  //                       <div key={index}>
  //                         <p>{note.content}</p>
  //                         <div className="row space-between">
  //                           <p className="text-xs-regular">
  //                             {formatDateString(note.createdAt)}
  //                           </p>
  //                           <p
  //                             className="text-xs-regular"
  //                             onClick={() => deleteNote(note.noteId)}
  //                           >
  //                             Löschen
  //                           </p>
  //                         </div>
  //                       </div>
  //                     ))}
  //                   </div>
  //                 )}

  //                 <div className="column midGap">
  //                   <div className={styles.inputWrapper}>
  //                     <textarea
  //                       className={styles.chatInput}
  //                       placeholder="Type your message here..."
  //                       value={note}
  //                       onChange={(e) => setNote(e.target.value)}
  //                     />
  //                   </div>
  //                   <button
  //                     className="secondary small full"
  //                     type="button"
  //                     onClick={createNewNote}
  //                   >
  //                     Notiz speichern
  //                   </button>
  //                 </div>
  //               </div>
  //             )}
  //           </div>
  //         )}
  //       </div>
  //     </div>
  //   );
  // };

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

  const getUniqueCombinations = (data) => {
    const uniqueCombinations = [];

    data?.forEach((item) => {
      if (
        !uniqueCombinations.find(
          (uniqueItem) =>
            uniqueItem.id === item.jobOfferId &&
            uniqueItem.name === item.jobTitle
        )
      ) {
        uniqueCombinations.push({
          id: item.jobOfferId,
          name: item.jobTitle,
        });
      }
    });

    return uniqueCombinations;
  };

  const dropdownOptions = [
    "Alle Stellen",
    ...getUniqueCombinations(companyMatch),
  ];

  return (
    <>
      {matchId ? (
        <>{/* <TalentInfo matchId={matchId} /> */}</>
      ) : (
        <>
          <div className="column gap">
            <div>
              <h3>Willkommen, {companyData.contact?.contactName}</h3>
            </div>
            <div className="row " style={{ width: "500px" }}>
              <div>
                <p className="text-m-semibold">Stelle auswählen:</p>
              </div>
              <SimpleDropdown
                options={dropdownOptions}
                defaultValue={"Alle Stellen"}
                onSelect={(value) =>
                  setFilterJobOfferId(
                    typeof value === "object" ? value.id : null
                  )
                }
              />
            </div>

            <div className={styles.selector} style={{ width: "700px" }}>
              {dashboardStatuses.map((item, index) => (
                <div
                  key={index}
                  className={`${styles.selectorItem} ${
                    dashboardStatus === index ? styles.active : ""
                  }`}
                  onClick={() => setDashboardStatus(index)}
                >
                  {item.notificationCount > 0 && (
                    <div className={styles.notification}>
                      <p>{item.notificationCount}</p>
                    </div>
                  )}
                  <div>
                    <p
                      className={` ${
                        dashboardStatus === index
                          ? "text-m-semibold"
                          : "text-m-regular"
                      }`}
                    >
                      {item.title}
                    </p>
                  </div>
                </div>
              ))}
            </div>
            {dashboardStatus === 0 && items && (
              <>
                <KanbanBoard
                  onChangePosition={setMatchPosition}
                  columns={columns}
                  setColumns={setColumns}
                />
              </>
            )}
            {dashboardStatus === 1 && (
              <div className={styles.talentList}>
                {(!filterJobOfferId
                  ? companyMatch?.filter((item) => {
                      const hasUnreadMessages = item.messages.some(
                        (message) =>
                          new Date(message.timestamp) >
                            new Date(item.lastReadMessageTime) &&
                          message.role === "talent"
                      );

                      return hasUnreadMessages;
                    })
                  : companyMatch?.filter((item) => {
                      const hasUnreadMessages = item.messages.some(
                        (message) =>
                          new Date(message.timestamp) >
                            new Date(item.lastReadMessageTime) &&
                          message.role === "talent"
                      );

                      return (
                        item.jobOfferId === filterJobOfferId &&
                        hasUnreadMessages
                      );
                    })
                )?.map((item, index) => (
                  <div key={index} className={styles.talentItem}>
                    <div className="column gap-16">
                      <div className="column gap-8">
                        <p className="text-m-semibold">
                          {item.talentNameSurname}
                        </p>
                        <div className="row gap-4">
                          <p>Beworben für:</p>
                          <p style={{ color: "var(--petrol-100)" }}>
                            {item.jobTitle}
                          </p>
                        </div>
                      </div>
                      <div className="row center space-between">
                        <div className="row center gap-4">
                          <p className="material-symbols-outlined">
                            mark_chat_unread
                          </p>
                          <p>
                            {item.messages.findLast(
                              (message) =>
                                new Date(message.timestamp) >
                                  new Date(item.lastReadMessageTime) &&
                                message.role === "talent"
                            )?.text || ""}
                          </p>
                        </div>
                        <button
                          className="secondary small-icon"
                          type="button"
                          onClick={() =>
                            navigate(`/company-home/match/${item.matchId}`)
                          }
                        >
                          View details
                          <span className="material-symbols-outlined">
                            arrow_forward_ios
                          </span>
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
            {dashboardStatus === 2 && (
              <div className={styles.talentList}>
                {(!filterJobOfferId
                  ? companyMatch?.filter((item) => {
                      const hasInterview = item.acceptedInterview.some(
                        (interview) => new Date(interview.startAt) > new Date()
                      );

                      return hasInterview && item.talentMatchStatus !== 0;
                    })
                  : companyMatch?.filter((item) => {
                      const hasInterview = item.acceptedInterview.some(
                        (interview) => new Date(interview.startAt) > new Date()
                      );

                      return (
                        item.jobOfferId === filterJobOfferId &&
                        item.talentMatchStatus !== 0 &&
                        hasInterview
                      );
                    })
                )?.map((item, index) => (
                  <div key={index} className={styles.talentItem}>
                    <div className="column gap-16">
                      <div className="column gap-8">
                        <p className="text-m-semibold">
                          {item.talentNameSurname}
                        </p>
                        <div className="row gap-4">
                          <p>Beworben für:</p>
                          <p style={{ color: "var(--petrol-100)" }}>
                            {item.jobTitle}
                          </p>
                        </div>
                      </div>
                      <div className="row center space-between">
                        <div className="row center gap-4">
                          <p className="material-symbols-outlined">event</p>
                          <p>
                            {(() => {
                              const timeZone = "Europe/Berlin";
                              const upcomingInterview = item.acceptedInterview
                                .filter(
                                  (interview) =>
                                    new Date(interview.startAt) > new Date()
                                )
                                .sort(
                                  (a, b) =>
                                    new Date(a.startAt) - new Date(b.startAt)
                                )[0];

                              if (upcomingInterview) {
                                const zonedstartAt = toZonedTime(
                                  new Date(upcomingInterview.startAt),
                                  timeZone
                                );
                                const formattedDate = format(
                                  zonedstartAt,
                                  "dd. MMMM yyyy, ",
                                  {
                                    locale: de,
                                  }
                                );

                                const formatter = new Intl.DateTimeFormat(
                                  "en-GB",
                                  {
                                    timeZone: "Europe/Berlin",
                                    hour: "2-digit",
                                    minute: "2-digit",
                                    timeZoneName: "short",
                                  }
                                );

                                const zonedendAt = formatter.format(
                                  new Date(upcomingInterview.endAt)
                                );
                                const formattedTimeRange = `${format(
                                  zonedstartAt,
                                  "HH:mm"
                                )} - ${zonedendAt}`;

                                return (
                                  <>
                                    {formattedDate} {formattedTimeRange}
                                  </>
                                );
                              }

                              return null;
                            })()}
                          </p>
                        </div>
                        <button
                          className="secondary small-icon"
                          type="button"
                          onClick={() =>
                            navigate(`/company-home/match/${item.matchId}`)
                          }
                        >
                          View details
                          <span className="material-symbols-outlined">
                            arrow_forward_ios
                          </span>
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Company Success Manager */}
            <div
              className="content_block gap"
              style={{
                flexDirection: "row",
                alignItems: "center",
                marginTop: "46px",
              }}
            >
              <img
                src={GlobemeeGodImage}
                style={{ width: "64px", height: "64px" }}
              />
              <div className="column">
                <h4 style={{ padding: "0" }}>Christian Schieber</h4>
                <p className="text-s-regular">Company Success Manager</p>
              </div>
              <div className="column">
                <div className="row minGap">
                  <p className="text-m-semibold">Telefon:</p>
                  <a
                    href="tel:+4917698358186"
                    className="text-m-regular"
                    style={{
                      color: "var(--petrol-100)",
                      textDecoration: "none",
                    }}
                  >
                    +49 176 9835 8186
                  </a>
                </div>
                <div className="row minGap">
                  <p className="text-m-semibold">E-Mail:</p>
                  <a
                    href="mailto:christian.schieber@globemee.com"
                    className="text-m-regular"
                    style={{
                      color: "var(--petrol-100)",
                      textDecoration: "none",
                    }}
                  >
                    christian.schieber@globemee.com
                  </a>
                </div>
              </div>
            </div>

            <Modal
              active={modalActive}
              setActive={setModalActive}
              children={modalContent}
              width={modalWidth}
            />
          </div>
        </>
      )}
    </>
  );
}

export default React.memo(CompanyHome);
