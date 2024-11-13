import React from "react";
import { SearchInput } from "../searchInput";
import { Controller, useFormContext } from "react-hook-form";
import ItemList from "../ItemList/ItemList";
import { Tooltip } from "react-tooltip";

const sektorOptions = [
  { id: "radio_sector_public", label: "Öffentlicher Dienst" },
  { id: "radio_secotr_private", label: "Privatwirtschaft" },
];
const typeOptions = [
  { id: "radio_startup", label: "Startup" },
  { id: "radio_small_business", label: "Kleinunternehmen" },
  { id: "radio_medium_business", label: "Mittelstand" },
  { id: "radio_corporation", label: "Konzern" },
];

const GeneralForm = () => {
  const {
    watch,
    register,
    control,
    formState: { errors },
  } = useFormContext();
  return (
    <>
      <h3>Allgemeine Informationen</h3>
      <div className="column">
        <p className="text-m-semibold">Unternehmensname</p>
        <input type="text" {...register("facts.name")} />
      </div>
      <div className="column">
        <p className="text-m-semibold">Branche</p>
        <SearchInput
          searchType={"front"}
          selectedItems={watch("facts.industry")}
          varName="facts.industry"
          address={"/common_source/get_industries"}
          reqParam={"language=de"}
        />
      </div>
      <div className="column">
        <p className="text-m-semibold">Sektor</p>
        {/* <div className="radio_list"> */}
        <div className="column minGap">
          {sektorOptions.map((option) => (
            <div className="radio_item" key={option.id}>
              <input
                className="real-radio"
                type="radio"
                id={option.id}
                value={option.label}
                {...register("facts.sector", {
                  required: true,
                })}
              />
              <span className="custom-radio"></span>
              <label htmlFor={option.id}>{option.label}</label>
            </div>
          ))}
        </div>
      </div>
      <div className="column">
        <p className="text-m-semibold">Typ</p>
        {/* className="radio_list" */}
        <div className="column minGap">
          {typeOptions.map((option) => (
            // className="radio_item"
            <div key={option.id}>
              <input
                className="real-radio"
                type="radio"
                id={option.id}
                value={option.label}
                {...register("facts.type", {
                  required: true,
                })}
              />
              <span className="custom-radio"></span>
              <label htmlFor={option.id}>{option.label}</label>
            </div>
          ))}
        </div>
      </div>
      <div className="column">
        <p className="text-m-semibold">Standort</p>
        <Controller
          name="facts.address"
          control={control}
          render={({ field }) => (
            <ItemList
              searchType={"server"}
              value={field.value}
              onChange={field.onChange}
              type={"simpleList"}
              listName={"facts.address"}
              address={"/common_source/get_plz_city_germany"}
            />
          )}
        />
      </div>
      <div className="column">
        <p className="text-m-semibold">Anzahl Mitarbeiter</p>
        <input type="text" {...register("facts.employeesNumber")} />
      </div>
      <div className="column">
        <p className="text-m-semibold">Link zur Website</p>
        {/* <input type="text" {...register("facts.website")} /> */}
        <input
          type="text"
          className={`${errors.facts?.website && "error"}`}
          {...register("facts.website", {
            validate: (value) =>
              value === "" ||
              /^(https?:\/\/)?([\w-]+(\.[\w-]+)+\.?)([^\s]*)?$/.test(value) ||
              "Please enter a valid URL",
          })}
        />
      </div>
      <div className="column">
        <div className="row">
          <p className="text-m-semibold">Betriebsnummer</p>
          <i
            className="material-symbols-outlined"
            style={{ fontSize: "22px" }}
            data-tooltip-id="Betriebsnummer"
          >
            info
          </i>
          <Tooltip id="Betriebsnummer" place="bottom">
            <div className="column">
              <p>
                Ihre Betriebsnummer benötigen wir spätestens zur
                Visabeantragung, im Falle einer Einstellung.
              </p>
            </div>
          </Tooltip>
        </div>
        <input type="text" {...register("facts.companyNumber")} />
      </div>
      <div className="column">
        <p className="text-m-semibold">Kurzvorstellung</p>
        <textarea {...register("facts.briefIntroduction")} />
      </div>
    </>
  );
};

export default GeneralForm;
