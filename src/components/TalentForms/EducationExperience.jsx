import React, { useEffect, useState } from "react";
import { Controller, FormProvider, useForm } from "react-hook-form";
import graduate from "../../common/graduate";
import { SearchInput } from "../searchInput";
import axiosInstance from "../../lib/axios/AxiosConfig";
import { useUser } from "../../context/TalentContext/UserContext";
import MonthYearPicker from "../MonthYearPicker";
import Dropdown from "../Dropdown/Dropdown";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import { Tooltip } from "react-tooltip";

const EducationExperience = ({ onClose, initialData }) => {
  // console.log(initialData);
  const [step, setStep] = useState(1);
  const [open, setOpen] = useState(false);
  const { getData } = useUser();
  const methods = useForm({
    defaultValues: {
      degree: initialData?.degree || "",
      anabin: initialData?.anabin !== undefined ? initialData.anabin : true,

      //anabin part
      country: initialData?.country || "",
      city: initialData?.city || "",
      nameUniversity:
        (initialData?.anabin && initialData?.nameUniversity) || "",
      fieldStudy: (initialData?.anabin && initialData?.fieldStudy) || "",

      //No anabin part
      googleAddress: "",
      customNameUniversity:
        (!initialData?.anabin && initialData?.nameUniversity) || "",
      customFieldStudy: (!initialData?.anabin && initialData?.fieldStudy) || "",

      // Step 2 - Date
      startDate: initialData?.startDate || "",
      finishDate: initialData?.finishDate || "",
      untilToday: initialData?.untilToday || false,

      //Apprenticeship
      appNameUniversity: initialData?.nameUniversity || "",
      position: initialData?.position || "",
      gtTwoYears: initialData?.gtTwoYears || false,
    },
  });

  const getCurrentDate = () => {
    const date = new Date();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = date.getFullYear();
    return `${month}.${year}`;
  };

  const {
    getValues,
    handleSubmit,
    watch,
    register,
    setValue,
    control,
    formState: { errors },
  } = methods;

  // console.log(getValues());

  useEffect(() => {
    if (open) {
      setValue("city", "");
      setValue("nameUniversity", "");
      setValue("fieldStudy", "");
    } else {
      setOpen(true);
    }
  }, [watch("country")]);

  const handleBack = () => {
    if (step === 1) {
      onClose();
    } else {
      setStep(1);
    }
  };

  const untilToday = watch("untilToday");
  const startDate = watch("startDate");
  const finishDate = watch("finishDate");

  const validateFinishDate = (value) => {
    if (!value || !startDate) return true;
    const [startMonth, startYear] = startDate.split(".").map(Number);
    const [finishMonth, finishYear] = value.split(".").map(Number);

    if (
      finishYear < startYear ||
      (finishYear === startYear && finishMonth < startMonth)
    ) {
      return "Finish date cannot be earlier than start date";
    }
    return true;
  };

  const onSubmit = async (data) => {
    if (step === 1 && getValues("degree") !== "Apprenticeship") {
      setStep(2);
    } else {
      try {
        if (getValues("degree") === "Apprenticeship") {
          if (initialData) {
            await axiosInstance.patch(
              `/t_talent/cv_apprenticeship/${initialData._id}`,
              {
                degree: data.degree,
                nameUniversity: data.appNameUniversity,
                position: data.position,
                gtTwoYears: data.gtTwoYears,
              }
            );
          } else {
            await axiosInstance.post("/t_talent/cv_apprenticeship", {
              degree: data.degree,
              nameUniversity: data.appNameUniversity,
              position: data.position,
              gtTwoYears: data.gtTwoYears,
            });
          }
        } else {
          if (initialData) {
            // console.log("patched");
          } else {
            await axiosInstance.post("/t_talent/cv_education", {
              degree: data.degree,
              anabin: data.anabin,

              country: data.googleAddress
                ? data.googleAddress.split(", ").pop()
                : data.country,
              city: data.googleAddress
                ? data.googleAddress.split(", ")[0]
                : data.city,
              nameUniversity: data.anabin
                ? data.nameUniversity
                : data.customNameUniversity,
              fieldStudy: data.anabin ? data.fieldStudy : data.customFieldStudy,
              startDate: data.startDate,
              finishDate: data.untilToday ? getCurrentDate() : data.finishDate,
              untilToday: data.untilToday,
            });
          }
        }
        await getData();
        onClose();
      } catch (error) {}
    }

    // console.log(data);
  };

  return (
    <>
      <FormProvider {...methods}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <h4>What kind of education do you have?</h4>
          {step === 1 && (
            <>
              <p className="text-m-semibold">
                What degree did you graduate with? *
              </p>
              <Controller
                name="degree"
                control={control}
                rules={{ required: "Degree is required" }}
                render={({ field }) => (
                  <>
                    <Dropdown
                      selectedValue={field.value}
                      onSelect={(value) => field.onChange(value)}
                      options={graduate.map((degree) => degree.name)}
                      label="Select your degree"
                    />
                    {errors.degree && (
                      <p className="error">{errors.degree.message}</p>
                    )}
                  </>
                )}
              />
              {/* <Controller
                name="degree"
                control={methods.control}
                rules={{ required: "Degree is required" }}
                render={({ field }) => (
                  <div>
                    <select {...field}>
                      <option value="" disabled hidden>
                        Select your degree
                      </option>
                      {graduate.map((degree) => (
                        <option key={degree.name} value={degree.name}>
                          {degree.text}
                        </option>
                      ))}
                    </select>
                    {errors.degree && <span>{errors.degree.message}</span>}
                  </div>
                )}
              /> */}
              {/* Apprenticeship */}
              {watch("degree") !== "Apprenticeship" && (
                <>
                  {watch("anabin") && (
                    <div
                      className="column"
                      style={{
                        backgroundColor: "var(--beige-100)",
                        marginLeft: "-32px",
                        marginRight: "-32px",
                        paddingLeft: "32px",
                        paddingRight: "32px",
                        paddingTop: "10px",
                        paddingBottom: "20px",
                        ...(window.innerWidth <= 900 && {
                          marginLeft: "-10px",
                          marginRight: "-10px",
                        }),
                      }}
                    >
                      <div className="tooltip">
                        <h4>Anabin-Check</h4>
                        <InfoOutlinedIcon
                          className="tooltip"
                          data-tooltip-id="my-tooltip"
                        />
                        <Tooltip
                          id="my-tooltip"
                          place="bottom"
                          style={{
                            width: "400px",
                            // wordBreak: "normal",
                            // borderRadius: "8px",
                          }}
                        >
                          <p>
                            Anabin is a database for information on the
                            assessment of foreign educational certificates. It
                            helps to classify a foreign qualification in the
                            German education system
                          </p>
                        </Tooltip>
                      </div>
                      <div className="row space-between gap">
                        <div className="column">
                          <p className="text-m-semibold">
                            Country of University?
                          </p>
                          <SearchInput
                            searchType="front"
                            address="/common_source/get_countries_anabin"
                            varName="country"
                            reqParam="language=en"
                            selectedItems={watch("country")}
                          />
                        </div>
                        <div className="column">
                          <p className="text-m-semibold">City of University?</p>
                          <SearchInput
                            searchType="front"
                            address="/common_source/get_cities_by_country"
                            varName="city"
                            reqParam={`language=en&country=${watch("country")}`}
                            selectedItems={watch("city")}
                            disabled={watch("country") ? false : true}
                          />
                        </div>
                      </div>
                      <p className="text-m-semibold">Name of University?</p>
                      <SearchInput
                        searchType="front"
                        address="/common_source/get_universities_by_city"
                        varName="nameUniversity"
                        reqParam={`language=en&city=${watch("city")}`}
                        selectedItems={watch("nameUniversity")}
                        disabled={watch("city") ? false : true}
                      />
                      <p className="text-m-semibold">Field of Study</p>
                      <SearchInput
                        searchType="front"
                        address="/common_source/get_degrees_by_university_name"
                        varName="fieldStudy"
                        reqParam={`language=en&university_name=${watch(
                          "nameUniversity"
                        )}`}
                        selectedItems={watch("fieldStudy")}
                        disabled={watch("nameUniversity") ? false : true}
                      />
                    </div>
                  )}
                  <div className="center">
                    <span className={`material-symbols-outlined center`}>
                      {!watch("anabin")
                        ? "keyboard_arrow_up"
                        : "keyboard_arrow_down"}
                    </span>
                    <p
                      className="text-m-semibold"
                      onClick={() => setValue("anabin", !getValues("anabin"))}
                      style={{ cursor: "pointer" }}
                    >
                      Can't find university or field of study in the
                      Anabin-Check?
                    </p>
                  </div>
                  {!watch("anabin") && (
                    <div className="column">
                      <p className="text-m-semibold">City of University?</p>
                      <SearchInput
                        searchType="server"
                        address="/common_source/autocomplete_address"
                        varName="googleAddress"
                        // reqParam={`place=${watch("nameUniversity")}`}
                        // selectedItems={watch("fieldStudy")}

                        // placeholder={`${getValues("city")}, ${getValues(
                        //   "country"
                        // )}`}
                        placeholder={
                          !getValues("city") && !getValues("country")
                            ? ""
                            : `${
                                getValues("city") && `${getValues("city")}, `
                              }${getValues("country")}`
                        }
                        placeholderValue={
                          getValues("city") && getValues("country")
                        }
                      />
                      <p className="text-m-semibold">Name of University?</p>
                      <input
                        className={`${
                          errors.customNameUniversity ? "error" : ""
                        }`}
                        type="text"
                        placeholder={getValues("nameUniversity")}
                        {...register("customNameUniversity", {
                          validate: (value) => {
                            // console.log(value);
                            if (
                              getValues("nameUniversity") !== "" ||
                              value !== ""
                            ) {
                              return true;
                            } else {
                              return "Value is empty";
                            }
                          },
                        })}
                      />
                      <p className="text-m-semibold">Field of Study</p>
                      <input
                        className={`${errors.customFieldStudy ? "error" : ""}`}
                        type="text"
                        placeholder={getValues("fieldStudy")}
                        {...register("customFieldStudy", {
                          validate: (value) => {
                            // console.log(value);
                            if (
                              getValues("fieldStudy") !== "" ||
                              value !== ""
                            ) {
                              return true;
                            } else {
                              return "Value is empty";
                            }
                          },
                        })}
                      />
                    </div>
                  )}
                </>
              )}
              {/* Apprenticeship */}
              {watch("degree") === "Apprenticeship" && (
                <div className="column">
                  <p className="text-m-semibold">Title of apprenticeship</p>
                  <SearchInput
                    searchType="server"
                    address="/common_source/get_job_titles"
                    varName="position"
                    reqParam="language=en"
                    selectedItems={watch("position")}
                  />
                  <p className="text-m-semibold">
                    At which institute did it take place? (optional)
                  </p>
                  <input type="text" {...register("appNameUniversity")} />
                  <div>
                    <input
                      type="checkbox"
                      id="gtTwoYears"
                      {...register("gtTwoYears")}
                    />
                    <label htmlFor="gtTwoYears">
                      The apprenticeship took at least 2 years
                    </label>
                  </div>
                </div>
              )}
            </>
          )}
          {step === 2 && (
            <>
              <p>When did you start studying there? *</p>
              <Controller
                name="startDate"
                control={control}
                rules={{ required: "Start date is required" }}
                render={({ field: { onChange, value } }) => (
                  <MonthYearPicker value={value} onChange={onChange} required />
                )}
              />
              {errors.startDate && (
                <p className="error">{errors.startDate.message}</p>
              )}

              <div>
                <input type="checkbox" {...register("untilToday")} />
                <label>I study here until today</label>
              </div>

              {!untilToday && (
                <>
                  <p>Until when did you study there? *</p>
                  <Controller
                    name="finishDate"
                    control={control}
                    rules={{
                      required: "Finish date is required",
                      validate: validateFinishDate,
                    }}
                    render={({ field: { onChange, value } }) => (
                      <MonthYearPicker
                        value={value}
                        onChange={onChange}
                        required
                      />
                    )}
                  />
                  {errors.finishDate && (
                    <p className="error">{errors.finishDate.message}</p>
                  )}
                </>
              )}
            </>
          )}
          <div className="row space-between">
            <button
              className="outline medium"
              type="button"
              onClick={() => handleBack()}
            >
              {step === 1 ? "Cancel" : "Back"}
            </button>
            <button
              className="primary medium"
              type="submit"
              // onClick={() => console.log(getValues())}
            >
              {step === 1 ? "Next" : "Finish"}
            </button>
          </div>
        </form>
      </FormProvider>
    </>
  );
};
export default EducationExperience;
