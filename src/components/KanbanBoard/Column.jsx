import React from "react";
import { useDroppable } from "@dnd-kit/core";
import styles from "./Column.module.css";
import Item from "./Item";

const Column = ({
  id,
  items,
  title,
  isActive,
  activeItem,
  onItemClick,
  role,
}) => {
  const { setNodeRef } = useDroppable({ id });

  return (
    <div ref={setNodeRef} className={`${styles.column}`}>
      <h5>{title}</h5>
      <div
        id={id}
        className={`${styles.items} ${isActive ? styles.active : ""}`}
      >
        {items.map((item) => (
          <Item
            key={item.id}
            id={item.id}
            content={item}
            style={{
              visibility:
                activeItem && activeItem.id === item.id ? "hidden" : "visible",
            }}
            onItemClick={onItemClick}
            role={role}
          />
        ))}
      </div>
    </div>
  );
};

export default Column;
