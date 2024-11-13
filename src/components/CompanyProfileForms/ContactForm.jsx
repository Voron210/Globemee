import React, { useState } from "react";
import { Controller, useFormContext } from "react-hook-form";
import CloseIcon from "@mui/icons-material/Close";

const ContactForm = () => {
  const { register, watch, control, setValue } = useFormContext();
  const [newEmail, setNewEmail] = useState("");
  const [isHovered, setIsHovered] = useState(false);
  const emailPattern = /^\S+@\S+\.\S+$/;

  const handleAddEmail = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      addEmail();
    }
  };

  const addEmail = () => {
    if (!emailPattern.test(newEmail)) {
      return;
    }

    const currentEmails = watch("facts.contact.contactEmail") || [];
    if (currentEmails.includes(newEmail)) {
      setNewEmail("");
      return;
    }

    setValue("facts.contact.contactEmail", [...currentEmails, newEmail]);
    setNewEmail("");
  };

  const handleRemoveEmail = (index) => {
    const currentEmails = watch("facts.contact.contactEmail") || [];
    setValue(
      "facts.contact.contactEmail",
      currentEmails.filter((_, i) => i !== index)
    );
  };

  const isEmailValid = (email) => {
    return emailPattern.test(email);
  };

  return (
    <>
      <h3>Kontakt</h3>
      <div className="column">
        <p className="text-m-semibold">Kontaktperson</p>
        <input type="text" {...register("facts.contact.contactName")} />
      </div>
      <div className="column">
        <p className="text-m-semibold">
          Benachrichtigungen bei neuen Matches an
        </p>
        <div style={{ position: "relative" }}>
          <input
            type="email"
            value={newEmail}
            onChange={(e) => setNewEmail(e.target.value)}
            onKeyDown={handleAddEmail}
          />
          {isEmailValid(newEmail) && (
            <div
              style={{
                position: "absolute",
                display: "flex",
                justifyContent: "flex-start",
                alignItems: "center",
                paddingLeft: "25px",
                height: 50,
                top: 50,
                left: 0,
                width: "100%",
                background: isHovered ? "var(--beige-80)" : "white", // Change color on hover
                border: "1px solid black",
                borderRadius: "8px",
                boxSizing: "border-box",
                transition: "background-color 0.3s", // Smooth transition for hover effect
              }}
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
              onClick={addEmail}
            >
              <p className="center">Hinzufügen: {newEmail}</p>
            </div>
          )}
        </div>
        {/* {emailError && <p style={{ color: "red" }}>{emailError}</p>} */}

        <Controller
          name="facts.contact.contactEmail"
          control={control}
          render={({ field }) => (
            <div className="flex_list">
              {field.value?.map((email, index) => (
                <div key={index} className="flex_item center">
                  <CloseIcon onClick={() => handleRemoveEmail(index)} />
                  <p>{email}</p>
                </div>
              ))}
            </div>
          )}
        />
      </div>
    </>
  );
};

export default ContactForm;
