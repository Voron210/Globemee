import React, { useEffect, useState } from "react";
import { useUser } from "../../context/TalentContext/UserContext";
import styles from "./CompanyOverview.module.css";
import Modal from "../../components/Modal/Modal";
import axiosInstance from "../../lib/axios/AxiosConfig";
import Language from "../../common/Language";
import workLevel from "../../common/workLevel";
import Chat from "../../components/Chat/Chat";
import { useNavigate, useParams } from "react-router-dom";
import benefitsIcon from "../../common/benefitsIcon";
import { CircularProgress } from "@mui/material";
import ErrorBoundary from "../../components/ErrorBoundary/ErrorBoundary";
// import YouTube from "react-youtube";
import ReactPlayer from "react-player";

const CompanyOverview = () => {
  const navigate = useNavigate();
  const { matchData, setMatchData } = useUser();
  const [jobOfferData, setJobOfferData] = useState(null);
  const [jobPage, setJobPage] = useState(0);
  const [jobOfferPreview, setJobOfferPreview] = useState();
  const { matchId } = useParams();
  const [modalActive, setModalActive] = useState(false);
  const [modalContent, setModalContent] = useState(null);
  const [companyPhotos, setCompanyPhotos] = useState([]);
  // const [loadedPhotos, setLoadedPhotos] = useState([]);
  const [photolist, setPhotolist] = useState([]);
  // const [videoList, setVideoList] = useState([]);

  const opentModal = (content) => {
    setModalContent(content);
    setModalActive(true);
  };

  useEffect(() => {
    if (matchData) {
      setJobOfferPreview(matchData.find((match) => match.matchId === matchId));
    }
  }, [matchData]);

  useEffect(() => {
    if (matchId && matchData && !jobOfferData) {
      if (matchData.find((matchItem) => matchItem.matchId === matchId)) {
        getMatch(matchId);
      } else {
        navigate("/talent-home");
      }
    }
  }, [matchId, matchData]);

  const getMatch = async (matchId) => {
    try {
      let response = await axiosInstance.get(`t_match/${matchId}`);
      setJobOfferData(response.data);
      setCompanyPhotos(response.data.photos);
    } catch (error) {}
  };

  useEffect(() => {
    if (matchId) {
      sendReedMessage(matchId);

      setMatchData((prevData) =>
        prevData?.map((match) =>
          match.matchId === matchId
            ? {
                ...match,
                newJobOffer: false,
                newMatch: false,
              }
            : match
        )
      );
    }
  }, [matchId]);

  useEffect(() => {
    if (companyPhotos?.length > 0 && photolist.length === 0) {
      setPhotolist(companyPhotos);
      // console.log("photos");
      companyPhotos.forEach((item) => {
        getPhoto(item.documentId);
      });
    }
    // if (videoList.length === 0) {
    //   jobOfferData?.videos?.forEach((item) =>
    //     setVideoList((prevdata) => [...prevdata, getYouTubeVideoId(item)])
    //   );
    // }
  }, [jobOfferData]);

  const getPhoto = async (id) => {
    try {
      let response = await axiosInstance.get(
        `/file/match/${id}?matchId=${matchId}`,
        {
          headers: {
            role: "talent",
          },
          responseType: "blob",
        }
      );

      const url = window.URL.createObjectURL(new Blob([response.data]));
      setCompanyPhotos((prevPhotos) =>
        prevPhotos.map((photo) =>
          photo.documentId === id ? { ...photo, url } : photo
        )
      );
    } catch (error) {
      return null;
    }
  };

  const sendReedMessage = async (matchId) => {
    try {
      let response = await axiosInstance.post(
        `/t_match/${matchId}/read_message_time`
      );

      setMatchData((prevData) =>
        prevData?.map((match) =>
          match.matchId === matchId
            ? {
                ...match,
                lastReadMessageTime: response.data.lastReadMessageTime,
              }
            : match
        )
      );
    } catch (error) {}
  };

  if (!jobOfferData) {
    return <>Loading...</>;
  }

  const handleDownloadFile = async (id) => {
    try {
      const response = await axiosInstance.get(
        `/file/match/${id}?matchId=${matchId}`,
        {
          headers: {
            role: "talent",
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

  const jobOfferItems = [
    { title: "Job details" },
    { title: "Company details" },
  ];

  // const opts = {
  //   height: "100%",
  //   width: "100%",
  //   playerVars: {
  //     // autoplay: 1,
  //     controls: 1,
  //   },
  // };

  // function getYouTubeVideoId(url) {
  //   try {
  //     // console.log("qweqwe");
  //     const urlObj = new URL(url);
  //     return urlObj.searchParams.get("v");
  //   } catch (e) {
  //     console.error("Invalid URL", e);
  //     return null;
  //   }
  // }

  const changeStatus = async (id, status) => {
    try {
      const response = await axiosInstance.post(
        `t_match/${id}/interested`,
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

      if (status === false) {
        setMatchData((prevData) =>
          prevData.filter((match) => match.matchId !== id)
        );
        setModalActive(false);
        navigate("/talent-home");
      } else {
        setMatchData((prevData) =>
          prevData.map((match) =>
            match.matchId === id
              ? { ...match, talentMatchStatus: response.data.talentMatchStatus }
              : match
          )
        );
      }
    } catch (error) {}
  };

  return (
    <>
      <div className={styles.jobOfferPage}>
        <button
          type="button"
          onClick={() => {
            navigate(`/talent-home`);
          }}
        >
          <i className="material-symbols-outlined">arrow_back_ios</i>
          Back to job overview
        </button>
        <div className={styles.jobOfferWrapper}>
          <div className={`${styles.jobOfferInfo} ${styles.leftBorder}`}>
            {/* General information */}
            <div className="column" style={{ gap: "24px" }}>
              {jobOfferPreview.logo && (
                <div className="row gap-16 center start">
                  <img src={jobOfferPreview.logo} className={styles.logo} />
                  <p className="text-s-medium">{jobOfferPreview.companyName}</p>
                </div>
              )}
              <h4>{jobOfferPreview.jobTitle}</h4>
              <div className="row minGap">
                {jobOfferPreview.type && (
                  <div className={styles.short}>
                    <p className="text-xs-medium">{jobOfferPreview.type}</p>
                  </div>
                )}
                {jobOfferPreview.industry && (
                  <div className={styles.short}>
                    <p className="text-xs-medium">{jobOfferPreview.industry}</p>
                  </div>
                )}
                {jobOfferPreview.employeesNumber && (
                  <div className={styles.short}>
                    <p className="text-xs-medium">
                      {jobOfferPreview.employeesNumber} employees
                    </p>
                  </div>
                )}
              </div>

              <div className="column minGap">
                <div className="row start" style={{ gap: "24px" }}>
                  {jobOfferPreview.location && (
                    <div className="center minGap">
                      <i
                        className="material-symbols-outlined"
                        style={{ color: "var(--yellow-100)" }}
                      >
                        location_on
                      </i>
                      <p className="text-s-regular">
                        {jobOfferPreview.location}
                      </p>
                    </div>
                  )}
                  {jobOfferPreview.startDate && (
                    <div className="center minGap">
                      <i
                        className="material-symbols-outlined"
                        style={{ color: "var(--yellow-100)" }}
                      >
                        calendar_today
                      </i>
                      <p className="text-s-regular">
                        {jobOfferPreview.startDate}
                      </p>
                    </div>
                  )}
                  <div className="center minGap">
                    <i
                      className="material-symbols-outlined"
                      style={{ color: "var(--yellow-100)" }}
                    >
                      language
                    </i>
                    {jobOfferPreview.language.map((value, index) => (
                      <div key={index}>
                        <p className="text-s-regular">
                          {value.language}{" "}
                          {
                            Language.filter(
                              (lang) => lang.level === value.level
                            )[0].short
                          }
                          {index < jobOfferPreview.language.length - 1 && `,`}
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
                    {jobOfferPreview.salary === 0
                      ? "trending_down"
                      : jobOfferPreview.salary === 1
                      ? "target"
                      : "trending_up"}
                  </i>
                  <p className="text-s-regular">
                    {jobOfferPreview.salary === 0
                      ? "Below your desired salary"
                      : jobOfferPreview.salary === 1
                      ? "Matches your desired salary"
                      : "Above your desired salary"}
                  </p>
                </div>
              </div>
            </div>

            {/* Button to match */}
            {jobOfferPreview.talentMatchStatus === 1 && (
              <>
                <div className="row gap">
                  <button
                    className="primary medium full"
                    type="button"
                    onClick={() => changeStatus(jobOfferPreview.matchId, true)}
                    style={{ color: "white" }}
                  >
                    <div className="center midGap">
                      <i className="material-symbols-outlined">thumb_up</i>
                      <p style={{ color: "white" }} className="text-m-semibold">
                        I’m interested
                      </p>
                    </div>
                  </button>
                  <button
                    className="secondary medium full"
                    type="button"
                    onClick={() =>
                      opentModal(
                        <div className="column gap">
                          <div className="column minGap">
                            <h5>Not interested?</h5>
                            <p>You will not be offered the job again.</p>
                          </div>
                          <div className="row midGap end">
                            <button
                              type="button"
                              className="secondary small"
                              onClick={() => setModalActive(false)}
                            >
                              Cancel
                            </button>
                            <button
                              type="button"
                              className="primary small"
                              onClick={() =>
                                changeStatus(jobOfferPreview.matchId, false)
                              }
                            >
                              Confirm
                            </button>
                          </div>
                        </div>
                      )
                    }
                  >
                    <div className="center midGap">
                      <i className="material-symbols-outlined">thumb_down</i>
                      <p className="text-m-semibold">I’m not interested</p>
                    </div>
                  </button>
                </div>
              </>
            )}

            {/* CONTRACT */}
            {jobOfferData?.contract?.documentId && (
              <div className={styles.contractField}>
                <div className="row center start gap-8">
                  <i className="material-symbols-outlined">draft</i>
                  <p
                    style={{ cursor: "pointer" }}
                    className="text-s-medium underline"
                    onClick={() =>
                      handleDownloadFile(jobOfferData.contract.documentId)
                    }
                  >
                    {jobOfferData?.contract?.documentName}
                  </p>
                </div>
                <i className="material-symbols-outlined">check_circle</i>
              </div>
            )}

            {jobOfferPreview.talentMatchStatus >= 20 && (
              <>
                <div
                  className={styles.selector}
                  style={{ width: "300px", margin: "0" }}
                >
                  {jobOfferItems.map((item, index) => (
                    <div
                      key={index}
                      className={`${styles.selectorItem} ${
                        jobPage === index ? styles.active : ""
                      }`}
                      onClick={() => setJobPage(index)}
                    >
                      <p
                        className={`${styles.selectorItem} ${
                          jobPage === index
                            ? "text-m-semibold"
                            : "text-m-regular"
                        }`}
                      >
                        {item.title}
                      </p>
                    </div>
                  ))}
                </div>
              </>
            )}

            {jobPage === 0 && (
              <>
                {/* Job description */}
                {/* {jobOfferData.jobDescription && (
                  <div className="column minGap">
                    <h5>Job description</h5>
                    <p
                      style={{
                        wordBreak: "break-word", // Разбивает слова при переполнении
                        whiteSpace: "pre-wrap", // Сохраняет пробелы и разрывы строк
                      }}
                    >
                      {jobOfferData.jobDescription}
                    </p>
                  </div>
                )} */}

                {jobOfferData.manualInput && (
                  <div className="column minGap">
                    <h5>Job description</h5>
                    <p
                      style={{
                        wordBreak: "break-word", // Разбивает слова при переполнении
                        whiteSpace: "pre-wrap", // Сохраняет пробелы и разрывы строк
                      }}
                    >
                      {jobOfferData.manualInput}
                    </p>
                  </div>
                )}
                {/* Skillset */}
                {jobOfferData.skills.length > 0 && (
                  <div className="column minGap">
                    <h5>Your skillset</h5>
                    {/* <div className="column">
                      {jobOfferData?.skills.length > 0 &&
                        jobOfferData?.skills?.map((item, index) => (
                          <div key={index}>
                            <p>{item.skillName} </p>
                            <p>
                              (
                              {
                                workLevel?.filter(
                                  (workLevel) =>
                                    workLevel.text === item.skillLevel
                                )[0].longEn
                              }
                              )
                            </p>
                          </div>
                        ))}
                    </div> */}
                    <div className="column">
                      {jobOfferData?.skills?.length > 0 &&
                        jobOfferData.skills.map((item, index) => {
                          const matchingWorkLevel = workLevel?.find(
                            (level) => level.text === item.skillLevel
                          );

                          return (
                            <div key={index}>
                              <p>
                                {item.skillName || "No skill name provided"}{" "}
                              </p>
                              <p>
                                {matchingWorkLevel
                                  ? `(${matchingWorkLevel.longEn})`
                                  : ""}
                              </p>
                            </div>
                          );
                        })}
                    </div>
                  </div>
                )}
                {/* benefits */}
                {jobOfferPreview.talentMatchStatus >= 20 &&
                  jobOfferData.benefits.length > 0 && (
                    <div className="column minGap">
                      <h5>Your benefits</h5>
                      <div className="column gap">
                        {jobOfferData.benefits.map((item, index) => (
                          <div key={index}>
                            <div
                              className="row gap-8"
                              style={{ color: "var(--petrol-100)" }}
                            >
                              <i className="material-symbols-outlined">
                                {benefitsIcon.find(
                                  (benefit) =>
                                    benefit.nameEn === item.benefitName
                                )?.icon || "default_icon"}
                              </i>
                              <p>{item.benefitName}</p>
                            </div>
                            <p>{item.benefitDescription}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
              </>
            )}

            {jobPage === 1 && (
              <>
                {/* Intro */}
                {jobOfferData.briefIntroduction && (
                  <div className="column minGap">
                    <h5>Intro</h5>
                    <p
                      style={{
                        wordBreak: "break-word", // Разбивает слова при переполнении
                        whiteSpace: "pre-wrap", // Сохраняет пробелы и разрывы строк
                      }}
                    >
                      {jobOfferData.briefIntroduction}
                    </p>
                  </div>
                )}
                {jobOfferData.website && (
                  <div
                    className="row center start"
                    style={{
                      color: "var(--petrol-100)",
                      cursor: "pointer",
                    }}
                    onClick={() =>
                      window.open(
                        jobOfferData.website,
                        "_blank",
                        "noopener,noreferrer"
                      )
                    }
                  >
                    <p style={{ textDecoration: "underline" }}>
                      {jobOfferData.website}
                    </p>
                    <span
                      className="material-symbols-outlined"
                      style={{ fontSize: "20px" }}
                    >
                      north_east
                    </span>
                  </div>
                )}
                {jobOfferData.values && (
                  <div className="column minGap">
                    <h5>Company values</h5>
                    <div className={styles.corpList}>
                      {jobOfferData.values.map((item, index) => (
                        <div className={styles.itemList} key={index}>
                          <p className="text-m-semibold">{item}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Media */}
                {(jobOfferData.videos.length > 0 ||
                  companyPhotos.length > 0) && (
                  <div className="column gap-16">
                    <h5>Media</h5>
                    <div className={styles.photoList}>
                      {companyPhotos.map((item, index) => (
                        <div className={styles.photoContainer} key={index}>
                          {item.url && (
                            <img
                              src={item.url}
                              className={styles.photo}
                              alt={`Company Photo ${index + 1}`}
                            />
                          )}
                          {!item.url && (
                            <div className={styles.photoPlace}>
                              <CircularProgress />
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                    <div className={styles.video_list}>
                      {jobOfferData?.videos?.map((item, index) => (
                        <div
                          key={index}
                          className={styles.video_item}
                          onClick={(e) => e.stopPropagation()}
                        >
                          <ReactPlayer
                            url={item}
                            light
                            playing
                            controls
                            width="100%"
                            height="100%"
                          />
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </>
            )}
          </div>

          {/* Chat */}
          {jobOfferPreview.talentMatchStatus >= 20 && (
            <>
              <div className={styles.chatWrapper}>
                <h5>Chat</h5>
                <Chat type={"talent"} match={jobOfferPreview} />
              </div>
            </>
          )}
        </div>
      </div>

      <Modal
        active={modalActive}
        setActive={setModalActive}
        children={modalContent}
        width={"448px"}
      />
    </>
  );
};

export default CompanyOverview;
