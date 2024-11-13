import React, { useEffect, useState } from "react";
import axiosInstance from "../../lib/axios/AxiosConfig";
import Dropdown from "../../components/Dropdown/Dropdown";
import styles from "./languageSelect.module.css";
import AddIcon from "@mui/icons-material/Add";

/**
 *
 * @param {string} language
 * @param {Array} knowledgeList
 * @returns
 */
/* knowledgeList example
{
  "language": "English",
  "level": "3",
  "reviewedLevel": "0"
},
{
  "language": "German",
  "level": "5",
  "reviewedLevel": "0"
}
 */
// language supported en,de
const LanguageSelect = ({ language, knowledgeList, onChange }) => {
  const [languageNames, setLanguageNames] = useState([]);

  const levels =
    language === "en"
      ? [
          { level: "0", name: "No knowledge" },
          { level: "1", name: "A1 - Beginner" },
          { level: "2", name: "A2 - Basics" },
          { level: "3", name: "B1 - Intermediate" },
          { level: "4", name: "B2 - Good intermediate level" },
          { level: "5", name: "C1 - Advanced knowledge" },
          { level: "6", name: "C2 - Excellent knowledge" },
        ]
      : [
          { level: "0", name: "Keine Kenntnisse" },
          { level: "1", name: "A1 - Einsteiger" },
          { level: "2", name: "A2 - Grundlagen" },
          { level: "3", name: "B1 - Mittelstufe" },
          { level: "4", name: "B2 - Gute Mittelstufe" },
          { level: "5", name: "C1 - Fortgeschrittene Kenntnisse" },
          { level: "6", name: "C2 - Exzellente Kenntnisse" },
        ];

  useEffect(() => {
    const queryString = `/common_source/get_language_names?language=${language}`;
    const fetchInitialData = async () => {
      try {
        const response = await axiosInstance.get(queryString);
        setLanguageNames(response.data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchInitialData();
  }, [language]);

  const addLanguage = () => {
    const lastItem = knowledgeList[knowledgeList.length - 1];
    if (lastItem.language !== "") {
      onChange([
        ...knowledgeList,
        { language: "", level: "0", reviewedLevel: "0" },
      ]);
    }
  };

  const removeLanguage = (index) => {
    if (index >= 2) {
      onChange(knowledgeList.filter((_, i) => i !== index));
    }
  };

  const handleLanguageChange = (index, field, value) => {
    const updatedList = knowledgeList.map((item, i) =>
      i === index
        ? {
            ...item,
            [field]: value,
          }
        : item
    );
    onChange(updatedList);
  };

  const getAvailableLanguages = (index) => {
    return languageNames.filter(
      (lang) =>
        lang === knowledgeList[index].language ||
        !knowledgeList.some((item, i) => i !== index && item.language === lang)
    );
  };

  return (
    <div className={styles.languageWrapper}>
      {knowledgeList.map((item, index) => (
        <div key={index} className={styles.languageRow}>
          <div className={styles.language_column}>
            <Dropdown
              selectedValue={item.language}
              onSelect={(value) =>
                handleLanguageChange(index, "language", value)
              }
              options={getAvailableLanguages(index)}
              label="Select language"
              disabled={index < 2}
            />
          </div>
          <div className={styles.language_column}>
            <Dropdown
              selectedValue={
                levels.find((level) => level.level === item.level)?.name || ""
              }
              onSelect={(value) =>
                handleLanguageChange(
                  index,
                  "level",
                  levels.find((level) => level.name === value)?.level || "0"
                )
              }
              options={levels.map((level) => level.name)}
              label="Select level"
            />
          </div>

          <button
            onClick={() => removeLanguage(index)}
            className={styles.removeButton}
            style={{ opacity: index < 2 ? 0 : 1 }}
            type="button"
            disabled={index < 2}
          >
            <span
              className="material-symbols-outlined"
              style={{ fontSize: "32px" }}
            >
              close
            </span>
          </button>
        </div>
      ))}
      <button onClick={addLanguage} className={styles.addButton} type="button">
        <AddIcon fontSize="large" color="inherit" />
      </button>
    </div>
  );
};

export default LanguageSelect;
