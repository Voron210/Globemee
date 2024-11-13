import React from "react";

const NotesForm = ({ onChange, value }) => {
  return (
    <>
      <textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Describe your professional challenge"
      />
    </>
  );
};

export default NotesForm;
