import React from "react";
import { observer } from "mobx-react-lite";

import { useStore } from "../hooks/use-store.hooks";

const NumbersList: React.FunctionComponent = () => {
  const { numbersStore } = useStore();

  return (
    <ul className="Numbers-list">
      {numbersStore.numbers.map((item) => (
        <li key={item.key}>{item.value}</li>
      ))}
    </ul>
  );
};

export default observer(NumbersList);
