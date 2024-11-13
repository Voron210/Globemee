import React, { useState } from "react";
import logo from "../../assets/textLogoBlack.svg";
import styles from "./onboarding.module.css";
import { LinearProgress } from "@mui/material";
import CareerGoalsForm from "../../components/onboardingForms/CareerGoalsForm";
import JobPreferences from "../../components/onboardingForms/JobPreferenceForm";
import { FormProvider, useForm } from "react-hook-form";
import PersonalInformation from "../../components/onboardingForms/PersonalInformation";
import axiosInstance from "../../lib/axios/AxiosConfig";
import { useNavigate } from "react-router-dom";
import Modal from "../../components/Modal/Modal";
import ThumbsUpIcon from "../../assets/ThumbsUpIcon.svg";
import { useLoading } from "../../context/LoadingContext";
import Footer from "../../components/footer/Footer";
import { useUser } from "../../context/TalentContext/UserContext";
import HelpRquest from "../../components/HelpRquest/HelpRquest";
import PhoneMeIcon from "../../assets/PhoneMeIcon.svg";

function OnboardingPage() {
  const { getData } = useUser();
  const [step, setStep] = useState(1);
  const [active, setActive] = useState();
  const [modalContent, setModalContent] = useState();
  const navigate = useNavigate();
  //test
  // const methods = useForm({
  //   defaultValues: {
  //     placeOfLiving: "Germany",
  //     nationality: ["Albania", "Armenia"],
  //     phone: "+995555555555",
  //     visaInfo: {
  //       visa: "Yes",
  //       startDate: "09.07.2024",
  //       willingnessToRelocate: "Just remote",
  //       preferredCitySize: {
  //         big: true,
  //         medium: false,
  //         landscape: true,
  //       },
  //       preferredCity: true,
  //       // preferredCityName: [],
  //       preferredCityName: ["Wehr", "Weil", "Werl", "Weyhe"],
  //     },
  //     career: {
  //       careerGoals: [
  //         {
  //           careerTitle: "1st/ 2nd level supporter",
  //           careerExperience: "6-10 Jahre Erfahrung",
  //         },
  //       ],
  //       skills: [
  //         {
  //           skillName: "CA Service Desk Manager",
  //           skillLevel: "10+ Jahre Erfahrung",
  //         },

  //         {
  //           skillName: "Third level support",
  //           skillLevel: "6-10 Jahre Erfahrung",
  //         },

  //         {
  //           skillName: "IT customer service",
  //           skillLevel: "3-5 Jahre Erfahrung",
  //         },

  //         {
  //           skillName: "User training for IT applications",
  //           skillLevel: "1-2 Jahre Erfahrung",
  //         },

  //         {
  //           skillName: "MS Exchange Server administration",
  //           skillLevel: "0-0,5 Jahre Erfahrung",
  //         },
  //       ],
  //       minSalary: 11000,
  //       maxSalary: 15000,
  //       interestedApprenticeship: false,
  //       language: [
  //         { language: "English", level: "3", reviewedLevel: "0" },
  //         { language: "German", level: "5", reviewedLevel: "0" },
  //       ],
  //     },
  //   },
  // });
  const methods = useForm({
    defaultValues: {
      placeOfLiving: "",
      referralSource: "",
      nationality: [],
      phone: "",
      visaInfo: {
        visa: "No",
        startDate: "",
        willingnessToRelocate: "Yes",
        preferredCitySize: {
          big: false,
          medium: false,
          landscape: false,
        },
        preferredCity: false,
        preferredCityName: [],
      },
      career: {
        careerGoals: [],
        skills: [],
        minSalary: null,
        maxSalary: null,
        interestedApprenticeship: false,
        language: [
          { language: "English", level: "0", reviewedLevel: "0" },
          { language: "German", level: "0", reviewedLevel: "0" },
        ],
      },
    },
  });

  const { setIsLoading } = useLoading();

  const onSubmit = async (data) => {
    // console.log(data);
    if (step === 3) {
      try {
        setIsLoading(true);
        await axiosInstance.post("/t_talent/talent_onboarding", data);
        // await getData();
        setIsLoading(false);
        setModalContent(onboardingComplete);
        setActive(true);
      } catch (error) {
        setIsLoading(false);
      }
    }
    next();
  };

  function next() {
    if (step === 3) {
      return;
    }
    setStep((prev) => {
      return prev + 1;
    });
  }
  function back() {
    setStep((prev) => {
      if (step > 1) {
        return prev - 1;
      }
    });
  }

  const onboardingComplete = (
    <>
      <form>
        <img src={ThumbsUpIcon} className="modal_img" />
        <h3 className="center">Hurray, you have made it!</h3>
        <p className="center text-m-semibold">
          We are now looking for a job for you!
        </p>
        <button
          className="primary medium"
          type="button"
          onClick={async () => await getData()}
        >
          Go to my profile
        </button>
      </form>
    </>
  );

  return (
    <>
      <div className={styles.page}>
        <div className={styles.container}>
          {/**Head of onboarding */}
          <div className={styles.header}>
            <img src={logo} />
            {/* <LinearProgress
              sx={{ height: 5 }}
              color="inherit"
              variant="determinate"
              value={step * 33.3}
              className={styles.progress}
            /> */}
          </div>
          {/**Body */}
          <FormProvider {...methods}>
            <form
              onSubmit={methods.handleSubmit(onSubmit)}
              className={styles.form_body}
            >
              {step == 1 && <CareerGoalsForm />}
              {step == 2 && <JobPreferences />}
              {step == 3 && <PersonalInformation />}
              {step > 1 && <></>}

              <div className={step === 1 ? "row end" : "row space-between"}>
                <button
                  className=""
                  onClick={back}
                  type="button"
                  style={{ display: step === 1 ? "none" : "block" }}
                >
                  {"<\u00A0Back"}
                </button>
                <button
                  className="primary medium"
                  type="submit"
                  onClick={() => {
                    // console.log(methods.formState.errors);
                    // console.log(methods.getValues());
                  }}
                >
                  {step === 3 ? "Save and go to profile" : "Continue"}
                </button>
              </div>
            </form>
          </FormProvider>
        </div>
        {/**Footer */}
      </div>
      <Footer />
      <button
        className={styles.helpButton}
        onClick={() => {
          setModalContent(
            <HelpRquest
              onClose={() => setActive(false)}
              type={"talentOnborading"}
            />
          );
          setActive(true);
        }}
      >
        <img src={PhoneMeIcon} alt="Help" />
      </button>
      <Modal
        active={active}
        setActive={setActive}
        children={modalContent}
        width={"500px"}
      />
    </>
  );
}

export default OnboardingPage;
