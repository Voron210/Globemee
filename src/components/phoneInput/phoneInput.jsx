import React from "react";
import { MuiTelInput, matchIsValidTel } from "mui-tel-input";

const PhoneInput = () => {
  const [phone, setPhone] = React.useState("");

  const handleChange = (newPhone) => {
    setPhone(newPhone);

    const norm = matchIsValidTel(newPhone, {
      onlyCountryies: [], // optional,
      excludedCountryies: [], // optional
      continents: [], // optional
    }); // true | false

    // console.log(norm);
  };

  return (
    <MuiTelInput
      value={phone}
      forceCallingCode
      defaultCountry="DE"
      onChange={handleChange}
    />
  );
};

export default PhoneInput;
