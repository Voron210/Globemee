import React from "react";
import ItemList from "../ItemList/ItemList";

const PersonalInterests = ({ onChange, value }) => {
  return (
    <>
      <ItemList
        type="simpleList"
        searchType="front"
        address="/common_source/get_personal_interests"
        reqParam="language=en"
        onChange={onChange}
        value={value}
      />
    </>
  );
};

export default PersonalInterests;
