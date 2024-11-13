import React, { useState } from "react";
import { Controller, useFormContext } from "react-hook-form";
import ItemList from "../ItemList/ItemList";

const SoftSkills = () => {
  const { control, getValues, setValue } = useFormContext();
  const [suggestionSkill, setSuggestionSkill] = useState([]);
  const handleResultsUpdate = (results) => {
    setSuggestionSkill(results);
  };

  return (
    <>
      <p>
        Wir legen Wert auf einen qualitativ hochwertigen Match und gleichen
        daher auch persönlichen Werte der Kandidat:innen mit Ihren ab.
      </p>
      <Controller
        name="softSkills"
        control={control}
        render={({ field: { onChange, value } }) => (
          <ItemList
            type="simpleList"
            searchType="front"
            value={value}
            onChange={onChange}
            address={"common_source/get_soft_skills"}
            reqParam={"language=de"}
            listName={"softSkills"}
            onResultsUpdate={handleResultsUpdate}
            // children={
            //   <>
            //     <div className="column">
            //       <p className="text-m-semibold">Häufig verwendet</p>
            //       <p className="text-m-semibold">
            //         Ausgewählte Softskills & Werte
            //       </p>
            //     </div>
            //   </>
            // }
            children={
              <div className="column midGap" id="step-4">
                <p className="text-m-semibold">Häufig verwendet</p>
                <div
                  className="start midGap"
                  style={{
                    flexWrap: "wrap",
                  }}
                >
                  {suggestionSkill
                    .filter(
                      (suggestedItem) =>
                        !getValues("softSkills").some(
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
                            const array = getValues("softSkills");
                            if (!value.find((i) => i === item)) {
                              onChange([...value, item]);
                            } else {
                              onChange(value.filter((i) => i !== item));
                            }
                          }}
                        >
                          add
                        </span>
                        {item}
                      </div>
                    ))}
                </div>
                <p className="text-m-semibold">
                  Ausgewählte Softskills & Werte
                </p>
              </div>
            }
          />
        )}
      />
    </>
  );
};

export default SoftSkills;
