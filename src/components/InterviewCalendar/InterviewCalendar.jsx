import React, { useState, useRef } from "react";
import {
  format,
  addDays,
  startOfWeek,
  addHours,
  isPast,
  isBefore,
  addMinutes,
} from "date-fns";
import styles from "./InterviewCalendar.module.css";
import SimpleDropdown from "../SimpleDropdown/SimpleDropdown";
// import { toZonedTime, fromZonedTime } from "date-fns-tz";
import { de } from "date-fns/locale";
import { ClickAwayListener } from "@mui/material";

function toZonedTime(date, timeZone) {
  const options = {
    timeZone,
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: false,
  };

  const formatter = new Intl.DateTimeFormat([], options);
  const parts = formatter.formatToParts(date);

  const values = {};
  parts.forEach(({ type, value }) => {
    values[type] = value;
  });

  return new Date(`${values.year}-${values.month}-${values.day}T${values.hour}:${values.minute}:${values.second}`);
}

function fromZonedTime(dateString, timeZone) {
  const date = new Date(dateString);
  const options = {
    timeZone,
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: false,
  };

  const formatter = new Intl.DateTimeFormat([], options);
  const parts = formatter.formatToParts(date);

  const values = {};
  parts.forEach(({ type, value }) => {
    values[type] = value;
  });

  return new Date(`${values.year}-${values.month}-${values.day}T${values.hour}:${values.minute}:${values.second}`);
}

const TimePicker = ({ date, timeZone, onAddTimeSlot, disabled }) => {
  const [customTime, setCustomTime] = useState("");
  const [isPickerVisible, setPickerVisible] = useState(false);
  const [selectedHour, setSelectedHour] = useState("");
  const [selectedMinute, setSelectedMinute] = useState("");

  const togglePicker = () => {
    setSelectedHour("");
    setSelectedMinute("");
    setCustomTime("");
    setPickerVisible(!isPickerVisible);
  };

  const saveTime = () => {
    if (selectedHour !== "" && selectedMinute !== "") {
      const updatedDate = new Date(date);
      updatedDate.setHours(
        parseInt(selectedHour, 10),
        parseInt(selectedMinute, 10),
        0,
        0
      );
      onAddTimeSlot(fromZonedTime(updatedDate, timeZone));
      setCustomTime("");
      setSelectedHour("");
      setSelectedMinute("");
      togglePicker();
    }
  };

  const handleSelectHour = (hour) => {
    setSelectedHour(hour);
    updateCustomTime(hour, selectedMinute);
  };

  const handleSelectMinute = (minute) => {
    setSelectedMinute(minute);
    updateCustomTime(selectedHour, minute);
  };

  const updateCustomTime = (hour, minute) => {
    // console.log(customTime);
    if (hour !== "" && minute !== "") {
      setCustomTime(`${hour}:${minute}`);
    }
  };

  const handleTimeInputChange = (e) => {
    const value = e.target.value;
    setCustomTime(value);
    const [hour, minute] = value.split(":");
    setSelectedHour(hour);
    setSelectedMinute(minute);
  };

  return (
    <ClickAwayListener
      mouseEvent="onMouseDown"
      touchEvent="onTouchStart"
      onClickAway={() => setPickerVisible(false)}
    >
      <div className={styles.timePickerWrapper}>
        <button
          className={styles.timeAddBtn}
          type="button"
          onClick={togglePicker}
          disabled={disabled}
        >
          + Zeit
        </button>

        {isPickerVisible && (
          <div className={styles.pickerContainer}>
            <input
              className={styles.inputTime}
              type="time"
              value={customTime}
              onChange={handleTimeInputChange}
            />

            <div className={styles.timeSelectors}>
              {/* Scrollable list for hours */}
              <ul className={styles.scrollableList}>
                {Array.from({ length: 24 }, (_, i) => (
                  <li
                    key={i}
                    className={`${styles.scrollableListItem} ${
                      selectedHour && Number(selectedHour) === i
                        ? styles.selected
                        : ""
                    }`}
                    onClick={() =>
                      handleSelectHour(i.toString().padStart(2, "0"))
                    }
                  >
                    {i.toString().padStart(2, "0")}
                  </li>
                ))}
              </ul>

              <ul className={styles.scrollableList}>
                {Array.from({ length: 60 }, (_, i) => (
                  <li
                    key={i}
                    className={`${styles.scrollableListItem} ${
                      selectedMinute && Number(selectedMinute) === i
                        ? styles.selected
                        : ""
                    }`}
                    onClick={() =>
                      handleSelectMinute(i.toString().padStart(2, "0"))
                    }
                  >
                    {i.toString().padStart(2, "0")}
                  </li>
                ))}
              </ul>
            </div>

            <button type="button" className="primary small" onClick={saveTime}>
              + Zeit
            </button>
          </div>
        )}
      </div>
    </ClickAwayListener>
  );
};

const TimeSlotPicker = ({
  date,
  selectedSlots,
  onAddTimeSlot,
  disabled = false,
}) => {
  // const [customTime, setCustomTime] = useState("");
  const inputRef = useRef(null);
  const timeZone = "Europe/Berlin";
  const slots = generateTimeSlots(date);

  const triggerInputClick = () => {
    if (inputRef.current) {
      inputRef.current.focus();
      inputRef.current.click();
    }
  };

  const isSlotSelected = (slotTime) => {
    return selectedSlots.some(
      (slot) => slot.startAt.getTime() === slotTime.getTime()
    );
  };

  return (
    <>
      <div className={styles.dayHeader}>
        <p className="text-m-semibold">
          {format(date, "dd. MMMM", { locale: de })}
        </p>
        <p className="text-s-regular">{format(date, "eeee", { locale: de })}</p>
      </div>
      {/* <div> */}
      <TimePicker
        timeZone={timeZone}
        date={date}
        onAddTimeSlot={onAddTimeSlot}
        disabled={disabled}
      />
      {/* <input
          ref={inputRef}
          className={styles.inputTime}
          type="time"
          value={customTime}
          onChange={(e) => setCustomTime(e.target.value)}
        />
        <button
          className={styles.timeAddBtn}
          type="button"
          onClick={() => {
            if (customTime.length === 5) {
              const [hours, minutes] = customTime.split(":").map(Number);
              const updatedDate = new Date(date);
              updatedDate.setHours(hours, minutes, 0, 0);
              onAddTimeSlot(fromZonedTime(updatedDate, timeZone));
              setCustomTime("");
            } else {
              triggerInputClick();
            }
          }}
        >
          + Zeit
        </button> */}
      {/* </div> */}
      <div className="column minGap">
        {slots.map((slotTime, index) => {
          const isSelected = isSlotSelected(slotTime);

          const formattedTime = new Date(slotTime).toLocaleTimeString("de-DE", {
            hour: "2-digit",
            minute: "2-digit",
            hour12: false,
            timeZone: "Europe/Berlin",
          });

          return (
            <div key={index}>
              <div
                className={`${styles.timeSlot} ${
                  isSelected ? styles.selected : ""
                }`}
                onClick={() => {
                  // console.log(slotTime);
                  !disabled && onAddTimeSlot(slotTime);
                }}
              >
                <p>{formattedTime}</p>
                {isSelected && (
                  <span
                    className="material-symbols-outlined"
                    style={{ fontSize: "16px" }}
                  >
                    close
                  </span>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
};

function generateTimeSlots(startOfDayUTC) {
  const timeZone = "Europe/Berlin";
  let startWorkHourUTC = addHours(startOfDayUTC, 8);
  let endWorkHourUTC = addHours(startOfDayUTC, 18);

  // const startOfDayLocal = fromZonedTime(startWorkHourUTC, timeZone);
  // console.log(startOfDayLocal);
  // startOfDayLocal.setHours(8, 0, 0, 0);
  // console.log(startOfDayLocal);

  // const endAt = new Date(startOfDayLocal);
  // endAt.setHours(18, 0, 0, 0);

  const timeSlots = [];
  let currentTime = startWorkHourUTC;

  while (currentTime <= endWorkHourUTC) {
    timeSlots.push(toZonedTime(currentTime, timeZone));
    currentTime = new Date(currentTime.getTime() + 30 * 60 * 1000);
  }

  return timeSlots;
}

const getMonday = (d) => {
  d = new Date(d);
  var day = d.getDay(),
    diff = d.getDate() - day + (day == 0 ? -6 : 1);
  return new Date(d.setDate(diff));
};

const getStartWeek = (d) => {
  d = getMonday(d);
  d = new Date(d).setUTCHours(0, 0, 0, 0);
  return d;
};

const InterviewCalendar = ({ onSelect }) => {
  const [selectedSlots, setSelectedSlots] = useState([]);
  const timeZone = "Europe/Berlin";
  const now = new Date();
  const [currentWeek, setCurrentWeek] = useState(
    new Date(getStartWeek(new Date()))
  );

  const [intervalMinutes, setIntervalMinutes] = useState("30 Minuten");

  const handleIntervalChange = (value) => {
    setIntervalMinutes(value);
  };

  const intervalOptions = [
    "15 Minuten",
    "30 Minuten",
    "45 Minuten",
    "60 Minuten",
    "90 Minuten",
  ];

  const thisWeekStart = new Date(getStartWeek(new Date()));

  const handleAddTimeSlot = (startAt) => {
    // console.log(intervalMinutes);
    const newSlot = {
      startAt: startAt,
      endAt: addMinutes(startAt, parseInt(intervalMinutes, 10)),
    };

    setSelectedSlots((prev) =>
      prev.some(
        (slot) =>
          slot.startAt.getTime() === newSlot.startAt.getTime() &&
          slot.endAt.getTime() === newSlot.endAt.getTime()
      )
        ? prev.filter(
            (slot) =>
              slot.startAt.getTime() !== newSlot.startAt.getTime() ||
              slot.endAt.getTime() !== newSlot.endAt.getTime()
          )
        : [...prev, newSlot]
    );
  };

  const handleRemoveTimeSlot = (startAt) => {
    setSelectedSlots((prev) =>
      prev.filter((slot) => slot.startAt.getTime() !== startAt.getTime())
    );
  };

  const renderDays = () => {
    const days = [];
    for (let i = 0; i < 7; i++) {
      const day = addDays(currentWeek, i);

      days.push(
        <div
          key={i}
          style={{
            width: "80px",
            boxSizing: "border-box",
            opacity: isPast(fromZonedTime(day, timeZone)) ? 0.4 : 1,
          }}
        >
          <TimeSlotPicker
            date={day}
            onAddTimeSlot={handleAddTimeSlot}
            selectedSlots={selectedSlots}
            disabled={isPast(fromZonedTime(day, timeZone))}
          />
        </div>
      );
    }
    return days;
  };

  const handleNextWeek = () => {
    setCurrentWeek(addDays(currentWeek, 7));
  };

  const handlePrevWeek = () => {
    const prevWeek = addDays(currentWeek, -7);
    if (!isBefore(prevWeek, thisWeekStart)) {
      setCurrentWeek(prevWeek);
    }
  };

  return (
    <>
      <div className={styles.calendarWrapper}>
        <h5>Interview vereinbaren</h5>
        <div className="row gap" style={{ height: "600px" }}>
          <div className="column gap" style={{ minWidth: "256px" }}>
            <div className="column minGap">
              <p className="text-m-semibold">Interviewdauer</p>
              <SimpleDropdown
                label="Bitte auswählen"
                options={intervalOptions}
                onSelect={(value) => handleIntervalChange(value)}
                defaultValue={"30 Minuten"}
              />
            </div>
            <div className="column" style={{ maxHeight: "calc(100% - 120px)" }}>
              <p className="text-m-semibold">Terminvorschläge</p>
              {selectedSlots.length === 0 && (
                <>
                  <p
                    className="text-m-regular"
                    style={{ color: "var(--grey-60)" }}
                  >
                    Erscheinen hier
                  </p>
                </>
              )}
              {selectedSlots.length !== 0 && (
                <div className={styles.selectedDateList}>
                  {selectedSlots.map((item, index) => {
                    const timeZone = "Europe/Berlin";
                    const zonedstartAt = toZonedTime(item.startAt, timeZone);

                    const formattedDate = format(zonedstartAt, "EEE, MMM d.", {
                      locale: de,
                    });

                    const formatter = new Intl.DateTimeFormat("en-GB", {
                      timeZone: "Europe/Berlin",
                      hour: "2-digit",
                      minute: "2-digit",
                      timeZoneName: "short",
                    });

                    const zonedendAt = formatter.format(item.endAt);

                    const formattedTimeRange = `${format(
                      zonedstartAt,
                      "HH:mm"
                    )} - ${zonedendAt}`;

                    return (
                      <div key={index} className={styles.selectedDateItem}>
                        <p
                          className="text-s-medium"
                          style={{ color: "var(--grey-100)" }}
                        >
                          {formattedDate}
                        </p>
                        <p
                          className="text-s-medium"
                          style={{ color: "var(--grey-100)" }}
                        >
                          {formattedTimeRange}
                        </p>
                        <span
                          style={{
                            color: "var(--grey-40)",
                            cursor: "pointer",
                          }}
                          className="material-symbols-outlined"
                          onClick={() => handleRemoveTimeSlot(item.startAt)}
                        >
                          delete
                        </span>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          </div>
          <div className={styles.tableWrapper}>
            <button onClick={handlePrevWeek} className={styles.navigateBtn}>
              <span className="material-symbols-outlined">
                keyboard_arrow_left
              </span>
            </button>
            <div className={styles.table}>{renderDays()}</div>
            <button onClick={handleNextWeek} className={styles.navigateBtn}>
              <span className="material-symbols-outlined">
                keyboard_arrow_right
              </span>
            </button>
          </div>
        </div>
        <div className={styles.control}>
          <button className="secondary medium">Abbrechen</button>
          <button
            className="primary medium"
            onClick={() => onSelect(selectedSlots)}
          >
            Senden
          </button>
        </div>
      </div>
    </>
  );
};

export default InterviewCalendar;
