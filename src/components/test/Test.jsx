import React, { memo, useCallback, useEffect, useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import DropdownWithSearch from "../DropdownWithSearch/DropdownWithSearch";

const Button = memo(({ onClick }) => {
  console.log(
    `Компонент Button отрисован в ${new Date().toLocaleTimeString()}`
  );
  return <button onClick={onClick}>Нажми меня</button>;
});

const Greeting = memo(({ name }) => {
  console.log(
    `Компонент Greeting отрисован в ${new Date().toLocaleTimeString()}`
  );

  return <h3>{`Hello, ${name}!`}</h3>;
});

function Test() {
  const navigate = useNavigate();
  // pipeline-test
  const [value, setValue] = useState("");
  const [num, setNum] = useState(0);
  const handleSelect = useCallback((v) => setValue(v), []);

  const [name, setName] = useState("");
  const buttonHandler = useMemo(() => () => setName("world"), []);
  // return (
  //   <>
  //     <input value={name} onChange={(e) => setName(e.target.value)} />
  //     <Greeting name={name} />
  //     <Button onClick={buttonHandler} />
  //   </>
  // );

  return (
    <>
      <div>
        <button
          type="button"
          className="secondary medium"
          onClick={() => navigate("/")}
        >
          To landing page
        </button>

        <DropdownWithSearch
          options={["qwe", "test", "lol"]}
          selectedValue={value}
          onSelect={handleSelect}
        />
        <button
          className="primary small"
          onClick={() => setNum((prev) => prev + 1)}
        >
          {num}
        </button>
      </div>
    </>
  );
}

export default Test;
