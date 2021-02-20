import { flow, Instance, types } from "mobx-state-tree";
import randomcolor from "randomcolor";
import { toast } from "react-toastify";

import api from "../config/api.config";
import { percentageCompletion } from "../util/methods-util";

const TargetItemStore = types
  .model({
    targetAmountInView: types.number,
    amt: types.number,
    id: types.string,
    item: types.string,
    color: types.string,
    accruedInterest: types.number,
    percentageCompletion: types.number,
  })
  .actions((self) => ({
    updateTargetItem(item: {
      targetAmountInView: number;
      amt: number;
      id: string;
      item: string;
      color: string;
      accruedInterest: number;
      percentageCompletion: number;
    }) {
      self.accruedInterest = item.accruedInterest;
      self.amt = item.amt;
      self.color = item.color;
      self.targetAmountInView = item.targetAmountInView;
      self.item = item.item;
      self.id = item.id;
      self.percentageCompletion = item.percentageCompletion;
      return { ...self };
    },
  }));

export const TargetStore = types
  .model({
    targets: types.map(TargetItemStore),
  })
  .actions((self) => ({
    addTarget(t: API.GetTargetSavingsResponseDto) {
      const target = {
        targetAmountInView: t.targetAmountInView || 0,
        amt: t.amt || 0,
        id: `${t.id}`,
        item: `${t.item}`,
        accruedInterest: t.int_accrued || 0,
        percentageCompletion: percentageCompletion(t),
        color: randomcolor({
          seed: `${t.item}`,
          luminosity: "random",
          hue: "random",
        }),
      };
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

        if (target?.id) {
          const result = self.targets
            .get(`${input.targetId}`)
            ?.updateTargetItem({ ...target, amt: input.newAmount || 0 });
          console.log(result);
        }
      } else toast.error(data.responseDescription, { position: "top-center" });
      return data;
    }),
    setTargets(targets: API.GetTargetSavingsResponseDto[]) {
      self.targets.clear();
      targets?.forEach((e) => this.addTarget(e));
    },
    removeTarget(id: string) {
      self.targets.delete(id);
    },
  }));
export interface TargetModel extends Instance<typeof TargetStore> {}
export interface TargetItemModel extends Instance<typeof TargetItemStore> {}
