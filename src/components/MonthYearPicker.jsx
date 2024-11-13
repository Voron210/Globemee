import React from "react";
import Dropdown from "./Dropdown/Dropdown";

// date format MM.yyyy
const MonthYearPicker = ({ value, onChange }) => {
  const months = [
    { name: "January", value: "01" },
    { name: "February", value: "02" },
    { name: "March", value: "03" },
    { name: "April", value: "04" },
    { name: "May", value: "05" },
    { name: "June", value: "06" },
    { name: "July", value: "07" },
    { name: "August", value: "08" },
    { name: "September", value: "09" },
    { name: "October", value: "10" },
    { name: "November", value: "11" },
    { name: "December", value: "12" },
  ];

  const currentYear = new Date().getFullYear();
  const years = Array.from(
    { length: currentYear - 1980 + 1 },
    (_, i) => currentYear - i
  );

  const handleMonthChange = (selectedMonth) => {
    const selectedYear = value?.split(".")?.[1] || currentYear.toString();
    onChange(`${selectedMonth}.${selectedYear}`);
  };

  const handleYearChange = (selectedYear) => {
    const selectedMonth = value?.split(".")?.[0] || "01";
    onChange(`${selectedMonth}.${selectedYear}`);
  };

  return (
    <div className="row gap">
      <Dropdown
        selectedValue={
          value
            ? months.find((month) => month.value === value.split(".")[0])?.name
            : ""
        }
        onSelect={(value) =>
          handleMonthChange(months.find((month) => month.name === value).value)
        }
        options={months.map((month) => month.name)}
        label="Select month"
      />
      <Dropdown
        selectedValue={value ? value.split(".")[1] : ""}
        onSelect={handleYearChange}
        options={years}
        label="Select year"
      />
    </div>
  );
};

export default MonthYearPicker;
