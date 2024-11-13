import React, { useState } from "react";
import { ClickAwayListener } from "@mui/material";
import styles from "./SimpleDropdown.module.css";

{
  /* <SimpleDropdown
  label="Choose a number"
  options={["One", "Two", "Three"]}
  onSelect={(value) => console.log("Selected:", value)}
/> */
}

const SimpleDropdown = ({
  options = ["Item 1", "Item 2", "Item 3", "Item 4", "Item 5"],
  onSelect = (value) => {
    // console.log(value);
  },
  label = "Dropdown Item",
  defaultValue = null,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedValue, setSelectedValue] = useState(defaultValue);

  //typeof options[0] === "object" ? defaultValue.name : defaultValue

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleSelect = (option) => {
    setSelectedValue(option);
    setIsOpen(false);
    onSelect(option);
  };

  const getDisplayValue = (option) => {
    return typeof option === "object" && option !== null ? option.name : option;
  };

  return (
    <ClickAwayListener
      mouseEvent="onMouseDown"
      touchEvent="onTouchStart"
      onClickAway={() => setIsOpen(false)}
    >
      <div className={styles.dropdownContainer}>
        <button
          type="button"
          onClick={toggleDropdown}
          className={styles.dropdownButton}
        >
          <p className="text-m-regular">
            {selectedValue ? getDisplayValue(selectedValue) : label}
          </p>

          <span className="material-symbols-outlined">
            {isOpen ? "keyboard_arrow_up" : "keyboard_arrow_down"}
          </span>
        </button>
        {isOpen && (
          <ul className={styles.dropdownList}>
            {options.map((option, index) => (
              <li
                key={index}
                onClick={() => handleSelect(option)}
                className={`${styles.dropdownItem} ${
                  selectedValue === option ? styles.selectedItem : ""
                }`}
              >
                <p className="text-m-regular">{getDisplayValue(option)}</p>
              </li>
            ))}
          </ul>
        )}
      </div>
    </ClickAwayListener>
  );
};

export default SimpleDropdown;
