import React, { useContext, useState } from "react";
import styles from "./generalField.module.css";
import { MuiTelInput, matchIsValidTel } from "mui-tel-input";
import { Controller, useFormContext } from "react-hook-form";
import ItemList from "../ItemList/ItemList";
import { SearchInput } from "../searchInput";

const GeneralField = () => {
  const {
    register,
    control,
    watch,
    formState: { errors },
  } = useFormContext();

  return (
    <>
      <h4>Tell us about yourself:</h4>
      <div>
        <div className="row gap">
          <div className={styles.input_box}>
            <p className="text-m-semibold">What is your name? *</p>
            <input
              type="text"
              {...register("name", {
                required: true,
                setValueAs: (value) => value.trim(),
              })}
              className={errors.name ? "error" : ""}
            />
          </div>
          <div className={styles.input_box}>
            <p className="text-m-semibold">What is your surname? *</p>
            <input
              type="text"
              {...register("surname", {
                required: true,
                setValueAs: (value) => value.trim(),
              })}
              className={errors.surname ? "error" : ""}
            />
          </div>
        </div>
        <div className={styles.input_box}>
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
          {errors?.nationality?.message && (
            <p className="error">{errors?.nationality?.message}</p>
          )}
        </div>
        <div className={styles.input_box}>
          <p className="text-m-semibold">
            In which country you’re living right now?*
          </p>
          <SearchInput
            searchType={"front"}
            address={"common_source/get_countries"}
            reqParam={"language=en"}
            selectedItems={watch("placeOfLiving")}
            varName="placeOfLiving"
          />
        </div>
        <p className="text-m-semibold">What is your phone number? *</p>
        <div className={styles.input_box}>
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
      </div>
    </>
  );
};

export default GeneralField;
