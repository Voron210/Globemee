import React, { useState } from "react";
import { useFormContext } from "react-hook-form";
import styled from "styled-components";

const RangeContainer = styled.div`
  display: flex;
  box-sizing: border-box;
  border: 1px solid
    ${({ $error }) => ($error === "true" ? "var(--errorRed)" : "#ccc")};
  border-radius: 100px;
  overflow: hidden;
  height: 40px;
  width: 100%;
  margin: 10px auto;
`;

const RangeOption = styled.div`
  flex: 1;
  text-align: center;
  padding: 10px;
  cursor: pointer;
  border-left: 1px solid #ccc;

  background-color: ${(props) =>
    props.selected ? "var(--orange-100);" : "white"};
  color: ${(props) => props.selected && "white"};

  &:hover {
    background-color: var(--orange-60);
    color: white;
  }

  &:first-child {
    border-left: none;
  }
`;

const WormSelect = React.forwardRef(
  (
    {
      listName,
      options = ["kek", "lol"],
      value,
      index,
      onChange,
      levelKey = "level",
      error = "false",
    },
    ref
  ) => {
    const { setValue } = useFormContext();
    // const [selectedOption, setSelectedOption] = useState(value);

    const handleOptionClick = (option) => {
      setValue(`${listName}[${index}].${levelKey}`, option.text);
      // setSelectedOption(option.text);
      onChange(option.text);
    };

    return (
      <RangeContainer ref={ref} $error={error}>
        {options.map((option, idx) => (
          <RangeOption
            key={idx}
            onClick={() => handleOptionClick(option)}
            selected={value === option.text}
          >
            {option.name}
          </RangeOption>
        ))}
      </RangeContainer>
    );
  }
);

export default WormSelect;
