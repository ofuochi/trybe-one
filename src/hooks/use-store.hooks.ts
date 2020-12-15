import { useContext } from "react";
import { StoreContext } from "../contexts/StoreCtx";
import { RootStoreModel } from "../models/RootStore";

export const useStore = (): RootStoreModel => {
  const store = useContext(StoreContext);
  if (!store) {
    throw new Error(
      "The StoreContext is not provided using the <StoreProvider />."
    );
  }
  return store;
};
