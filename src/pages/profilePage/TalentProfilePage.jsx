import React, { useEffect, useRef, useState } from "react";
import { useUser } from "../../context/TalentContext/UserContext";
import Modal from "../../components/Modal/Modal";
import FormWrapper from "../../components/FormWrapper/FormWrapper";
import axiosInstance from "../../lib/axios/AxiosConfig";
import WorkExperience from "../../components/TalentForms/WorkExperience";
import EducationExperience from "../../components/TalentForms/EducationExperience";
import styles from "./profilePage.module.css";
import CloseIcon from "@mui/icons-material/Close";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { CircularProgress } from "@mui/material";
import EarthIcon from "../../assets/EarthIcon.svg";
import PhoneIcon from "../../assets/PhoneIcon.svg";
import HomeIcon from "../../assets/HomeIcon.svg";
import { addGlobalNotification } from "../../context/ModalContext/ModalContext";

const ProfilePage = () => {
  const { userData, getData } = useUser();
  const [modalActive, setModalActive] = useState(false);
  const [modalContent, setModalContent] = useState(null);

  //Delete spinner
  const [deleting, setDeleting] = useState({});
  const handleDelete = (documentId) => {
    setDeleting((prevState) => ({
      ...prevState,
      [documentId]: true,
    }));

    handleDeleteFile(documentId)
      .then(() => {
        setDeleting((prevState) => ({
          ...prevState,
          [documentId]: false,
        }));
      })
      .catch((error) => {
        setDeleting((prevState) => ({
          ...prevState,
          [documentId]: false,
        }));
        // обработка ошибок
      });
  };

  useEffect(() => {
    if (!modalActive) {
      const timeoutId = setTimeout(() => {
        setModalContent(<></>);
      }, 100);

      return () => clearTimeout(timeoutId);
    }
  }, [modalActive, setModalContent]);

  const fileInputRef = useRef(null);
  const fileInputRef2 = useRef(null);

  const handleButtonClick = (inputRef) => {
    inputRef.current.click();
    fileInputRef.current.value = "";
  };

  const handleFileChange = async (event, cv) => {
    const file = event.target.files[0];

    if (file) {
      const maxSize = 10 * 1024 * 1024; // 10 MB

      if (file.size > maxSize) {
        addGlobalNotification("File too large. Max 10MB.", "warning");
        event.target.value = "";
        return;
      }

      if (file.type === "application/pdf") {
        const toBase64 = (file) =>
          new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => resolve(reader.result);
            reader.onerror = (error) => reject(error);
          });

        try {
          const base64data = await toBase64(file);
          await axiosInstance.post("/t_talent/upload_document", {
            cv,
            name: file.name,
            file: base64data.split(",")[1],
          });
          getData();
          event.target.value = "";
        } catch (error) {
          // console.error("Ошибка при загрузке файла:", error);
        }
      } else {
        addGlobalNotification(
          "Please upload the file in PDF format.",
          "warning"
        );
      }
    }
  };

  const handleDeleteFile = async (documentId) => {
    try {
      await axiosInstance.delete(
        `/t_talent/delete_document?documentId=${documentId}`
      );
      await getData();
    } catch (errpr) {}
  };

  if (!userData) {
    return <div>Loading...</div>;
  }

  const openModal = (props) => {
    setModalContent(props);
    setModalActive(true);
  };

  const deleteWork = async (id) => {
    try {
      await axiosInstance.delete(`/t_talent/cv_work_experience/${id}`);
      await getData();
    } catch (error) {}
  };

  const deleteEducation = async (id) => {
    try {
      await axiosInstance.delete(`/t_talent/cv_education/${id}`);
      await getData();
    } catch (error) {}
  };

  const deleteApprenticeship = async (id) => {
    try {
      await axiosInstance.delete(`/t_talent/cv_apprenticeship/${id}`);
      await getData();
    } catch (error) {}
  };

  const levels = [
    { level: "0", name: "No knowledge" },
    { level: "1", name: "A1 - Beginner" },
    { level: "2", name: "A2 - Basics" },
    { level: "3", name: "B1 - Intermediate" },
    { level: "4", name: "B2 - Good intermediate level" },
    { level: "5", name: "C1 - Advanced knowledge" },
    { level: "6", name: "C2 - Excellent knowledge" },
  ];

  const getLevelName = (levelValue) => {
    const level = levels.find((l) => l.level === levelValue);
    return level ? level.name : "Unknown level";
  };

  return (
    <>
      <h3>My Profile</h3>
      <div className={styles.profile_page}>
        <div></div>
        {/*Head*/}
        <div
          className={styles.profile_header}
          onClick={() =>
            openModal(
              <FormWrapper
                type="general"
                onClose={() => setModalActive(false)}
              />
            )
          }
        >
          <div className={styles.profile_info}>
            <h4>
              {userData.name} {userData.surname}
            </h4>
            <div className={styles.header_list}>
              <div className={styles.header_item}>
                <img src={EarthIcon} className={styles.header_icon} />
                <p>
                  {userData?.nationality?.length
                    ? userData.nationality.join(", ")
                    : ""}
                </p>
              </div>
              <div className={styles.header_item}>
                <img src={HomeIcon} className={styles.header_icon} />
                <p>{userData.placeOfLiving}</p>
              </div>
              <div className={styles.header_item}>
                <img src={PhoneIcon} className={styles.header_icon} />
                <p>{userData.phone}</p>
              </div>
              <p></p>
            </div>

            {Array.isArray(userData.documents.cv) &&
              userData.documents.cv.length === 0 && (
                <div
                  className={styles.profile_upload}
                  onClick={(e) => e.stopPropagation()}
                >
                  <div className="column">
                    <p className="text-m-semibold">
                      Upload your CV and fill out your profile
                    </p>
                    <p>
                      Upload your CV in following formats: .pdf. Talents with a
                      completed profile are 10x more likely to find a job on
                      globemee!
                    </p>
                  </div>
                  <button
                    className="primary medium"
                    onClick={() => handleButtonClick(fileInputRef)}
                  >
                    Upload CV
                  </button>
                </div>
              )}
          </div>
        </div>
        <div className={styles.profile_content}>
          <div className={styles.content_column}>
            {/*Visa */}
            <div
              className={`${styles.profile_section} column`}
              onClick={() =>
                openModal(
                  <FormWrapper
                    type="visa"
                    onClose={() => setModalActive(false)}
                  />
                )
              }
            >
              <div>
                <h4>Visa</h4>
              </div>

              <p className="text-m-semibold">
                Do you already have a working Visa for Germany?
              </p>
              <p>{userData.visaInfo.visa}</p>

              <p className="text-m-semibold">
                Are you willing to relocate to Germany?
              </p>
              <p>{userData.visaInfo.willingnessToRelocate}</p>

              {userData.visaInfo.willingnessToRelocate === "Yes" && (
                <>
                  <p className="text-m-semibold">Where do you want to live?</p>
                  {userData.visaInfo.preferredCitySize.big && (
                    <p>In a big city</p>
                  )}
                  {userData.visaInfo.preferredCitySize.medium && (
                    <p>In a middle-size city</p>
                  )}
                  {userData.visaInfo.preferredCitySize.landscape && (
                    <p>In a small town</p>
                  )}
                  {userData.visaInfo.preferredCity && <p>A specific city</p>}
                </>
              )}

              {userData.visaInfo.preferredCity &&
                userData.visaInfo?.preferredCityName?.length > 0 &&
                userData.visaInfo.willingnessToRelocate === "Yes" && (
                  <>
                    <p className="text-m-semibold">
                      To which cities would you move?
                    </p>
                    <div className={styles.text_list}>
                      {userData.visaInfo?.preferredCityName.map(
                        (item, index) => (
                          <span key={index}>
                            <p>
                              {item}
                              {index <
                                userData.visaInfo.preferredCityName.length -
                                  1 && ",\u00A0"}
                            </p>
                          </span>
                        )
                      )}
                    </div>
                  </>
                )}

              <p className="text-m-semibold">
                Do you have a degree recognition? *
              </p>
              <p>{userData.visaInfo.educationalConfirmation}</p>

              <p className="text-m-semibold">
                When could you start at the earliest?
              </p>
              <p>{userData.visaInfo.startDate}</p>
            </div>

            {/*CV */}
            <div className={`${styles.profile_section} column`}>
              <div>
                <h4>CV</h4>
              </div>
              <div className="column minGap">
                <div className="row space-between">
                  <p className="text-m-semibold">Work experience</p>
                  <button
                    className="add"
                    onClick={() =>
                      openModal(
                        <WorkExperience
                          onClose={() => setModalActive(false)}
                          initialData={""}
                        />
                      )
                    }
                  >
                    + Add
                  </button>
                </div>
                <hr />
                {userData.curriculumVitae?.workExperience?.map(
                  (item, index) => (
                    <div key={index} className="column">
                      <div className="row space-between">
                        <p
                          className="italic"
                          style={{ color: "var(--orange-100)" }}
                        >
                          {item.position}
                        </p>
                        <div className="row">
                          <EditIcon
                            color="warning"
                            onClick={() =>
                              openModal(
                                <WorkExperience
                                  onClose={() => setModalActive(false)}
                                  initialData={item}
                                />
                              )
                            }
                          />
                          <DeleteIcon
                            color="warning"
                            onClick={() => deleteWork(item._id)}
                          />
                        </div>
                      </div>

                      <p className="italic">{item.companyName}</p>

                      <div className="row">
                        <p className="italic">
                          {item.startDate} - {item.finishDate}
                        </p>
                      </div>
                      <p className="italic">{item.location}</p>
                      {index <
                        userData.curriculumVitae?.workExperience?.length -
                          1 && <hr className={styles.hr_section} />}
                    </div>
                  )
                )}

                <div className="row space-between">
                  <p className="text-m-semibold">Education / Apprenticeship</p>
                  <button
                    className="add"
                    onClick={() =>
                      openModal(
                        <EducationExperience
                          onClose={() => setModalActive(false)}
                          initialData={""}
                        />
                      )
                    }
                  >
                    + Add
                  </button>
                </div>
                <hr />
                <div>
                  {userData.curriculumVitae?.education?.map((item, index) => (
                    <div key={index} className="column">
                      <div className="row space-between">
                        <p
                          className="italic"
                          style={{ color: "var(--orange-100)" }}
                        >
                          {item.fieldStudy}
                        </p>
                        <div className="row">
                          <EditIcon
                            color="warning"
                            onClick={() =>
                              openModal(
                                <EducationExperience
                                  onClose={() => setModalActive(false)}
                                  initialData={item}
                                />
                              )
                            }
                          />
                          <DeleteIcon
                            color="warning"
                            onClick={() => deleteEducation(item._id)}
                          />
                        </div>
                      </div>
                      <p className="italic">{item.nameUniversity}</p>
                      <p className="italic">{item.degree}</p>
                      <p className="italic">
                        {item.startDate} - {item.finishDate}
                      </p>

                      <div>
                        <p className="italic">{item.city}</p>
                        {", "}
                        <p className="italic">{item.country}</p>
                      </div>
                      {index <
                        userData.curriculumVitae.education.length - 1 && (
                        <hr className={styles.hr_section} />
                      )}
                    </div>
                  ))}
                </div>
                {userData.curriculumVitae?.apprenticeship?.length > 0 && <hr />}
                {userData.curriculumVitae?.apprenticeship?.map(
                  (item, index) => (
                    <div key={index} className="column">
                      <div className="row space-between">
                        <p
                          className="italic"
                          style={{ color: "var(--orange-100)" }}
                        >
                          {item.position}
                        </p>
                        <div className="row">
                          <EditIcon
                            color="warning"
                            onClick={() =>
                              openModal(
                                <EducationExperience
                                  onClose={() => setModalActive(false)}
                                  initialData={item}
                                />
                              )
                            }
                          />
                          <DeleteIcon
                            color="warning"
                            onClick={() => deleteApprenticeship(item._id)}
                          />
                        </div>
                      </div>
                      <p className="italic">{item.nameUniversity}</p>
                      <p className="italic">{item.degree}</p>
                      <div>
                        {item.gtTwoYears && (
                          <p className="italic">At least 2 years duration</p>
                        )}
                      </div>
                      {index <
                        userData?.curriculumVitae?.apprenticeship?.length -
                          1 && <hr className={styles.hr_section} />}
                    </div>
                  )
                )}
              </div>
            </div>

            {/*Professional Challenge */}
            <div
              className={`${styles.profile_section} column`}
              onClick={() =>
                openModal(
                  <FormWrapper
                    type="challenge"
                    onClose={() => setModalActive(false)}
                  />
                )
              }
            >
              <div>
                <h4>Professional Challenge</h4>
              </div>
              <p className="text-m-semibold">
                What was your biggest professional challenge? How did you
                overcome it?
              </p>
              <p>{userData.professionalChallenge}</p>
            </div>
          </div>
          <div className={`${styles.content_column}`}>
            {/*Career Goals */}
            <div
              className={`${styles.profile_section} column`}
              onClick={() =>
                openModal(
                  <FormWrapper
                    type="goals"
                    active={modalActive}
                    onClose={() => setModalActive(false)}
                  />
                )
              }
            >
              <div>
                <h4>Career Goals</h4>
              </div>
              <p className="text-m-semibold">
                Which professional fields are interesting for you?
              </p>
              <p>
                {userData.career.careerGoals
                  .map((goal) => goal.careerTitle)
                  .join(", ")}
              </p>
              <p className="text-m-semibold">
                What is your salary expectation (gross per year in €)?
              </p>
              <p>
                €{userData.career.minSalary} - €{userData.career.maxSalary}
              </p>
            </div>
            {/*Skills */}
            <div
              className={`${styles.profile_section} column`}
              onClick={() =>
                openModal(
                  <FormWrapper
                    type="skills"
                    active={modalActive}
                    onClose={() => setModalActive(false)}
                  />
                )
              }
            >
              <div>
                <h4>Skills</h4>
              </div>
              <div className={styles.list}>
                {userData.career.skills.map((skill, index) => (
                  <div key={index} className={styles.item}>
                    <p>{skill.skillName}</p>
                  </div>
                ))}
              </div>
            </div>
            {/*Personal Interests */}
            <div
              className={`${styles.profile_section} column`}
              onClick={() =>
                openModal(
                  <FormWrapper
                    type="interests"
                    onClose={() => setModalActive(false)}
                  />
                )
              }
            >
              <div>
                <h4>Personal Interests</h4>
              </div>
              <div className={styles.list}>
                {userData?.personalInterests?.map((item, index) => (
                  <div key={index} className={styles.item}>
                    {item}
                  </div>
                ))}
              </div>
            </div>
            {/*Languages */}
            <div
              className={`${styles.profile_section} column`}
              onClick={() =>
                openModal(
                  <FormWrapper
                    type="language"
                    onClose={() => setModalActive(false)}
                  />
                )
              }
            >
              <div>
                <h4>Languages</h4>
              </div>
              <div className={styles.list}>
                {userData.career.language.map((item, index) => (
                  <div key={index} className={styles.item}>
                    <p>
                      {item.language}: {getLevelName(item.level).slice(0, 2)}
                    </p>
                  </div>
                ))}
              </div>
            </div>
            {/*Uploads */}
            <div className={`${styles.profile_section} column`}>
              <div>
                <h4>Uploads</h4>
              </div>
              <div className="row space-between">
                <p className="text-m-semibold">Curriculum Vitae (optional)</p>
                <button
                  className="add"
                  onClick={() => handleButtonClick(fileInputRef)}
                >
                  + Add
                </button>
                <input
                  type="file"
                  accept="application/pdf"
                  ref={fileInputRef}
                  style={{ display: "none" }}
                  onChange={(event) => handleFileChange(event, "1")}
                />
              </div>
              <hr />
              {Array.isArray(userData.documents.cv) &&
                userData.documents.cv.length > 0 &&
                userData.documents.cv.map((item, index) => (
                  <div key={index} className="start">
                    {deleting[item.documentId] ? (
                      <CircularProgress size={24} color="warning" />
                    ) : (
                      <CloseIcon
                        color="warning"
                        onClick={() => handleDelete(item.documentId)}
                      />
                    )}
                    {item.name}
                  </div>
                ))}
              <div className="row space-between">
                <p className="text-m-semibold">Other documents (optional)</p>
                <button
                  className="add"
                  onClick={() => handleButtonClick(fileInputRef2)}
                >
                  + Add
                </button>
                <input
                  type="file"
                  accept="application/pdf"
                  ref={fileInputRef2}
                  style={{ display: "none" }}
                  onChange={(event) => handleFileChange(event, "0")}
                />
              </div>
              <hr />
              {Array.isArray(userData.documents.additional) &&
                userData.documents.additional.length > 0 &&
                userData.documents.additional.map((item, index) => (
                  <div key={index} className="start">
                    {deleting[item.documentId] ? (
                      <CircularProgress size={24} color="warning" />
                    ) : (
                      <CloseIcon
                        color="warning"
                        onClick={() => handleDelete(item.documentId)}
                      />
                    )}
                    {item.name}
                  </div>
                ))}
            </div>
            {/*Comments */}
            <div
              className={`${styles.profile_section} column`}
              onClick={() =>
                openModal(
                  <FormWrapper
                    type="notes"
                    onClose={() => setModalActive(false)}
                  />
                )
              }
            >
              <div>
                <h4>Comments</h4>
              </div>
              <p className="text-m-semibold">
                Anything you think we should need to know about you? Write us a
                note here:
              </p>
              <p>{userData.notes}</p>
            </div>
          </div>
        </div>
        <Modal
          active={modalActive}
          setActive={setModalActive}
          children={modalContent}
          width={"600px"}
        />
      </div>
    </>
  );
};

export default ProfilePage;
