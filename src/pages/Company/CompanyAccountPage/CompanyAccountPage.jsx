import React, { useEffect, useState } from "react";
import Modal from "../../../components/Modal/Modal";
import styles from "./CompanyAccountPage.module.css";
import DeleteAccountForm from "../../../components/DeleteAccountForm/DeleteAccountForm";
import ChangePasswordForm from "../../../components/ChangePasswordForm/ChangePasswordForm";
import ChangeEmailForm from "../../../components/ChangeEmailForm/ChangeEmailForm";
import { useNavigate } from "react-router-dom";
import { useCompany } from "../../../context/CompanyContext/CompanyContext";
import SuccessIcon from "../../../assets/SuccessIcon.svg";
import axiosInstance from "../../../lib/axios/AxiosConfig";
import { Controller, useForm } from "react-hook-form";
import { MuiTelInput } from "mui-tel-input";
// import {
//   addGlobalNotification,
//   updateGlobalNotification,
// } from "../../../context/ModalContext/ModalContext";

function CompanyAccountPage() {
  const { logout, setCompanyData, companyProfile, getCompanyProfile } =
    useCompany();
  const navigate = useNavigate();
  const [active, setActive] = useState();
  const [modalContent, setModalContent] = useState(null);
  const [closable, setClosable] = useState(true);
  const [modalWidth, setModalWidth] = useState("500px");

  const { handleSubmit, register, control, reset } = useForm({
    defaultValues: {
      name: companyProfile?.users[0]?.name || "",
      surname: companyProfile?.users[0]?.surname || "",
      department: companyProfile?.users[0]?.department || "",
      phone: companyProfile?.users[0]?.phone || "",
    },
  });

  useEffect(() => {
    reset({
      name: companyProfile?.users[0]?.name || "",
      surname: companyProfile?.users[0]?.surname || "",
      department: companyProfile?.users[0]?.department || "",
      phone: companyProfile?.users[0]?.phone || "",
    });
  }, [companyProfile]);

  const openModal = (props, width) => {
    if (width) {
      setModalWidth(width);
    } else {
      setModalWidth("500px");
    }
    setModalContent(props);
    setActive(true);
  };

  const deleteCompleteCompany = (
    <>
      <form>
        <img src={SuccessIcon} className="modal_img" />
        <p className="center text-m-semibold">
          Konto erfolgreich gelöscht. Schade, dass Sie gehen wollen. Wir freuen
          uns, wenn Sie sich wieder bei uns anmelden!
        </p>
        <div className="center">
          <button
            className="primary medium"
            type="button"
            onClick={() => navigate("/company-login")}
          >
            Ok
          </button>
        </div>
      </form>
    </>
  );

  const onSubmit = async (data) => {
    try {
      await axiosInstance.patch("c_user", data, {
        notification: "Information has been successfully updated",
      });
      getCompanyProfile();
    } catch (error) {}
  };

  return (
    <>
      <div className="column">
        <div>
          <h3 className="highlight_full">Kontoeinstellungen</h3>
        </div>
        <div className={styles.section_wrapper}>
          <div className={styles.section}>
            <form onSubmit={handleSubmit(onSubmit)}>
              <div>
                <h4 className="highlight_full">Profilinformationen</h4>
              </div>
              <div className="row gap">
                <div className="column flexOne">
                  <p className="text-m-semibold">Vorname</p>
                  <input
                    type="text"
                    placeholder="Vorname"
                    {...register("name")}
                    required
                  />
                </div>
                <div className="column flexOne">
                  <p className="text-m-semibold">Nachname</p>
                  <input
                    type="text"
                    placeholder="Nachname"
                    {...register("surname")}
                    required
                  />
                </div>
              </div>
              <div className="row gap">
                <div className="column flexOne">
                  <p className="text-m-semibold">Abteilung</p>
                  <input
                    type="text"
                    placeholder="Abteilung"
                    {...register("department")}
                    required
                  />
                </div>
                <div className="column flexOne">
                  <p className="text-m-semibold">Telefonnummer</p>
                  <Controller
                    name="phone"
                    control={control}
                    render={({
                      field: { ref: fieldRef, value, ...fieldProps },
                      fieldState,
                    }) => (
                      <MuiTelInput
                        {...fieldProps}
                        value={value ?? ""}
                        inputRef={fieldRef}
                      />
                    )}
                  />
                </div>
              </div>
              <div>
                <button type="submit" className="primary medium">
                  Speichern
                </button>
              </div>
            </form>
          </div>

          <div className={styles.section}>
            <div>
              <h4 className="highlight_full">Einloggen und Sicherheit</h4>
            </div>

            <div className={styles.row}>
              <p>E-Mail Adresse:</p>
              <button
                className={`secondary medium ${styles.settings_btn}`}
                onClick={() =>
                  openModal(
                    <ChangeEmailForm
                      onClose={() => setActive(false)}
                      type="company"
                      logout={() => logout()}
                    />,
                    "800px"
                  )
                }
              >
                E-Mail Adresse ändern
              </button>
            </div>
            <div className={styles.row}>
              <p>Passwort:</p>
              <button
                className={`secondary medium ${styles.settings_btn}`}
                onClick={() =>
                  openModal(
                    <ChangePasswordForm
                      onClose={() => setActive(false)}
                      type="company"
                      logout={() => logout()}
                    />
                  )
                }
              >
                Passwort ändern
              </button>
            </div>
          </div>
          <div className="column midGap">
            <div>
              <h4 className="highlight_full">Konto löschen</h4>
            </div>
            <p>
              Wenn Sie Ihr Konto deaktivieren, haben Sie keinen Zugriff mehr auf
              gespeicherte Stellen und Sie können sich auch nicht mehr mit Ihrem
              Profil bei Globemee anmelden.
            </p>
            <div>
              <button
                className="secondary medium"
                onClick={() =>
                  openModal(
                    <DeleteAccountForm
                      onClose={() => setActive(false)}
                      type="company"
                      onDelete={async () => {
                        await axiosInstance.post("/t_authentication/logout");
                        setCompanyData(null);
                        openModal(deleteCompleteCompany, false);
                      }}
                    />
                  )
                }
              >
                Konto löschen
              </button>
            </div>
          </div>
        </div>
      </div>
      <Modal
        active={active}
        setActive={setActive}
        children={modalContent}
        width={modalWidth}
      />
    </>
  );
}

export default CompanyAccountPage;
