import React, { useEffect, useState } from "react";
import InfoIcon from "../../assets/InfoIcon.svg";
import { useForm } from "react-hook-form";
import axiosInstance from "../../lib/axios/AxiosConfig";
import { useNavigate } from "react-router-dom";
import Modal from "../Modal/Modal";

const DeleteAccountForm = ({ onClose, type, onDelete }) => {
  const navigate = useNavigate();
  const [fieldStatus, setFieldStatus] = useState(false);
  const { register, handleSubmit, reset, watch } = useForm({
    defaultValues: {
      password: "",
    },
  });

  useEffect(() => {
    setFieldStatus(false);
  }, [watch("password")]);

  // console.log(onDelete);

  const onSubmit = async (data) => {
    try {
      if (type === "company") {
        await axiosInstance.delete("/c_company", { data: data });
        onDelete();
      } else {
        await axiosInstance.delete("/t_talent", { data: data });
        onDelete();
      }
    } catch (error) {
      if ((error.response.status = 404)) {
        setFieldStatus(true);
      }
      // console.error("Error:", error);
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <img src={InfoIcon} className="modal_img" alt="Help Icon" />
        {type === "company" && (
          <>
            <h4 className="center">Konto löschen</h4>
            <p className="text-m-semibold center">
              Sind Sie sicher, dass Sie Ihr Globemee-Konto löschen möchten? Wenn
              Sie Ihr Konto löschen, werden alle damit verbundenen Daten wie
              Ihre Stellenausschreibungen und laufenden Matchings gelöscht. Sie
              können diesen Vorgang nicht rückgängig machen.
            </p>
            <p className="center">
              Bitte bestätigen Sie Ihr Passwort, um fortzufahren:
            </p>

            <input
              type="password"
              placeholder="Passwort eingeben"
              {...register("password", { required: true })}
              className={fieldStatus ? "error" : ""}
            />
            {fieldStatus && <p className="error">Das Passwort ist falsch</p>}
            <div className="row space-between">
              <button
                className="primary medium"
                type="button"
                onClick={onClose}
              >
                Abbrechen
              </button>
              <button className="secondary medium" type="submit">
                Konto löschen
              </button>
            </div>
          </>
        )}
        {type === "talent" && (
          <>
            <h4 className="center">Delete Account</h4>
            <p className="text-m-semibold center">
              Are you sure you want to delete your Globemee account?
            </p>
            <p className="center">
              If you delete your account, all associated data and ongoing
              matches will be deleted. You will not be able to undo this
              process.
            </p>
            <p className="center">Please enter your password to continue:</p>

            <input
              type="password"
              placeholder="Enter password"
              {...register("password", { required: true })}
              className={fieldStatus ? "error" : ""}
            />
            {fieldStatus && <p className="error">Wrong password</p>}
            <div className="row space-between">
              <button
                className="primary medium"
                type="button"
                onClick={onClose}
              >
                Cancel
              </button>
              <button className="secondary medium" type="submit">
                Delete account
              </button>
            </div>
          </>
        )}
      </form>
    </>
  );
};

export default DeleteAccountForm;
