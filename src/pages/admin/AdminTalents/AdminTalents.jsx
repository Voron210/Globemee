import React, { useState } from "react";
import styles from "./AdminTalents.module.css";
import { useNavigate } from "react-router-dom";
import { Controller, FormProvider, useForm } from "react-hook-form";
import ItemList from "../../../components/ItemList/ItemList";
import WormSelect from "../../../components/WormSelect";
import LanguageSelect from "../../../components/languageSelect/languageSelect";
import workLevel from "../../../common/workLevel";
import axiosInstance from "../../../lib/axios/AxiosConfig";
import Fuse from "fuse.js";
import { addGlobalNotification } from "../../../context/ModalContext/ModalContext";
import Language from "../../../common/Language";
import AdminTags from "../../../components/AdminTags/AdminTags";
import { useGetTagsQuery } from "../../../appApi";
import BubbleList from "../../../components/BubbleList/BubbleList";
import DropdownWithSearch from "../../../components/DropdownWithSearch/DropdownWithSearch";

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

const prioOption = [
  { name: "Ja", text: "Yes" },
  { name: "Nein", text: "No" },
  { name: "Alle", text: "All" },
];

function AdminTalents() {
  const [talentList, setTalentList] = useState([]);
  const [searchName, setSearchName] = useState("");
  const navigate = useNavigate();

  const { data: tagsList, error, isLoading } = useGetTagsQuery();
  const [tagsFilter, setTagsFilter] = useState([]);

  const methods = useForm({
    defaultValues: {
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
      visa: null,
      educationalConfirmation: null,
      willingnessToRelocate: null,
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

  const onSubmit = async (data) => {
    const experienceLevels = [
      { id: 0, label: "" },
      { id: 1, label: "0-0,5 Jahre Erfahrung" },
      { id: 2, label: "1-2 Jahre Erfahrung" },
      { id: 3, label: "3-5 Jahre Erfahrung" },
      { id: 4, label: "6-10 Jahre Erfahrung" },
      { id: 5, label: "10+ Jahre Erfahrung" },
    ];

    try {
      // const response = await axiosInstance.post(`m_match/match`, data);
      // if (Array.isArray(response.data)) {
      //   setTalentList(response.data);
      //   addGlobalNotification(
      //     `${response.data.length} Datensätze gefunden`,
      //     "success"
      //   );
      // } else {
      //   setTalentList([]);
      //   addGlobalNotification("Nichts gefunden", "warning");
      // }
      // console.log(data);
      const industry = data.industry.join("|");
      const response = await axiosInstance.post(
        `a_talent/all_filtered` +
          `?talentExperiencse=${
            experienceLevels.find((item) => item.id === data.experience).label
          }&talentVisa=${
            data.visa ? data.visa : ""
          }&talentEducationalConfirmation=${
            data.educationalConfirmation ? data.educationalConfirmation : ""
          }&talentPrioritized=${
            data.willingnessToRelocate ? data.willingnessToRelocate : ""
          }&industry=${industry}`,
        {
          language: data.language,
        }
      );
      if (Array.isArray(response.data)) {
        setTalentList(response.data);
        addGlobalNotification(
          `${response.data.length} Datensätze gefunden`,
          "success"
        );
      } else {
        setTalentList([]);
        addGlobalNotification("Nichts gefunden", "warning");
      }
      // console.log(response.data);
    } catch (error) {
      setTalentList([]);
      addGlobalNotification("Nichts gefunden", "warning");
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
  };

  const SortableTable = () => {
    const [data, setData] = useState(talentList);
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
        case "date":
          // console.log(item.signUpDate);
          return item.signUpDate;
        case "priority":
          return item.priority;
        case "name":
          return item.name;
        case "careerTitle":
          return item.career.careerTitle;
        case "language":
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
          return "";
      }
    };

    return (
      <div className={styles.tableWrapper}>
        <table>
          <thead>
            <tr>
              <th
                className={styles.table_prio}
                onClick={() => handleSort("priority")}
              >
                Prio
              </th>
              <th
                className={styles.table_date}
                onClick={() => handleSort("date")}
              >
                Anmeldung
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
            {filteredData.map((item, index) => (
              <React.Fragment key={item.talentUserId}>
                <tr
                  className={index % 2 === 0 ? styles.evenRow : styles.oddRow}
                >
                  <td className={styles.cell50}>{item.priority}</td>
                  <td className={styles.cellfree}>{item.signUpDate}</td>
                  <td className={styles.cellfree}>{item.name}</td>
                  <td className={styles.cellfree}>{item.career.careerTitle}</td>
                  <td className={styles.cell100}>
                    {item.career.language
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
                  <td style={{ width: "100px" }}>
                    <div className="row gap-4">
                      {item.dataSource === "Jotform" && (
                        <div
                          className="center"
                          style={{
                            borderRadius: "8px",
                            backgroundColor: "var(--orange-100)",
                            padding: "0 4px",
                          }}
                        >
                          <p className="text-xs-regular white">Jotform</p>
                        </div>
                      )}
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
                    </div>
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
      <h2>Talente</h2>
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
        <FormProvider {...methods}>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className={styles.filterContainer}>
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
              </div>

              <div className={styles.fiterColumn}>
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

                {/* RELOCATION */}
                <div className="content-part">
                  <p className="text-m-semibold">
                    Priorisierte Talente anzeigen
                  </p>
                  <div className="radio_list">
                    {prioOption.map((item, index) => (
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

                {/* TAGS */}
                {/* <div className="content-part">
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
                </div> */}
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
      <SortableTable />
    </div>
  );
}

export default AdminTalents;
