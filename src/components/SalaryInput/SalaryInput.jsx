import React from "react";
import styles from "./SalaryInput.module.css";
import Dropdown from "../Dropdown/Dropdown";
import { Controller, useFormContext } from "react-hook-form";
import _ from "lodash";

// const SalaryInput = ({ minSalary, maxSalary, onChange, varName }) => {
//   // console.log(varName);
//   const createOptions = (min, max) => {
//     const options = [];
//     for (let i = min; i <= max; i += 1000) {
//       options.push(i);
//     }
//     return options;
//   };

//   const handleMinSelect = (value) => {
//     onChange(value, maxSalary);
//   };

//   const handleMaxSelect = (value) => {
//     onChange(minSalary, value);
//   };

//   return (
//     <div className={styles.salaryInputContainer}>
//       <div className="row gap">
//         <Dropdown
//           selectedValue={minSalary}
//           onSelect={handleMinSelect}
//           options={createOptions(10000, maxSalary ? maxSalary : 200000)}
//           label="Min"
//         />
//         <Dropdown
//           selectedValue={maxSalary}
//           onSelect={handleMaxSelect}
//           options={createOptions(minSalary ? minSalary : 10000, 200000)}
//           label="Max"
//         />
//       </div>
//     </div>
//   );
// };

const SalaryInput = ({ varName }) => {
  const {
    control,
    watch,
    formState: { errors },
  } = useFormContext();

  const minPath = varName ? `${varName}.minSalary` : `minSalary`;
  const maxPath = varName ? `${varName}.maxSalary` : `maxSalary`;
  const minSalary = watch(minPath);
  const maxSalary = watch(maxPath);

  const createOptions = (min, max) => {
    const options = [];
    for (let i = min; i <= max; i += 1000) {
      options.push(i);
    }
    return options;
  };

  return (
    <div className={styles.salaryInputContainer}>
      <div className="row gap">
        <Controller
          name={minPath}
          control={control}
          rules={{ required: true }}
          render={({ field }) => (
            <Dropdown
              selectedValue={field.value}
              onSelect={(value) => field.onChange(value)}
              options={createOptions(10000, maxSalary ? maxSalary : 200000)}
              label="Min"
              error={_.get(errors, minPath) ? "error" : ""}
            />
          )}
        />
        <Controller
          name={maxPath}
          control={control}
          rules={{ required: true }}
          render={({ field }) => (
            <Dropdown
              selectedValue={field.value}
              onSelect={(value) => field.onChange(value)}
              options={createOptions(minSalary ? minSalary : 10000, 200000)}
              label="Max"
              error={_.get(errors, maxPath) ? "error" : ""}
            />
          )}
        />
      </div>
    </div>
  );
};

export default SalaryInput;
