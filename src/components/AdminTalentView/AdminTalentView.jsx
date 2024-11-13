import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./AdminTalentView.module.css";
import axiosInstance from "../../lib/axios/AxiosConfig";
import { useAdmin } from "../../context/AdminContext/AdminContext";
import DropdownWithSearch from "../../components/DropdownWithSearch/DropdownWithSearch";
import DropdownManyDisplay from "../../components/DropdownManyDisplay/DropdownManyDisplay";
import Modal from "../../components/Modal/Modal";
import { Controller, FormProvider, useForm } from "react-hook-form";
import { MuiTelInput, matchIsValidTel } from "mui-tel-input";
import ItemList from "../ItemList/ItemList";
import { SearchInput } from "../searchInput";
import EducationExperience from "../TalentForms/EducationExperience";
import WorkExperience from "../TalentForms/WorkExperience";
import LanguageSelect from "../languageSelect/languageSelect";
import { addYears, format } from "date-fns";
import preferCity from "../../common/preferCity";
import visa from "../../common/visa";
import relocate from "../../common/relocate";
import DatePicker from "react-datepicker";
import educationalConfirmation from "../../common/educationalConfirmation";
import SalaryInput from "../SalaryInput/SalaryInput";
import PersonalInterests from "../TalentForms/PersonalInterests";
import ProfessionalChallengeForm from "../TalentForms/ProfessionalChallengeForm";
import NotesForm from "../TalentForms/NotesForm";
import { CircularProgress } from "@mui/material";
import { addGlobalNotification } from "../../context/ModalContext/ModalContext";
import AdminComment from "../../components/AdminComment/AdminComment";
import AdminHistory from "../AdminHistory/AdminHistory";

const AdminTalentView = ({ talentId }) => {
  const { jobOffers } = useAdmin();
  const navigate = useNavigate();
  const [talentData, setTalentData] = useState();
  const [selectedJobOffer, setSelectedJobOffer] = useState("");
  const cvRef = useRef();
  const langRef = useRef();
  const visaRef = useRef();
  const goalRef = useRef();
  const skillRef = useRef();
  const personalRef = useRef();
  const uploadRef = useRef();
  const commentRef = useRef();
  const generalRef = useRef();
  const [modalActive, setModalActive] = useState(false);
  const [modalContent, setModalContent] = useState(null);

  const openModal = (props) => {
    setModalContent(props);
    setModalActive(true);
  };

  const methods = useForm({
    defaultValues: {
      name: "",
      surname: "",
      nationality: [],
      placeOfLiving: "",
      phone: "",
      career: {
        interestedApprenticeship: false,
        language: [
          {
            language: "Englisch",
            level: "0",
            reviewedLevel: 0,
          },
          {
            language: "Deutsch",
            level: "0",
            reviewedLevel: 0,
          },
        ],
        careerGoals: [],
        skills: [],
        maxSalary: "",
        minSalary: "",
      },
      visaInfo: {
        visa: "No",
        startDate: "",
        willingnessToRelocate: "Yes",
        educationalConfirmation: "No",
        preferredCitySize: {
          big: false,
          medium: false,
          landscape: false,
        },
        preferredCity: false,
        preferredCityName: [],
      },
      professionalChallenge: "",
      notes: "",
      personalInterests: [],
    },
  });

  const onUpdate = () => {
    getTalent();
  };

  const {
    reset,
    handleSubmit,
    watch,
    formState: { errors },
    control,
    register,
    unregister,
    getValues,
    setValue,
  } = methods;

  useEffect(() => {
    if (talentId) {
      getTalent();
    }
  }, [talentId]);

  useEffect(() => {
    if (talentData) {
      reset({
        name: talentData.name,
        surname: talentData.surname,
        nationality: talentData.nationality || [],
        placeOfLiving: talentData.placeOfLiving,
        phone: talentData.phone,
        career: {
          interestedApprenticeship:
            talentData.career?.interestedApprenticeship || false,
          language: talentData.career?.language || [
            {
              language: "Englisch",
              level: "0",
              reviewedLevel: 0,
            },
            {
              language: "Deutsch",
              level: "0",
              reviewedLevel: 0,
            },
          ],
          careerGoals: talentData.career?.careerGoals || [],
          skills: talentData.career?.skills || [],
          maxSalary: talentData.career?.maxSalary,
          minSalary: talentData.career?.minSalary,
        },
        visaInfo: {
          visa: talentData.visaInfo?.visa || "No",
          startDate: talentData.visaInfo?.startDate || "",
          willingnessToRelocate:
            talentData.visaInfo?.willingnessToRelocate || "Yes",
          educationalConfirmation:
            talentData.visaInfo?.educationalConfirmation || "No",
          preferredCitySize: {
            big: talentData.visaInfo?.preferredCitySize?.big || false,
            medium: talentData.visaInfo?.preferredCitySize?.medium || false,
            landscape:
              talentData.visaInfo?.preferredCitySize?.landscape || false,
          },
          preferredCity: talentData.visaInfo?.preferredCity || false,
          preferredCityName: talentData.visaInfo?.preferredCityName || [],
        },
        professionalChallenge: talentData.professionalChallenge || "",
        notes: talentData.notes || "",
        personalInterests: talentData.personalInterests || [],
      });
    }
  }, [talentData, reset]);

  const getTalent = async () => {
    try {
      const response = await axiosInstance.get(`a_talent/one/${talentId}`);
      setTalentData(response.data);
    } catch (error) {}
  };

  const willingnessToRelocate = getValues("visaInfo.willingnessToRelocate");
  useEffect(() => {
    if (willingnessToRelocate === "Yes") {
      register("visaInfo.preferredCitySize");
    } else {
      unregister("visaInfo.preferredCitySize");
    }
  }, [willingnessToRelocate]);

  const preferredCity = getValues("visaInfo.preferredCity");
  useEffect(() => {
    if (preferredCity === false) {
      setValue("visaInfo.preferredCityName", []);
    }
  }, [preferredCity]);

  const fileInputRef = useRef(null);
  const fileInputRef2 = useRef(null);

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
          // getData();
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
      // await getData();
    } catch (errpr) {}
  };

  if (!talentData) {
    return <>Loading...</>;
  }

  const isJotForm = talentData.dataSource === "Jotform";

  let jobTitles = "";

  if (talentData.career.careerGoals) {
    jobTitles = talentData.career.careerGoals
      .map((item) => `${encodeURIComponent(item.careerTitle)}`)
      .join("|");
  }

  const deleteWork = async (id) => {
    try {
      // await axiosInstance.delete(`/t_talent/cv_work_experience/${id}`);
      // await getData();
    } catch (error) {}
  };

  const deleteEducation = async (id) => {
    try {
      // await axiosInstance.delete(`/t_talent/cv_education/${id}`);
      // await getData();
    } catch (error) {}
  };

  const deleteApprenticeship = async (id) => {
    try {
      // await axiosInstance.delete(`/t_talent/cv_apprenticeship/${id}`);
      // await getData();
    } catch (error) {}
  };

  const handleDownloadFile = async (id) => {
    try {
      const response = await axiosInstance.get(`a_common/file/${id}`, {
        // headers: {
        //   role: type,
        // },
        responseType: "blob",
      });

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

  // console.log(talentData);

  const matchTalent = async (talentUserId, jobOfferId) => {
    try {
      const response = await axiosInstance.post(`a_match/match`, {
        talentUserId: talentUserId,
        jobOfferId: jobOfferId,
      });
      addGlobalNotification("The match was created", "success");
    } catch (error) {
      if (error.status === 400) {
        addGlobalNotification("Match existiert bereits", "error");
      }
    }
  };

  const validateWordCount = (value) => {
    const wordCount = value
      .split(/\s+/)
      .filter((word) => word.length > 0).length;
    return wordCount >= 100 || "A minimum of 100 words is required";
  };

  const navigateOptions = [
    { text: "General", ref: generalRef },
    { text: "CV", ref: cvRef },
    { text: "Sprache", ref: langRef },
    { text: "Visa", ref: visaRef },
    { text: "Karriereziele", ref: goalRef },
    { text: "Skills", ref: skillRef },
    { text: "Persönliches", ref: personalRef },
    { text: "Anhänge", ref: uploadRef },
    { text: "Kommentare", ref: commentRef },
  ];

  const skillData = {
    extraVsIntroversion: talentData.softSkills?.extraVsIntroversion,
    flexibilityVsStructure: talentData.softSkills?.flexibilityVsStructure,
    goalVsPrincipleOriented: talentData.softSkills?.goalVsPrincipleOriented,
    realisticVsOptimistic: talentData.softSkills?.realisticVsOptimistic,
    teamVsIndependent: talentData.softSkills?.teamVsIndependent,
    traditionalVsModern: talentData.softSkills?.traditionalVsModern,
  };

  const skillLabels = {
    extraVsIntroversion: ["Extrovertiert", "Introvertiert"],
    flexibilityVsStructure: ["Flexibel", "Strukturiert"],
    goalVsPrincipleOriented: ["Zielorientiert", "Prinzipienorientiert"],
    realisticVsOptimistic: ["Realist", "Optimist"],
    teamVsIndependent: ["Teamorientiert", "Unabhängig"],
    traditionalVsModern: ["Traditionell", "Modern"],
  };

  const onSubmit = (data) => {
    // console.log(data);
  };

  return (
    <div className={styles.modalBackground}>
      <div className={styles.jobHead}>
        <div className={styles.headContent}>
          <div className="row space-between center">
            <h3>{`${talentData.name} ${talentData.surname}`}</h3>
            <div className="row center gap-24">
              <button className="primary medium" type="submit">
                Speichern
              </button>
              <span
                style={{ cursor: "pointer", fontSize: "32px" }}
                className="material-symbols-outlined"
                onClick={() => navigate(-1)}
              >
                close
              </span>
            </div>
          </div>
          <div className="row space-between">
            <div className="row gap-8 center">
              {navigateOptions.map((item, index) => (
                <a
                  className="tertiary"
                  style={{ cursor: "pointer" }}
                  key={index}
                  onClick={() => item.ref.current.scrollIntoView()}
                >
                  {item.text}
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
      <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
        <FormProvider {...methods}>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div ref={generalRef} className={styles.infoContainer}>
              {/* Match Talent */}
              {!isJotForm && (
                <div className={styles.matchWrapper}>
                  <h5 style={{ whiteSpace: "nowrap" }}>Match Talent</h5>
                  <div className="column flexOne">
                    <p>Stellenanzeigen durchsuchen</p>
                    <DropdownManyDisplay
                      options={jobOffers}
                      display={[
                        "hardFacts.jobDescription.jobTitle",
                        "companyName",
                      ]}
                      onSelect={(value) => setSelectedJobOffer(value)}
                      selectedValue={selectedJobOffer}
                      keyField={"jobOfferId"}
                      columnHead={["Job title", "Company name"]}
                    />

                    {/* <DropdownWithSearch
                      options={jobOffers}
                      display={"hardFacts.jobDescription.jobTitle"}
                      onSelect={(value) => setSelectedJobOffer(value)}
                      selectedValue={selectedJobOffer}
                    /> */}
                  </div>
                  <button
                    type="button"
                    onClick={() =>
                      openModal(
                        <div className="column gap-16">
                          <h5>Bitte bestätigen</h5>
                          <p>
                            Du möchtest dieses Talent zu der ausgesuchten
                            Stellenanzeige matchen?
                          </p>
                          <div className="row end gap-16">
                            <button
                              className="secondary medium"
                              type="button"
                              onClick={() => setModalActive(false)}
                            >
                              Abbrechen
                            </button>
                            <button
                              className="primary medium"
                              type="button"
                              onClick={() =>
                                matchTalent(
                                  talentId,
                                  selectedJobOffer.jobOfferId
                                )
                              }
                            >
                              Match
                            </button>
                          </div>
                        </div>
                      )
                    }
                    className="primary medium"
                  >
                    Match Talent
                  </button>
                </div>
              )}

              {/* GENERAL INFO */}
              {!isJotForm ? (
                <>
                  <div className="row gap">
                    <div className={styles.infoItem}>
                      <p className="text-m-semibold">Name</p>
                      <input
                        type="text"
                        {...register("name", {
                          required: true,
                          setValueAs: (value) => value.trim(),
                        })}
                        className={errors.name ? "error" : ""}
                      />
                    </div>
                    <div className={styles.infoItem}>
                      <p className="text-m-semibold">Nachname</p>
                      <input
                        type="text"
                        {...register("surname", {
                          required: true,
                          setValueAs: (value) => value.trim(),
                        })}
                        className={errors.surname ? "error" : ""}
                      />
                    </div>
                  </div>
                  <div className="row gap">
                    <div className={styles.infoItem}>
                      <p className="text-m-semibold">Nationalität</p>
                      <Controller
                        name="nationality"
                        control={control}
                        rules={{
                          validate: (value) => {
                            if (value.length === 0) {
                              return "Select one";
                            } else {
                              return true;
                            }
                          },
                        }}
                        render={({ field }) => (
                          <ItemList
                            type="simpleList"
                            searchType="front"
                            value={field.value}
                            onChange={field.onChange}
                            address={"common_source/get_countries"}
                            listName={"nationality"}
                            reqParam={"language=en"}
                          />
                        )}
                      />
                      {errors?.nationality?.message && (
                        <p className="error">{errors?.nationality?.message}</p>
                      )}
                    </div>
                    <div className={styles.infoItem}>
                      <p className="text-m-semibold">Wohnort</p>
                      <SearchInput
                        searchType={"front"}
                        address={"common_source/get_countries"}
                        reqParam={"language=en"}
                        selectedItems={watch("placeOfLiving")}
                        varName="placeOfLiving"
                      />
                    </div>
                  </div>
                  <div className="row gap">
                    <div className={styles.infoItem}>
                      <p className="text-m-semibold">Phone</p>
                      <div className={styles.input_box}>
                        <Controller
                          name="phone"
                          control={control}
                          rules={{
                            validate: (value) => matchIsValidTel(value),
                          }}
                          render={({
                            field: { ref: fieldRef, value, ...fieldProps },
                            fieldState,
                          }) => (
                            <MuiTelInput
                              style={{ width: "100%" }}
                              {...fieldProps}
                              value={value ?? ""}
                              inputRef={fieldRef}
                              helperText={
                                fieldState.invalid ? "Tel is invalid" : ""
                              }
                              error={fieldState.invalid}
                            />
                          )}
                        />
                      </div>
                    </div>
                    <div className={styles.infoItem}>
                      <p className="text-m-semibold">Mail</p>
                      <input
                        type="text"
                        value={talentData.userEmail}
                        readOnly
                      />
                    </div>
                  </div>
                  <div ref={cvRef} className="row gap">
                    <div className={styles.infoItem}>
                      <p className="text-m-semibold">Anmeldung</p>
                      <input
                        type="text"
                        value={talentData.signUpDate}
                        readOnly
                      />
                    </div>
                    <div className={styles.infoItem}>
                      <p className="text-m-semibold">Quelle</p>
                      <input
                        type="text"
                        value={talentData.referralSource}
                        readOnly
                      />
                    </div>
                  </div>
                  <div className="row gap">
                    <div className={styles.infoItem}>
                      <p className="text-m-semibold">Status</p>
                      <input
                        type="text"
                        value={talentData.talentStatus}
                        readOnly
                      />
                    </div>
                    <div className={styles.infoItem}>
                      <p className="text-m-semibold">Priorisierung</p>
                      <input type="text" value={talentData.priority} readOnly />
                    </div>
                  </div>
                </>
              ) : (
                <>
                  <div className="row gap">
                    <div className={styles.infoItem}>
                      <p className="text-m-semibold">Mail</p>
                      <input
                        type="text"
                        value={talentData.userEmail}
                        readOnly
                      />
                    </div>
                    <div className={styles.infoItem}>
                      <p className="text-m-semibold">Age</p>
                      <input type="text" value={talentData.age} readOnly />
                    </div>
                  </div>
                  <div className="row gap">
                    <div className={styles.infoItem}>
                      <p className="text-m-semibold">Anmeldung</p>
                      <input
                        type="text"
                        value={talentData.signUpDate}
                        readOnly
                      />
                    </div>
                    <div className={styles.infoItem}>
                      <p className="text-m-semibold">Akquisekanal</p>
                      <input
                        type="text"
                        value={talentData.referralSource}
                        readOnly
                      />
                    </div>
                  </div>
                  <div ref={cvRef} className="row gap">
                    <div className={styles.infoItem}>
                      <p className="text-m-semibold">Status</p>
                      <input
                        type="text"
                        value={talentData.talentStatus}
                        readOnly
                      />
                    </div>
                    <div className={styles.infoItem}>
                      <p className="text-m-semibold">Priorisierung</p>
                      <input type="text" value={talentData.priority} readOnly />
                    </div>
                  </div>
                </>
              )}

              <hr className={styles.blockDivide} />

              {/* CV */}
              <div>
                <h3>CV</h3>
              </div>
              {!isJotForm ? (
                <div ref={langRef} className="row gap">
                  <div className="column minGap flexOne">
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
                    {talentData.curriculumVitae?.workExperience?.map(
                      (item, index) => (
                        <div key={index} className="column">
                          <div className="row space-between">
                            <p
                              className="italic"
                              style={{ color: "var(--orange-100)" }}
                            >
                              {item.position}
                            </p>
                            <div
                              className="row"
                              style={{ color: "orange", cursor: "pointer" }}
                            >
                              <i
                                onClick={() =>
                                  openModal(
                                    <WorkExperience
                                      onClose={() => setModalActive(false)}
                                      initialData={item}
                                    />
                                  )
                                }
                                className="material-symbols-outlined"
                              >
                                edit
                              </i>
                              <i
                                onClick={() => deleteWork(item._id)}
                                className="material-symbols-outlined"
                              >
                                close
                              </i>
                            </div>
                          </div>

                          <p className="italic">{item.companyName}</p>

                          <div className="row">
                            <p className="italic">
                              {item.startDate} - {item.finishDate}
                            </p>
                          </div>
                          <p className="italic">{item.location}</p>
                          <p className="italic">{item.industry}</p>
                          {index <
                            talentData.curriculumVitae?.workExperience?.length -
                              1 && <hr className={styles.hr_section} />}
                        </div>
                      )
                    )}
                  </div>
                  <div className="column minGap flexOne">
                    <div className="row space-between">
                      <p className="text-m-semibold">
                        Education / Apprenticeship
                      </p>
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
                    <div>
                      {talentData.curriculumVitae?.education?.map(
                        (item, index) => (
                          <div key={index} className="column">
                            <div className="row space-between">
                              <p
                                className="italic"
                                style={{ color: "var(--orange-100)" }}
                              >
                                {item.fieldStudy}
                              </p>
                              <div
                                className="row"
                                style={{ color: "orange", cursor: "pointer" }}
                              >
                                <i
                                  onClick={() =>
                                    openModal(
                                      <EducationExperience
                                        onClose={() => setModalActive(false)}
                                        initialData={item}
                                      />
                                    )
                                  }
                                  className="material-symbols-outlined"
                                >
                                  edit
                                </i>
                                <i
                                  onClick={() => deleteEducation(item._id)}
                                  className="material-symbols-outlined"
                                >
                                  close
                                </i>
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
                              talentData.curriculumVitae.education.length -
                                1 && <hr className={styles.hr_section} />}
                          </div>
                        )
                      )}
                    </div>
                    {talentData.curriculumVitae?.apprenticeship?.length > 0 && (
                      <></>
                    )}
                    {talentData.curriculumVitae?.apprenticeship?.map(
                      (item, index) => (
                        <div key={index} className="column">
                          <div className="row space-between">
                            <p
                              className="italic"
                              style={{ color: "var(--orange-100)" }}
                            >
                              {item.position}
                            </p>
                            <div
                              className="row"
                              style={{ color: "orange", cursor: "pointer" }}
                            >
                              <i
                                onClick={() =>
                                  openModal(
                                    <EducationExperience
                                      onClose={() => setModalActive(false)}
                                      initialData={item}
                                    />
                                  )
                                }
                                className="material-symbols-outlined"
                              >
                                edit
                              </i>
                              <i
                                onClick={() => deleteApprenticeship(item._id)}
                                className="material-symbols-outlined"
                              >
                                close
                              </i>
                            </div>
                          </div>
                          <p className="italic">{item.nameUniversity}</p>
                          <p className="italic">{item.degree}</p>
                          <div>
                            {item.gtTwoYears && (
                              <p className="italic">
                                At least 2 years duration
                              </p>
                            )}
                          </div>
                          {index <
                            talentData?.curriculumVitae?.apprenticeship
                              ?.length -
                              1 && <hr className={styles.hr_section} />}
                        </div>
                      )
                    )}
                  </div>
                </div>
              ) : (
                <div ref={langRef} className="row gap">
                  <div className="column minGap flexOne">
                    <p className="text-m-semibold">Career</p>
                    <p className="text-m-semibold">
                      Erstellung:{" "}
                      <span className="text-m-regular">
                        {talentData?.career?.careerTitle}
                      </span>
                    </p>
                    <p className="text-m-semibold">
                      Spezialisierung:{" "}
                      <span className="text-m-regular">
                        {talentData?.career?.specialization}
                      </span>
                    </p>
                    <p className="text-m-semibold">
                      Arbeitserfahrung:{" "}
                      <span className="text-m-regular">
                        {talentData?.career?.experience}
                      </span>
                    </p>
                    <p className="text-m-semibold">
                      Führerschein:{" "}
                      <span className="text-m-regular">
                        {talentData?.career?.drivingLicenses}
                      </span>
                    </p>
                    <p className="text-m-semibold">
                      Wunschstelle:{" "}
                      <span className="text-m-regular">
                        {talentData?.career?.desiredPosition}
                      </span>
                    </p>
                    <p className="text-m-semibold">
                      Skills:{" "}
                      <span className="text-m-regular">
                        {talentData?.career?.skills
                          .split(",")
                          .map((skill) => `- ${skill.trim()}`)
                          .join("\n")}
                      </span>
                    </p>
                  </div>
                  <div className="column minGap flexOne">
                    <p className="text-m-semibold">Education</p>
                    <p className="text-m-semibold">
                      Universität:{" "}
                      <span className="text-m-regular">
                        {talentData?.education?.universityName}
                      </span>
                    </p>
                    <p className="text-m-semibold">
                      Abschluss:{" "}
                      <span className="text-m-regular">
                        {talentData?.education?.degree}
                      </span>
                    </p>
                  </div>
                </div>
              )}

              <hr className={styles.blockDivide} />

              {/* LANGUAGE */}
              <>
                <h3 ref={visaRef}>Sprache</h3>
                <Controller
                  control={control}
                  name="career.language"
                  rules={{
                    validate: (languages) => {
                      const isValid = languages.every(
                        (lang) => lang.language.trim() !== ""
                      );
                      return isValid || "All languages must be filled in";
                    },
                  }}
                  render={({ field }) => (
                    <>
                      <LanguageSelect
                        language="en"
                        onChange={field.onChange}
                        knowledgeList={field.value}
                      />
                      {errors?.career?.language?.message && (
                        <p className="error">
                          {errors?.career?.language?.message}
                        </p>
                      )}
                    </>
                  )}
                />
              </>

              <hr className={styles.blockDivide} />

              {/* VISA */}
              <h3>Visa</h3>
              <div className="row gap">
                <div className="column gap-16 flexOne">
                  <div className="column gap-8">
                    <p className="text-m-semibold">Visum</p>
                    <div className="radio_list">
                      {visa.map((item, index) => (
                        <div key={index} className="radio_item">
                          <input
                            className="real-radio flex"
                            type="radio"
                            id={`radio_visa_${index}`}
                            value={item.text}
                            {...register("visaInfo.visa", {
                              required: true,
                            })}
                          />
                          <span className="custom-radio"></span>
                          <label htmlFor={`radio_visa_${index}`}>
                            {item.textDe}
                          </label>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div ref={skillRef} className="column gap-8">
                    <p className="text-m-semibold">ZAB</p>
                    <div className="radio_list">
                      {educationalConfirmation.map((item, index) => (
                        <div key={index} className="radio_item">
                          <input
                            className="real-radio"
                            type="radio"
                            id={`educationalConfirmation${index}`}
                            value={item.text}
                            {...register("visaInfo.educationalConfirmation", {
                              required: true,
                            })}
                          />
                          <span className="custom-radio"></span>
                          <label htmlFor={`educationalConfirmation${index}`}>
                            {item.name}
                          </label>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div ref={goalRef} className="column">
                    <p className="text-m-semibold">Verfügbar ab</p>
                    <Controller
                      control={control}
                      name="visaInfo.startDate"
                      rules={{ required: true }}
                      render={({ field }) => (
                        <DatePicker
                          {...field}
                          minDate={addYears(new Date(), 1)}
                          maxDate={addYears(new Date(), 2)}
                          placeholderText="Click to select time"
                          required
                          errors={errors}
                          onChange={(date) =>
                            setValue(
                              "visaInfo.startDate",
                              format(date, "dd.MM.yyyy")
                            )
                          }
                          dateFormat="dd.MM.yyyy"
                        />
                      )}
                    />
                  </div>
                </div>

                <div className="column gap-16 flexOne">
                  <div className="column gap-8">
                    <p className="text-m-semibold">Arbeitsort</p>
                    <div className="radio_list">
                      {relocate.map((item, index) => (
                        <div key={index} className="radio_item">
                          <input
                            className="real-radio"
                            type="radio"
                            id={`radio_relocate_${index}`}
                            value={item.text}
                            {...register("visaInfo.willingnessToRelocate", {
                              required: true,
                            })}
                          />
                          <span className="custom-radio center"></span>
                          <label htmlFor={`radio_relocate_${index}`}>
                            {item.name}
                          </label>
                        </div>
                      ))}
                    </div>
                  </div>

                  {getValues("visaInfo.willingnessToRelocate") === "Yes" && (
                    <div className="column">
                      <p className="text-m-semibold">Ortspräferenz</p>
                      <div>
                        {preferCity.map((item, index) => (
                          <div key={index} className="radio_item start">
                            <input
                              type="checkbox"
                              id={`checkbox_${index}`}
                              {...register(
                                `visaInfo.preferredCitySize.${item.text}`
                              )}
                            />
                            <label htmlFor={`checkbox_${index}`}>
                              {item.name}
                            </label>
                          </div>
                        ))}
                        <div className="radio_item start">
                          <input
                            type="checkbox"
                            id={`checkbox_preferredCity`}
                            {...register(`visaInfo.preferredCity`)}
                          />
                          <label htmlFor={`checkbox_preferredCity`}>
                            A specific city
                          </label>
                        </div>
                      </div>
                    </div>
                  )}
                  {!isJotForm &&
                    preferredCity &&
                    getValues("visaInfo.willingnessToRelocate") === "Yes" && (
                      <div className="column">
                        <p className="text-m-semibold">Städte</p>
                        <Controller
                          name="visaInfo.preferredCityName"
                          control={control}
                          render={({ field }) => (
                            <ItemList
                              type="simpleList"
                              searchType="server"
                              value={field.value}
                              onChange={field.onChange}
                              address="common_source/get_city_germany"
                              listName="visaInfo.preferredCityName"
                            />
                          )}
                        />
                      </div>
                    )}
                  {isJotForm && (
                    <div className="row gap" ref={personalRef}>
                      <div className={styles.infoItem}>
                        <p className="text-m-semibold">Location</p>
                        <input
                          type="text"
                          value={talentData.visaInfo.preferredCityName}
                          readOnly
                        />
                      </div>
                    </div>
                  )}
                </div>
              </div>
              {!isJotForm && (
                <>
                  <hr className={styles.blockDivide} />

                  {/* GOAL AND SKILL */}

                  <div ref={personalRef} className="row gap">
                    <div className="column gap-8 flexOne">
                      <h3>Karriereziele</h3>
                      <Controller
                        name="career.careerGoals"
                        control={control}
                        rules={{
                          validate: (value) => {
                            if (value.length >= 1) {
                              return true;
                            } else {
                              return "Please add at least one career";
                            }
                          },
                        }}
                        render={({ field }) => (
                          <>
                            <ItemList
                              type="experienceList"
                              searchType="server"
                              address="/common_source/get_job_titles"
                              reqParam="language=en"
                              onChange={field.onChange}
                              value={field.value || []}
                              listName="career.careerGoals"
                              itemNameKey="careerTitle"
                              itemLevelKey="careerExperience"
                              children={
                                <div className="start center">
                                  <input
                                    type="checkbox"
                                    id="career.interestedApprenticeship"
                                    {...register(
                                      "career.interestedApprenticeship"
                                    )}
                                  />
                                  <label htmlFor="career.interestedApprenticeship">
                                    I’m also interested in an Apprenticeship
                                    (Ausbildung){" "}
                                  </label>
                                </div>
                              }
                            />
                            {errors.career?.careerGoals?.type ===
                              "validate" && (
                              <p className="error">
                                {errors.career?.careerGoals.message}
                              </p>
                            )}
                          </>
                        )}
                      />
                      <SalaryInput varName={"career"} />
                    </div>
                    <div className="column gap-8 flexOne">
                      <h3>Skills</h3>
                      <Controller
                        name="career.skills"
                        control={control}
                        rules={{
                          validate: (value) => {
                            if (value.length >= 5) {
                              return true;
                            } else {
                              return "Please add at least 5 skills";
                            }
                          },
                        }}
                        render={({ field }) => (
                          <>
                            <ItemList
                              type="experienceList"
                              searchType="server"
                              address="/common_source/get_skills"
                              reqParam={`language=en&job_titles=${jobTitles}`}
                              onChange={field.onChange}
                              value={field.value || []}
                              listName="career.skills"
                              itemNameKey="skillName"
                              itemLevelKey="skillLevel"
                            />
                            {errors.career?.skills?.type === "validate" && (
                              <p className="error">
                                {errors.career?.skills?.message}
                              </p>
                            )}
                          </>
                        )}
                      />
                    </div>
                  </div>
                </>
              )}

              <hr className={styles.blockDivide} />

              {/* PERSONAL */}
              <h3>Persönliches</h3>
              {!isJotForm ? (
                <div className="column gap-16">
                  <p className="text-m-semibold">Personal Interests</p>
                  <Controller
                    control={control}
                    name="personalInterests"
                    render={({ field }) => (
                      <PersonalInterests
                        onChange={field.onChange}
                        value={field.value}
                      />
                    )}
                  />

                  <p ref={commentRef} className="text-m-semibold">
                    Größte berufliche Herausforderung
                  </p>
                  <Controller
                    control={control}
                    name="professionalChallenge"
                    rules={{ validate: validateWordCount }}
                    render={({ field }) => (
                      <ProfessionalChallengeForm
                        onChange={field.onChange}
                        value={field.value}
                      />
                    )}
                  />
                  {errors?.professionalChallenge?.message && (
                    <p className="error">
                      {errors?.professionalChallenge?.message}
                    </p>
                  )}

                  <p ref={uploadRef} className="text-m-semibold">
                    Anmerkungen
                  </p>
                  <Controller
                    control={control}
                    name="notes"
                    render={({ field }) => (
                      <NotesForm
                        onChange={field.onChange}
                        value={field.value}
                      />
                    )}
                  />
                </div>
              ) : (
                <div className="column gap-16">
                  <p className="text-m-semibold">Soft Skills</p>
                  <div className={styles.softSkillsGrid}>
                    {Object.keys(skillData).map((key) => (
                      <div key={key} className={styles.skillRow}>
                        <span className={styles.skillLabel}>
                          {skillLabels[key][0]}
                        </span>
                        {[1, 2, 3, 4, 5].map((value) => (
                          <span key={value} className={styles.skillPoint}>
                            <input
                              type="radio"
                              name={key}
                              checked={skillData[key] === value}
                              readOnly
                            />
                          </span>
                        ))}
                        <span className={styles.skillLabel}>
                          {skillLabels[key][1]}
                        </span>
                      </div>
                    ))}
                  </div>
                  <p className="text-m-semibold">Werte und Einstellung</p>
                  <div className={styles.softSkillsGrid}>
                    <div className={styles.skillRow}>
                      <span style={{ width: "220px" }}>Work-Life-Balance</span>
                      {[1, 2, 3, 4, 5].map((value) => (
                        <span key={value} className={styles.skillPoint}>
                          <input
                            type="radio"
                            name={"Work-Life-Balance"}
                            checked={
                              talentData.values.workLifeBalance === value
                            }
                            readOnly
                          />
                        </span>
                      ))}
                    </div>
                    <div className={styles.skillRow}>
                      <span style={{ width: "220px" }}>
                        Moderne Unternehmenskultur
                      </span>
                      {[1, 2, 3, 4, 5].map((value) => (
                        <span key={value} className={styles.skillPoint}>
                          <input
                            type="radio"
                            name={"Moderne Unternehmenskultur"}
                            checked={talentData.values.modernity === value}
                            readOnly
                          />
                        </span>
                      ))}
                    </div>
                    <div className={styles.skillRow}>
                      <span style={{ width: "220px" }}>
                        Selbstbestimmtes Arbeiten
                      </span>
                      {[1, 2, 3, 4, 5].map((value) => (
                        <span key={value} className={styles.skillPoint}>
                          <input
                            type="radio"
                            name={"Selbstbestimmtes Arbeiten"}
                            checked={talentData.values.selfManagement === value}
                            readOnly
                          />
                        </span>
                      ))}
                    </div>
                    <div className={styles.skillRow}>
                      <span style={{ width: "220px" }}>Aufstiegschancen</span>
                      {[1, 2, 3, 4, 5].map((value) => (
                        <span key={value} className={styles.skillPoint}>
                          <input
                            type="radio"
                            name={"Aufstiegschancen"}
                            checked={
                              talentData.values.opportunitiesForAdvancement ===
                              value
                            }
                            readOnly
                          />
                        </span>
                      ))}
                    </div>
                    <div className={styles.skillRow}>
                      <span style={{ width: "220px" }}>Remote-Arbeiten</span>
                      {[1, 2, 3, 4, 5].map((value) => (
                        <span key={value} className={styles.skillPoint}>
                          <input
                            type="radio"
                            name={"Remote-Arbeiten"}
                            checked={talentData.values.homeOffice === value}
                            readOnly
                          />
                        </span>
                      ))}
                    </div>
                  </div>
                  <p className="text-m-semibold">Unternehmenswerte</p>
                  <div>
                    {talentData?.values?.companyValues
                      .split(",")
                      .map((item, index) => (
                        <div key={index}>{`- ${item.trim()}`}</div>
                      ))}
                  </div>
                </div>
              )}

              <hr className={styles.blockDivide} />
            </div>
          </form>
        </FormProvider>

        {/* DOCUMENT */}
        <div className="row gap">
          <div className="column gap-8 flexOne">
            <h3>Anhänge</h3>
            <div className="column gap-16">
              <div className="row space-between">
                <p className="text-m-semibold">Curriculum Vitae (optional)</p>
                <button
                  className="add"
                  // onClick={() => handleButtonClick(fileInputRef)}
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
              {Array.isArray(talentData.documents.cv) &&
                talentData.documents.cv.length > 0 &&
                talentData.documents.cv.map((item, index) => (
                  <div key={index} className="start">
                    {deleting[item.documentId] ? (
                      <CircularProgress size={24} color="warning" />
                    ) : (
                      <i
                        style={{ cursor: "pointer" }}
                        className="material-symbols-outlined"
                        // onClick={() => handleDelete(item.documentId)}
                      >
                        close
                      </i>
                    )}
                    <a
                      className="tertiary"
                      onClick={() => handleDownloadFile(item.documentId)}
                    >
                      {item.name}
                    </a>
                  </div>
                ))}
              <div className="row space-between">
                <p className="text-m-semibold">Other documents (optional)</p>
                <button
                  className="add"
                  // onClick={() => handleButtonClick(fileInputRef2)}
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
              {Array.isArray(talentData.documents.additional) &&
                talentData.documents.additional.length > 0 &&
                talentData.documents.additional.map((item, index) => (
                  <div key={index} className="start">
                    {deleting[item.documentId] ? (
                      <CircularProgress size={24} color="warning" />
                    ) : (
                      <i
                        style={{ cursor: "pointer" }}
                        className="material-symbols-outlined"
                        // onClick={() => handleDelete(item.documentId)}
                      >
                        close
                      </i>
                    )}
                    <a
                      className="tertiary"
                      onClick={() => handleDownloadFile(item.documentId)}
                    >
                      {item.name}
                    </a>
                  </div>
                ))}
            </div>
          </div>
          {/* COMMENT */}
          <div className="column gap-8 flexOne">
            <AdminComment
              type={"talent"}
              id={talentId}
              comments={talentData.comments}
              onUpdate={() => onUpdate()}
            />
          </div>
        </div>
        {/* HISTORY */}
        <div
          className="column gap-8 flexOne"
          style={{ paddingBottom: "400px" }}
        >
          <AdminHistory histories={talentData.histories} />
        </div>
      </div>
      <Modal
        active={modalActive}
        setActive={setModalActive}
        children={modalContent}
      />
    </div>
  );
};

export default AdminTalentView;
