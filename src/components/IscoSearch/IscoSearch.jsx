import React, { useEffect, useState, useCallback, useRef } from "react";
import styles from "./IscoSearch.module.css";
import { ClickAwayListener } from "@mui/material";
import axiosInstance from "../../lib/axios/AxiosConfig";
import { Tooltip } from "react-tooltip";

const IscoSearch = ({
  selectedValue = [],
  onSelect = (value) => console.log(value),
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchResult, setSearchResult] = useState([]);
  const [displayedResults, setDisplayedResults] = useState([]);
  const [selectedOption, setSelectedOption] = useState({
    name: "Berufsgruppe",
    level: 3,
  }); // default
  const [searchQuery, setSearchQuery] = useState("");
  const [hasMore, setHasMore] = useState(false);
  const dropdownRef = useRef(null);

  const iscoOption = [
    { name: "Berufshauptgruppe", level: 1 },
    { name: "Berufsgruppe", level: 3 },
    { name: "Berufsuntergruppe", level: 2 },
    { name: "Berufsgattung", level: 4 },
  ];

  useEffect(() => {
    searchIsco(searchQuery);
  }, [searchQuery, selectedOption]);

  const searchIsco = async (value) => {
    try {
      const response = await axiosInstance.get(
        `common_source/isco_search?query=${value}&level=${selectedOption.level}`
      );
      setSearchResult(response.data);
      setDisplayedResults(response.data.slice(0, 25));
      setHasMore(response.data.length > 25);
      if (dropdownRef.current) {
        dropdownRef.current.scrollTop = 0;
      }
    } catch (error) {
      console.error("Error fetching ISCO data:", error);
    }
  };

  const handleSelect = (option) => {
    onSelect(option);
    setIsOpen(false);
  };

  const isSelected = (option) => {
    if (Array.isArray(selectedValue)) {
      return selectedValue.includes(option);
    }
    return selectedValue === option;
  };

  const handleInputChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const loadMoreResults = useCallback(() => {
    if (hasMore) {
      const currentLength = displayedResults.length;
      const moreResults = searchResult.slice(currentLength, currentLength + 25);
      setDisplayedResults((prev) => [...prev, ...moreResults]);
      setHasMore(searchResult.length > displayedResults.length + 25);
    }
  }, [hasMore, displayedResults, searchResult]);

  const handleScroll = (e) => {
    const bottom =
      e.target.scrollHeight - e.target.scrollTop === e.target.clientHeight;
    if (bottom) {
      loadMoreResults();
    }
  };

  return (
    <ClickAwayListener
      mouseEvent="onMouseDown"
      touchEvent="onTouchStart"
      onClickAway={() => setIsOpen(false)}
    >
      <div className={styles.iscoSearchContainer}>
        <div className={styles.radioList}>
          {iscoOption.map((item, index) => (
            <div key={index} className={styles.radioItem}>
              <input
                className="real-radio"
                type="radio"
                id={`radio_isco_${index}`}
                checked={selectedOption.level === item.level}
                onChange={() => setSelectedOption(item)}
              />
              <span className="custom-radio"></span>
              <label htmlFor={`radio_isco_${index}`}>{item.name}</label>
            </div>
          ))}
        </div>

        <div onClick={() => setIsOpen(true)} className={styles.inputContainer}>
          <input
            type="text"
            value={searchQuery}
            onChange={handleInputChange}
            placeholder="Search..."
            className={styles.searchInput}
          />
          <span className={`${styles.inputArrow} material-symbols-outlined`}>
            {isOpen ? "keyboard_arrow_up" : "keyboard_arrow_down"}
          </span>
        </div>

        {isOpen && (
          <div
            className={styles.dropdownContent}
            onScroll={handleScroll}
            ref={dropdownRef}
          >
            <table className={styles.dropdownTable}>
              <thead>
                <tr>
                  <th className={styles.table_isco}>ISCO-08</th>
                  <th>Beruf/Berufsgruppe</th>
                  <th style={{ width: "50px" }}></th>
                </tr>
              </thead>
              <tbody>
                {displayedResults.map((option, index) => (
                  <tr
                    key={index}
                    className={`${styles.dropdownItem} ${
                      isSelected(option) ? styles.selectedItem : ""
                    }`}
                    onClick={() => handleSelect(option)}
                  >
                    <td style={{ textAlign: "center" }}>{option.code}</td>
                    <td className={styles.table_desc}>{option.titleEN}</td>
                    <td>
                      <span
                        data-tooltip-id={`${option.code}`}
                        className="material-symbols-outlined"
                      >
                        info
                      </span>
                      <Tooltip id={`${option.code}`} place="bottom">
                        <p>{option.definition}</p>
                      </Tooltip>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </ClickAwayListener>
  );
};

export default IscoSearch;
