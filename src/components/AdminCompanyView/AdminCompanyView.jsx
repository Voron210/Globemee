import React, { useEffect, useState } from "react";
import styles from "./AdminCompanyView.module.css";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../../lib/axios/AxiosConfig";
import Language from "../../common/Language";
import workLevel from "../../common/workLevel";
import { Controller, FormProvider, useForm } from "react-hook-form";
import { SearchInput } from "../searchInput";
import ItemList from "../ItemList/ItemList";
import benefitsIcon from "../../common/benefitsIcon";
import AdminComment from "../AdminComment/AdminComment";
import ReactPlayer from "react-player";
import { CircularProgress } from "@mui/material";
import KanbanBoard from "../KanbanBoard/KanbanBoard";

// {
//     "comments": "null",
//     "companyId": "04287627-881b-408f-a6be-e3ea1169a17e",
//     "facts": {
//         "address": "Lichtenfelser Str. 20, 95326 Kulmbach",
//         "benefits": [],
//         "briefIntroduction": "",
//         "companyNumber": "",
//         "contact": {
//             "contactDepartment": "Personalentwicklung",
//             "contactEmail": [
//                 "melina.witzgall@ireks.com",
//                 []
//             ],
//             "contactName": "Melina",
//             "contactPhone": "092217066271"
//         },
//         "documents": {
//             "logo": {},
//             "photos": []
//         },
//         "employeesNumber": "",
//         "industry": "Ernährungswirtschaft",
//         "name": "IREKS GmbH ",
//         "sector": "",
//         "type": "",
//         "values": [
//             "Loyalität",
//             "Familie",
//             "Innovation",
//             "Zuverlässigkeit",
//             "Nachhaltigkeit",
//             "Verantwortung"
//         ],
//         "videos": [],
//         "website": "https://www.ireks.com/"
//     },
//     "numberHiring": 0,
//     "numberJobOffers": 1,
//     "priority": 0,
//     "users": [
//         {
//             "companyUserId": "d37eec29-0b0b-4c96-95ba-42bfe944e8b9",
//             "department": "Personalentwicklung",
//             "emailConfirmationStatus": 10,
//             "emailResetToken": null,
//             "expirationEmailResetToken": null,
//             "expirationPasswordResetToken": null,
//             "name": "Melina",
//             "phone": "092217066271",
//             "surname": "Witzgall",
//             "userEmail": "melina.witzgall@ireks.com"
//         }
//     ]
// }

const sektorOptions = [
  { id: "radio_sector_public", label: "Öffentlicher Dienst" },
  { id: "radio_secotr_private", label: "Privatwirtschaft" },
];
const typeOptions = [
  { id: "radio_startup", label: "Startup" },
  { id: "radio_small_business", label: "Kleinunternehmen" },
  { id: "radio_medium_business", label: "Mittelstand" },
  { id: "radio_corporation", label: "Konzern" },
];

const AdminCompanyView = ({ company_id }) => {
  const navigate = useNavigate();
  const [companyData, setCompanyData] = useState(null);
  const [jobOffers, setJobOffers] = useState(null);
  const [matches, setMatches] = useState(null);
  const navigateOptions = [];

  useEffect(() => {
    if (company_id) {
      getCompany();
    }
  }, [company_id]);

  const methods = useForm({
    defaultValues: {
      facts: {
        address: [],
        benefits: [],
        briefIntroduction: "",
        contact: {
          contactEmail: [],
          contactName: "",
        },
        documents: {
          logo: {
            documentId: "",
            file: "",
            name: "",
          },
          photos: [],
        },
        employeesNumber: "",
        industry: "",
        name: "",
        sector: "Öffentlicher Dienst",
        type: "Startup",
        values: [],
        videos: [],
        website: "",
        companyNumber: "",
      },
    },
  });

  const onUpdate = () => {
    getCompany();
  };

  const {
    register,
    control,
    formState: { errors },
    watch,
    reset,
    setValue,
    getValues,
    handleSubmit,
  } = methods;

  const getCompany = async () => {
    try {
      const response = await axiosInstance.get(`a_company/one/${company_id}`);
      setCompanyData(response.data[0]);
      setJobOffers(response.data[1].jobOffers);
      setMatches(response.data[2].matches);
    } catch (error) {}
  };

  useEffect(() => {
    if (companyData) {
      reset({
        facts: {
          address: companyData.facts.address || [],
          benefits: companyData.facts.benefits || [],
          briefIntroduction: companyData.facts.briefIntroduction || "",
          contact: {
            contactEmail: companyData.facts.contact?.contactEmail || [],
            contactName: companyData.facts.contact?.contactName || "",
          },
          documents: {
            logo: companyData.facts.documents?.logo || {
              documentId: "",
              file: "",
              name: "",
            },
            photos: companyData.facts.documents?.photos || [],
          },
          employeesNumber: companyData.facts.employeesNumber || "",
          industry: companyData.facts.industry || "",
          name: companyData.facts.name || "",
          sector: companyData.facts.sector || "Öffentlicher Dienst",
          type: companyData.facts.type || "Startup",
          values: companyData.facts.values || [],
          videos: companyData.facts.videos || [],
          website: companyData.facts.website || "",
          companyNumber: companyData.facts.companyNumber || "",
        },
      });
    }
  }, [companyData, reset]);

  const [newEmail, setNewEmail] = useState("");
  const [isHovered, setIsHovered] = useState(false);
  const emailPattern = /^\S+@\S+\.\S+$/;

  const handleAddEmail = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      addEmail();
    }
  };

  const addEmail = () => {
    if (!emailPattern.test(newEmail)) {
      return;
    }

    const currentEmails = watch("facts.contact.contactEmail") || [];
    if (currentEmails.includes(newEmail)) {
      setNewEmail("");
      return;
    }

    setValue("facts.contact.contactEmail", [...currentEmails, newEmail]);
    setNewEmail("");
  };

  const handleRemoveEmail = (index) => {
    const currentEmails = watch("facts.contact.contactEmail") || [];
    setValue(
      "facts.contact.contactEmail",
      currentEmails.filter((_, i) => i !== index)
    );
  };

  const isEmailValid = (email) => {
    return emailPattern.test(email);
  };

  const SortableTable = ({ jobOfferStatus }) => {
    const [data, setData] = useState(
      jobOffers.filter((item) => item.jobOfferStatus === jobOfferStatus)
    );
    const [sortConfig, setSortConfig] = useState({ key: "", direction: "asc" });
    const navigate = useNavigate();

    const handleSort = (key) => {
      let direction = "asc";
      if (sortConfig.key === key && sortConfig.direction === "asc") {
        direction = "desc";
      }

      const sortedData = [...data].sort((a, b) => {
        const valueA = getValueByKey(a, key);
        const valueB = getValueByKey(b, key);

        if (valueA < valueB) {
          return direction === "asc" ? -1 : 1;
        }
        if (valueA > valueB) {
          return direction === "asc" ? 1 : -1;
        }
        return 0;
      });

      setData(sortedData);
      setSortConfig({ key, direction });
    };

    const getValueByKey = (item, key) => {
      switch (key) {
        case "priority":
          return item.priority;
        case "creationDate":
          return new Date(item.creationDate);
        case "jobTitle":
          return item.hardFacts.jobDescription.jobTitle;
        case "companyName":
          return item.companyName;
        case "location":
          return item.hardFacts.jobDescription.location;
        case "language":
          return item.neededSkills.skills.language
            .map((lang) => `${lang.language} (Level ${lang.level})`)
            .join(", ");
        case "experience":
          return item.neededSkills.experience;
        default:
          return "";
      }
    };

    return (
      <div className={styles.tableWrapper}>
        <table>
          <thead>
            <tr className={styles.table_head}>
              <th
                className={styles.table_prio}
                onClick={() => handleSort("priority")}
              >
                Prio
              </th>
              <th
                className={styles.table_creation}
                onClick={() => handleSort("creationDate")}
              >
                Erstellung
              </th>
              <th
                className={styles.table_title}
                onClick={() => handleSort("jobTitle")}
              >
                Stellenbeschreibung
              </th>
              <th
                className={styles.table_location}
                onClick={() => handleSort("location")}
              >
                Standort
              </th>
              <th
                className={styles.table_lang}
                onClick={() => handleSort("language")}
              >
                Sprachskill
              </th>
              <th
                className={styles.table_exp}
                onClick={() => handleSort("experience")}
              >
                Erfahrung
              </th>
              <th className={styles.table_btn}></th>
            </tr>
          </thead>
          <tbody>
            {data.map((item) => (
              <tr key={item.jobOfferId}>
                <td className={styles.cell50}>{item.priority}</td>
                <td className={styles.cell100}>
                  {new Date(item.creationDate).toLocaleDateString()}
                </td>
                <td className={styles.cellfree}>
                  {item.hardFacts.jobDescription.jobTitle}
                </td>
                <td className={styles.cellfree}>
                  {item.hardFacts.jobDescription.location}
                </td>
                <td className={styles.cell100}>
                  {item.neededSkills.skills.language
                    .map(
                      (lang) =>
                        `${lang.language} (${
                          Language.find((level) => level.level === lang.level)
                            .short
                        })`
                    )
                    .map((langText, index) => (
                      <span key={index}>
                        {langText}
                        <br />
                      </span>
                    ))}
                </td>
                <td className={styles.cell100}>
                  {item.neededSkills.experience
                    ? workLevel.find(
                        (level) => level.text === item.neededSkills.experience
                      ).shortDe
                    : "Beliebig"}
                </td>
                <td>
                  <button
                    onClick={() =>
                      navigate(
                        `/admin-job-offers?joboffer_id=${item.jobOfferId}`
                      )
                    }
                    className="primary circle"
                  >
                    <i
                      className="material-symbols-outlined"
                      style={{ fontSize: "16px" }}
                    >
                      arrow_forward_ios
                    </i>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  };

  const [columns, setColumns] = useState([]);
  const setMatchPosition = () => {};

  useEffect(() => {
    if (matches) {
      let items = matches?.map((item) => ({
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
  }, [matches]);

  if (!companyData) {
    return <>Loading...</>;
  }

  const onSubmit = (data) => {
    // console.log(data);
  };

  return (
    <div className={styles.modalBackground}>
      <div className={styles.jobHead}>
        <div className={styles.headContent}>
          <div className="row space-between center">
            <h3>{`${companyData.facts.name}`}</h3>
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
        {/* GENERAL INFO */}
        <div className="row gap start">
          <div className={styles.infoItem}>
            <p className="text-m-semibold">
              Stellenanzeigen: {companyData.numberJobOffers}
            </p>
          </div>
          <div className={styles.infoItem}>
            <p className="text-m-semibold">
              Einstellungen: {companyData.numberHiring}
            </p>
          </div>
          <div className={styles.infoItem}>
            <p className="text-m-semibold">
              Priorisierung: {companyData.priority}
            </p>
          </div>
        </div>
        {/* JOB OFFER */}
        <div className="column gap-32">
          <div className="column gap-8">
            <h3>Aktuelle Stellenanzeigen</h3>
            <SortableTable jobOfferStatus={1} />
          </div>
          <div className="column gap-8">
            <h3>Gespeicherte Stellenanzeigen</h3>
            <SortableTable jobOfferStatus={0} />
          </div>
          <div className="column gap-8">
            <h3>Deaktivierte Stellenanzeigen</h3>
            <SortableTable jobOfferStatus={-1} />
          </div>
        </div>

        {/* JOB OFFER */}
        <div>
          <KanbanBoard
            onChangePosition={setMatchPosition}
            columns={columns}
            setColumns={setColumns}
            role={"admin"}
          />
        </div>

        <FormProvider {...methods}>
          <form onSubmit={handleSubmit(onSubmit)}>
            <>
              <h3>Allgemeine Informationen</h3>
              <div className="column">
                <p className="text-m-semibold">Unternehmensname</p>
                <input type="text" {...register("facts.name")} />
              </div>
              <div className="column">
                <p className="text-m-semibold">Branche</p>
                <SearchInput
                  searchType={"front"}
                  selectedItems={watch("facts.industry")}
                  varName="facts.industry"
                  address={"/common_source/get_industries"}
                  reqParam={"language=de"}
                />
              </div>
              <div className="column">
                <p className="text-m-semibold">Sektor</p>
                {/* <div className="radio_list"> */}
                <div className="column minGap">
                  {sektorOptions.map((option) => (
                    <div className="radio_item" key={option.id}>
                      <input
                        className="real-radio"
                        type="radio"
                        id={option.id}
                        value={option.label}
                        {...register("facts.sector", {
                          required: true,
                        })}
                      />
                      <span className="custom-radio"></span>
                      <label htmlFor={option.id}>{option.label}</label>
                    </div>
                  ))}
                </div>
              </div>
              <div className="column">
                <p className="text-m-semibold">Typ</p>
                {/* className="radio_list" */}
                <div className="column minGap">
                  {typeOptions.map((option) => (
                    // className="radio_item"
                    <div key={option.id}>
                      <input
                        className="real-radio"
                        type="radio"
                        id={option.id}
                        value={option.label}
                        {...register("facts.type", {
                          required: true,
                        })}
                      />
                      <span className="custom-radio"></span>
                      <label htmlFor={option.id}>{option.label}</label>
                    </div>
                  ))}
                </div>
              </div>
              <div className="column">
                <p className="text-m-semibold">Standort</p>
                {Array.isArray(companyData.facts.address) ? (
                  <Controller
                    name="facts.address"
                    control={control}
                    render={({ field }) => (
                      <ItemList
                        searchType={"server"}
                        value={field.value}
                        onChange={field.onChange}
                        type={"simpleList"}
                        listName={"facts.address"}
                        address={"/common_source/get_plz_city_germany"}
                      />
                    )}
                  />
                ) : (
                  <input
                    type="text"
                    readOnly
                    value={companyData.facts.address}
                  />
                )}
              </div>
              <div className="column">
                <p className="text-m-semibold">Anzahl Mitarbeiter</p>
                <input type="text" {...register("facts.employeesNumber")} />
              </div>
              <div className="column">
                <p className="text-m-semibold">Link zur Website</p>
                {/* <input type="text" {...register("facts.website")} /> */}
                <input
                  type="text"
                  className={`${errors.facts?.website && "error"}`}
                  {...register("facts.website", {
                    validate: (value) =>
                      value === "" ||
                      /^(https?:\/\/)?([\w-]+(\.[\w-]+)+\.?)([^\s]*)?$/.test(
                        value
                      ) ||
                      "Please enter a valid URL",
                  })}
                />
              </div>
              <div className="column">
                <div className="row">
                  <p className="text-m-semibold">Betriebsnummer</p>
                </div>
                <input type="text" {...register("facts.companyNumber")} />
              </div>
              <div className="column">
                <p className="text-m-semibold">Kurzvorstellung</p>
                <textarea {...register("facts.briefIntroduction")} />
              </div>

              <h3>Kontakt / Benachrichtigungen</h3>
              <div className="column">
                <p className="text-m-semibold">Kontaktperson</p>
                <input type="text" {...register("facts.contact.contactName")} />
              </div>
              <div className="column">
                <p className="text-m-semibold">
                  Benachrichtigungen bei neuen Matches an
                </p>
                <div style={{ position: "relative" }}>
                  <input
                    type="email"
                    value={newEmail}
                    // onChange={(e) => setNewEmail(e.target.value)}
                    onKeyDown={handleAddEmail}
                  />
                  {isEmailValid(newEmail) && (
                    <div
                      style={{
                        position: "absolute",
                        display: "flex",
                        justifyContent: "flex-start",
                        alignItems: "center",
                        paddingLeft: "25px",
                        height: 50,
                        top: 50,
                        left: 0,
                        width: "100%",
                        background: isHovered ? "var(--beige-80)" : "white", // Change color on hover
                        border: "1px solid black",
                        borderRadius: "8px",
                        boxSizing: "border-box",
                        transition: "background-color 0.3s", // Smooth transition for hover effect
                      }}
                      // onMouseEnter={() => setIsHovered(true)}
                      // onMouseLeave={() => setIsHovered(false)}
                      onClick={addEmail}
                    >
                      <p className="center">Hinzufügen: {newEmail}</p>
                    </div>
                  )}
                </div>
                {/* {emailError && <p style={{ color: "red" }}>{emailError}</p>} */}

                <Controller
                  name="facts.contact.contactEmail"
                  control={control}
                  render={({ field }) => (
                    <div className="flex_list">
                      {field.value?.map((email, index) => (
                        <div key={index} className="flex_item center">
                          {/* <CloseIcon onClick={() => handleRemoveEmail(index)} /> */}
                          <p>{email}</p>
                        </div>
                      ))}
                    </div>
                  )}
                />
              </div>

              <h3>Benefits</h3>
              <div className="column minGap">
                <h5>Your benefits</h5>
                <div className="column gap">
                  {companyData.facts.benefits.map((item, index) => (
                    <div key={index}>
                      <div
                        className="row gap-8"
                        style={{ color: "var(--petrol-100)" }}
                      >
                        <i className="material-symbols-outlined">
                          {benefitsIcon.find(
                            (benefit) => benefit.nameDe === item.benefitName
                          )?.icon || "default_icon"}
                        </i>
                        <p>{item.benefitName}</p>
                      </div>
                      <p>{item.benefitDescription}</p>
                    </div>
                  ))}
                </div>
              </div>

              <h3>Unternehmenswerte</h3>
              {companyData.facts.values && (
                <div className="column minGap">
                  <h5>Company values</h5>
                  <div className={styles.corpList}>
                    {companyData.facts.values.map((item, index) => (
                      <div className={styles.itemList} key={index}>
                        <p className="text-m-semibold">{item}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Media */}
              {(companyData.facts.videos.length > 0 ||
                companyData.facts.documents.photos.length > 0) && (
                <div className="column gap-16">
                  <h3>Fotos</h3>
                  <div className={styles.photoList}>
                    {companyData.facts.documents.photos.map((item, index) => (
                      <div className={styles.photoContainer} key={index}>
                        {item.file && (
                          <img
                            src={item.file}
                            className={styles.photo}
                            alt={`Company Photo ${index + 1}`}
                          />
                        )}
                        {!item.file && (
                          <div className={styles.photoPlace}>
                            <CircularProgress />
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                  <h3>Videos</h3>
                  <div className={styles.video_list}>
                    {companyData?.facts?.videos?.map((item, index) => (
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

              <div className="column gap-8 flexOne">
                <AdminComment
                  type={"talent"}
                  id={company_id}
                  comments={companyData.comments}
                  onUpdate={() => onUpdate()}
                />
              </div>
            </>
          </form>
        </FormProvider>
      </div>
    </div>
  );
};

export default AdminCompanyView;
