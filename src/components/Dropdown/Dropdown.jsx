// Dropdown.js
import React, { useState } from "react";
import styles from "./Dropdown.module.css";
import { ClickAwayListener } from "@mui/material";

const Dropdown = ({
  toList = false,
  selectedValue,
  onSelect,
  options,
  label,
  disabled,
  error = false,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  

  const toggleDropdown = () => {
    if (!disabled) {
      setIsOpen(!isOpen);
    }
  };

  const handleSelect = (value) => {
    if (!disabled) {
      onSelect(value);
      setIsOpen(false);
    }
  };

  const isSelected = (option) => {
    if (Array.isArray(selectedValue)) {
      return selectedValue.includes(option);
    }
    return selectedValue === option;
  };

  return (
    <ClickAwayListener
      mouseEvent="onMouseDown"
      touchEvent="onTouchStart"
      onClickAway={() => setIsOpen(false)}
    >
      <div className={styles.dropdown}>
        <div
          className={`${styles.dropdownButton} ${error && styles.error}`}
          onClick={toggleDropdown}
        >
          <span className={styles.dropdownText}>
            {selectedValue && !toList ? selectedValue : label}
          </span>
          {/* {!disabled && <span className={styles.arrow}>▼</span>} */}
          {!disabled && (
            <span className={`${styles.input_arrow} material-symbols-outlined`}>
              {isOpen ? "keyboard_arrow_up" : "keyboard_arrow_down"}
            </span>
          )}
        </div>
        <div
          className={`${styles.dropdownContent} ${isOpen ? styles.show : ""}`}
        >
          {options.map((option) => (
            <div
              key={option}
              className={`${styles.dropdownItem} ${
                isSelected(option) ? styles.selectedItem : ""
              }`}
              onClick={() => handleSelect(option)}
            >
              {option}
            </div>
          ))}
        </div>
      </div>
    </ClickAwayListener>
  );
};

export default Dropdown;
