import React, { useState } from "react";
import { ClickAwayListener } from "@mui/material";
import styles from "./DropdownWithInput.module.css";

function DropdownWithInput({
  options = ["No options"],
  placeholder = "Select or enter your option",
  onSelect = () => console.log("Value changed"),
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedValue, setSelectedValue] = useState("");

  const handleSelect = (option) => {
    setSelectedValue(option);
    setIsOpen(false);
    onSelect(option);
  };

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleClickAway = () => {
    setIsOpen(false);
  };

  return (
    <ClickAwayListener onClickAway={handleClickAway}>
      <div className={styles.dropdownContainer}>
        <div className={styles.inputWrapper}>
          <input
            type="text"
            onClick={toggleDropdown}
            value={selectedValue}
            placeholder={placeholder}
            className={styles.dropdownButton}
            onChange={(e) => handleSelect(e.target.value)}
          />
          <span className={`${styles.icon} material-symbols-outlined`}>
            {isOpen ? "keyboard_arrow_up" : "keyboard_arrow_down"}
          </span>
        </div>
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
                <p className="text-m-regular">{option}</p>
              </li>
            ))}
          </ul>
        )}
      </div>
    </ClickAwayListener>
  );
}

export default DropdownWithInput;
