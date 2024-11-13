import React, { useEffect, useState } from "react";
import styles from "./accountPage.module.css";
import Modal from "../../components/Modal/Modal";
import DeleteAccountForm from "../../components/DeleteAccountForm/DeleteAccountForm";
import ChangePasswordForm from "../../components/ChangePasswordForm/ChangePasswordForm";
import ChangeEmailForm from "../../components/ChangeEmailForm/ChangeEmailForm";
import SuccessIcon from "../../assets/SuccessIcon.svg";
import { useUser } from "../../context/TalentContext/UserContext";
import { useCompany } from "../../context/CompanyContext/CompanyContext";
import axiosInstance from "../../lib/axios/AxiosConfig";
import { useNavigate } from "react-router-dom";

const AccountPage = () => {
  const navigate = useNavigate();
  const [active, setActive] = useState(false);
  const [closable, setClosable] = useState(true);
  const [modalContent, setModalContent] = useState(null);
  const [modalWidth, setModalWidth] = useState("500px");

  const { logout, setUserData } = useUser();

  const openModal = (content, isClosable = true, width) => {
    if (width) {
      setModalWidth(width);
    } else {
      setModalWidth("500px");
    }
    setModalContent(content);
    setClosable(isClosable);
    setActive(true);
  };

  const deleteCompleteTalent = (
    <>
      <form>
        <img src={SuccessIcon} className="modal_img" />
        <p className="center text-m-semibold">
          Account successfully deleted. Too bad you want to leave. We look
          forward to you registering with us again!
        </p>
        <div className="center">
          <button
            className="primary medium"
            type="button"
            onClick={() => navigate("/talent-login")}
          >
            Ok
          </button>
        </div>
      </form>
    </>
  );

  return (
    <>
      <div className="column">
        <div>
          <h3 className="highlight_full">Account settings </h3>
        </div>
        <div className={styles.section_wrapper}>
          <div className={styles.section}>
            <div>
              <h4 className="highlight_full">Login & Security</h4>
            </div>

            <div className={styles.row}>
              <p>E-Mail Address:</p>
              <button
                className={`secondary medium ${styles.settings_btn}`}
                onClick={() =>
                  openModal(
                    <ChangeEmailForm
                      onClose={() => setActive(false)}
                      type="talent"
                      logout={() => logout()}
                    />,
                    true,
                    "800px"
                  )
                }
              >
                Change E-Mail Address
              </button>
            </div>
            <div className={styles.row}>
              <p>Password:</p>
              <button
                className={`secondary medium ${styles.settings_btn}`}
                onClick={() =>
                  openModal(
                    <ChangePasswordForm
                      onClose={() => setActive(false)}
                      type="talent"
                      logout={() => logout()}
                    />
                  )
                }
              >
                Change Password
              </button>
            </div>
          </div>
          <div className="column midGap">
            <div>
              <h4 className="highlight_full">Delete account</h4>
            </div>
            <p>
              If you deactivate your account, you will no longer have access to
              your profile and potential job opportunities, nor will you be able
              to log in to Globemee with your profile.
            </p>
            <div>
              <button
                className="secondary medium"
                onClick={() =>
                  openModal(
                    <DeleteAccountForm
                      onClose={() => setActive(false)}
                      type="talent"
                      onDelete={async () => {
                        await axiosInstance.post("/t_authentication/logout");
                        setUserData(null);
                        openModal(deleteCompleteTalent, false);
                      }}
                    />
                  )
                }
              >
                Delete account
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
        closable={closable}
      />
    </>
  );
};

export default AccountPage;
