import React, { useEffect, useState } from "react";
import { SearchInput } from "../searchInput";
import { Controller, useFormContext } from "react-hook-form";
import WormSelect from "../WormSelect";
import workLevel from "../../common/workLevel";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import CloseIcon from "@mui/icons-material/Close";
import PropTypes from "prop-types";
import styles from "./ItemList.module.css";
import Dropdown from "../Dropdown/Dropdown";
import _ from "lodash";
import StarBorderIcon from "@mui/icons-material/StarBorder";
import StarIcon from "@mui/icons-material/Star";

const ItemList = ({
  type = "simpleList",
  searchType = "none",
  address = "/common_source/get_industries",
  listName = "default.listname",
  reqParam,
  onChange,
  value,
  itemNameKey = "name",
  itemLevelKey = "level",
  children = <></>,
  list,
  required = false,
  notRelevant = "",
  beliebig = "",
  mustHaveListName = "",
  onResultsUpdate,
  manual = "",
}) => {
  const {
    control,
    getValues,
    formState: { errors },
    watch,
    setValue,
  } = useFormContext();
  const mustHaveList = watch(mustHaveListName) || [];
  const [searchResults, setSearchResults] = useState([]);

  const handleResultsUpdate = (results) => {
    setSearchResults(results);
  };

  useEffect(() => {
    if (onResultsUpdate) {
      onResultsUpdate(searchResults);
    }
  }, [searchResults]);

  const handleSelect = (item) => {
    switch (type) {
      case "simpleList":
        if (!value.find((i) => i === item)) {
          onChange([...value, item]);
        } else {
          handleDelete(item);
        }
        break;
      case "experienceList":
        const array = getValues(listName);
        if (!array.find((i) => i[itemNameKey] === item)) {
          onChange([...array, { [itemNameKey]: item, [itemLevelKey]: "" }]);
        } else {
          handleDelete(item);
        }
        break;

      default:
        break;
    }
  };

  const handleDelete = (item) => {
    const array = getValues(listName);
    switch (type) {
      case "simpleList":
        onChange(value.filter((i) => i !== item));
        break;
      case "experienceList":
        onChange(array.filter((i) => i[itemNameKey] !== item));
        if (mustHaveListName !== "") {
          setValue(
            mustHaveListName,
            mustHaveList.filter((i) => i !== item)
          );
        }
        break;

      default:
        break;
    }
  };

  const handleMustHave = (item) => {
    const updatedMustHaveList = mustHaveList.includes(item)
      ? mustHaveList.filter((i) => i !== item)
      : [...mustHaveList, item];

    setValue(mustHaveListName, updatedMustHaveList);
  };

  return (
    <div>
      {searchType !== "none" ? (
        <SearchInput
          searchType={searchType}
          selectedItems={
            type === "simpleList"
              ? value.map((item) => item)
              : value.map((item) => item[itemNameKey])
          }
          onSelect={handleSelect}
          address={address}
          reqParam={reqParam}
          notRelevant={notRelevant}
          error={!!_.get(errors, listName)}
          onResultsUpdate={handleResultsUpdate}
          manual={manual}
        />
      ) : (
        <>
          <Dropdown
            options={list}
            selectedValue={value.map((item) => item)}
            onSelect={handleSelect}
            label="Select Degree"
            toList
            disabled={false}
            error={required && _.get(errors, listName)}
          />
        </>
      )}

      {children}
      {type === "simpleList" && value.length > 0 && (
        <ul className={styles.list}>
          {value.map((item, index) => (
            <li key={index} className={styles.item}>
              {item}
              <CloseIcon
                onClick={() => handleDelete(item)}
                color="inherit"
                className={styles.deleteIcon}
              />
            </li>
          ))}
        </ul>
      )}
      {type === "experienceList" && value.length > 0 && (
        <ul className={styles.experienceList}>
          {value.map((item, index) => (
            <li key={index} className={styles.experienceList_item}>
              <div className="start center">
                {mustHaveListName && (
                  <>
                    {mustHaveList.includes(item[itemNameKey]) ? (
                      <StarIcon
                        color="inherit"
                        style={{ color: "var(--yellow-100)" }}
                        onClick={() => handleMustHave(item[itemNameKey])}
                      />
                    ) : (
                      <StarBorderIcon
                        color="inherit"
                        style={{ color: "var(--yellow-100)" }}
                        onClick={() => handleMustHave(item[itemNameKey])}
                      />
                    )}
                  </>
                )}
                {item[itemNameKey]}{" "}
                <DeleteOutlineIcon
                  onClick={() => handleDelete(item[itemNameKey])}
                  color="inherit"
                />
              </div>

              <Controller
                key={`${item[itemNameKey]}-${index}`}
                name={`${listName}[${index}].${itemLevelKey}`}
                control={control}
                rules={{ required: "This field is required" }}
                render={({ field }) => {
                  // const listParts = listName.split(".");
                  return (
                    <>
                      <div style={{ maxWidth: "600px" }}>
                        <WormSelect
                          listName={listName}
                          options={
                            beliebig === ""
                              ? workLevel
                              : [
                                  {
                                    name: `${beliebig}`,
                                    text: 0,
                                  },
                                  ...workLevel,
                                ]
                          }
                          index={index}
                          onChange={field.onChange}
                          {...field}
                          levelKey={itemLevelKey}
                          error={
                            _.get(errors, listName) &&
                            _.get(errors, listName)[index]?.[itemLevelKey]
                              ?.message
                              ? "true"
                              : "false"
                            //  &&
                            // errors?.[listParts[0]]?.[listParts[1]]?.[index]?.[
                            //   itemLevelKey
                            // ]?.message
                            //   ? "true"
                            //   : "false"
                          }
                        />
                      </div>
                      {_.get(errors, listName) &&
                        _.get(errors, listName)[index]?.[itemLevelKey]
                          ?.message && (
                          <p className="error">
                            {
                              _.get(errors, listName)[index]?.[itemLevelKey]
                                ?.message
                            }
                          </p>
                        )}
                      {/* {errors?.[listParts[0]]?.[listParts[1]]?.[index]?.[
                        itemLevelKey
                      ]?.message && (
                        <p className="error">
                          {
                            errors[listParts[0]][listParts[1]][index][
                              itemLevelKey
                            ].message
                          }
                        </p>
                      )} */}
                    </>
                  );
                }}
              />
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

ItemList.propTypes = {
  type: PropTypes.string,
  searchType: PropTypes.string,
  address: PropTypes.string,
  listName: PropTypes.string,
  reqParam: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  value: PropTypes.array,
  itemNameKey: PropTypes.string, // Добавлено новое prop для имени
  itemLevelKey: PropTypes.string, // Добавлено новое prop для уровня
};

export default ItemList;
