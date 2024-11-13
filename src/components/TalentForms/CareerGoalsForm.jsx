import React from "react";
import ItemList from "../ItemList/ItemList";
import SalaryInput from "../SalaryInput/SalaryInput";
import { Controller, useFormContext } from "react-hook-form";
import { Tooltip } from "react-tooltip";

const CareerGoalsForm = () => {
  const { control, register, formState } = useFormContext();

  return (
    <>
      <p className="text-m-semibold">
        Which professional fields are interesting for you?
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
      {/* <Controller
        name="career.minSalary"
        control={control}
        render={({ field: { value: minSalary, onChange: setMinSalary } }) => (
          <Controller
            name="career.maxSalary"
            control={control}
            render={({
              field: { value: maxSalary, onChange: setMaxSalary },
            }) => (
              <SalaryInput
                minSalary={minSalary}
                maxSalary={maxSalary}
                onChange={(newMinSalary, newMaxSalary) => {
                  setMinSalary(newMinSalary);
                  setMaxSalary(newMaxSalary);
                }}
              />
            )}
          />
        )}
      /> */}
      <SalaryInput varName={"career"} />
    </>
  );
};

export default CareerGoalsForm;
