import { NumbersStore } from "./NumbersStore";
import { Instance, types } from "mobx-state-tree";
import { SignupFormStore } from "./SignupFormStore";
import { CurrentUserStore } from "./CurrentUserStore";

export const RootStore = types.model("RootStore", {
  numbersStore: NumbersStore,
  signupFormStore: SignupFormStore,
  currentUserStore: CurrentUserStore,
});

export type RootStoreModel = Instance<typeof RootStore>;
