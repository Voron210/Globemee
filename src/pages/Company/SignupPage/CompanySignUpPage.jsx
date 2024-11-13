import React, { useState } from "react";
import { Controller, FormProvider, useForm } from "react-hook-form";
import { SearchInput } from "../../../components/searchInput";
import styles from "./CompanySignUpPage.module.css";
import Footer from "../../../components/footer/Footer";
import { MuiTelInput } from "mui-tel-input";
import axiosInstance from "../../../lib/axios/AxiosConfig";
import Modal from "../../../components/Modal/Modal";
import { useNavigate } from "react-router-dom";
import ErrorIcon from "../../../assets/ErrorIcon.svg";
import SuccesIcon from "../../../assets/SuccessIcon.svg";

function CompanySignUpPage() {
  const [modalActive, setModalActive] = useState(false);
  const [modalContent, setModalContent] = useState(null);
  const navigate = useNavigate();

  const opentModal = (props) => {
    setModalContent(props);
    setModalActive(true);
  };

  const methods = useForm({
    defaultValues: {
      schemaVersion: "0.0.2",
      companyId: "",
      facts: {
        name: "",
        contact: {
          contactName: "",
          contactEmail: "",
          contactPhone: "",
          contactDepartment: "",
        },
        website: "",
        industry: "",
        address: "",
        values: [],
        emailsNotification: [],
        culture: {
          workLifeBalance: 0,
          modernity: 0,
          visionary: 0,
          opportunitiesForAdvancement: 0,
        },
      },
      users: [
        {
          companyUserId: "",
          emailConfirmationStatus: 0,
          passwordResetToken: 0,
          expirationResetToken: 0,
          signUpDate: 0,
          lastLogInDate: 0,
          lastChangePasswordDate: 0,
          lastChangeEmailDate: 0,
          name: "",
          surname: "",
          userEmail: "",
          password: "",
          confirmPassword: "",
          phone: "",
          department: "",
        },
      ],
    },
  });

  const { register, handleSubmit, control, reset } = methods;

  const onSubmit = async (data) => {
    try {
      await axiosInstance.post("/c_authentication/signup", data);
      opentModal(
        <div className="column minGap">
          <img src={SuccesIcon} className="modal_img" />
          <h3 className="center">E-Mail erfolgreich registriert</h3>
          <div className="row gap center">
            <button
              className="primary medium"
              type="button"
              onClick={() => {
                setModalActive(false);
                reset();
              }}
            >
              Registrieren mehr
            </button>
            <button
              className="primary medium"
              type="button"
              onClick={() => navigate("/company-login")}
            >
              Zum Login
            </button>
          </div>
        </div>
      );
    } catch (error) {
      if (error.response.status === 400) {
        // setModalActive(true);
        opentModal(
          <div className="column minGap">
            <img src={ErrorIcon} className="modal_img" />
            <h3 className="center">E-Mail bereits registriert</h3>
            <p>
              Bitte gehen Sie zum Login oder registrieren Sie sich mit einer
              anderen E-Mail Adresse
            </p>
            <div className="row gap center">
              <button
                className="primary medium"
                type="button"
                onClick={() => navigate("/company-login")}
              >
                Zum Login
              </button>
              <button
                className="primary medium"
                type="button"
                onClick={() => {
                  setModalActive(false);
                }}
              >
                Erneut registrieren
              </button>
            </div>
          </div>
        );
      }
      // console.log(error);
    }
    // console.log(data);
  };

  return (
    <FormProvider {...methods}>
      <div className={styles.page}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <h1>Konto erstellen</h1>
          <div className="row gap">
            <div className="column flexOne gap">
              <input
                type="text"
                placeholder="Vorname"
                {...register("users[0].name")}
                required
              />
              <input
                type="email"
                placeholder="E-Mail Adresse*"
                {...register("users[0].userEmail")}
                required
              />
              <input
                type="text"
                placeholder="Unternehmen"
                {...register("facts.name")}
                required
              />
              <input
                type="password"
                placeholder="Passwort*"
                {...register("users[0].password")}
                required
              />
            </div>
            <div className="column flexOne gap">
              <input
                type="text"
                placeholder="Nachname*"
                {...register("users[0].surname")}
                required
              />
              <Controller
                name="users[0].phone"
                control={control}
                render={({
                  field: { ref: fieldRef, value, ...fieldProps },
                  fieldState,
                }) => (
                  <MuiTelInput
                    defaultCountry="DE"
                    {...fieldProps}
                    value={value ?? ""}
                    inputRef={fieldRef}
                  />
                )}
              />
              <SearchInput
                varName="facts.industry"
                searchType={"front"}
                address={"/common_source/get_industries"}
                reqParam={"language=de"}
              />
              {/* <input
                type="text"
                placeholder="Branche"
                {...register("facts.industry")}
                required
              /> */}
              <input
                type="password"
                placeholder="Passwort wiederholen*"
                {...register("users[0].confirmPassword")}
                required
              />
            </div>
          </div>
          <div className="terms-conditions">
            <input type="checkbox" id="terms" required />
            <label htmlFor="terms">
              Indem Sie auf „Konto erstellen“ klicken, bestätigen Sie, dass Sie
              die Nutzungsbedingungen und die Datenschutzrichtlinien gelesen
              haben und diese akzeptieren.
            </label>
          </div>
          <div className="center">
            <button type="submit" className="primary medium">
              Zustimmen & anmelden
            </button>
          </div>
        </form>
        <Footer />
      </div>
      <Modal
        active={modalActive}
        setActive={setModalActive}
        children={modalContent}
      />
    </FormProvider>
  );
}

export default CompanySignUpPage;
