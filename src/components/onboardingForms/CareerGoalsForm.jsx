import React, { useEffect, useState } from "react";
import ItemList from "../ItemList/ItemList";
import { Controller, useFormContext } from "react-hook-form";
import { Tooltip } from "react-tooltip";

function CareerGoalsForm() {
  const {
    control,
    formState,
    getValues,
    watch,
    register,
    formState: { errors },
  } = useFormContext();
  const [jobTitlesParam, setJobTitlesParam] = useState("");
  const watchCareer = watch("career.careerGoals");

  // console.log(errors);

  useEffect(() => {
    const jobTitles = getValues("career.careerGoals");
    if (jobTitles) {
      setJobTitlesParam(
        jobTitles
          .map((item) => `${encodeURIComponent(item.careerTitle)}`)
          .join("|")
      );
    }
  }, [watchCareer]);

  // getValues("career.careerGoals").map((item) => `${encodeURIComponent(item.careerTitle)}`).join("|")

  return (
    <>
      <h3>Career Goals</h3>
      <div className="content-part">
        <p className="text-m-semibold">
          Which positions are you interested in?
        </p>
        <p>
          Select the jobs that interest you and enter your work experience in
          years. We will match you for these and similar positions.
        </p>
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
                value={field.value}
                onChange={field.onChange}
                address={"/common_source/get_job_titles"}
                listName={"career.careerGoals"}
                reqParam={"language=en"}
                itemNameKey="careerTitle"
                itemLevelKey="careerExperience"
                children={
                  <div className="start center">
                    <input
                      type="checkbox"
                      id="career.interestedApprenticeship"
                      {...register("career.interestedApprenticeship")}
                    />
                    <label htmlFor="career.interestedApprenticeship">
                      I’m also interested in an Apprenticeship (Ausbildung){" "}
                    </label>
                    <span
                      className="material-symbols-outlined"
                      data-tooltip-id="apprenticeship"
                    >
                      info
                    </span>
                    <Tooltip id="apprenticeship" place="bottom">
                      if you are also open to completing a new apprenticeship in
                      germany (cross-industry) then click this checkbox
                    </Tooltip>
                  </div>
                }
              />
              {formState.errors.career?.careerGoals?.type === "validate" && (
                <p className="error">
                  {formState.errors.career?.careerGoals.message}
                </p>
              )}
            </>
          )}
        />
        {formState.errors.careerList && (
          <p className="error">{formState.errors.careerList.message}</p>
        )}
      </div>

      <div className="content-part">
        <p className="text-m-semibold">
          Which skills do you have for the selected position/s?
        </p>
        <p>Please choose your Top 5 Skills and the years of experience</p>
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
            <ItemList
              type="experienceList"
              searchType="front"
              value={field.value}
              onChange={field.onChange}
              address={"/common_source/get_skills"}
              listName={"career.skills"}
              // reqParam={`language=en&job_titles=${jobTitlesParam}`}
              reqParam={`language=en&job_titles=${getValues(
                "career.careerGoals"
              )
                .map((item) => `${encodeURIComponent(item.careerTitle)}`)
                .join("|")}`}
              itemNameKey="skillName"
              itemLevelKey="skillLevel"
            />
          )}
        />
        {formState.errors.career?.skills?.type === "validate" && (
          <p className="error">{formState.errors.career?.skills?.message}</p>
        )}
        {/* {formState.errors.skillList && (
          <p className="error">{formState.errors.skillList.message}</p>
        )} */}
      </div>
    </>
  );
}

export default CareerGoalsForm;
