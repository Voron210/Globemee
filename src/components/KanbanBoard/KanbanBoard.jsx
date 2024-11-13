import React, { useState, useEffect, useRef } from "react";
import {
  DndContext,
  DragOverlay,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import {
  SortableContext,
  arrayMove,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import styles from "./KanbanBoard.module.css";
import Column from "./Column";
import Item from "./Item";
import Modal from "../Modal/Modal";
import Confetti from "../Confetti/Confetti";

const KanbanBoard = ({
  onItemClick,
  onChangePosition,
  columns = [],
  setColumns,
  role,
}) => {
  const confettiRef = useRef(null);
  const [modalActive, setModalActive] = useState(false);
  const [modalContent, setModalContent] = useState(null);
  const [modalWidth, setModalWidth] = useState("450px");
  const [modalClosable, setModalClosable] = useState(false);

  const openModal = (props) => {
    setModalWidth("450px");
    setModalClosable(false);
    setModalContent(props);
    setModalActive(true);
  };

  // console.log(columns);

  const [activeItem, setActiveItem] = useState(null);
  const [activeColumnId, setActiveColumnId] = useState(null);
  const containerRef = useRef(null);

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 1,
        tolerance: 5,
      },
    })
  );

  const handleDragStart = (event) => {
    const { active } = event;
    const activeColumn = columns.find((column) =>
      column.items.some((item) => item.id === active.id)
    );

    if (activeColumn.id === "column-1") {
      return;
    }

    const activeItem = activeColumn.items.find((item) => item.id === active.id);
    setActiveItem(activeItem);
  };

  const handleDragOver = (event) => {
    const { active, over } = event;

    if (over && active.id !== over.id) {
      const activeColumn = columns.find((column) =>
        column.items.some((item) => item.id === active.id)
      );
      const overColumn = columns.find((column) =>
        column.items.some((item) => item.id === over.id)
      );

      if (activeColumn && overColumn && activeColumn === overColumn) {
        const activeIndex = activeColumn.items.findIndex(
          (item) => item.id === active.id
        );
        const overIndex = overColumn.items.findIndex(
          (item) => item.id === over.id
        );

        if (activeIndex !== overIndex) {
          const updatedItems = arrayMove(
            activeColumn.items,
            activeIndex,
            overIndex
          );
          const updatedColumn = { ...activeColumn, items: updatedItems };
          setColumns(
            columns.map((column) =>
              column.id === activeColumn.id ? updatedColumn : column
            )
          );
        }
      }
    }

    if (over && over.id !== activeColumnId) {
      const overColumnId =
        columns.find((column) =>
          column.items.some((item) => item.id === over.id)
        )?.id || over.id;
      setActiveColumnId(overColumnId);
    }
  };

  const handleConfirmMove = ({
    active,
    activeIndex,
    activeColumn,
    overColumn,
    overIndex,
  }) => {
    onChangePosition(active.id, parseInt(overColumn.id.slice(-1), 10));

    const activeItem = activeColumn.items[activeIndex];
    const newActiveItems = [...activeColumn.items];
    newActiveItems.splice(activeIndex, 1);

    const newOverItems = [...overColumn.items];
    newOverItems.splice(overIndex, 0, activeItem);

    setColumns(
      columns.map((column) => {
        if (column.id === activeColumn.id) {
          return { ...column, items: newActiveItems };
        } else if (column.id === overColumn.id) {
          return { ...column, items: newOverItems };
        } else {
          return column;
        }
      })
    );
    // console.log(overColumn);
    if (overColumn.id === "column-7") {
      setModalActive(false);
    }
  };

  const handleDragEnd = (event) => {
    const { active, over } = event;
    setActiveColumnId(null);
    setActiveItem(null);

    if (!over) return;

    const activeColumn = columns.find((column) =>
      column.items.some((item) => item.id === active.id)
    );
    const overColumn = columns.find(
      (column) =>
        column.id === over.id ||
        column.items.some((item) => item.id === over.id)
    );

    if (overColumn.id === "column-1") {
      return;
    }

    if (activeColumn && overColumn) {
      const activeIndex = activeColumn.items.findIndex(
        (item) => item.id === active.id
      );
      const overIndex = overColumn.items.findIndex(
        (item) => item.id === over.id
      );

      if (activeColumn === overColumn) {
        const updatedItems = arrayMove(
          activeColumn.items,
          activeIndex,
          overIndex
        );
        const updatedColumn = { ...activeColumn, items: updatedItems };
        setColumns(
          columns.map((column) =>
            column.id === activeColumn.id ? updatedColumn : column
          )
        );
      } else {
        if (overColumn.id === "column-6" || overColumn.id === "column-7") {
          openModal(
            <div className="column gap-32">
              <Confetti ref={confettiRef} />
              <div className="column gap-16">
                <h5>
                  {activeItem.talentNameSurname}{" "}
                  {overColumn.id === "column-6" ? "einstellen?" : "ablehnen?"}
                </h5>
                <p className="text-m-regular">
                  {overColumn.id === "column-6"
                    ? "Wenn Sie fortfahren, leiten wir die nächsten Schritte für den Relocationprozess des Kandidaten ein."
                    : "Wenn Sie fortfahren, können Sie nicht mehr mit dem Talent chatten. Diese Aktion ist nicht rückgängig zu machen."}
                </p>
              </div>
              <div className="row gap-16 end">
                <button
                  type="button"
                  className="secondary small"
                  onClick={() => setModalActive(false)}
                >
                  Abbrechen
                </button>
                <button
                  type="button"
                  className="primary small"
                  onClick={() => {
                    handleConfirmMove({
                      active,
                      activeIndex,
                      activeColumn,
                      overColumn,
                      overIndex,
                    });
                    overColumn.id === "column-6" && confettiRef.current.fire();
                    setModalWidth("920px");
                    setModalClosable(true);
                    setModalContent(
                      <div className="column gap">
                        <h3>Herzlichen Glückwunsch!</h3>
                        <div className="column midGap">
                          <p className="text-m-semibold">
                            Wir freuen uns sehr, dass wir Ihnen dabei helfen
                            konnten, einen geeigneten Kandidaten für Ihre Stelle
                            zu finden.
                          </p>
                          <div className="column">
                            <p>
                              1. Sofern noch nicht geschehen: Fügen Sie Ihre
                              Betriebsnummer in Ihrem Unternehmensprofil unter
                              “Allgemeine Angaben” hinzu
                            </p>
                            <p>
                              2. Senden Sie den Arbeitsvertrag zur Unterschrift
                              an das Talent mit Globemee in CC
                            </p>
                            <p>
                              3. Laden Sie den unterschriebenen Arbeitsvertrag
                              auf der Profilseite des Talents hoch
                            </p>
                          </div>
                        </div>
                      </div>
                    );
                  }}
                >
                  {overColumn.id === "column-6" ? "Einstellen" : "Ablehnen"}
                </button>
              </div>
            </div>
          );
        } else {
          onChangePosition(active.id, parseInt(overColumn.id.slice(-1), 10));
          const activeItem = activeColumn.items[activeIndex];
          const newActiveItems = [...activeColumn.items];
          newActiveItems.splice(activeIndex, 1);

          const newOverItems = [...overColumn.items];
          newOverItems.splice(overIndex, 0, activeItem);

          setColumns(
            columns.map((column) => {
              if (column.id === activeColumn.id) {
                return { ...column, items: newActiveItems };
              } else if (column.id === overColumn.id) {
                return { ...column, items: newOverItems };
              } else {
                return column;
              }
            })
          );
        }
      }
    }
  };

  const handleDragMove = (event) => {
    const { delta, active } = event;
    const container = containerRef.current;

    if (container) {
      const containerRect = container.getBoundingClientRect();
      const activeRect = active.rect.current.translated;
      if (!activeRect) {
        return;
      }

      const activeCenterX = activeRect.left + activeRect.width / 2;
      const relativeX = activeCenterX - containerRect.left;
      const relativeXPercent = (relativeX / containerRect.width) * 100;

      if (relativeXPercent < 10) {
        container.scrollBy({ left: -10 });
      } else if (relativeXPercent > 90) {
        container.scrollBy({ left: 10 });
      }

      const columns = container.querySelectorAll(`[id*="column"]`);
      let targetColumn = null;

      columns.forEach((column) => {
        const columnRect = column.getBoundingClientRect();
        if (
          activeCenterX >= columnRect.left &&
          activeCenterX <= columnRect.right
        ) {
          targetColumn = column;
        }
      });

      if (targetColumn) {
        const columnRect = targetColumn.getBoundingClientRect();
        const activeCenterY = activeRect.top + activeRect.height / 2;
        const relativeY = activeCenterY - columnRect.top;
        const relativeYPercent = (relativeY / columnRect.height) * 100;

        if (relativeYPercent < 10) {
          targetColumn.scrollBy({ top: -5 });
        } else if (relativeYPercent > 90) {
          targetColumn.scrollBy({ top: 5 });
        }
      }
    }
  };

  return (
    <div className={styles.kanbanContainer}>
      <DndContext
        sensors={sensors}
        onDragStart={handleDragStart}
        onDragOver={handleDragOver}
        onDragEnd={handleDragEnd}
        onDragMove={handleDragMove}
        autoScroll={false}
      >
        <div className={styles.kanban} ref={containerRef}>
          {columns.map((column) => (
            <SortableContext
              key={column.id}
              items={column.items}
              strategy={verticalListSortingStrategy}
              disabled={
                column.id === "column-1" ||
                column.id === "column-7" ||
                role === "admin"
              }
            >
              <Column
                id={column.id}
                items={column.items}
                title={column.title}
                isActive={
                  column.id === activeColumnId && column.id !== "column-1"
                }
                activeItem={activeItem}
                onItemClick={onItemClick}
                role={role}
              />
            </SortableContext>
          ))}
        </div>
        <DragOverlay>
          {activeItem ? <Item id={activeItem.id} content={activeItem} /> : null}
        </DragOverlay>
      </DndContext>
      <Modal
        active={modalActive}
        setActive={setModalActive}
        children={modalContent}
        closable={modalClosable}
        width={modalWidth}
      />
    </div>
  );
};

export default KanbanBoard;
