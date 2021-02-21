import { flow, Instance, types } from "mobx-state-tree";
import randomcolor from "randomcolor";
import { toast } from "react-toastify";

import api from "../config/api.config";
import { percentageCompletion } from "../util/methods-util";

const TargetItemStore = types.model({
  targetAmountInView: types.number,
  amt: types.number,
  id: types.identifier,
  item: types.string,
  color: types.string,
  accruedInterest: types.number,
  percentageCompletion: types.number,
});

const createTargetItem = (t: API.GetTargetSavingsResponseDto) => {
  return TargetItemStore.create({
    targetAmountInView: t.targetAmountInView as number,
    amt: t.amt as number,
    id: `${t.id}`,
    item: `${t.item}`,
    accruedInterest: t.int_accrued as number,
    percentageCompletion: percentageCompletion(t),
    color: randomcolor({
      seed: `${t.item}`,
      luminosity: "random",
      hue: "random",
    }),
  });
};

export const TargetStore = types
  .model({
    targets: types.map(TargetItemStore),
  })
  .actions((self) => ({
    addTarget: (t: API.GetTargetSavingsResponseDto) => {
      const target = createTargetItem(t);
      self.targets.set(`${t.id}`, target);
    },
    updateTarget: flow(function* (input: API.UpdateTargetSavingsRequest) {
      const {
        data,
      }: { data: API.BaseResponse } = yield api.post<API.BaseResponse>(
        "/User/UpdateTargetSavingsAmountByTargetId",
        input
      );

      if (data.responseCode === "00") {
        toast.success(data.responseDescription, { position: "top-center" });
        const target = self.targets.get(`${input.targetId}`);
        try {
          target &&
            self.targets.put({ ...target, amt: Number(input.newAmount) });
        } catch (error) {
          console.error(error);
        }
      } else toast.error(data.responseDescription, { position: "top-center" });
      return data;
    }),
    setTargets: (targets: API.GetTargetSavingsResponseDto[]) => {
      self.targets.clear();
      targets?.forEach((e) => self.targets.set(`${e.id}`, createTargetItem(e)));
    },
    removeTarget: flow(function* (id: string) {
      const input: API.BreakBoxRequestModel = {
        targetId: id,
      };
      const {
        data,
      }: { data: API.BaseResponse } = yield api.post<API.BaseResponse>(
        "/User/BreakBox",
        input
      );
      self.targets.delete(id);
      if (data.responseCode === "00") {
        toast.success(data.responseDescription, { position: "top-center" });
      } else toast.error(data.responseDescription, { position: "top-center" });
    }),
  }));
export interface TargetModel extends Instance<typeof TargetStore> {}
export interface TargetItemModel extends Instance<typeof TargetItemStore> {}
