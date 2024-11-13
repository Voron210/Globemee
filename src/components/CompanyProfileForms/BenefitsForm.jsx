import React from "react";
import { Controller, useFormContext } from "react-hook-form";
import benefits from "../../common/benefits";
import styles from "./ProfileForm.module.css";

const BenefitsForm = () => {
  const { control, watch, setValue } = useFormContext();
  const selectedBenefits = watch("facts.benefits");

  const handleToggleDescription = (benefitName) => {
    const isSelected = selectedBenefits.some(
      (item) => item.benefitName === benefitName
    );

    if (isSelected) {
      const updatedBenefits = selectedBenefits.filter(
        (item) => item.benefitName !== benefitName
      );
      setValue("facts.benefits", updatedBenefits);
    } else {
      const newBenefit = {
        benefitName,
        benefitDescription: "",
      };
      const updatedBenefits = [...selectedBenefits, newBenefit];
      setValue("facts.benefits", updatedBenefits);
    }
  };

  return (
    <>
      <h3>Benefits</h3>
      <div className={styles.benefits_list}>
        {benefits.map((benefit, index) => {
          const isSelected = selectedBenefits.some(
            (item) => item.benefitName === benefit.name
          );
          const selectedBenefit = selectedBenefits.find(
            (item) => item.benefitName === benefit.name
          );

          return (
            <div key={index} className={styles.benefit_item}>
              <div className="row space-between">
                <div className="center">
                  <img
                    src={benefit.icon}
                    alt={benefit.name}
                    className={styles.benefit_icon}
                  />
                  <p>{benefit.name}</p>
                </div>
                <button
                  onClick={() => handleToggleDescription(benefit.name)}
                  className={isSelected ? styles.added : ""}
                  type="button"
                >
                  {isSelected ? "Hinzugefügt" : "Hinzufügen"}
                </button>
              </div>
              {isSelected && (
                <>
                  <Controller
                    name={`facts.benefits.${selectedBenefits.indexOf(
                      selectedBenefit
                    )}.benefitDescription`}
                    control={control}
                    render={({ field }) => (
                      <textarea
                        style={{ height: "100px" }}
                        {...field}
                        maxLength="500"
                        value={selectedBenefit.benefitDescription}
                      />
                    )}
                  />
                  <p className="italic end">
                    Zeichen: {selectedBenefit.benefitDescription.length} / 500
                  </p>
                </>
              )}
            </div>
          );
        })}
      </div>
    </>
  );
};

export default BenefitsForm;
