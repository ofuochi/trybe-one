import { Instance, types } from "mobx-state-tree";
import { CardStore } from "./CardStore";

import { CurrentUserStore } from "./CurrentUserStore";
import { NumbersStore } from "./NumbersStore";
import { SignupFormStore } from "./SignupFormStore";
import { TargetStore } from "./TargetStore";

export const RootStore = types.model({
  numbersStore: NumbersStore,
  signupFormStore: SignupFormStore,
  currentUserStore: CurrentUserStore,
  targetStore: TargetStore,
  cardStore: CardStore,
});

export type RootStoreModel = Instance<typeof RootStore>;
