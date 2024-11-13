import React, { useEffect } from "react";
import LanguageSelect from "../languageSelect/languageSelect";
import { Controller, FormProvider, useForm } from "react-hook-form";
import axiosInstance from "../../lib/axios/AxiosConfig";
import { useUser } from "../../context/TalentContext/UserContext";
import ProfessionalChallengeForm from "../TalentForms/ProfessionalChallengeForm";
import NotesForm from "../TalentForms/NotesForm";
import PersonalInterests from "../TalentForms/PersonalInterests";
import CareerGoalsForm from "../TalentForms/CareerGoalsForm";
import SkillsForm from "../TalentForms/SkillsForms";
import GeneralField from "../../components/TalentForms/generalField";
import VisaForm from "../TalentForms/VisaForm";
import { Tooltip } from "react-tooltip";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";

const FormWrapper = ({ type, active, onClose }) => {
  const { userData, getData } = useUser();

  const methods = useForm({
    defaultValues: {
      name: userData.name,
      surname: userData.surname,
      nationality: userData.nationality || [],
      placeOfLiving: userData.placeOfLiving,
      phone: userData.phone,
      career: {
        interestedApprenticeship:
          userData.career.interestedApprenticeship || false,
        language: userData.career.language || [
          {
            language: "English",
            level: "0",
            reviewedLevel: 0,
          },
          {
            language: "German",
            level: "0",
            reviewedLevel: 0,
          },
        ],
        careerGoals: userData.career.careerGoals || [],
        skills: userData.career.skills || [],
        maxSalary: userData.career.maxSalary,
        minSalary: userData.career.minSalary,
      },
      visaInfo: {
        visa: userData.visaInfo.visa || "No",
        startDate: userData.visaInfo.startDate || "",
        willingnessToRelocate: userData.visaInfo.willingnessToRelocate || "Yes",
        educationalConfirmation:
          userData.visaInfo.educationalConfirmation || "No",
        preferredCitySize: {
          big: userData.visaInfo.preferredCitySize.big || false,
          medium: userData.visaInfo.preferredCitySize.medium || false,
          landscape: userData.visaInfo.preferredCitySize.landscape || false,
        },
        preferredCity: userData.visaInfo.preferredCity || false,
        preferredCityName: userData.visaInfo.preferredCityName || [],
      },
      professionalChallenge: userData.professionalChallenge || "",
      notes: userData.notes || "",
      personalInterests: userData.personalInterests || [],
    },
  });

  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = methods;

  const onSubmit = async (data) => {
    try {
      await axiosInstance.patch("/t_talent", data, {
        notification: "Data successfully updated",
      });
      await getData();
      onClose();
    } catch (error) {}
  };

  const validateWordCount = (value) => {
    const wordCount = value
      .split(/\s+/)
      .filter((word) => word.length > 0).length;
    return wordCount >= 100 || "A minimum of 100 words is required";
  };

  useEffect(() => {
    reset();
  }, [type]);

  return (
    <>
      <FormProvider {...methods}>
        <form onSubmit={handleSubmit(onSubmit)}>
          {type === "language" && (
            <>
              <div className="tooltip">
                <p className="text-m-semibold">Which languages do you speak?</p>
                <InfoOutlinedIcon
                  className="tooltip"
                  data-tooltip-id="my-tooltip"
                />
              </div>
              <Tooltip id="my-tooltip" place="bottom">
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
                  <>
                    <LanguageSelect
                      language="en"
                      onChange={field.onChange}
                      knowledgeList={field.value}
                    />
                    {errors?.career?.language?.message && (
                      <p className="error">
                        {errors?.career?.language?.message}
                      </p>
                    )}
                  </>
                )}
              />
            </>
          )}
          {type === "visa" && <VisaForm />}

          {type === "general" && <GeneralField />}

          {type === "challenge" && (
            <>
              <p className="text-m-semibold">
                What was your biggest professional challenge? How did you
                overcome it? (please write at least 100 words in english
                language)
              </p>
              <Controller
                control={control}
                name="professionalChallenge"
                rules={{ validate: validateWordCount }}
                render={({ field }) => (
                  <ProfessionalChallengeForm
                    onChange={field.onChange}
                    value={field.value}
                  />
                )}
              />
              {errors?.professionalChallenge?.message && (
                <p className="error">
                  {errors?.professionalChallenge?.message}
                </p>
              )}
            </>
          )}

          {type === "interests" && (
            <>
              <p className="text-m-semibold">
                What are your Personal Interests?
              </p>
              <Controller
                control={control}
                name="personalInterests"
                render={({ field }) => (
                  <PersonalInterests
                    onChange={field.onChange}
                    value={field.value}
                  />
                )}
              />
            </>
          )}

          {type === "goals" && <CareerGoalsForm />}

          {type === "skills" && <SkillsForm />}

          {type === "notes" && (
            <>
              <p className="text-m-semibold">
                Anything you think we should need to know about you? Write us a
                note here (optional):
              </p>
              <Controller
                control={control}
                name="notes"
                render={({ field }) => (
                  <NotesForm onChange={field.onChange} value={field.value} />
                )}
              />
            </>
          )}
          <div className="row end gap">
            <button
              className="primary small"
              type="button"
              onClick={() => onClose()}
            >
              Cancel
            </button>
            <button className="primary small" type="submit">
              Save
            </button>
          </div>
        </form>
      </FormProvider>
    </>
  );
};

export default FormWrapper;
