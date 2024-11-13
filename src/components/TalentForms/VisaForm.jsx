import { addYears, format } from "date-fns";
import React, { useEffect } from "react";
import DatePicker from "react-datepicker";
import { Controller, useFormContext } from "react-hook-form";
import ItemList from "../ItemList/ItemList";
import relocate from "../../common/relocate";
import preferCity from "../../common/preferCity.jsx";
import visa from "../../common/visa.jsx";
import educationalConfirmation from "../../common/educationalConfirmation.jsx";

const VisaForm = () => {
  const {
    control,
    setValue,
    formState,
    getValues,
    register,
    watch,
    unregister,
  } = useFormContext();

  const watchAllFields = watch();
  useEffect(() => {}, [watch]);

  const willingnessToRelocate = getValues("visaInfo.willingnessToRelocate");
  useEffect(() => {
    if (willingnessToRelocate === "Yes") {
      register("visaInfo.preferredCitySize");
    } else {
      unregister("visaInfo.preferredCitySize");
    }
  }, [willingnessToRelocate]);

  const preferredCity = getValues("visaInfo.preferredCity");
  useEffect(() => {
    if (preferredCity === false) {
      setValue("visaInfo.preferredCityName", []);
    }
  }, [preferredCity]);

  return (
    <>
      <h4>Visa</h4>

      <div className="column">
        <p className="text-m-semibold">
          Do you already have a working Visa for Germany?
        </p>
        <div className="radio_list">
          {visa.map((item, index) => (
            <div key={index} className="radio_item">
              <input
                className="real-radio flex"
                type="radio"
                id={`radio_visa_${index}`}
                value={item.text}
                {...register("visaInfo.visa", {
                  required: true,
                })}
              />
              <span className="custom-radio"></span>
              <label htmlFor={`radio_visa_${index}`}>{item.name}</label>
            </div>
          ))}
        </div>
      </div>

      <div className="column">
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
              <span className="custom-radio center"></span>
              <label htmlFor={`radio_relocate_${index}`}>{item.name}</label>
            </div>
          ))}
        </div>
      </div>
      {getValues("visaInfo.willingnessToRelocate") === "Yes" && (
        <div className="column">
          <p className="text-m-semibold">Where do you prefer to work?</p>
          <div>
            {preferCity.map((item, index) => (
              <div key={index} className="radio_item start">
                <input
                  type="checkbox"
                  id={`checkbox_${index}`}
                  {...register(`visaInfo.preferredCitySize.${item.text}`)} // Примерное значение для регистрации
                />
                <label htmlFor={`checkbox_${index}`}>{item.name}</label>
              </div>
            ))}
            <div className="radio_item start">
              <input
                type="checkbox"
                id={`checkbox_preferredCity`}
                {...register(`visaInfo.preferredCity`)} // Примерное значение для регистрации
                // onChange={() => createField()}
              />
              <label htmlFor={`checkbox_preferredCity`}>A specific city</label>
            </div>
          </div>
        </div>
      )}
      {preferredCity &&
        getValues("visaInfo.willingnessToRelocate") === "Yes" && (
          <div className="column">
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
      <div className="column">
        <p className="text-m-semibold">Do you have a degree recognition? *</p>
        <p>
          If you want to work in Germany, you might have to obtain ZAB approval.
          ZAB is the central office for the evaluation of foreign qualifications
          in Germany. This approval confirms that your foreign qualifications
          are recognized in Germany and that you are qualified to work in your
          profession.
        </p>
        <div className="radio_list">
          {educationalConfirmation.map((item, index) => (
            <div key={index} className="radio_item">
              <input
                className="real-radio"
                type="radio"
                id={`educationalConfirmation${index}`}
                value={item.text}
                {...register("visaInfo.educationalConfirmation", {
                  required: true,
                })}
              />
              <span className="custom-radio"></span>
              <label htmlFor={`educationalConfirmation${index}`}>
                {item.name}
              </label>
            </div>
          ))}
        </div>
      </div>
      <div className="column">
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
              minDate={addYears(new Date(), 1)}
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
    </>
  );
};

export default VisaForm;
