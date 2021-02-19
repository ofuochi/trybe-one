import { Instance, types } from "mobx-state-tree";
import { percentageCompletion, pastelColour } from "../util/methods-util";

const TargetItemModel = types.model({
  targetAmountInView: types.number,
  amt: types.number,
  id: types.string,
  item: types.string,
  color: types.string,
  percentageCompletion: types.number,
});

export const TargetStore = types
  .model({
    targets: types.array(TargetItemModel),
  })
  .actions((self) => ({
    addTarget(t: API.GetTargetSavingsResponseDto) {
      self.targets.unshift({
        targetAmountInView: t.targetAmountInView || 0,
        amt: t.amt || 0,
        id: `${t.id}`,
        item: `${t.item}`,
        percentageCompletion: percentageCompletion(t),
        color: pastelColour(`$${t.item}`),
      });
    },
    setTargets(targets: API.GetTargetSavingsResponseDto[]) {
      self.targets.clear();
      targets?.forEach((e) => this.addTarget(e));
    },
    removeTarget(id: string) {
      const target = self.targets.find((t) => t.id === id);
      target && self.targets.remove(target);
    },
  }));
export interface TargetModel extends Instance<typeof TargetStore> {}
