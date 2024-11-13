import React, { useState } from "react";
import styles from "./AdminJobOffers.module.css";
import { useNavigate } from "react-router-dom";
import Language from "../../../common/Language";
import workLevel from "../../../common/workLevel";
import { useAdmin } from "../../../context/AdminContext/AdminContext";
import DropdownWithSearch from "../../../components/DropdownWithSearch/DropdownWithSearch";
import BubbleList from "../../../components/BubbleList/BubbleList";
import Worm from "../../../components/Worm/Worm";
import LanguageSelect from "../../../components/languageSelect/languageSelect";
import Fuse from "fuse.js";

const statusOption = [
  { id: "radio_status_null", label: "Alle", status: -1 },
  { id: "radio_status_1", label: "Live", status: 1 },
  { id: "radio_status_2", label: "Gespeichert", status: 2 },
  { id: "radio_status_0", label: "Deaktiviert", status: 0 },
];

function AdminJobOffers() {
  const { jobOffers } = useAdmin();
  const [searchName, setSearchName] = useState("");
  const [selectedIndustry, setSelectedIndustry] = useState([]);
  const [selectedLocation, setSelectedLocation] = useState([]);
  const [selectedExp, setSelectedExp] = useState({
    name: "Beliebig",
    text: 0,
  });
  const [selectedStatus, setSelectedStatus] = useState(-1);
  const [languageList, setLanguageList] = useState([
    { language: "Englisch", level: "0" },
    { language: "Deutsch", level: "0" },
  ]);

  const navigate = useNavigate();

  if (!jobOffers) {
    return <>Loading...</>;
  }

  const uniqueIndustries = [
    ...new Set(jobOffers.map((item) => item.hardFacts.jobDescription.industry)),
  ];
  const uniqueLocations = [
    ...new Set(jobOffers.map((item) => item.hardFacts.jobDescription.location)),
  ];

  const SortableTable = () => {
    const [data, setData] = useState(jobOffers);
    const [sortConfig, setSortConfig] = useState({ key: "", direction: "asc" });
    const navigate = useNavigate();

    const fuseOptions = {
      keys: ["hardFacts.jobDescription.jobTitle"],
      threshold: 0.3,
    };

    const fuse = new Fuse(data, fuseOptions);

    const fuzzyFilteredData = searchName
      ? fuse.search(searchName).map((result) => result.item)
      : data;

    const filteredData = fuzzyFilteredData.filter((item) => {
      const matchesIndustry =
        selectedIndustry.length === 0
          ? true
          : selectedIndustry.includes(item.hardFacts.jobDescription.industry);

      const matchesLocation =
        selectedLocation.length === 0
          ? true
          : selectedLocation.includes(item.hardFacts.jobDescription.location);

      const matchesExp =
        selectedExp.text === 0
          ? true
          : item.neededSkills.experience >= selectedExp.text;

      const matchesStatus =
        selectedStatus === -1 ? true : item.jobOfferStatus === selectedStatus;

      const matchesLanguages =
        languageList.length === 0
          ? true
          : languageList
              .filter((selectedLanguage) => selectedLanguage.level !== "0") // Исключаем языки с уровнем 0
              .every((selectedLanguage) =>
                item.neededSkills.skills.language.some(
                  (jobLanguage) =>
                    jobLanguage.language === selectedLanguage.language &&
                    jobLanguage.level >= selectedLanguage.level
                )
              );

      return (
        matchesIndustry &&
        matchesLocation &&
        matchesExp &&
        matchesStatus &&
        matchesLanguages
      );
    });

    const handleSort = (key) => {
      let direction = "asc";
      if (sortConfig.key === key && sortConfig.direction === "asc") {
        direction = "desc";
      }

      const sortedData = [...filteredData].sort((a, b) => {
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
                className={styles.table_company}
                onClick={() => handleSort("companyName")}
              >
                Unternehmen
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
            {filteredData.map((item) => (
              <tr key={item.jobOfferId}>
                <td className={styles.cell50}>{item.priority}</td>
                <td className={styles.cell100}>
                  {new Date(item.creationDate).toLocaleDateString()}
                </td>
                <td className={styles.cellfree}>
                  {item.hardFacts.jobDescription.jobTitle}
                </td>
                <td className={styles.cellfree}>{item.companyName}</td>
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

  const reset = () => {
    setSelectedStatus(-1);
    setLanguageList([
      { language: "Englisch", level: "0" },
      { language: "Deutsch", level: "0" },
    ]);
    setSelectedIndustry([]);
    setSelectedLocation([]);
    setSelectedExp({
      name: "Beliebig",
      text: 0,
    });
  };

  return (
    <>
      <div className="column gap-32">
        <h2>Stellenanzeigen</h2>
        <div className={styles.filterWrapper}>
          <div className="row gap-32">
            <h3>Filter</h3>
            <button
              className="secondary small"
              type="button"
              onClick={() => reset()}
            >
              Filter zurücksetzen
            </button>
          </div>
          <form>
            <div className={styles.filterContainer}>
              <div className={styles.fiterColumn}>
                {/* INDUSRTY */}
                <div className="content-part">
                  <p className="text-m-semibold">Branchen</p>
                  <DropdownWithSearch
                    options={uniqueIndustries}
                    onSelect={(value) =>
                      setSelectedIndustry((prev) => {
                        if (prev.includes(value)) {
                          return prev.filter((item) => item !== value);
                        } else {
                          return [...prev, value];
                        }
                      })
                    }
                    selectedValue={selectedIndustry}
                  />
                  <BubbleList
                    list={selectedIndustry}
                    onDelete={(value) =>
                      setSelectedIndustry((prev) =>
                        prev.filter((item) => item !== value)
                      )
                    }
                  />
                </div>

                {/* LOCATION */}
                <div className="content-part">
                  <p className="text-m-semibold">Standort</p>
                  <DropdownWithSearch
                    options={uniqueLocations}
                    onSelect={(value) =>
                      setSelectedLocation((prev) => {
                        if (prev.includes(value)) {
                          return prev.filter((item) => item !== value);
                        } else {
                          return [...prev, value];
                        }
                      })
                    }
                    selectedValue={selectedLocation}
                  />
                  <BubbleList
                    list={selectedLocation}
                    onDelete={(value) =>
                      setSelectedLocation((prev) =>
                        prev.filter((item) => item !== value)
                      )
                    }
                  />
                </div>

                {/* EXPERIENCE */}
                <div className="content-part">
                  <p className="text-m-semibold">
                    Erwünschte Berufserfahrung in Jahren
                  </p>
                  <Worm
                    options={[
                      {
                        name: "Beliebig",
                        text: 0,
                      },
                      ...workLevel.map((item) => ({
                        name: item.name,
                        text: item.text,
                      })),
                    ]}
                    display={"name"}
                    selectedValue={selectedExp}
                    onSelect={(value) => setSelectedExp(value)}
                  />
                </div>
              </div>
              <div className={styles.fiterColumn}>
                {/* LANGUAGE */}
                <div className="content-part">
                  <p className="text-m-semibold">Sprachkenntnisse</p>
                  <LanguageSelect
                    language="de"
                    knowledgeList={languageList}
                    onChange={(value) => setLanguageList(value)}
                  />
                </div>

                {/* STATUS */}
                <div className="content-part">
                  <div className="column minGap">
                    <p className="text-m-semibold">Status</p>
                    <div className="row space-between">
                      {statusOption.map((option) => (
                        <div key={option.id}>
                          <input
                            className="real-radio"
                            type="radio"
                            id={option.id}
                            value={option.status}
                            name="status"
                            checked={selectedStatus === option.status}
                            onChange={(e) =>
                              setSelectedStatus(Number(e.target.value))
                            }
                          />
                          <span className="custom-radio"></span>
                          <label htmlFor={option.id}>{option.label}</label>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </form>
        </div>

        <div className="content-part">
          <p className="text-m-semibold">Name</p>
          <input
            type="text"
            placeholder="Suchen"
            value={searchName}
            onChange={(e) => setSearchName(e.target.value)}
          />
        </div>
        <SortableTable />
      </div>
    </>
  );
}

export default AdminJobOffers;
