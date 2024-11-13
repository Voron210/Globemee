import React, { useEffect, useState } from "react";
import { SearchInput } from "../searchInput";
import { Controller, FormProvider, useForm } from "react-hook-form";
import MonthYearPicker from "../MonthYearPicker";
import axiosInstance from "../../lib/axios/AxiosConfig";
import { useUser } from "../../context/TalentContext/UserContext";

const WorkExperience = ({ onClose, initialData }) => {
  const { getData } = useUser();
  const [page, setPage] = useState(1);
  const methods = useForm({
    defaultValues: {
      position: initialData?.position || "",
      companyName: initialData?.companyName || "",
      industry: initialData?.industry || "",
      location: initialData?.location || "",
      startDate: initialData?.startDate || "",
      finishDate: initialData?.finishDate || "",
      untilToday: initialData?.untilToday === "true",

      // position: "3D design engineer",
      // companyName: "test",
      // industry: "Towing services",
      // location: "Albania",
      // startDate: "04.2015",
      // finishDate: "05.2023",
      // untilToday: false,

      // curriculumVitae: {
      //   workExperience: [
      //     {
      //       _id: "3436bd2d-28d3-46bc-b1b0-03c23b8a61e1",
      //       companyName: "qwe",
      //       finishDate: "02.2023",
      //       industry: "Allergist",
      //       isApprenticeship: false,
      //       location: "Albania",
      //       position:
      //         "Accident researcher and accident analyst (safety technician)",
      //       startDate: "02.2022",
      //       sumDate: "1 year 0 months",
      //       untilToday: "false",
      //     },
      //   ],
      // },
    },
  });

  const {
    register,
    setValue,
    watch,
    control,
    formState: { errors },
    reset,
  } = methods;
  const untilToday = watch("untilToday");
  const startDate = watch("startDate");
  const finishDate = watch("finishDate");

  // useEffect(() => {
  //   console.log(initialData);
  //   console.log("reset");
  //   reset();
  //   setPage(1);
  // }, [workDate]);

  useEffect(() => {
    if (untilToday) {
      const currentDate = new Date();
      const month = String(currentDate.getMonth() + 1).padStart(2, "0");
      const year = currentDate.getFullYear();
      setValue("finishDate", `${month}.${year}`);
    }
  }, [untilToday, setValue]);

  const handleBack = () => {
    if (page === 1) {
      onClose();
    } else {
      setPage(1);
    }
  };

  const onSubmit = async (data) => {
    if (page === 1) {
      setPage(2);
    } else {
      try {
        if (initialData) {
          await axiosInstance.patch(
            `/t_talent/cv_work_experience/${initialData._id}`,
            data
          );
          // console.log("Data successfully updated:", data);
        } else {
          await axiosInstance.post("/t_talent/cv_work_experience", data);
          // console.log("Data successfully created:", data);
        }
        getData();
        onClose();
      } catch (error) {
        console.error("An error occurred:", error);
      }
    }
  };

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

  return (
    <>
      <FormProvider {...methods}>
        <form onSubmit={methods.handleSubmit(onSubmit)}>
          <h4 className="center">Tell us more about your work experience</h4>
          {page === 1 ? (
            <>
              <div className="column">
                <p className="text-m-semibold">
                  What position / job title do you have?
                </p>
                <SearchInput
                  searchType="server"
                  address="/common_source/get_job_titles"
                  varName="position"
                  reqParam="language=en"
                  selectedItems={watch("position")}
                  // onSelect={(item) => setValue("position", item)}
                />
              </div>

              <div className="column">
                <p className="text-m-semibold">
                  What is the name of the company?
                </p>
                <input
                  type="text"
                  {...register("companyName", { required: "error" })}
                  className={errors?.companyName?.message ? "error" : ""}
                  // className="error"
                />
              </div>
              <div className="row space-between gap">
                <div className="column">
                  <p className="text-m-semibold">
                    In which industry is the company?
                  </p>
                  <SearchInput
                    searchType="front"
                    address="/common_source/get_industries"
                    varName="industry"
                    reqParam="language=en"
                    selectedItems={watch("industry")}
                  />
                </div>
                <div className="column">
                  <p className="text-m-semibold">Location of the company</p>
                  <SearchInput
                    searchType="front"
                    address="/common_source/get_countries"
                    varName="location"
                    reqParam="language=en"
                    selectedItems={watch("location")}
                  />
                </div>
              </div>
            </>
          ) : (
            <>
              <p>When did you start working there?</p>
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
                <label>I work here until today</label>
              </div>

              {!untilToday && (
                <>
                  <p>Until when did you work there?</p>
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
          <div className="row space-around">
            <button
              className="outline medium"
              type="button"
              onClick={() => handleBack()}
            >
              {page === 1 ? "Cancel" : "Back"}
            </button>
            <button className="primary medium" type="submit">
              {page === 1 ? "Next" : "Finish"}
            </button>
          </div>
        </form>
      </FormProvider>
    </>
  );
};

export default WorkExperience;
