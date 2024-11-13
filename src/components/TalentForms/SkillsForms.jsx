import React from "react";
import { Controller, useFormContext } from "react-hook-form";
import ItemList from "../ItemList/ItemList";
import { useUser } from "../../context/TalentContext/UserContext";

const SkillsForm = () => {
  const { userData } = useUser();

  let jobTitles = "";

  if (userData.career.careerGoals) {
    jobTitles = userData.career.careerGoals
      .map((item) => `${encodeURIComponent(item.careerTitle)}`)
      .join("|");
  }

  const { control, formState } = useFormContext();
  return (
    <>
      <h4>What skills do you have for this position(s)?</h4>
      <p>Please choose at least 5 skills</p>
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
            {formState.errors.career?.skills?.type === "validate" && (
              <p className="error">
                {formState.errors.career?.skills?.message}
              </p>
            )}
          </>
        )}
      />
    </>
  );
};

export default SkillsForm;
