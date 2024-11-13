import React, { useState, useEffect } from "react";

const ProfessionalChallengeForm = ({ onChange, value }) => {
  const [wordCount, setWordCount] = useState(0);

  useEffect(() => {
    setWordCount(value.split(/\s+/).filter((word) => word.length > 0).length);
  }, [value]);

  return (
    <>
      <textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Describe your professional challenge"
      />
      <p>Words: {wordCount}/100</p>
    </>
  );
};

export default ProfessionalChallengeForm;
