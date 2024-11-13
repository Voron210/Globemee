import React from "react";
import { Controller, useFormContext } from "react-hook-form";
import ItemList from "../ItemList/ItemList";
import { SearchInput } from "../searchInput";
import visa from "../../common/visa";
import LanguageSelect from "../languageSelect/languageSelect";
import { MuiTelInput, matchIsValidTel } from "mui-tel-input";
import { Tooltip } from "react-tooltip";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import DropdownWithInput from "../DropdownWithInput/DropdownWithInput";

function PersonalInformation() {
  const { control, formState, getValues, register, watch, setValue } =
    useFormContext();

  const referalOptions = [
    "ZALOA Languages",
    "LinkedIn",
    "Instagram",
    "Recommendation",
    "Webinar",
    "Event",
    "Globemee Employee",
  ];

  return (
    <>
      <h3>Personal information</h3>
      {/* LANGUAGES */}
      <div className="content-part">
        <div className="tooltip">
          <p className="text-m-semibold">Which languages do you speak?</p>
          <InfoOutlinedIcon className="tooltip" data-tooltip-id="language" />
        </div>
        <Tooltip id="language" place="bottom">
          <div className="column">
            <p>C2 = language skills at native level</p>
            <p>C1 = fluent to business fluent language skills</p>
            <p>B2 = fluent language level</p>
            <p>B1 = good language skills</p>
            <p>A2 = in-depth basic language skills</p>
            <p>A1 = first basic language skills</p>
          </div>
        </Tooltip>
        <Controller
          control={control}
          name="career.language"
          rules={{
            validate: (languages) => {
              const isValid = languages.every(
                (lang) => lang.language.trim() !== ""
              );
              return isValid || "All languages must be filled in";
            },
          }}
          render={({ field }) => (
            <LanguageSelect
              language="en"
              onChange={field.onChange}
              knowledgeList={field.value}
            />
          )}
        />
        {formState?.errors?.career?.language?.message && (
          <p className="error">
            {formState?.errors?.career?.language?.message}
          </p>
        )}
      </div>

      {/* RESIDE */}
      <div className="content-part">
        <p className="text-m-semibold">Where do you currently reside?</p>
        <Controller
          control={control}
          name="placeOfLiving"
          render={({ field }) => (
            <SearchInput
              searchType={"front"}
              selectedItems={watch("placeOfLiving")}
              // usedList={field.value}
              varName={"placeOfLiving"}
              address={"common_source/get_countries"}
              reqParam={"language=en"}
            />
          )}
        />
      </div>

      {/* CITIZENSHIP */}
      <div className="content-part">
        <p className="text-m-semibold">Which citizenship do you hold?</p>
        <Controller
          name="nationality"
          control={control}
          rules={{
            validate: (value) => {
              if (value.length === 0) {
                return "Select one";
              } else {
                return true;
              }
            },
          }}
          render={({ field }) => (
            <ItemList
              type="simpleList"
              searchType="front"
              value={field.value}
              onChange={field.onChange}
              address={"common_source/get_countries"}
              listName={"nationality"}
              reqParam={"language=en"}
            />
          )}
        />
        {formState?.errors?.nationality?.message && (
          <p className="error">{formState?.errors?.nationality?.message}</p>
        )}
      </div>

      {/* VISA */}
      <div className="content-part">
        <p className="text-m-semibold">
          Do you already have a working Visa for Germany?
        </p>
        <div className="radio_list">
          {visa.map((item, index) => (
            <div key={index} className="radio_item">
              <input
                className="real-radio"
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

      {/* PHONE */}
      <div className="content-part">
        <p className="text-m-semibold">What is your phone number?</p>
        <Controller
          name="phone"
          control={control}
          rules={{
            validate: (value) => matchIsValidTel(value),
          }}
          render={({
            field: { ref: fieldRef, value, ...fieldProps },
            fieldState,
          }) => (
            <MuiTelInput
              {...fieldProps}
              value={value ?? ""}
              inputRef={fieldRef}
              helperText={fieldState.invalid ? "Tel is invalid" : ""}
              error={fieldState.invalid}
            />
          )}
        />
      </div>

      {/* Referal source */}
      <div className="content-part">
        <p className="text-m-semibold">How did you hear about us?</p>
        <DropdownWithInput
          options={referalOptions}
          onSelect={(option) => setValue("referralSource", option)}
        />
      </div>
    </>
  );
}

export default PersonalInformation;
