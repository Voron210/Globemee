import React from "react";
import { useFormContext } from "react-hook-form";
import styles from "./ProfileForm.module.css";

const ValueForm = () => {
  const valuesList = [
    "Agilität",
    "Disziplin",
    "Diversität",
    "Exzellenz",
    "Fairness",
    "Familie",
    "Humor",
    "Herzlichkeit",
    "Individualität",
    "Innovation",
    "Integrität",
    "Kundenorientierung",
    "Loyalität",
    "Mut",
    "Nachhaltigkeit",
    "Offenheit",
    "Qualität",
    "Respekt",
    "Teamarbeit",
    "Tradition",
    "Zielstrebigkeit",
    "Zuverlässigkeit",
    "Verantwortung",
  ];

  const { watch, setValue, getValues } = useFormContext();

  const toggleValue = (value) => {
    const currentValues = getValues("facts.values") || [];
    if (currentValues.includes(value)) {
      setValue(
        "facts.values",
        currentValues.filter((v) => v !== value)
      );
    } else if (currentValues.length < 5) {
      setValue("facts.values", [...currentValues, value]);
    }
  };

  const selectedValues = watch("facts.values", []);
  const isMaxSelected = selectedValues.length >= 5;

  return (
    <>
      <div className="column">
        <h3>Unternehmenswerte</h3>
        <p>
          Wählen Sie bis zu fünf Werte aus, die Ihr Unternehmen am besten
          beschreiben.
        </p>
      </div>
      <div className={styles.values_list}>
        {valuesList.map((value) => {
          const isSelected = selectedValues.includes(value);
          const isDisabled = isMaxSelected && !isSelected;
          return (
            <div
              key={value}
              className={`${styles.value_item} ${
                isSelected ? styles.selected : ""
              } ${isDisabled ? styles.disabled : ""}`}
              onClick={() => !isDisabled && toggleValue(value)}
            >
              <p className="text-m-semibold">{value}</p>
            </div>
          );
        })}
      </div>
    </>
  );
};

export default ValueForm;
