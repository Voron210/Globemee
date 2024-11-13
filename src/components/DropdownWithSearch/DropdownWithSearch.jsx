import React, { useEffect, useMemo, useState } from "react";
import { ClickAwayListener } from "@mui/material";
import styles from "./DropdownWithSearch.module.css";
import _, { isArray } from "lodash";
import Fuse from "fuse.js";
import { memo } from "react";

const DropdownWithSearch = memo(
  ({
    options, // must be an array
    placeholder = "Select your option", //placeholder if selectedValue is array or empty
    display = null, // value to default display and search
    onSelect, //handle selection
    selectedValue, //can be whatever you want :D
  }) => {
    const [isOpen, setIsOpen] = useState(false); // is dropdown opened
    const [searchResults, setSearchResults] = useState(options); //filtered
    const [inputValue, setInputValue] = useState(""); //inputValue
    const isSelectedArray = useMemo(
      () => Array.isArray(selectedValue),
      [selectedValue]
    );
    const isOptionObject = useMemo(() => {
      return options && typeof options[0] === "object";
    }, [options]);

    const isSelected = (option) => {
      if (!isSelectedArray) {
        if (!isOptionObject) {
          return option === selectedValue;
        } else {
          return _.get(option, display) === _.get(selectedValue, display);
        }
      } else {
        if (!isOptionObject) {
          return selectedValue.some((value) => option === value);
        } else {
          return selectedValue.some(
            (selected) => _.get(selected, display) === _.get(option, display)
          );
        }
      }
    };

    const updateInputValue = () => {
      setInputValue(
        Array.isArray(selectedValue)
          ? ""
          : typeof selectedValue === "object"
          ? _.get(selectedValue, display)
          : selectedValue
      );
    };

    const fuse = useMemo(() => {
      return new Fuse(options, {
        keys:
          Array.isArray(options) && typeof options[0] === "object" && display
            ? [display]
            : [],
        threshold: 0.3,
      });
    }, [options, display]);

    useEffect(() => {
      updateInputValue();
    }, [selectedValue]);

    useEffect(() => {
      setSearchResults(options);
    }, [options]);

    if (
      !options ||
      options.length === 0 ||
      !Array.isArray(options) ||
      (typeof options[0] === "object" && !display) ||
      selectedValue === undefined ||
      typeof onSelect !== "function"
    ) {
      // console.log("Options: ", options);
      // console.log("SelectedValue: ", selectedValue);
      // console.log("OnSelect: ", onSelect);
      // console.log("Array type:", options && typeof options[0]);
      // console.log("Display:", display);
      // console.log("Invalid props");
      return null;
    }

    const arrayType = typeof options[0];

    const handleSelect = (option) => {
      onSelect(option);
      setIsOpen(false);
      updateInputValue();
      setSearchResults(options);
    };

    const handleSearch = (e) => {
      setIsOpen(true);
      const query = e.target.value;
      setInputValue(query);
      if (query) {
        const results = fuse.search(query).map((result) => result.item);
        setSearchResults(results);
      } else {
        setSearchResults(options);
        // onSelect("");
      }
    };

    return (
      <ClickAwayListener
        mouseEvent="onMouseDown"
        touchEvent="onTouchStart"
        onClickAway={() => setIsOpen(false)}
      >
        <div className={styles.dropdownContainer}>
          <div className={styles.inputWrapper}>
            <span className={`${styles.search_icon} material-symbols-outlined`}>
              search
            </span>
            <input
              type="text"
              onClick={() => setIsOpen(true)}
              value={inputValue}
              placeholder={placeholder}
              className={styles.dropdownButton}
              onChange={handleSearch}
            />
            <span className={`${styles.icon} material-symbols-outlined`}>
              {isOpen ? "keyboard_arrow_up" : "keyboard_arrow_down"}
            </span>
          </div>
          {isOpen && (
            <ul className={styles.dropdownList}>
              {searchResults.map((option, index) => (
                <li
                  key={index}
                  onClick={() => handleSelect(option)}
                  className={`${styles.dropdownItem} ${
                    isSelected(option) ? styles.selectedItem : ""
                  }`}
                >
                  <p className="text-m-regular">
                    {isOptionObject ? _.get(option, display) : option}
                  </p>
                </li>
              ))}
            </ul>
          )}
        </div>
      </ClickAwayListener>
    );
  }
);

export default DropdownWithSearch;
