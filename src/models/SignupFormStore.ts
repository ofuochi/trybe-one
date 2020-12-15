import { types } from "mobx-state-tree";

export const SignupFormStore = types
  .model({
    step: types.optional(types.number, 1),
    description: types.maybe(types.string),
  })
  .actions((self) => ({
    update: (step: number, description?: string) => {
      self.step = step + 1;
      self.description = description;
    },
  }));
