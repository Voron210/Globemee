import React, { useEffect, useState } from "react";
import styles from "./AdminMatchingTool.module.css";
import { Controller, FormProvider, useForm } from "react-hook-form";
import LanguageSelect from "../../../components/languageSelect/languageSelect";
import WormSelect from "../../../components/WormSelect";
import workLevel from "../../../common/workLevel";
import ItemList from "../../../components/ItemList/ItemList";
import SalaryInput from "../../../components/SalaryInput/SalaryInput";
import axiosInstance from "../../../lib/axios/AxiosConfig";
import { addGlobalNotification } from "../../../context/ModalContext/ModalContext";
import IscoSearch from "../../../components/IscoSearch/IscoSearch";
import BubbleList from "../../../components/BubbleList/BubbleList";
import Language from "../../../common/Language";
import { useNavigate, useSearchParams } from "react-router-dom";
import AdminTags from "../../../components/AdminTags/AdminTags";
import { useGetTagsQuery } from "../../../appApi";
import DropdownWithSearch from "../../../components/DropdownWithSearch/DropdownWithSearch";
import Fuse from "fuse.js";

function AdminMatchingTool() {
  const [talentList, setTalentList] = useState([]);
  const [jotFormList, setJotFormList] = useState([]);
  const [talentVisible, setTalentVisible] = useState(true);
  const [jotFormVisible, setJotFormVisible] = useState(true);
  const { data: tagsList, error, isLoading } = useGetTagsQuery();
  const [tagsFilter, setTagsFilter] = useState([]);
  const [searchName, setSearchName] = useState("");
  const navigate = useNavigate();
  const methods = useForm({
    defaultValues: {
      mustHaveSkills: [],
      commonSkills: [],
      jobTitle: [],
      experience: 0,
      language: [
        {
          language: "Englisch",
          level: "0",
        },
        {
          language: "Deutsch",
          level: "0",
        },
      ],
      industry: [],
      minSalary: 10000,
      maxSalary: 200000,
      visa: null,
      educationalConfirmation: null,
      willingnessToRelocate: null,
      interestedApprenticeship: false,
      isco_code: [],
    },
  });
  const {
    handleSubmit,
    formState: { errors },
    control,
    reset,
    setValue,
    getValues,
    register,
    watch,
  } = methods;

  const [searchParams, setSearchParams] = useSearchParams();
  useEffect(() => {
    const params = Object.fromEntries([...searchParams]);

    Object.keys(params).forEach((key) => {
      const value = params[key];

      if (key === "isco_code") {
        return;
      }
      if (key === "talentId") {
        return;
      }

      if (key === "language") {
        const languages = value.split(",").map((lang) => {
          const [language, level] = lang.split(":");
          return { language, level };
        });
        setValue(key, languages);
      } else if (
        key === "mustHaveSkills" ||
        key === "commonSkills" ||
        key === "jobTitle" ||
        key === "industry"
      ) {
        setValue(key, value.split("|"));
      } else if (
        key === "experience" ||
        key === "minSalary" ||
        key === "maxSalary"
      ) {
        setValue(key, parseInt(value, 10));
      } else if (key === "interestedApprenticeship") {
        setValue(key, value === "true");
      } else {
        setValue(key, value);
      }
    });
  }, [searchParams, setValue]);

  useEffect(() => {
    const subscription = watch((newParams) => {
      const params = {};

      Object.keys(newParams).forEach((key) => {
        const value = newParams[key];
        if (key === "isco_code") {
          return;
        }

        if (key === "language") {
          if (Array.isArray(value) && value.length > 0) {
            params[key] = value
              .map((lang) => `${lang.language}:${lang.level}`)
              .join(",");
          }
        } else if (Array.isArray(value) && value.length > 0) {
          params[key] = value.join("|");
        } else if (value && value !== "") {
          params[key] = value;
        }
      });
      setSearchParams(params);
    });

    return () => subscription.unsubscribe();
  }, [watch, setSearchParams]);

  const visa = [
    { name: "Ja", text: "Yes" },
    { name: "Nein", text: "No" },
    { name: "EU-Passport", text: "I have an EU Passport" },
  ];

  const educationConfirm = [
    { name: "Ja", text: "Yes" },
    { name: "Nein", text: "No" },
    { name: "Nicht sicher", text: "I don't know" },
  ];

  const relocate = [
    { name: "Ja", text: "Yes" },
    { name: "Nein", text: "Just remote" },
    { name: "Bereits in DE", text: "I already live in Germany" },
    { name: "Alle", text: "Both" },
  ];

  const onSubmit = async (data) => {
    data.isco_code = data.isco_code.map((item) => item.code);
    // console.log(data);

    const experienceLevels = [
      { id: 0, label: "(Beliebig)" },
      { id: 1, label: "0-0,5 Jahre Erfahrung" },
      { id: 2, label: "1-2 Jahre Erfahrung" },
      { id: 3, label: "3-5 Jahre Erfahrung" },
      { id: 4, label: "6-10 Jahre Erfahrung" },
      { id: 5, label: "10+ Jahre Erfahrung" },
    ];

    try {
      const [matchResponse, jotformResponse] = await Promise.all([
        axiosInstance.post(`m_match/match`, data),
        axiosInstance.post(`m_match/match_jotform`, {
          mustHaveSkills:
            data.mustHaveSkills.length > 0 ? data.mustHaveSkills : "null",
          commonSkills:
            data.commonSkills.length > 0 ? data.commonSkills : "null",
          experience: experienceLevels.find(
            (item) => item.id === data.experience
          ).label,
          germanLevel: data.language.find((item) => item.language === "Deutsch")
            .level,
          englishLevel: data.language.find(
            (item) => item.language === "Englisch"
          ).level,
          educationalConfirmation: data.educationalConfirmation
            ? data.educationalConfirmation
            : "null",
          visa: data.visa ? data.visa : "null",
        }),
      ]);

      // const [matchResponse] = await Promise.all([
      //   axiosInstance.post(`m_match/match`, data),
      // ]);

      if (Array.isArray(matchResponse.data)) {
        setTalentList(matchResponse.data);
        addGlobalNotification(
          `${
            matchResponse.data.length + jotformResponse.data.length
          } Datensätze gefunden`,
          "success"
        );
      } else {
        setTalentList([]);
        addGlobalNotification("Nichts gefunden", "warning");
      }

      setJotFormList(jotformResponse.data);
    } catch (error) {
      // console.error(error);
    }
  };

  const onUpdate = (id, tag, type) => {
    setTalentList((prevList) => {
      return prevList.map((item) => {
        // Если `type` равен "post", добавляем тег к конкретному таланту
        if (type === "post" && item.talentUserId === id) {
          // Проверяем, что тега еще нет в списке
          if (!item.tags.some((t) => t.id === tag.id)) {
            return { ...item, tags: [...item.tags, tag] }; // Добавляем тег
          }
        }

        // Если `type` равен "delete", удаляем тег у конкретного таланта
        if (type === "delete" && item.talentUserId === id) {
          return { ...item, tags: item.tags.filter((t) => t.id !== tag.id) }; // Удаляем тег
        }

        // Если `type` равен "remove", удаляем тег из всех талантов
        if (type === "remove") {
          return { ...item, tags: item.tags.filter((t) => t.id !== tag) }; // Удаляем тег
        }

        // Возвращаем объект без изменений, если условие не совпадает
        return item;
      });
    });

    setJotFormList((prevList) => {
      return prevList.map((item) => {
        // Если `type` равен "post", добавляем тег к конкретному таланту
        if (type === "post" && item.talentUserId === id) {
          // Проверяем, что тега еще нет в списке
          if (!item.tags.some((t) => t.id === tag.id)) {
            return { ...item, tags: [...item.tags, tag] }; // Добавляем тег
          }
        }

        // Если `type` равен "delete", удаляем тег у конкретного таланта
        if (type === "delete" && item.talentUserId === id) {
          return { ...item, tags: item.tags.filter((t) => t.id !== tag.id) }; // Удаляем тег
        }

        // Если `type` равен "remove", удаляем тег из всех талантов
        if (type === "remove") {
          return { ...item, tags: item.tags.filter((t) => t.id !== tag) }; // Удаляем тег
        }

        // Возвращаем объект без изменений, если условие не совпадает
        return item;
      });
    });
  };

  const SortableTable = ({ list }) => {
    const [data, setData] = useState(list);
    const [sortConfig, setSortConfig] = useState({ key: "", direction: "asc" });

    const fuseOptions = {
      keys: ["name"],
      threshold: 0.3,
    };

    const fuse = new Fuse(data, fuseOptions);

    const fuzzyFilteredData = searchName
      ? fuse.search(searchName).map((result) => result.item)
      : data;

    const filteredData = fuzzyFilteredData.filter((item) => {
      const matchesTags =
        tagsFilter.length === 0 ||
        item.tags.some((tag) =>
          tagsFilter.some((filterTag) => filterTag.id === tag.id)
        );

      return matchesTags;
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
        case "score":
          return item.score;
        case "priority":
          return item.priority;
        case "name":
          return item.name;
        case "careerTitle":
          return item.career.careerTitle;
        case "language":
          // Сортируем по первому языку, например
          return item.career.language
            .map((lang) => `${lang.language} (Level ${lang.level})`)
            .join(", ");
        case "experience":
          return item.career.experience;
        case "educationalConfirmation":
          return item.visaInfo.educationalConfirmation;
        case "visa":
          return item.visaInfo.visa;
        default:
          return ""; // на случай, если ключ не совпадает
      }
    };

    return (
      <div className={styles.tableWrapper}>
        <table>
          <thead>
            <tr>
              <th
                className={styles.table_score}
                onClick={() => handleSort("score")}
              >
                Score
              </th>
              <th
                className={styles.table_prio}
                onClick={() => handleSort("priority")}
              >
                Prio
              </th>
              <th
                className={styles.table_name}
                onClick={() => handleSort("name")}
              >
                Name
              </th>
              <th
                className={styles.table_title}
                onClick={() => handleSort("careerTitle")}
              >
                Fachrichtung
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
              <th
                className={styles.table_edu}
                onClick={() => handleSort("educationalConfirmation")}
              >
                Anerk. Abschluss
              </th>
              <th
                className={styles.table_visa}
                onClick={() => handleSort("visa")}
              >
                Visum
              </th>
              <th className={styles.table_btn}></th>
            </tr>
          </thead>
          <tbody>
            {Array.isArray(filteredData) &&
              filteredData.map((item, index) => (
                <React.Fragment key={item.talentUserId}>
                  <tr
                    className={index % 2 === 0 ? styles.evenRow : styles.oddRow}
                  >
                    <td className={styles.cell50}>{item.score}</td>
                    <td className={styles.cell50}>{item.priority}</td>
                    <td className={styles.cellfree}>{item.name}</td>
                    <td className={styles.cellfree}>
                      {item.career.careerTitle}
                    </td>
                    <td className={styles.cell100}>
                      {item.career.language
                        .map(
                          (lang) =>
                            `${lang.language} (${
                              Language.find(
                                (level) => level.level === lang.level
                              ).short
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
                      {workLevel.find(
                        (level) => level.text === item.career.experience
                      )
                        ? workLevel.find(
                            (level) => level.text === item.career.experience
                          )?.shortDe
                        : item.career.experience}
                    </td>
                    <td className={styles.cell100}>
                      {item.visaInfo.educationalConfirmation}
                    </td>
                    <td className={styles.cell100}>{item.visaInfo.visa}</td>
                    <td>
                      <button
                        onClick={() =>
                          navigate(`?talentId=${item.talentUserId}`)
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
                  <tr
                    className={index % 2 === 0 ? styles.evenRow : styles.oddRow}
                  >
                    <td colSpan="9">
                      <AdminTags
                        id={item.talentUserId}
                        tags={item.tags}
                        onUpdate={onUpdate}
                      />
                    </td>
                  </tr>
                </React.Fragment>
              ))}
          </tbody>
        </table>
      </div>
    );
  };

  const handleTagsFilter = (tag) => {
    setTagsFilter((prevTags) => {
      // Проверка, существует ли тег в `tagsFilter`
      const tagExists = prevTags.some((t) => t.id === tag.id);

      if (tagExists) {
        // Если тег существует, удаляем его
        return prevTags.filter((t) => t.id !== tag.id);
      } else {
        // Если тега нет, добавляем его
        return [...prevTags, tag];
      }
    });
  };

  return (
    <div className="column gap-32">
      <h2>Matching Tool</h2>
      <div className={styles.filterWrapper}>
        <div className="row gap-32">
          <h3>Suchparameter</h3>
          <button
            className="secondary small"
            type="button"
            onClick={() => {
              reset();
              setSearchName("");
            }}
          >
            Filter zurücksetzen
          </button>
        </div>
        <FormProvider {...methods}>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className={styles.filterContainer}>
              <div className={styles.fiterColumn}>
                {/* MUST HAVE SKILLS */}
                <div className="content-part">
                  <p className="text-m-semibold">Must Have Skills</p>
                  <Controller
                    name="mustHaveSkills"
                    control={control}
                    render={({ field }) => (
                      <ItemList
                        type="simpleList"
                        searchType="server"
                        value={field.value}
                        onChange={field.onChange}
                        address={"common_source/get_updated_skills"}
                        listName={"mustHaveSkills"}
                        reqParam={"language=de"}
                        manual="neue Auswahl: "
                      />
                    )}
                  />
                </div>

                {/* SKILLS */}
                <div className="content-part">
                  <p className="text-m-semibold">Weitere Skills</p>
                  <Controller
                    name="commonSkills"
                    control={control}
                    render={({ field }) => (
                      <ItemList
                        type="simpleList"
                        searchType="server"
                        value={field.value}
                        onChange={field.onChange}
                        address={"common_source/get_updated_skills"}
                        listName={"commonSkills"}
                        reqParam={"language=de"}
                        manual="neue Auswahl: "
                      />
                    )}
                  />
                </div>

                {/* JOB TITLE */}
                <div className="content-part">
                  <p className="text-m-semibold">Jobtitel</p>
                  <Controller
                    name="jobTitle"
                    control={control}
                    render={({ field }) => (
                      <ItemList
                        type="simpleList"
                        searchType="server"
                        value={field.value}
                        onChange={field.onChange}
                        address={"common_source/get_job_titles"}
                        listName={"jobTitle"}
                        reqParam={"language=de"}
                        manual="neue Auswahl: "
                      />
                    )}
                  />
                </div>

                {/* ISCO SEARCH */}
                <div className="content-part">
                  <p className="text-m-semibold">
                    Berufsklassifikation (nach ISCO-08)
                  </p>

                  <Controller
                    name="isco_code"
                    control={control}
                    render={({ field }) => (
                      <IscoSearch
                        selectedValue={field.value}
                        onSelect={(value) => {
                          if (!field.value.includes(value)) {
                            field.onChange([...field.value, value]);
                          }
                        }}
                      />
                    )}
                  />

                  <BubbleList
                    list={watch("isco_code")}
                    onDelete={(value) => {
                      const currentList = getValues("isco_code");
                      const updatedList = currentList.filter(
                        (item) => item !== value
                      );
                      setValue("isco_code", updatedList);
                    }}
                    display={"titleEN"}
                  />
                </div>

                {/* EXPERIENCE */}
                <div className="content-part">
                  <p className="text-m-semibold">
                    Gewünschte Berufserfahrung in Jahren
                  </p>
                  <Controller
                    name="experience"
                    control={control}
                    rules={{ required: true }}
                    render={({ field }) => (
                      <WormSelect
                        options={[
                          {
                            name: "Beliebig",
                            text: 0,
                          },
                          ...workLevel,
                        ]}
                        onChange={field.onChange}
                        listName="experience"
                        value={field.value}
                        error={errors?.experience ? "true" : "false"}
                      />
                    )}
                  />
                </div>

                {/* LANGUAGE */}
                <div className="content-part">
                  <p className="text-m-semibold">Sprachkenntnisse</p>
                  <Controller
                    control={control}
                    name="language"
                    rules={{
                      validate: (languages) => {
                        const isValid = languages.every(
                          (lang) => lang.language.trim() !== ""
                        );
                        return isValid || "All languages must be filled in";
                      },
                    }}
                    render={({ field }) => (
                      <LanguageSelect
                        language="de"
                        onChange={field.onChange}
                        knowledgeList={field.value}
                      />
                    )}
                  />
                  {errors?.language?.message && (
                    <p className="error">{errors?.language?.message}</p>
                  )}
                </div>
              </div>
              <div className={styles.fiterColumn}>
                {/* INDUSTRY */}
                <div className="content-part">
                  <p className="text-m-semibold">Branchen</p>
                  <Controller
                    name="industry"
                    control={control}
                    render={({ field }) => (
                      <ItemList
                        type="simpleList"
                        searchType="front"
                        value={field.value}
                        onChange={field.onChange}
                        address={"common_source/get_industries"}
                        listName={"industry"}
                        reqParam={"language=de"}
                      />
                    )}
                  />
                </div>

                {/* SALARY */}
                <div className="content-part">
                  <p className="text-m-semibold">
                    Gehaltsspanne (Jährliches Bruttoeinkommen)
                  </p>
                  <SalaryInput varName={""} />
                </div>

                {/* EDUCATION CONFIRMATION */}
                <div className="content-part">
                  <p className="text-m-semibold">Abschluss anerkannt?</p>
                  <div className="radio_list">
                    {educationConfirm.map((item, index) => (
                      <div key={index} className="radio_item">
                        <input
                          className="real-radio flex"
                          type="radio"
                          id={`radio_educationalConfirmation_${index}`}
                          value={item.text}
                          {...register("educationalConfirmation")}
                        />
                        <span className="custom-radio"></span>
                        <label
                          htmlFor={`radio_educationalConfirmation_${index}`}
                        >
                          {item.name}
                        </label>
                      </div>
                    ))}
                  </div>
                </div>

                {/* VISA */}
                <div className="content-part">
                  <p className="text-m-semibold">Visum vorhanden?</p>
                  <div className="radio_list">
                    {visa.map((item, index) => (
                      <div key={index} className="radio_item">
                        <input
                          className="real-radio flex"
                          type="radio"
                          id={`radio_visa_${index}`}
                          value={item.text}
                          {...register("visa")}
                        />
                        <span className="custom-radio"></span>
                        <label htmlFor={`radio_visa_${index}`}>
                          {item.name}
                        </label>
                      </div>
                    ))}
                  </div>
                </div>

                {/* RELOCATION */}
                <div className="content-part">
                  <p className="text-m-semibold">Umzugsbereit?</p>
                  <div className="radio_list">
                    {relocate.map((item, index) => (
                      <div key={index} className="radio_item">
                        <input
                          className="real-radio flex"
                          type="radio"
                          id={`radio_willingnessToRelocate_${index}`}
                          value={item.text}
                          {...register("willingnessToRelocate")}
                        />
                        <span className="custom-radio"></span>
                        <label htmlFor={`radio_willingnessToRelocate_${index}`}>
                          {item.name}
                        </label>
                      </div>
                    ))}
                  </div>
                </div>

                {/* APPRENTIENSHIP */}
                <div className="content-part">
                  <p className="text-m-semibold">Ausbildung</p>
                  <div className="start center">
                    <input
                      type="checkbox"
                      id="interestedApprenticeship"
                      {...register("interestedApprenticeship")}
                    />
                    <label htmlFor="interestedApprenticeship">
                      Talent ist an Ausbildung interessiert
                    </label>
                  </div>
                </div>
              </div>
            </div>
            <div className="end">
              <button className="primary medium" type="submit">
                Talente suchen
              </button>
            </div>
          </form>
        </FormProvider>
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

      {/* TAGS */}
      <div className="content-part">
        <p className="text-m-semibold">Tags</p>
        <DropdownWithSearch
          selectedValue={tagsFilter}
          onSelect={(value) => handleTagsFilter(value)}
          options={tagsList}
          display={"name"}
          placeholder="Search for tags"
        />
        <BubbleList
          list={tagsFilter}
          display={"name"}
          onDelete={(value) =>
            setTagsFilter((prev) =>
              // prev.filter((item) => item !== value)
              prev.filter((t) => t.id !== value.id)
            )
          }
        />
      </div>

      <h3>Passende Talente</h3>
      <div className="row gap-32 center start">
        <h4>Platform</h4>
        <button
          className={`${talentVisible ? "secondary" : "primary"} small`}
          onClick={() => setTalentVisible(!talentVisible)}
        >
          {talentVisible ? "Ausblenden" : "Offenlegen"}
        </button>
      </div>
      {talentVisible && <SortableTable list={talentList} />}
      <div className="row gap-32 center start">
        <h4>Jotform</h4>
        <button
          className={`${jotFormVisible ? "secondary" : "primary"} small`}
          onClick={() => setJotFormVisible(!jotFormVisible)}
        >
          {jotFormVisible ? "Ausblenden" : "Offenlegen"}
        </button>
      </div>
      {jotFormVisible && <SortableTable list={jotFormList} />}
      <div style={{ marginBottom: "500px" }} />
    </div>
  );
}

export default AdminMatchingTool;
