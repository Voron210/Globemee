import React from "react";
import { SearchInput } from "../searchInput";
import { Controller, useFormContext } from "react-hook-form";
import SalaryInput from "../SalaryInput/SalaryInput";
import DatePicker from "react-datepicker";
import { addDays, addYears, format } from "date-fns";
import { MuiTelInput, matchIsValidTel } from "mui-tel-input";

const GeneralInfo = () => {
  const { watch, register, control, formState, setValue } = useFormContext();

  // console.log(formState.errors);
  return (
    <>
      <div className="row gap">
        <div className="column flexOne">
          <p className="text-m-semibold">Stellenbezeichung*</p>
          <SearchInput
            varName="hardFacts.jobDescription.jobTitle"
            searchType={"server"}
            address={"/common_source/get_job_titles"}
            reqParam={"language=de"}
            manual="neue Auswahl: "
          />
          <div className="start">
            <input
              id="Ausbildung"
              type="checkbox"
              {...register("isApprenticeship")}
            />
            <label htmlFor="Ausbildung">Das ist ein Ausbildungsplatz</label>
          </div>
        </div>
        <div className="column flexOne">
          <p className="text-m-semibold">Standort</p>
          <SearchInput
            varName="hardFacts.jobDescription.location"
            searchType={"server"}
            address={"/common_source/get_plz_city_germany"}
            free
          />
        </div>
      </div>
      <div className="row gap">
        <div className="column flexOne">
          <p className="text-m-semibold">Gehaltsspanne (Brutto Jährlich)*</p>
          {/* <Controller
            control={control}
            name="hardFacts.jobDescription"
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
                varName={"hardFacts.jobDescription"}
                errors={formState.errors}
              />
            )}
          /> */}
          <SalaryInput varName={"hardFacts.jobDescription"} />
          <p>(Bewerber können diese Angabe nicht sehen)</p>
        </div>
        <div className="column flexOne">
          <p className="text-m-semibold">Stelle frei ab</p>
          <Controller
            control={control}
            name="hardFacts.jobDescription.startDate"
            // rules={{ required: true }}
            render={({ field }) => (
              <DatePicker
                {...field}
                minDate={addDays(new Date(), 1)}
                maxDate={addYears(new Date(), 2)}
                placeholderText="Click to select time"
                // required
                errors={formState.errors}
                onChange={(date) =>
                  setValue(
                    "hardFacts.jobDescription.startDate",
                    format(date, "dd.MM.yyyy")
                  )
                }
                dateFormat="dd.MM.yyyy"
                className={
                  formState?.errors?.hardFacts?.jobDescription?.startDate
                    ? "error"
                    : ""
                }
              />
            )}
          />
          <p>Ab wann möchten Sie die Stelle besetzen?</p>
        </div>
      </div>
      <div className="row gap">
        <div className="column flexOne">
          <p className="text-m-semibold">Link zu Stellenausschreibung</p>
          <input type="text" {...register("hardFacts.jobDescription.link")} />
          <p>Stellenausschreibung auf deiner Website o.ä.</p>
        </div>
        <div className="column flexOne">
          <p className="text-m-semibold">Arbeitsstunden pro Woche*</p>
          <input
            type="number"
            step="0.1"
            min="1.0"
            max="60.0"
            {...register("hardFacts.jobDescription.workingHoursWeek", {
              required: "Arbeitsstunden sind erforderlich",
              min: {
                value: 1.0,
                message: "Wert muss mindestens 1.0 sein",
              },
              max: {
                value: 60.0,
                message: "Wert darf höchstens 60.0 sein",
              },
            })}
            className={
              formState.errors.hardFacts?.jobDescription?.workingHoursWeek
                ? "error"
                : ""
            }
          />
          <p>Sei so detailiert wie möglich</p>
        </div>
      </div>
      <div className="row gap">
        <div className="column flexOne">
          <p className="text-m-semibold">Branche / Geschäftsfeld*</p>
          <SearchInput
            varName="hardFacts.jobDescription.industry"
            searchType={"front"}
            address={"/common_source/get_industries"}
            reqParam={"language=de"}
          />
          <p>
            In welcher Branche / Geschäftsfeld wird Ihr Kandidat beschäftigt
            sein?
          </p>
        </div>
        <div className="column flexOne">
          <p className="text-m-semibold">Telefonnummer Ansprechpartner</p>
          <Controller
            name="contact.phone"
            control={control}
            rules={
              {
                // validate: (value) => matchIsValidTel(value),
              }
            }
            render={({
              field: { ref: fieldRef, value, ...fieldProps },
              fieldState,
            }) => (
              <MuiTelInput
                {...fieldProps}
                defaultCountry="DE"
                value={value ?? ""}
                inputRef={fieldRef}
                helperText={fieldState.invalid ? "Tel is invalid" : ""}
                error={fieldState.invalid}
              />
            )}
          />
          <p>An wen dürfen wir uns bei Rückfragen wenden?</p>
        </div>
      </div>

      <div className="column">
        <p className="text-m-semibold">Stellenbeschreibung*</p>

        <textarea
          {...register("hardFacts.jobDescription.manualInput", {
            required: true,
          })}
          className={
            formState.errors.hardFacts?.jobDescription?.manualInput
              ? "error"
              : ""
          }
        />
        <p>
          Kurze Stellenbeschreibung über die zukünftigen Zuständigkeiten,
          Projekte und Aufgaben
        </p>
      </div>

      {/* Home Office / Remote */}
      <div className="column">
        <h4>Home Office / Remote</h4>
        <p>
          Für Vor-Ort- und Hybrid-Stellen matchen wir nur lokale und
          umzugsbereite Talente.
        </p>

        <div className="start">
          <input
            id="vorOrt"
            type="checkbox"
            {...register("hardFacts.jobDescription.homeOffice.office")}
          />
          <label htmlFor="vorOrt">Vor Ort</label>
        </div>

        <div className="start">
          <input
            id="hybrid"
            type="checkbox"
            {...register("hardFacts.jobDescription.homeOffice.hybrid")}
          />
          <label htmlFor="hybrid">Hybrid</label>
        </div>

        <div className="start">
          <input
            id="remote"
            type="checkbox"
            {...register("hardFacts.jobDescription.homeOffice.remote")}
          />
          <label htmlFor="remote">100% Remote</label>
        </div>
      </div>
    </>
  );
};

export default GeneralInfo;
