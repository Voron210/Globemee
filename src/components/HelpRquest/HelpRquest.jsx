import React from "react";
import HeadphonesIcon from "../../assets/HeadphonesIcon.svg";
import { useForm } from "react-hook-form";
import axiosInstance from "../../lib/axios/AxiosConfig";

//talentOnborading, talent, company
const HelpRquest = ({ type, onClose }) => {
  const { register, handleSubmit, reset } = useForm({
    defaultValues: {
      message: "",
      contactTime: "",
      onboardingName: "",
    },
  });

  const onSubmit = async (data) => {
    try {
      if (type === "talent") {
        await axiosInstance.post("/t_common/help/send_form_email", data, {
          notification: "Message sent successfully",
        });
      }
      if (type === "talentOnborading") {
        await axiosInstance.post("/t_common/help/send_form_email", data, {
          notification: "Message sent successfully",
        });
      }
      if (type === "company") {
        await axiosInstance.post(
          "/c_common/help/send_form_email",
          {
            message: data.message,
            contactTime: data.contactTime,
          },
          { notification: "Nachricht erfolgreich gesendet" }
        );
      }
      onClose();
      reset();
    } catch (error) {}
  };

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        {type === "talent" && (
          <>
            <img src={HeadphonesIcon} className="modal_img" alt="Help Icon" />
            <h4 className="center">Do you need help?</h4>
            <div className="center">
              <h4 className="center highlight_full">Request a callback</h4>
            </div>
            <textarea
              placeholder="Briefly describe what it is about"
              {...register("message", { required: true })}
            />
            <input
              type="text"
              placeholder="When is the best time to reach you? (please include your time zone)"
              {...register("contactTime", { required: true })}
            />
            {/* <input
          type="text"
          placeholder="Your name"
          {...register("onboardingName", { required: true })}
        /> */}
            <button className="primary medium" type="submit">
              Request callback
            </button>
          </>
        )}
        {type === "talentOnborading" && (
          <>
            <img src={HeadphonesIcon} className="modal_img" alt="Help Icon" />
            <h4 className="center">Do you need help?</h4>
            <div className="center">
              <h4 className="center highlight_full">Get in touch with us</h4>
            </div>
            <textarea
              placeholder="Briefly describe what it is about"
              {...register("message", { required: true })}
            />
            <input
              type="text"
              placeholder="When is the best time to reach you? (please include your time zone)"
              {...register("contactTime", { required: true })}
            />
            {/* <input
          type="text"
          placeholder="Your name"
          {...register("onboardingName", { required: true })}
        /> */}
            <button className="primary medium" type="submit">
              Request Help
            </button>
          </>
        )}
        {type === "company" && (
          <>
            <img src={HeadphonesIcon} className="modal_img" alt="Help Icon" />
            <h4 className="center">
              Sie möchten weitere Informationen oder brauchen Hilfe?
            </h4>
            <div className="center">
              <h4 className="center highlight_full">Jetzt Rückruf anfordern</h4>
            </div>
            <textarea
              placeholder="Beschreiben Sie kurz worum es geht"
              {...register("message", { required: true })}
            />
            <input
              type="text"
              placeholder="Wann können wir Sie am besten erreichen?"
              {...register("contactTime", { required: true })}
            />
            <button className="primary medium" type="submit">
              Rückruf anfordern
            </button>
          </>
        )}
      </form>
    </>
  );
};

export default HelpRquest;
