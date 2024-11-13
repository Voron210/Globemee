import React, { useEffect, useRef, useState } from "react";
import styles from "./JobOffer.module.css";
import { FormProvider, useForm } from "react-hook-form";
import GeneralInfo from "../../components/JobOfferForms/GeneralInfo";
import Requirements from "../../components/JobOfferForms/Requirements";
import SoftSkills from "../../components/JobOfferForms/SoftSkills";
import FurtherInfo from "../../components/JobOfferForms/FurtherInfo";
import { useNavigate, useSearchParams } from "react-router-dom";
import axiosInstance from "../../lib/axios/AxiosConfig";
import { useCompany } from "../../context/CompanyContext/CompanyContext";
import KeyboardBackspaceIcon from "@mui/icons-material/KeyboardBackspace";
import Modal from "../Modal/Modal";
import InfoIcon from "../../assets/InfoIcon.svg";
import SuccessIcon from "../../assets/SuccessIcon.svg";
import ThumbsUpIcon from "../../assets/ThumbsUpIcon.svg";
import { addGlobalNotification } from "../../context/ModalContext/ModalContext";
import AdminComment from "../AdminComment/AdminComment";

//type = create | edit + joboffer_id
const JobOffer = ({ type, role }) => {
  const isAdmin = role === "admin";
  const companyContext = useCompany();
  const getcompanyJobOffers =
    role !== "admin" ? companyContext.getcompanyJobOffers : null;

  const navigate = useNavigate();
  // const { getcompanyJobOffers } = useCompany();
  const [searchParams, setSearchParams] = useSearchParams();
  const [jobOffer, setJobOffer] = useState();
  const joboffer_id = searchParams.get("joboffer_id");
  const [currentStep, setCurrentStep] = useState(1);
  const [modalActive, setModalActive] = useState(false);
  const [modalContent, setModalContent] = useState();
  const [userInfo, setUserInfo] = useState(null);
  const [comment, setComment] = useState("");
  const step1Ref = useRef();
  const step2Ref = useRef();
  const step3Ref = useRef();
  const step4Ref = useRef();
  const commentRef = useRef();

  const openModal = (content) => {
    setModalContent(content);
    setModalActive(true);
  };

  const applyJobDataToFilters = (jobData) => {
    const { hardFacts, neededSkills } = jobData;

    const newParams = {
      jobTitle: [hardFacts.jobDescription.jobTitleStandardized],
      industry: hardFacts.jobDescription.industry,
      minSalary: hardFacts.jobDescription.minSalary,
      maxSalary: hardFacts.jobDescription.maxSalary,
      experience: neededSkills.experience,
      language: neededSkills.skills.language.map((lang) => ({
        language: lang.language,
        level: lang.level,
      })),
      mustHaveSkills: neededSkills.skills.mustHave,
      commonSkills: neededSkills.skills.commonSkills.map(
        (skill) => skill.skillName
      ),
    };
    const params = new URLSearchParams();

    Object.keys(newParams).forEach((key) => {
      const value = newParams[key];
      if (!value || (Array.isArray(value) && value.length === 0)) {
        return;
      }

      if (key === "language") {
        if (Array.isArray(value) && value.length > 0) {
          params.append(
            key,
            value.map((lang) => `${lang.language}:${lang.level}`).join(",")
          );
        }
      } else if (Array.isArray(value) && value.length > 0) {
        params.append(key, value.join("|"));
      } else if (value !== "") {
        params.append(key, value);
      }
    });

    navigate(`/admin-matching-tool?${params.toString()}`);
  };

  const getJobOffer = async (joboffer_id) => {
    try {
      let response = null;
      let jobOfferData = null;
      if (role === "admin") {
        response = await axiosInstance.get(`/a_jobOffer/one/${joboffer_id}`);
        jobOfferData = response.data[0];
        setUserInfo(response.data[1]);
      } else {
        response = await axiosInstance.get(
          `/c_jobOffer/one_job_offer/${joboffer_id}`
        );
        jobOfferData = response.data;
      }

      setJobOffer(jobOfferData);
      // console.log(jobOfferData);
      methods.reset({
        schemaVersion: "0.0.2",
        jobOfferStatus: jobOfferData.jobOfferStatus,
        isApprenticeship: jobOfferData.isApprenticeship,
        neededSkills: {
          careerEducation: jobOfferData.neededSkills.careerEducation || [],
          careerApprenticeship:
            jobOfferData.neededSkills.careerApprenticeship || [],
          minimalDegree: jobOfferData.neededSkills.minimalDegree || [],
          skills: {
            mustHave: jobOfferData.neededSkills.skills.mustHave || [],
            commonSkills: jobOfferData.neededSkills.skills.commonSkills || [],
            language: jobOfferData.neededSkills.skills.language || [
              { language: "Englisch", level: "0" },
              { language: "Deutsch", level: "0" },
            ],
          },
          experience: jobOfferData.neededSkills.experience || "",
        },
        hardFacts: {
          jobDescription: {
            link: jobOfferData.hardFacts.jobDescription.link || "",
            manualInput:
              jobOfferData.hardFacts.jobDescription.manualInput || "",
            individualInfo:
              jobOfferData.hardFacts.jobDescription.individualInfo || "",
            jobTitle: jobOfferData.hardFacts.jobDescription.jobTitle || "",
            jobTitleStandardized:
              jobOfferData.hardFacts.jobDescription.jobTitleStandardized || "",
            startDate: jobOfferData.hardFacts.jobDescription.startDate || "",
            location: jobOfferData.hardFacts.jobDescription.location || "",
            workingHoursWeek:
              jobOfferData.hardFacts.jobDescription.workingHoursWeek || null,
            minSalary: jobOfferData.hardFacts.jobDescription.minSalary || null,
            maxSalary: jobOfferData.hardFacts.jobDescription.maxSalary || null,
            industry: jobOfferData.hardFacts.jobDescription.industry || "",
            homeOffice: jobOfferData.hardFacts.jobDescription.homeOffice || {
              office: false,
              hybrid: false,
              remote: false,
            },
            // jobDescription:
            // jobOfferData.hardFacts.jobDescription.jobDescription || "",
          },
        },
        softSkills: jobOfferData.softSkills || [],
        contact: {
          name: jobOfferData.contact.name || "",
          email: jobOfferData.contact.email || "",
          department: jobOfferData.contact.department || "",
          phone: jobOfferData.contact.phone || "",
        },
        documents: jobOfferData.documents || [],
      });
    } catch (error) {
      console.error("Error fetching job offer:", error);
    }
  };

  const onUpdate = async () => {
    getJobOffer(joboffer_id);
  };

  useEffect(() => {
    if (type === "edit") {
      getJobOffer(joboffer_id);
    }
  }, []);

  const methods = useForm({
    defaultValues: {
      schemaVersion: "0.0.2",
      jobOfferStatus: 1,
      isApprenticeship: false,
      neededSkills: {
        careerEducation: [],
        careerApprenticeship: [],
        minimalDegree: [],
        skills: {
          mustHave: [],
          commonSkills: [],
          language: [
            { language: "Englisch", level: "0" },
            { language: "Deutsch", level: "0" },
          ],
        },
        experience: "",
      },
      hardFacts: {
        jobDescription: {
          link: "",
          manualInput: "",
          individualInfo: "",
          jobTitle: "",
          jobTitleStandardized: "",
          startDate: "",
          location: "",
          workingHoursWeek: null,
          minSalary: null,
          maxSalary: null,
          industry: "",
          homeOffice: { office: false, hybrid: false, remote: false },
          // jobDescription: "",
        },
      },
      softSkills: [],
      contact: { name: "", email: "", department: "", phone: "" },
      documents: [],
    },
  });

  const {
    watch,
    formState: { errors },
    handleSubmit,
    getValues,
    setValue,
    reset,
  } = methods;

  const isApprenticeship = watch("isApprenticeship");
  const watchMaxSteps = isApprenticeship ? 3 : 4;

  const steps = [
    { number: 1, label: "Allgemeines" },
    { number: 2, label: "Anforderungen" },
    { number: 3, label: "Softskills" },
    { number: 4, label: "Weiteres" },
  ];

  const isApprenticeshipSteps = [
    { number: 1, label: "Allgemeines" },
    { number: 2, label: "Anforderungen" },
    { number: 3, label: "Weiteres" },
  ];

  const onSubmit = async (data) => {
    if (isApprenticeship) {
      setValue("neededSkills.careerEducation", []);
      setValue("neededSkills.careerApprenticeship", []);
      setValue("neededSkills.minimalDegree", []);
      setValue("neededSkills.skills.mustHave", []);
      setValue("neededSkills.skills.commonSkills", []);
      setValue("neededSkills.experience", "");
    }
    await new Promise((resolve) => setTimeout(resolve, 0));

    try {
      if (type === "create" && currentStep === watchMaxSteps) {
        await axiosInstance.post("c_jobOffer", getValues());
        await getcompanyJobOffers();
        openModal(
          <div className="column gap">
            <img src={ThumbsUpIcon} className="modal_img" />
            <h4 className="center">Toll gemacht!</h4>
            <p className="text-m-semibold center">
              Das war’s schon. Wir werden Ihrer Stelle nun Talente zuweisen und
              Sie benachrichtigen, sobald es ein Match gibt
            </p>
            <button
              type="button"
              className="secondary medium"
              onClick={() => navigate("/company-job-offers")}
            >
              Zur Übersicht
            </button>
            <button
              type="button"
              className="secondary medium"
              onClick={() => {
                reset();
                setCurrentStep(1);
                setModalActive(false);
              }}
            >
              Weitere Stelle anlegen{" "}
            </button>
          </div>
        );
      } else {
        if (type === "edit") {
          await axiosInstance.patch("c_jobOffer", {
            ...getValues(),
            jobOfferId: jobOffer.jobOfferId,
            jobCreatorId: jobOffer.jobCreatorId,
            companyId: jobOffer.companyId,
          });

          addGlobalNotification(
            "Ihre Änderungen wurden gespeichert",
            "success"
          );
          // openModal(
          //   <div className="column gap">
          //     <img src={SaveIcon} className="modal_img" />
          //     <h4>Ihre Änderungen wurden gespeichert!</h4>
          //     <div className="center">
          //       <button
          //         className="primary medium"
          //         type="button"
          //         onClick={() => setModalActive(false)}
          //       >
          //         Ja
          //       </button>
          //     </div>
          //   </div>
          // );
          getJobOffer(joboffer_id);
          getcompanyJobOffers();
        } else {
          setCurrentStep((prev) => prev + 1);
        }
      }
    } catch (error) {
      console.error("Error submitting job offer:", error);
    }
  };

  const StepTracker = ({ step, index, currentStep, totalSteps }) => (
    <div
      key={index}
      className={`${styles.step} ${
        currentStep === step.number ? styles.activeStep : ""
      }`}
    >
      <div
        className={`${styles.circle} ${
          currentStep >= step.number ? styles.active : ""
        }`}
        aria-current={currentStep === step.number ? "step" : undefined}
      >
        <p className="text-m-semibold">{step.number}.</p>
      </div>
      <div className={styles.label}>{step.label}</div>
    </div>
  );

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep((prev) => prev - 1);
    }
  };

  if (!jobOffer && type === "edit") {
    // console.log(jobOffer);
    return <>loading</>;
  }

  const handleChangeStatus = async (newStatus) => {
    if (newStatus === 0) {
      openModal(
        <>
          <div className="column midGap">
            <img src={InfoIcon} className="modal_img" />
            <h4 className="center">
              Möchten Sie diese Stelle wirklich deaktivieren?
            </h4>
            <p className="center text-m-semibold">
              Es werden dann keine Kandidaten mehr gesucht.
            </p>
            <div className="row center gap">
              <button
                className="secondary medium"
                onClick={() => setModalActive(false)}
              >
                <span className="material-symbols-outlined">close</span>
                Nein
              </button>
              <button
                className="primary medium"
                onClick={async () => {
                  try {
                    await axiosInstance.patch("/c_jobOffer/status", {
                      jobOfferId: jobOffer.jobOfferId,
                      jobOfferStatus: newStatus,
                    });
                    getcompanyJobOffers();
                    getJobOffer(joboffer_id);
                    setModalContent(
                      <>
                        <div className="column midGap">
                          <img src={SuccessIcon} className="modal_img" />
                          <h4 className="center">Stelle deaktiviert</h4>
                          <p className="center">
                            Sie finden diese Stellenanzeige nun unter Meine
                            Stelle
                            {">"} deaktivierte Stellen.
                          </p>
                          <div className="center">
                            <button
                              className="secondary medium"
                              onClick={() => {
                                setModalActive(false);
                              }}
                            >
                              Fertig
                            </button>
                          </div>
                        </div>
                      </>
                    );
                  } catch (error) {}
                }}
              >
                <span className="material-symbols-outlined">check</span>
                Ja
              </button>
            </div>
          </div>
        </>
      );
    } else {
      try {
        await axiosInstance.patch("/c_jobOffer/status", {
          jobOfferId: jobOffer.jobOfferId,
          jobOfferStatus: newStatus,
        });
        getcompanyJobOffers();
        getJobOffer(joboffer_id);
        openModal(
          <div className="column gap">
            <img src={ThumbsUpIcon} className="modal_img" />
            <h4 className="center">Toll gemacht!</h4>
            <p className="text-m-semibold center">
              Das war’s schon. Wir werden Ihrer Stelle nun Talente zuweisen und
              Sie benachrichtigen, sobald es ein Match gibt
            </p>
            <button
              type="button"
              className="secondary medium"
              onClick={() => navigate("/company-job-offers")}
            >
              Zur Übersicht
            </button>
            <button
              type="button"
              className="secondary medium"
              onClick={() => navigate("/create-job-offer")}
            >
              Weitere Stelle anlegen{" "}
            </button>
          </div>
        );
      } catch (error) {}
    }
  };

  return (
    <FormProvider {...methods}>
      <form onSubmit={handleSubmit(onSubmit)}>
        {type === "create" && (
          <>
            <div className="column midGap" style={{ paddingTop: "32px" }}>
              <div
                style={
                  currentStep === 1 ? { opacity: "0" } : { opacity: "100" }
                }
              >
                <button
                  type="button"
                  onClick={() => handleBack()}
                  style={{ color: "var(--orange-100)" }}
                >
                  <KeyboardBackspaceIcon color="inherit" />
                  Zurück
                </button>
              </div>
              <h3>Neue Stelle anlegen</h3>
            </div>

            <div className={styles.stepContainer}>
              {(watch("isApprenticeship") ? isApprenticeshipSteps : steps).map(
                (step, index) => (
                  <StepTracker
                    key={index}
                    step={step}
                    index={index}
                    currentStep={currentStep}
                    totalSteps={
                      (watch("isApprenticeship")
                        ? isApprenticeshipSteps
                        : steps
                      ).length
                    }
                  />
                )
              )}
            </div>
          </>
        )}
        <div
          className={isAdmin ? styles.inputsWrapperAdmin : styles.inputsWrapper}
        >
          {type === "create" ? (
            <>
              <div className="column gap-48">
                {currentStep === 1 && (
                  <>
                    <div>
                      <h4>1. Allgemeine Informationen</h4>
                    </div>
                    <GeneralInfo />
                  </>
                )}
                {currentStep === 2 && (
                  <>
                    <div>
                      <h4>2. Anforderung an den Kandidaten</h4>
                    </div>
                    <Requirements isApprenticeship={isApprenticeship} />
                  </>
                )}
                {currentStep === 3 && (
                  <>
                    <div>
                      <h4>
                        {watchMaxSteps === 4
                          ? "3. Softskills und Werte"
                          : "3. Weiteres"}
                      </h4>
                    </div>

                    {watchMaxSteps === 4 ? <SoftSkills /> : <FurtherInfo />}
                  </>
                )}
                {currentStep === 4 && (
                  <>
                    <div>
                      <h4>4. Weiteres</h4>
                    </div>
                    <FurtherInfo />
                  </>
                )}
              </div>
            </>
          ) : (
            <>
              {isAdmin ? (
                <>
                  <div className={styles.jobHead}>
                    <div className={styles.headContent}>
                      <div className="row space-between center">
                        <h3>
                          {getValues("hardFacts.jobDescription.jobTitle")}
                        </h3>
                        <span
                          style={{ cursor: "pointer", fontSize: "32px" }}
                          className="material-symbols-outlined"
                          onClick={() => navigate(-1)}
                        >
                          close
                        </span>
                      </div>
                      <div className="row space-between">
                        <div className="row gap-8 center">
                          <a
                            className="tertiary"
                            onClick={() => step1Ref.current.scrollIntoView()}
                          >
                            Allgemeine Informationen
                          </a>
                          <a
                            className="tertiary"
                            onClick={() => step2Ref.current.scrollIntoView()}
                          >
                            Anforderung an den Kandidaten
                          </a>
                          {watchMaxSteps === 4 && (
                            <a
                              className="tertiary"
                              onClick={() => step3Ref.current.scrollIntoView()}
                            >
                              {watchMaxSteps === 4
                                ? "Softskills und Werte"
                                : "Weiteres"}
                            </a>
                          )}
                          {watchMaxSteps === 4 && (
                            <a
                              className="tertiary"
                              onClick={() => step4Ref.current.scrollIntoView()}
                            >
                              Weiteres
                            </a>
                          )}
                          <a
                            className="tertiary"
                            onClick={() => commentRef.current.scrollIntoView()}
                          >
                            Kommentare
                          </a>
                          {/* <p className="text-m-semibold">
                            Unternehmen: {userInfo?.facts?.name}
                          </p>
                          <p className="text-m-semibold">
                            Telefonnummer: {getValues("contact.phone")}
                          </p> */}
                        </div>
                        <div className="row gap-16">
                          <button className="primary medium">Speichern</button>
                          <button
                            className="primary medium"
                            type="button"
                            onClick={() => applyJobDataToFilters(jobOffer)}
                          >
                            Matching Talents
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </>
              ) : (
                <div className="column gap-48">
                  <div>
                    <h3>Stellendetails</h3>
                  </div>
                  <div className="row space-between">
                    <h4>{getValues("hardFacts.jobDescription.jobTitle")}</h4>
                    <div className="row gap end">
                      <button className="primary medium" type="submit">
                        Änderungen speichern
                      </button>
                      <button
                        className="secondary medium"
                        type="button"
                        onClick={() =>
                          handleChangeStatus(
                            jobOffer.jobOfferStatus === 1 ? 0 : 1
                          )
                        }
                      >
                        {jobOffer.jobOfferStatus === 1
                          ? "Stelle deaktivieren"
                          : "Live schalten"}
                      </button>
                    </div>
                  </div>
                </div>
              )}
              {/* <hr /> */}
              <div ref={step1Ref} id="step-1">
                <h4>1. Allgemeine Informationen</h4>
              </div>
              <GeneralInfo />
              <div ref={step2Ref}>
                <h4>2. Anforderung an den Kandidaten</h4>
              </div>
              <Requirements isApprenticeship={isApprenticeship} />
              <div ref={step3Ref} id="step-3">
                <h4>
                  {watchMaxSteps === 4
                    ? "3. Softskills und Werte"
                    : "3. Weiteres"}
                </h4>
              </div>
              {watchMaxSteps === 4 ? <SoftSkills /> : <FurtherInfo />}

              {watchMaxSteps === 4 && (
                <>
                  <div ref={step4Ref}>
                    <h4>4. Weiteres</h4>
                  </div>
                  <FurtherInfo />
                </>
              )}

              <div className="row gap start">
                <button className="primary medium" type="submit">
                  Änderungen speichern
                </button>
                <button
                  className="secondary medium"
                  type="button"
                  onClick={() =>
                    handleChangeStatus(jobOffer.jobOfferStatus === 1 ? 0 : 1)
                  }
                >
                  {jobOffer.jobOfferStatus === 1
                    ? "Stelle deaktivieren"
                    : "Live schalten"}
                </button>
                <button
                  type="button"
                  className="tertiary medium"
                  onClick={() =>
                    openModal(
                      <div className="column gap">
                        <img src={InfoIcon} className="modal_img" />
                        <p className="center text-m-semibold">
                          Möchten Sie die Stelle wirklich löschen?
                        </p>
                        <div className="row gap center">
                          <button
                            className="primary medium"
                            onClick={() => setModalActive(false)}
                          >
                            Nein
                          </button>
                          <button
                            className="secondary medium"
                            onClick={async () => {
                              try {
                                await axiosInstance.delete("c_jobOffer", {
                                  data: {
                                    jobOfferId: joboffer_id,
                                  },
                                });
                                await getcompanyJobOffers();
                                navigate("/company-job-offers");
                              } catch (error) {}
                            }}
                          >
                            Ja
                          </button>
                        </div>
                      </div>
                    )
                  }
                >
                  Stelle löschen
                </button>
              </div>
              {isAdmin && (
                <div ref={commentRef}>
                  <AdminComment
                    type={"jobOffer"}
                    id={joboffer_id}
                    comments={jobOffer.comments}
                    onUpdate={() => onUpdate()}
                  />
                </div>
              )}
            </>
          )}

          {type === "create" && (
            <div className="row end gap-16">
              {currentStep !== watchMaxSteps && (
                <button
                  className="secondary medium"
                  type="button"
                  onClick={() => handleBack()}
                >
                  Zurück
                </button>
              )}

              <button
                className="primary medium"
                type="submit"
                onClick={() => window.scrollTo({ top: 0 })}
              >
                {currentStep === watchMaxSteps
                  ? "Stelle veröffentlichen"
                  : "Weiter"}
              </button>

              {currentStep === watchMaxSteps && (
                <button
                  className="tertiary medium"
                  type="button"
                  onClick={() => {
                    setValue("jobOfferStatus", 2);
                    handleSubmit(onSubmit)();
                  }}
                >
                  Stelle abspeichern
                </button>
              )}
            </div>
          )}
        </div>
      </form>
      <Modal
        active={modalActive}
        setActive={setModalActive}
        children={modalContent}
        closable={false}
        width={"360px"}
      />
    </FormProvider>
  );
};

export default JobOffer;
