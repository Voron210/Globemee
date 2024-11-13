import React, { useCallback, useEffect, useRef, useState } from "react";
import styles from "./searchInput.module.css";
import { ClickAwayListener } from "@mui/material";
import axiosInstance from "../lib/axios/AxiosConfig";
import { useFormContext } from "react-hook-form";
import Fuse from "fuse.js";
import _ from "lodash";
import { element } from "prop-types";

{
  /*<SearchInput
            searchType={"front"}
            address={"common_source/get_countries"}
            reqParam={"language=en"}
            selectedItems={watch("placeOfLiving")}
            varName="placeOfLiving"
          /> */
}
const SearchInput = ({
  searchType,
  selectedItems,
  onSelect,
  address,
  reqParam,
  varName = "",
  placeholder = "",
  placeholderValue = false,
  manual = "",
  disabled = false,
  notRelevant = "",
  free = false,
  error = false,
  onResultsUpdate,
}) => {
  const [isActive, setIsActive] = useState(false);
  const [query, setQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [selectedItem, setSelectedItem] = useState();
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const [fuse, setFuse] = useState(null);
  const [fullList, setFullList] = useState([]);
  // const [reqParams, setReqParams] = useState(reqParam);

  // useEffect(() => {
  //   console.log(reqParam);
  // }, [reqParam]);

  const inputRef = useRef(null);

  const hasBeenRendered = useRef({ firstLoad: true, searching: false });

  const {
    setValue,
    register,
    formState: { errors },
    watch,
    getValues,
  } = useFormContext();

  const observer = useRef();
  const [visibleItems, setVisibleItems] = useState(10);

  // console.log(notRelevant );

  useEffect(() => {
    if (onResultsUpdate) {
      onResultsUpdate(searchResults);
    }
  }, [searchResults]);

  const handleInputFocus = () => {
    setIsActive(true);
    setSelectedIndex(-1);
  };

  const handleClickAway = () => {
    setIsActive(false);
  };

  const handleSelectItem = (item) => {
    let processedItem = item;

    if (manual && manual !== "") {
      const manualLowerCase = manual.toLowerCase();
      const itemLowerCase = item.toLowerCase();

      if (itemLowerCase.includes(manualLowerCase)) {
        processedItem = itemLowerCase.replace(manualLowerCase, "").trim();
      }
    }

    // console.log(processedItem);
    setSelectedItem(processedItem);

    switch (searchType) {
      case "server":
        setSearchResults(fullList);
        break;
      case "front":
        setSearchResults(fuse._docs);
        break;
      default:
        break;
    }

    if (onSelect) {
      onSelect(processedItem);
      if (inputRef.current) {
        inputRef.current.value = "";
      }
    } else {
      setValue(varName, processedItem);
    }

    setIsActive(false);
  };

  // useEffect for searching
  useEffect(() => {
    if (!hasBeenRendered.current.firstLoad) {
      // console.log("second");
      // if (hasPageBeenRendered.current["effect1"]) {
      // if (query !== "") {
      //   console.log(query);
      switch (searchType) {
        case "server":
          const fetchSearchResults = async () => {
            try {
              let queryString = `${address}`;
              if (reqParam || searchType === "server") {
                queryString += `?`;
              }
              if (reqParam) {
                queryString += `${reqParam}`;
              }
              if (reqParam && searchType === "server") {
                queryString += `&`;
              }
              if (searchType === "server") {
                queryString += `query=${query}`;
              }
              const response = await axiosInstance.get(queryString);
              setSearchResults(response.data);
            } catch (error) {}
          };
          fetchSearchResults();
          break;
        case "front":
          if (fuse) {
            if (query.trim() === "") {
              // Если query пустой, установить весь список в результаты
              setSearchResults(fuse._docs); // `fuse._docs` содержит исходный массив данных
            } else {
              const results = fuse.search(query);
              setSearchResults(results.map((result) => result.item));
            }
          }
          break;
        default:
          break;
      }
      setSelectedIndex(-1);
    }
    // }
    // hasPageBeenRendered.current["effect1"] = true;
  }, [query, reqParam]);

  useEffect(() => {
    // if (hasBeenRendered.current.firstLoad) {
    let firstquery = getValues(varName);
    if (firstquery) {
      setQuery(firstquery);
    }
    const fetchInitialData = async () => {
      try {
        let queryString = `${address}`;
        if (reqParam || firstquery) {
          queryString += `?`;
        }
        if (reqParam) {
          queryString += `${reqParam}`;
        }
        if (reqParam || firstquery) {
          queryString += `&`;
        }
        if (firstquery) {
          queryString += `query=${firstquery}`;
        }
        const response = await axiosInstance.get(queryString);
        // console.log("Initial Data:", response.data); // Отладка данных
        setSearchResults(response.data);
        setFullList(response.data);

        if (searchType === "front") {
          const fuseInstance = new Fuse(response.data, {
            keys: ["name"], // или любые другие ключи, которые вы хотите использовать для поиска
            threshold: 0.3, // настройка чувствительности поиска
          });
          setFuse(fuseInstance);
        }
      } catch (error) {}
    };
    fetchInitialData();
    hasBeenRendered.current.firstLoad = false;
    // }
  }, [reqParam]);

  const lastElementRef = useCallback((node) => {
    if (observer.current) observer.current.disconnect();
    observer.current = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        setVisibleItems((prevVisibleItems) => prevVisibleItems + 10);
      }
    });
    if (node) observer.current.observe(node);
  }, []);

  const handleKeyDown = (e) => {
    if (!isActive) return;

    switch (e.key) {
      case "ArrowUp":
        e.preventDefault();
        setSelectedIndex((prevIndex) =>
          prevIndex > 0 ? prevIndex - 1 : searchResults.length - 1
        );
        break;
      case "ArrowDown":
        e.preventDefault();
        setSelectedIndex((prevIndex) =>
          prevIndex < searchResults.length - 1 ? prevIndex + 1 : 0
        );
        break;
      case "Enter":
        e.preventDefault();
        if (selectedIndex !== -1) {
          handleSelectItem(searchResults[selectedIndex]);
        }
        break;
      case "Escape":
        e.preventDefault();
        setIsActive(false);
        break;
      default:
        break;
    }
  };

  const handleMouseEnter = (index) => {
    setSelectedIndex(index);
  };

  const displayList = (searchResults) => {
    let exportList = [...searchResults];

    if (query && manual !== "") {
      exportList = [`${manual}${query}`, ...exportList];
      return exportList;
    }

    if (notRelevant !== "") {
      return selectedItems.length === 0
        ? [notRelevant, ...searchResults]
        : selectedItems[0] === notRelevant
        ? [notRelevant]
        : [...searchResults];
    }
    return exportList;
  };

  return (
    <ClickAwayListener
      mouseEvent="onMouseDown"
      touchEvent="onTouchStart"
      onClickAway={handleClickAway}
    >
      <div className={styles.input}>
        {/* <input
            type="text"
            onFocus={handleInputFocus}
            placeholder="Search positions"
            {...(onSelect ? register(varName, {
              validate: (value) => {
                // Проверяем, содержится ли значение value в searchResults
                // return searchResults.some(item => item === value) || 'Invalid value';
              },
            }) : {})}
            className={styles.input}
            onChange={(e) => {
              setQuery(e.target.value);
              setVisibleItems(10);
            }}
            onKeyDown={handleKeyDown}
          /> */}
        {onSelect ? (
          <div className={styles.input_container}>
            <input
              ref={inputRef}
              type="text"
              onFocus={handleInputFocus}
              onClick={handleInputFocus}
              placeholder={placeholder}
              className={`${styles.input} ${error ? "error" : ""}`}
              onChange={(e) => {
                setIsActive(true);
                setQuery(e.target.value);
                setVisibleItems(10);
              }}
              onKeyDown={handleKeyDown}
            />
            {/* <span className={styles.input_arrow}>{isActive ? "▲" : "▼"}</span> */}
            <span className={`${styles.input_arrow} material-symbols-outlined`}>
              {isActive ? "keyboard_arrow_up" : "keyboard_arrow_down"}
            </span>
          </div>
        ) : placeholderValue ? (
          <div className={styles.input_container}>
            <input
              ref={inputRef}
              type="text"
              onFocus={handleInputFocus}
              onClick={handleInputFocus}
              placeholder={placeholder}
              {...register(varName, {
                validate: (value) => {
                  if (
                    searchResults.some((item) => item === value) ||
                    placeholder !== ""
                  ) {
                    return true;
                  } else {
                    return "Value is empty";
                  }
                },
              })}
              className={`${styles.input} ${
                _.get(errors, varName) ? "error" : ""
              }`}
              onChange={(e) => {
                setQuery(e.target.value);
                setVisibleItems(10);
              }}
              onKeyDown={handleKeyDown}
            />
            {/* <span className={styles.input_arrow}>{isActive ? "▲" : "▼"}</span> */}
            <span className={`${styles.input_arrow} material-symbols-outlined`}>
              {isActive ? "keyboard_arrow_up" : "keyboard_arrow_down"}
            </span>
          </div>
        ) : (
          <div className={styles.input_container}>
            <input
              ref={inputRef}
              type="text"
              onFocus={handleInputFocus}
              onClick={handleInputFocus}
              placeholder={placeholder}
              {...register(varName, {
                validate: (value) => {
                  return (
                    searchResults.some((item) => item === value) ||
                    (!!manual && !!value) ||
                    free ||
                    "Invalid value"
                  );
                },
              })}
              className={`${styles.input} ${
                _.get(errors, varName) && getValues(varName) === ""
                  ? "error"
                  : ""
              }`}
              onChange={(e) => {
                setQuery(e.target.value);
                setVisibleItems(10);
              }}
              onKeyDown={handleKeyDown}
              disabled={disabled}
            />
            {/* <span className={styles.input_arrow}>{isActive ? "▲" : "▼"}</span> */}
            <span className={`${styles.input_arrow} material-symbols-outlined`}>
              {isActive ? "keyboard_arrow_up" : "keyboard_arrow_down"}
            </span>
          </div>
        )}

        {isActive ? (
          <div className={styles.dropdown}>
            <div className={styles.dropdown_content}>
              <ul>
                {/* {searchResults &&
                  (notRelevant === ""
                    ? searchResults
                    : selectedItems.length === 0
                    ? [notRelevant, ...searchResults]
                    : selectedItems[0] === notRelevant
                    ? [notRelevant]
                    : [...searchResults]
                  ) */}
                {searchResults &&
                  displayList(searchResults)
                    .slice(0, visibleItems)
                    .map((item, index) => (
                      <li
                        ref={
                          index ===
                          searchResults.slice(0, visibleItems).length - 1
                            ? lastElementRef
                            : null
                        }
                        className={
                          (selectedItems && selectedItems.includes(item)) ||
                          selectedIndex === index
                            ? `${styles.item} ${styles.selected}`
                            : styles.item
                        }
                        key={index}
                        onClick={() => handleSelectItem(item)}
                        onMouseEnter={() => handleMouseEnter(index)}
                      >
                        {item}
                      </li>
                    ))}
              </ul>
            </div>
          </div>
        ) : null}
      </div>
    </ClickAwayListener>
  );
};

export { SearchInput };
