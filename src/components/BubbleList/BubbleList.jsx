import React from "react";
import styles from "./BubbleList.module.css";

const BubbleList = ({
  list = [],
  onDelete = (value) => console.log("delete:", value),
  display,
}) => {
  return (
    <>
      {list.length > 0 && (
        <ul className={styles.list}>
          {list.map((item, index) => (
            <li key={index} className={styles.item}>
              {display ? item[display] : item}
              <i
                onClick={() => onDelete(item)}
                className={`${styles.deleteIcon} material-symbols-outlined`}
              >
                close
              </i>
            </li>
          ))}
        </ul>
      )}
    </>
  );
};

export default BubbleList;
