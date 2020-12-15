import React from "react";
import { observer } from "mobx-react-lite";
import { useStore } from "../hooks/use-store.hooks";

const NumbersInfo: React.FunctionComponent = () => {
  const { numbersStore } = useStore();

  return (
    <div>
      <div>Sum: {numbersStore.sum}</div>
      <div>Product: {numbersStore.product}</div>
      <div>Average: {numbersStore.average}</div>
    </div>
  );
};

export default observer(NumbersInfo);
