import React from "react";
import styles from "./Worm.module.css";
import _ from "lodash";

const Worm = ({ options, selectedValue, display, onSelect }) => {
  if (!options) {
    return <></>;
  }

  return (
    <div className={styles.rangeContainer}>
      {options.map((option, index) => (
        <div
          key={index}
          className={`${styles.rangeOption} ${
            _.get(selectedValue, display) === _.get(option, display)
              ? styles.selected
              : ""
          }`}
          onClick={() => onSelect(option)}
        >
          {_.get(option, display)}
        </div>
      ))}
    </div>
  );
};

export default Worm;
