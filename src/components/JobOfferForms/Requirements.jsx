import React, { useEffect, useState } from "react";
import { Controller, useFormContext } from "react-hook-form";
import ItemList from "../ItemList/ItemList";
import WormSelect from "../WormSelect";
import workLevel from "../../common/workLevel";
import StarIcon from "@mui/icons-material/Star";
import axiosInstance from "../../lib/axios/AxiosConfig";
import LanguageSelect from "../languageSelect/languageSelect";
import SoftSkills from "./SoftSkills";

const Requirements = ({ isApprenticeship }) => {
  const {
    control,
    watch,
    setValue,
    getValues,
    formState: { errors },
    register,
  } = useFormContext();
  const minimalDegree = watch("neededSkills.minimalDegree") || [];
  const jobTitle = watch("hardFacts.jobDescription.jobTitle");
  const commonSkills = watch("neededSkills.skills.commonSkills");
  const standartJob = watch("hardFacts.jobDescription.jobTitleStandardized");
  // const msthave = watch("neededSkills.skills.mustHave");
  const [skillList, setSkillList] = useState("");
  const [suggestionSkill, setSuggestionSkill] = useState([]);

  // console.log(msthave);

  const getStandardizationJob = async (newjobTitle) => {
    try {
      const response = await axiosInstance.get(
        `/common_source/standardization_job?job_titles=${newjobTitle}`
      );
      setValue(
        "hardFacts.jobDescription.jobTitleStandardized",
        response.data.job_name_stand
      );
    } catch (error) {}
  };

  // console.log(standartJob);

  useEffect(() => {
    getStandardizationJob(jobTitle);
  }, [jobTitle]);

  useEffect(() => {
    if (commonSkills && commonSkills.length > 0) {
      const skillNames = commonSkills.map((skill) => skill.skillName).join("|");
      setSkillList(skillNames);
    } else {
      setSkillList("");
    }
  }, [commonSkills]);

  const degreeOptions = [
    "Berufsausbildung",
    "Bachelor",
    "Master / Diplom",
    "PhD / Doktor",
    "Techniker",
    "Meister",
  ];

  const degreeList = () => {
    if (minimalDegree.length === 0) {
      return ["Nicht relevant", ...degreeOptions];
    } else {
      if (minimalDegree.includes("Nicht relevant")) {
        return ["Nicht relevant"];
      } else {
        return degreeOptions;
      }
    }
  };

  const handleResultsUpdate = (results) => {
    setSuggestionSkill(results);
  };

  // useEffect(() => {
  //   if (
  //     minimalDegree &&
  //     !minimalDegree.includes("Bachelor") &&
  //     !minimalDegree.includes("Master / Diplom") &&
  //     !minimalDegree.includes("PhD / Doktor")
  //   ) {
  //     setValue("neededSkills.careerApprenticeship", []);
  //   }
  // }, [minimalDegree]);

  return (
    <>
      {!isApprenticeship && (
        <>
          {/* DEGREE */}
          <div className="column">
            <p className="text-m-semibold">
              Mindestabschluss Abschluss auswählen
            </p>
            <Controller
              name="neededSkills.minimalDegree"
              control={control}
              rules={{ required: true }}
              render={({ field: { onChange, value } }) => (
                <ItemList
                  searchType={"none"}
                  listName={"neededSkills.minimalDegree"}
                  type={"simpleList"}
                  list={degreeList()}
                  onChange={onChange}
                  value={value}
                  required
                  children={
                    <>
                      <p>Mehrfachauswahl möglich</p>
                    </>
                  }
                />
              )}
            />
          </div>

          {/* EDUCATION */}
          {minimalDegree &&
            (minimalDegree.includes("Bachelor") ||
              minimalDegree.includes("Master / Diplom") ||
              minimalDegree.includes("PhD / Doktor")) && (
              <>
                <div className="column">
                  <p className="text-m-semibold">Studiengang</p>
                  <Controller
                    name="neededSkills.careerApprenticeship"
                    control={control}
                    rules={{ required: true }}
                    render={({ field: { onChange, value } }) => (
                      <ItemList
                        searchType={"server"}
                        listName={"neededSkills.careerApprenticeship"}
                        type={"simpleList"}
                        address={"/common_source/get_fields_of_studies"}
                        reqParam={"language=de"}
                        onChange={onChange}
                        value={value}
                        required
                        notRelevant="Nicht relevant"
                      />
                    )}
                  />
                  <p>Mehrfachauswahl möglich</p>
                </div>
              </>
            )}

          {/* JOB EXPERIENCNE */}
          {minimalDegree &&
            (minimalDegree.includes("Berufsausbildung") ||
              minimalDegree.includes("Techniker") ||
              minimalDegree.includes("Meister")) && (
              <>
                <div className="column">
                  <p className="text-m-semibold">Berufsausbildung</p>
                  <Controller
                    name="neededSkills.careerEducation"
                    control={control}
                    rules={{ required: true }}
                    render={({ field: { onChange, value } }) => (
                      <ItemList
                        searchType={"server"}
                        listName={"neededSkills.careerEducation"}
                        type={"simpleList"}
                        address={"/common_source/get_job_titles"}
                        reqParam={"language=de"}
                        onChange={onChange}
                        value={value}
                        required
                        notRelevant="Nicht relevant"
                      />
                    )}
                  />
                  <p>Mehrfachauswahl möglich</p>
                </div>
              </>
            )}

          {/* YEARS */}
          <div className="column">
            <p className="text-m-semibold">Berufserfahrung in Jahren</p>
            <div style={{ maxWidth: "600px" }}>
              <Controller
                name="neededSkills.experience"
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
                    listName="neededSkills.experience"
                    value={field.value}
                    error={errors?.neededSkills?.experience ? "true" : "false"}
                  />
                )}
              />
            </div>
            <p>Gewünschte Berufserfahrung auswählen</p>
          </div>

          {/* Skills */}
          <div className="column">
            <h4>Skills</h4>
            <p>
              Wählen Sie die Fähigkeiten und Erfahrungen aus, über die die
              Bewerber verfügen sollten.
            </p>
            <div className="row start center">
              <StarIcon fontSize="small" color="warning" />
              <p>= Must Have Skill</p>
            </div>

            <Controller
              name="neededSkills.skills.commonSkills"
              control={control}
              rules={{
                validate: (value) => {
                  if (value.length >= 3) {
                    return true;
                  } else {
                    return "Wähle mindestens 3 Skills";
                  }
                },
              }}
              render={({ field: { onChange, value } }) => (
                <ItemList
                  searchType={"front"}
                  listName={"neededSkills.skills.commonSkills"}
                  type={"experienceList"}
                  address={"/common_source/get_skills_by_job_and_skills"}
                  reqParam={`language=de&job_titles=${standartJob}&skills=${skillList}`}
                  onChange={onChange}
                  value={value}
                  beliebig="Beliebig"
                  mustHaveListName="neededSkills.skills.mustHave"
                  itemNameKey="skillName"
                  itemLevelKey="skillLevel"
                  required
                  onResultsUpdate={handleResultsUpdate}
                  children={
                    <div className="column midGap">
                      <p className="text-m-semibold">
                        Skillvorschläge für diese Stelle
                      </p>
                      <div
                        className="start midGap"
                        style={{
                          flexWrap: "wrap",
                        }}
                      >
                        {suggestionSkill
                          .filter(
                            (suggestedItem) =>
                              !getValues(
                                "neededSkills.skills.commonSkills"
                              ).some(
                                (skill) =>
                                  skill === suggestedItem ||
                                  skill["skillName"] === suggestedItem
                              )
                          )
                          .slice(0, 5)
                          .map((item, index) => (
                            <div
                              style={{
                                border: "1px solid var(--grey-100)",
                                borderRadius: "100px",
                                padding: "5px 10px",
                              }}
                              key={index}
                              className="center"
                            >
                              <span
                                style={{ cursor: "pointer" }}
                                className="material-symbols-outlined"
                                onClick={() => {
                                  const array = getValues(
                                    "neededSkills.skills.commonSkills"
                                  );
                                  if (
                                    !array.find((i) => i["skillName"] === item)
                                  ) {
                                    onChange([
                                      ...array,
                                      {
                                        ["skillName"]: item,
                                        ["skillLevel"]: "",
                                      },
                                    ]);
                                  } else {
                                    onChange(
                                      array.filter(
                                        (i) => i["skillName"] !== item
                                      )
                                    );
                                    setValue(
                                      "neededSkills.skills.mustHave",
                                      getValues(
                                        "neededSkills.skills.mustHave"
                                      ).filter((i) => i !== item)
                                    );
                                  }
                                }}
                              >
                                add
                              </span>
                              {item}
                            </div>
                          ))}
                      </div>
                      <p>“Markieren Sie Must-Have-Skills mit einem Stern”</p>
                    </div>
                  }
                />
              )}
            />
            {errors?.neededSkills?.skills?.commonSkills?.message && (
              <p className="error">
                {errors.neededSkills.skills.commonSkills.message}
              </p>
            )}
          </div>
        </>
      )}

      <div className="column">
        <h4>Sprach-Level</h4>
        <p>Welches Sprach-Level sollte der/die Kandidat:in mitbringen?</p>
        <div style={{ maxWidth: "600px" }}>
          <Controller
            control={control}
            name="neededSkills.skills.language"
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
        </div>
      </div>

      {isApprenticeship && (
        <>
          <SoftSkills />
        </>
      )}

      {/* <div className="column">
        <h4>Aufgabenbeschreibung</h4>
        <p>
          Kurze Stellenbeschreibung über die zukünftigen Zuständigkeiten,
          Projekte und Aufgaben
        </p>
        <textarea {...register("hardFacts.jobDescription.manualInput")} />
      </div> */}
    </>
  );
};

export default Requirements;
