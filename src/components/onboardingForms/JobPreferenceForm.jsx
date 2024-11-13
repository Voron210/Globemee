import React, { useEffect, useRef } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { addDays, addYears, format } from "date-fns";
import { Controller, useFormContext } from "react-hook-form";
import SalaryInput from "../SalaryInput/SalaryInput";
import relocate from "../../common/relocate";
import preferCity from "../../common/preferCity.jsx";
import ItemList from "../ItemList/ItemList.jsx";

function JobPreferences() {
  const {
    register,
    control,
    getValues,
    setValue,
    formState,
    watch,
    unregister,
  } = useFormContext();

  const watchAllFields = watch();
  useEffect(() => {}, [watch]);

  // const willingnessToRelocate = getValues("visaInfo.willingnessToRelocate");
  // useEffect(() => {
  //   if (willingnessToRelocate === "Yes") {
  //     register("visaInfo.preferredCitySize");
  //   } else {
  //     unregister("visaInfo.preferredCitySize");
  //   }
  // }, [willingnessToRelocate]);

  const preferredCity = getValues("visaInfo.preferredCity");
  useEffect(() => {
    if (preferredCity === false) {
      setValue("visaInfo.preferredCityName", []);
    }
  }, [preferredCity]);

  // const createField = () => {
  //   const preferredCity = getValues("visaInfo.preferredCity");
  //   console.log("change");
  //   if (preferredCity === true) {
  //     console.log("reg");
  //     register("visaInfo.preferredCityName.0");
  //     setValue("visaInfo.preferredCityName", ["qwe", "wewe", "eweqwr"]);
  //   } else {
  //     console.log("unreg");
  //     unregister("visaInfo.preferredCityName");
  //   }
  // };

  return (
    <>
      <h3>Job preferences</h3>
      {/* RELOCATE */}
      <div className="content-part">
        <p className="text-m-semibold">
          Are you willing to relocate to Germany?
        </p>
        <div className="radio_list">
          {relocate.map((item, index) => (
            <div key={index} className="radio_item">
              <input
                className="real-radio"
                type="radio"
                id={`radio_relocate_${index}`}
                value={item.text}
                {...register("visaInfo.willingnessToRelocate", {
                  required: true,
                })}
              />
              <span className="custom-radio"></span>
              <label htmlFor={`radio_relocate_${index}`}>{item.name}</label>
            </div>
          ))}
        </div>
      </div>
      {getValues("visaInfo.willingnessToRelocate") === "Yes" && (
        <div className="content-part">
          <p className="text-m-semibold">Where do you prefer to work?</p>
          <div>
            {preferCity.map((item, index) => (
              <div key={index}>
                <input
                  type="checkbox"
                  id={`checkbox_${index}`}
                  {...register(`visaInfo.preferredCitySize.${item.text}`)} // Примерное значение для регистрации
                />
                <label htmlFor={`checkbox_${index}`}>{item.name}</label>
              </div>
            ))}
            <input
              type="checkbox"
              id={`checkbox_preferredCity`}
              {...register(`visaInfo.preferredCity`)} // Примерное значение для регистрации
              // onChange={() => createField()}
            />
            <label htmlFor={`checkbox_preferredCity`}>A specific city</label>
          </div>
        </div>
      )}
      {preferredCity &&
        getValues("visaInfo.willingnessToRelocate") === "Yes" && (
          <div className="content-part">
            <p className="text-m-semibold">
              Which cities are you interested in?
            </p>
            <Controller
              name="visaInfo.preferredCityName"
              control={control}
              render={({ field }) => (
                <ItemList
                  type="simpleList"
                  searchType="server"
                  value={field.value}
                  onChange={field.onChange}
                  address="common_source/get_city_germany"
                  listName="visaInfo.preferredCityName"
                />
              )}
            />
          </div>
        )}

      {/* START DATE */}
      <div className="content-part">
        <p className="text-m-semibold">
          What is your earliest possible start date?
        </p>
        <Controller
          control={control}
          name="visaInfo.startDate"
          rules={{ required: true }}
          render={({ field }) => (
            <DatePicker
              {...field}
              minDate={addDays(new Date(), 1)}
              maxDate={addYears(new Date(), 2)}
              placeholderText="Click to select time"
              required
              errors={formState.errors}
              onChange={(date) =>
                setValue("visaInfo.startDate", format(date, "dd.MM.yyyy"))
              }
              dateFormat="dd.MM.yyyy"
            />
          )}
        />
      </div>

      {/* SALARY */}
      <div className="content-part">
        <p className="text-m-semibold">
          What is your salary expectation (gross per year in €)?
        </p>
        {/* <Controller
          control={control}
          name="career"
          rules={{
            validate: {
              emptyField: (value) => {
                return value && value.minSalary && value.maxSalary
                  ? true
                  : "Please fill in both salary fields";
              },
            },
          }}
          render={({ field }) => (
            <SalaryInput
              minSalary={field.value.minSalary}
              maxSalary={field.value.maxSalary}
              onChange={(min, max) =>
                field.onChange({
                  ...field.value,
                  minSalary: min,
                  maxSalary: max,
                })
              }
              errors={formState.errors}
            />
          )}
        /> */}
        {/* {formState.errors.career && (
          <p className="error">Please fill in both salary fields</p>
        )} */}
        <SalaryInput varName={"career"} />
      </div>
    </>
  );
}

export default JobPreferences;
