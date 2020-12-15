import React from "react";
import { useStore } from "../hooks/use-store.hooks";

const AddNumber: React.FunctionComponent = () => {
  const { numbersStore } = useStore();
  const [value, setValue] = React.useState(42);

  return (
    <div>
      <input
        type="number"
        value={value}
        onChange={(e) => setValue(+e.target.value)}
      />
      <button
        onClick={() => {
          numbersStore.add(value);
          setValue(Math.floor(Math.random() * 100));
        }}
      >
        Add
      </button>
    </div>
  );
};

export default AddNumber;
