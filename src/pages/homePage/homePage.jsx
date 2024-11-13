import React, { useEffect, useState } from "react";
import { useUser } from "../../context/TalentContext/UserContext";
import styles from "./homePage.module.css";
import Modal from "../../components/Modal/Modal";
import axiosInstance from "../../lib/axios/AxiosConfig";
import Language from "../../common/Language";
import workLevel from "../../common/workLevel";
import Chat from "../../components/Chat/Chat";
import { useNavigate, useParams } from "react-router-dom";
import benefitsIcon from "../../common/benefitsIcon";
import ReactPlayer from "react-player";

const HomePage = () => {
  const { userData, setUserData, matchData, setMatchData } = useUser();
  const [jobOfferData, setJobOfferData] = useState(null);
  const [statusPage, setStatusPage] = useState(0);
  const [modalActive, setModalActive] = useState(false);
  const [modalContent, setModalContent] = useState(null);
  const navigate = useNavigate();

  const opentModal = (content) => {
    setModalContent(content);
    setModalActive(true);
  };

  const { matchId } = useParams();
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

  const sendReedMessage = async (matchId) => {
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
  };

  if (!matchData) {
    return <>Loading</>;
  }

  const countNotification = (talentMatchStatus) => {
    let filteredData = matchData.filter(
      (item) => item.talentMatchStatus === talentMatchStatus
    );
    if (filteredData.length > 0) {
      let count = 0;

      filteredData.forEach((item) => {
        const lastRead = new Date(item.lastReadMessageTime);
        const newCompanyMessages = item.messages.filter(
          (message) =>
            message.role === "company" && new Date(message.timestamp) > lastRead
        );

        if (
          item.newJobOffer ||
          item.newMatch ||
          newCompanyMessages.length > 0
        ) {
          count++;
        }
      });
      return count;
    }
    return 0;
  };

  const statusItems = [
    {
      title: "Job opportunities",
      count:
        matchData.filter((item) => item.talentMatchStatus === 1).length || 0,
      notificationCount: countNotification(1),
    },
    {
      title: "Pending",
      count:
        matchData.filter((item) => item.talentMatchStatus === 10).length || 0,
      notificationCount: countNotification(10),
    },
    {
      title: "Matches",
      count:
        matchData.filter((item) => item.talentMatchStatus === 20).length || 0,
      notificationCount: countNotification(20),
    },
    {
      title: "Interviews",
      count:
        matchData.filter((item) => item.talentMatchStatus === 30).length || 0,
      notificationCount: countNotification(30),
    },
    {
      title: "Rejected",
      count:
        matchData.filter((item) => item.talentMatchStatus === 0).length || 0,
      // notificationCount: countNotification(0),
    },
  ];

  const jobOfferItems = [
    { title: "Job details" },
    { title: "Company details" },
  ];

  const JobCard = ({ item }) => {
    const lastCompanyMessage = item.messages
      .filter((message) => message.role === "company")
      .pop();

    return (
      <div className={styles.jobBox}>
        <div className="column" style={{ gap: "24px" }}>
          <div className="column" style={{ gap: "12px" }}>
            <div className="row start center">
              <p className="text-m-semibold">{item.jobTitle}</p>

              {item.newJobOffer && (
                <div className={styles.tag}>
                  <i
                    className="material-symbols-outlined"
                    style={{ fontSize: "16px" }}
                  >
                    work
                  </i>
                  <p className="text-xs-medium">New job offer</p>
                </div>
              )}
              {item.newMatch && (
                <div className={styles.tag}>
                  <i
                    className="material-symbols-outlined"
                    style={{ fontSize: "16px" }}
                  >
                    join_inner
                  </i>
                  <p className="text-xs-medium">New match</p>
                </div>
              )}
              {lastCompanyMessage?.timestamp &&
                new Date(item.lastReadMessageTime) <
                  new Date(lastCompanyMessage.timestamp) && (
                  <div className={styles.tag}>
                    <i
                      className="material-symbols-outlined"
                      style={{ fontSize: "16px" }}
                    >
                      mark_chat_unread
                    </i>
                    <p className="text-xs-medium">New message</p>
                  </div>
                )}
            </div>
            <div className="row minGap">
              {item.type && (
                <div className={styles.short}>
                  <p className="text-xs-medium">{item.type}</p>
                </div>
              )}
              {item.industry && (
                <div className={styles.short}>
                  <p className="text-xs-medium">{item.industry}</p>
                </div>
              )}
              {item.employeesNumber && (
                <div className={styles.short}>
                  <p className="text-xs-medium">
                    {item.employeesNumber} employees
                  </p>
                </div>
              )}
            </div>
          </div>
          <div className="row space-between center">
            <div className="column minGap">
              <div className="row start" style={{ gap: "24px" }}>
                {item.location && (
                  <div className="center minGap">
                    <i
                      className="material-symbols-outlined"
                      style={{ color: "var(--yellow-100)" }}
                    >
                      location_on
                    </i>
                    <p className="text-s-regular">{item.location}</p>
                  </div>
                )}
                {item.startDate && (
                  <div className="center minGap">
                    <i
                      className="material-symbols-outlined"
                      style={{ color: "var(--yellow-100)" }}
                    >
                      calendar_today
                    </i>
                    <p className="text-s-regular">{item.startDate}</p>
                  </div>
                )}
                <div className="center minGap">
                  <i
                    className="material-symbols-outlined"
                    style={{ color: "var(--yellow-100)" }}
                  >
                    language
                  </i>
                  {item.language.map((value, index) => (
                    <div key={index}>
                      <p className="text-s-regular">
                        {value.language}{" "}
                        {
                          Language.filter(
                            (lang) => lang.level === value.level
                          )[0].short
                        }
                        {index < item.language.length - 1 && `,`}
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
                  {item.salary === 0
                    ? "trending_down"
                    : item.salary === 1
                    ? "target"
                    : "trending_up"}
                </i>
                <p className="text-s-regular">
                  {item.salary === 0
                    ? "Below your desired salary"
                    : item.salary === 1
                    ? "Matches your desired salary"
                    : "Above your desired salary"}
                </p>
              </div>
            </div>
            <div>
              <button
                className="secondary medium"
                onClick={() => {
                  navigate(`/talent-home/match/${item.matchId}`);
                  // setJobOfferData(null);
                  // setJobOfferPreview(item);
                  // setMatchId(item.matchId);
                  // setJobOfferVision(true);
                }}
                disabled={item.talentMatchStatus === 0}
              >
                Check job offer
                <i className="material-symbols-outlined">arrow_forward_ios</i>
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const EmptyStatusContent = ({ status }) => {
    return (
      <div className={styles.jobBox}>
        <div className={styles.message}>
          {status === 0 && (
            <>
              <p className="text-m-semibold">
                No job opportunities that match your profile.
              </p>
              <div className="column">
                <p className="text-s-regular">
                  We will notify you as soon as we have found a potential job
                  for you.
                </p>
                <p className="text-s-regular">
                  In the meantime, why not take a look at our blog to find out
                  more about (working) life in Germany?
                </p>
              </div>
              <button
                type="button"
                className="secondary medium"
                onClick={() =>
                  window.open(
                    `https://globemee.com/en/category/talent-en/`,
                    "_blank",
                    "noopener,noreferrer"
                  )
                }
              >
                Visit blog
              </button>
            </>
          )}
          {status === 1 && (
            <>
              <p className="text-m-semibold">
                You have currently no pending job offers.
              </p>
              <div className="column">
                <p className="text-s-regular">
                  Visit the job opportunities tab and see if there are any new
                  opportunities.
                </p>
                <p className="text-s-regular">
                  If there is a job that interests you, mark your interest so
                  that it appears here.
                </p>
              </div>
            </>
          )}
          {status === 2 && (
            <>
              <p className="text-m-semibold">You have currently no matches</p>
              <div className="column">
                <p className="text-s-regular">
                  A match will appear as soon as a company is interested in your
                  profile.
                </p>
              </div>
            </>
          )}
          {status === 3 && (
            <>
              <p className="text-m-semibold">
                You currently have no interview appointments
              </p>
              <div className="column">
                <p className="text-s-regular">
                  Once you have arranged an interview with a company, you will
                  find all the information here.
                </p>
              </div>
            </>
          )}
          {status === 4 && (
            <>
              <p className="text-m-semibold">No rejected job applications</p>
              <div className="column">
                <p className="text-s-regular">
                  If a company decides against you, you can find these jobs here
                </p>
              </div>
            </>
          )}
        </div>
      </div>
    );
  };

  const InfoFirstJob = () => {
    return (
      <div className={styles.infoCard}>
        <div className="row midGap">
          <i className="material-symbols-outlined">info</i>
          <div className="column ">
            <p className="text-m-semibold">
              The job openings listed here are suggestions only.
            </p>
            <p className="text-s-regular">
              Please check out the job offers and hit the “I’m interested”
              button on the job offer’s page.
            </p>
            <p className="text-s-regular">
              Then your profile will be shared with the company and in case the
              company is interested in you too, this card will be moved to the
              Matches tab.
            </p>
          </div>
        </div>
        <div
          className={styles.closeBtn}
          onClick={() => disableDescription("jobOpportunities")}
        >
          <span className="material-symbols-outlined">close</span>
        </div>
      </div>
    );
  };

  const InfoFirstPending = () => {
    return (
      <div className={styles.infoCard}>
        <div className="row midGap">
          <i className="material-symbols-outlined">info</i>
          <div className="column ">
            <p className="text-m-semibold">
              Your profile is currently being reviewed by the companies.
            </p>
            <p className="text-s-regular">
              If an employer is interested in you, we will notify you and the
              position will appear in the Matches tab.
            </p>
          </div>
        </div>
        <div
          className={styles.closeBtn}
          onClick={() => disableDescription("pending")}
        >
          <span className="material-symbols-outlined">close</span>
        </div>
      </div>
    );
  };

  const changeStatus = async (id, status) => {
    try {
      const response = await axiosInstance.post(
        `t_match/${id}/interested`,
        {
          interested: status,
        },
        {
          notification: {
            succesMessage: status
              ? "The job has been moved to the Pending tab."
              : "The job has been hidden",
          },
        }
      );
      if (status === false) {
        setMatchData((prevData) =>
          prevData.filter((match) => match.matchId !== id)
        );
        // setJobOfferVision(false);
        setModalActive(false);
      } else {
        setMatchData((prevData) =>
          prevData.map((match) =>
            match.matchId === id
              ? { ...match, talentMatchStatus: response.data.talentMatchStatus }
              : match
          )
        );
        // setJobOfferPreview((prevData) => ({
        //   ...prevData,
        //   talentMatchStatus: response.data.talentMatchStatus,
        // }));
      }
    } catch (error) {}
  };

  const JobOfferPage = () => {
    const [jobPage, setJobPage] = useState(0);
    const [jobOfferPreview, setJobOfferPreview] = useState(
      matchData.find((match) => match.matchId === matchId)
    );

    useEffect(() => {
      if (jobOfferPreview) {
        setJobOfferPreview(
          matchData.find((match) => match.matchId === jobOfferPreview.matchId)
        );
      }
    }, [matchData]);

    if (!jobOfferData) {
      return <>Loading...</>;
    }

    return (
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
              <div className="row gap-16 center start">
                <img src={jobOfferPreview.logo} className={styles.logo} />
                <p className="text-s-medium">{jobOfferPreview.companyName}</p>
              </div>
              <h4>{jobOfferPreview.jobTitle}</h4>
              <div className="row minGap">
                <div className={styles.short}>
                  <p className="text-xs-medium">{jobOfferPreview.type}</p>
                </div>
                <div className={styles.short}>
                  <p className="text-xs-medium">{jobOfferPreview.industry}</p>
                </div>
                <div className={styles.short}>
                  <p className="text-xs-medium">
                    {jobOfferPreview.employeesNumber} employees
                  </p>
                </div>
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
                  >
                    <div className="center midGap">
                      <i className="material-symbols-outlined">thumb_up</i>
                      <p className="text-m-semibold">I’m interested</p>
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
                {jobOfferData.jobDescription && (
                  <div className="column minGap">
                    <h5>Job description</h5>
                    <p>{jobOfferData.jobDescription}</p>
                  </div>
                )}
                {/* Skillset */}
                {jobOfferData.skills.length > 0 && (
                  <div className="column minGap">
                    <h5>Your skillset</h5>
                    <div className="column">
                      {jobOfferData.skills.map((item, index) => (
                        <div key={index}>
                          <p>{item.skillName} </p>
                          <p>
                            (
                            {
                              workLevel.filter(
                                (workLevel) =>
                                  workLevel.text === item.skillLevel
                              )[0].longEn
                            }
                            )
                          </p>
                        </div>
                      ))}
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
                {jobOfferData.intro && (
                  <div className="column minGap">
                    <h5>Intro</h5>
                    <p>{jobOfferData.intro}</p>
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
                    <div className="row gap">
                      {jobOfferData.values.map((item, index) => (
                        <div className={styles.itemList} key={index}>
                          <p className="text-m-semibold">{item}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Media */}
                {jobOfferData.videos.length > 0 && (
                  <div className="column minGap">
                    <h5>Media</h5>
                    <div className={styles.video_list}>
                      {jobOfferData.videos.map((item, index) => (
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
    );
  };

  const disableDescription = async (tagName = "jobOpportunities") => {
    try {
      await axiosInstance.post(`t_common/disable_tab_description`, {
        [tagName]: false,
      });

      setUserData((prevData) => ({
        ...prevData,
        meta: {
          ...prevData.meta,
          tabsDescriptionEnable: {
            ...prevData.meta.tabsDescriptionEnable,
            [tagName]: false,
          },
        },
      }));
    } catch (error) {}
  };

  return (
    <>
      {matchId ? (
        <>
          <JobOfferPage matchId={matchId} />
        </>
      ) : (
        <>
          <h3>Job overview</h3>

          <div className={styles.selector}>
            {statusItems.map((item, index) => (
              <div
                key={index}
                className={`${styles.selectorItem} ${
                  statusPage === index ? styles.active : ""
                }`}
                onClick={() => setStatusPage(index)}
              >
                {item.notificationCount > 0 && (
                  <div className={styles.notification}>
                    <p>{item.notificationCount}</p>
                  </div>
                )}
                <div>
                  <p
                    className={` ${
                      statusPage === index
                        ? "text-m-semibold"
                        : "text-m-regular"
                    }`}
                  >
                    {item.title} ({item.count})
                  </p>
                </div>
              </div>
            ))}
          </div>

          {statusPage === 0 && (
            <>
              {userData?.meta?.tabsDescriptionEnable?.jobOpportunities && (
                <InfoFirstJob />
              )}
              {statusItems[0].count === 0 ? (
                <EmptyStatusContent status={statusPage} />
              ) : (
                <>
                  <div className={styles.jobOfferList}>
                    {matchData
                      .filter((item) => item.talentMatchStatus === 1)
                      .map((item, index) => (
                        <JobCard key={index} item={item} />
                      ))}
                  </div>
                </>
              )}
            </>
          )}
          {statusPage === 1 && (
            <>
              {userData?.meta?.tabsDescriptionEnable?.pending && (
                <InfoFirstPending />
              )}
              {statusItems[1].count === 0 ? (
                <EmptyStatusContent status={statusPage} />
              ) : (
                <>
                  <div className={styles.jobOfferList}>
                    {matchData
                      .filter((item) => item.talentMatchStatus === 10)
                      ?.map((item, index) => (
                        <JobCard key={index} item={item} />
                      ))}
                  </div>
                </>
              )}
            </>
          )}
          {statusPage === 2 && (
            <>
              {/* {userData?.meta?.tabsDescriptionEnable?.matches && (
                <InfoFirstMatches />
              )} */}
              {statusItems[2].count === 0 ? (
                <EmptyStatusContent status={statusPage} />
              ) : (
                <>
                  <div className={styles.jobOfferList}>
                    {matchData
                      .filter(
                        (filterItem) => filterItem.talentMatchStatus === 20
                      )
                      .map((filterMapItem, index) => (
                        <JobCard key={index} item={filterMapItem} />
                      ))}
                  </div>
                </>
              )}
            </>
          )}
          {statusPage === 3 && (
            <>
              {/* {userData?.meta?.tabsDescriptionEnable?.interviews && (
                <InfoFirstInterviews />
              )} */}
              {statusItems[3].count === 0 ? (
                <EmptyStatusContent status={statusPage} />
              ) : (
                <>
                  <div className={styles.jobOfferList}>
                    {matchData
                      .filter(
                        (filterItem) => filterItem.talentMatchStatus === 30
                      )
                      .map((filterMapItem, index) => (
                        <JobCard key={index} item={filterMapItem} />
                      ))}
                  </div>
                </>
              )}
            </>
          )}
          {statusPage === 4 && (
            <>
              {/* {userData?.meta?.tabsDescriptionEnable?.rejected && (
                <InfoFirstRejected />
              )} */}
              {statusItems[4].count === 0 ? (
                <EmptyStatusContent status={statusPage} />
              ) : (
                <>
                  <div className={styles.jobOfferList}>
                    {matchData
                      .filter(
                        (filterItem) => filterItem.talentMatchStatus === 0
                      )
                      ?.map((filterMapItem, index) => (
                        <JobCard key={index} item={filterMapItem} />
                      ))}
                  </div>
                </>
              )}
            </>
          )}
        </>
      )}

      <Modal
        active={modalActive}
        setActive={setModalActive}
        children={modalContent}
        width={"448px"}
      />
    </>
  );
};

export default HomePage;
