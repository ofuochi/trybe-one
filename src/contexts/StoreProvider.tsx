import { useEffect, useState } from "react";

import { CurrentUserStore } from "../models/CurrentUserStore";
import { NumbersStore } from "../models/NumbersStore";
import { RootStore } from "../models/RootStore";
import { SignupFormStore } from "../models/SignupFormStore";
import { TargetStore } from "../models/TargetStore";
import { StoreContext } from "./StoreCtx";

export const StoreProvider: React.FC = ({ children }) => {
  const [store, setStore] = useState(() => {
    const numbersStore = NumbersStore.create();
    const signupFormStore = SignupFormStore.create();
    const currentUserStore = CurrentUserStore.create();
    const targetStore = TargetStore.create();

    return RootStore.create({
      numbersStore,
      signupFormStore,
      currentUserStore,
      targetStore,
    });
  });

  useEffect(() => {
    const currentUserStore = CurrentUserStore.create();
    setStore({ ...store, currentUserStore });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <StoreContext.Provider value={store}>{children}</StoreContext.Provider>
  );
};
