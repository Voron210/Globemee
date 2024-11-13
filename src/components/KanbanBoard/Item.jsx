import React from "react";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import styles from "./Item.module.css";
import Language from "../../common/Language";
import { useNavigate } from "react-router-dom";
import { format } from "date-fns";

//   {
//     "companyMatchPosition": 2,
//     "companyMatchStatus": 10,
//     "contract": null,
//     "interviews": [],
//     "jobTitle": "Backend-Entwickler/-in",
//     "language": [
//         {
//             "language": "Englisch",
//             "level": "4",
//             "reviewedLevel": "0"
//         },
//         {
//             "language": "Deutsch",
//             "level": "2",
//             "reviewedLevel": "0"
//         }
//     ],
//     "matchId": "6c34c9fd-3b61-46a9-9bc2-47dc6ec782ef",
//     "newMessage": false,
//     "notes": [],
//     "talentMatchStatus": 0,
//     "talentNameSurname": "savinesav@gmail.com savinesav@gmail.com",
//     "id": "6c34c9fd-3b61-46a9-9bc2-47dc6ec782ef"
// }

const Item = ({ id, content, style, onItemClick, role }) => {
  const navigate = useNavigate();
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id });

  const combinedStyle = {
    transform: CSS.Transform.toString(transform),
    transition,
    ...style,
  };

  return (
    <div
      ref={setNodeRef}
      style={combinedStyle}
      {...attributes}
      {...listeners}
      className={`${styles.item} ${isDragging ? styles.dragging : ""}`}
      onClick={() =>
        role !== "admin" && navigate(`/company-home/match/${content.id}`)
      }
    >
      <div className="column gap-16 ellipsis">
        <p className="text-xs-regular">{content.jobTitle}</p>
        <div className="column gap-8">
          <p className="text-m-semibold">{content.talentNameSurname}</p>
          <div className="row minGap">
            {content?.language?.map((item, index) => (
              <div
                key={index}
                style={{
                  display: "flex",
                  height: "20px",
                  padding: "0 8px",
                  border: "1px solid var(--grey-20)",
                  borderRadius: "4px",
                  boxSizing: "border-box",
                  alignItems: "center",
                }}
              >
                <p className="text-xxs" style={{ whiteSpace: "nowrap" }}>
                  {item.language}{" "}
                  {
                    Language.filter((lang) => lang.level === item.level)[0]
                      .short
                  }
                </p>
              </div>
            ))}
          </div>
        </div>
        {(content.notes.length > 0 ||
          content.acceptedInterview.length > 0 ||
          (content.messages.length > 0 &&
            content.messages.some(
              (message) =>
                new Date(message.timestamp) >
                  new Date(content.lastReadMessageTime) &&
                message.role === "talent"
            ))) && (
          <div className="column gap-8">
            <hr style={{ borderBottom: "1px solid var(--grey-100)" }} />
            <div className={styles.tagList}>
              {content.messages.length > 0 &&
                content.messages.some(
                  (message) =>
                    new Date(message.timestamp) >
                      new Date(content.lastReadMessageTime) &&
                    message.role === "talent"
                ) && (
                  <div className={`${styles.tag} ${styles.red}`}>
                    <span className="material-symbols-outlined">
                      mark_chat_unread
                    </span>
                    <p className="text-xxs">Neue Nachricht</p>
                  </div>
                )}

              {content.acceptedInterview.length > 0 &&
                (() => {
                  const now = new Date();
                  let interviewDate = null;
                  let next = false;

                  const futureInterviews = content.acceptedInterview.filter(
                    (interview) => new Date(interview.startAt) > now
                  );

                  if (futureInterviews.length > 0) {
                    interviewDate = futureInterviews.reduce((prev, curr) =>
                      new Date(prev.startAt) < new Date(curr.startAt)
                        ? prev
                        : curr
                    ).startAt;
                    next = true;
                  } else {
                    const pastInterviews = content.acceptedInterview.filter(
                      (interview) => new Date(interview.startAt) <= now
                    );

                    if (pastInterviews.length > 0) {
                      interviewDate = pastInterviews.reduce((prev, curr) =>
                        new Date(prev.startAt) > new Date(curr.startAt)
                          ? prev
                          : curr
                      ).startAt;
                    }
                  }

                  return interviewDate ? (
                    <div className={`${styles.tag} ${next && styles.green}`}>
                      <span className="material-symbols-outlined">event</span>
                      <p className="text-xxs">
                        {format(new Date(interviewDate), "dd.MM.yyyy")}
                      </p>
                    </div>
                  ) : null;
                })()}

              {content.notes.length > 0 && (
                <div className={styles.tag}>
                  <span className="material-symbols-outlined  ">edit_note</span>
                  <p className="text-xxs">
                    {content.notes.length}{" "}
                    {content.notes.length > 1 ? "Notizen" : "Notiz"}
                  </p>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Item;
