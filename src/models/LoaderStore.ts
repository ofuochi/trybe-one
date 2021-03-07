import { types } from "mobx-state-tree";

export const LoaderStore = types
  .model({
    shouldShow: types.optional(types.boolean, false),
  })
  .actions((self) => ({
    setShowLoader: (shouldShow: boolean) => (self.shouldShow = shouldShow),
  }))
  .views((self) => ({
    get show() {
      return self.shouldShow;
    },
  }));
