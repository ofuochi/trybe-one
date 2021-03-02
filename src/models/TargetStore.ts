import { values } from "mobx";
import { destroy, flow, Instance, types } from "mobx-state-tree";
import randomcolor from "randomcolor";
import { toast } from "react-toastify";

import api from "../config/api.config";
import { percentageCompletion } from "../util/methods-util";

const Target = types
  .model({
    targetAmountInView: types.number,
    amt: types.number,
    id: types.identifier,
    item: types.string,
    color: types.string,
    status: types.number,
    creationTime: types.string,
    accruedInterest: types.number,
    percentageCompletion: types.number,
  })
  .actions((self) => ({
    remove() {
      destroy(self);
    },
  }));

const createTargetItem = (t: API.GetTargetSavingsResponseDto) => {
  return Target.create({
    targetAmountInView: t.targetAmountInView as number,
    amt: t.amt as number,
    id: `${t.id}`,
    item: `${t.item}`,
    status: t.statusflag as number,
    accruedInterest: t.int_accrued as number,
    percentageCompletion: percentageCompletion(t),
    creationTime: `${t.txndate}`,
    color: randomcolor({
      seed: `${t.item}`,
      luminosity: "random",
      hue: "random",
    }),
  });
};

export const TargetStore = types
  .model({
    targets: types.map(Target),
  })
  .views((self) => ({
    get getAllTargets() {
      const targets = (values(self.targets) as unknown) as TargetItemModel[];
      return targets.sort((a, b) => (a.creationTime > b.creationTime ? 1 : 0));
    },
  }))
  .actions((self) => ({
    createTarget: flow(function* (input: API.AddTargetSavingsRequestDto) {
      const {
        data,
      }: { data: API.BaseResponse } = yield api.post<API.BaseResponse>(
        "/User/SubmitTargetSavings",
        input
      );
      if (data.responseCode === "00") {
        toast.success(data.responseDescription, { position: "top-center" });
      } else toast.error(data.responseDescription, { position: "top-center" });
      return data.responseCode === "00";
    }),
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
        target && self.targets.put({ ...target, amt: Number(input.newAmount) });
      } else toast.error(data.responseDescription, { position: "top-center" });
      return data;
    }),
    fetchTargets: flow(function* (userId: string) {
      self.targets.clear();
      const {
        data,
      }: {
        data: API.GetTargetSavingsResponseListDto;
      } = yield api.get<API.GetTargetSavingsResponseListDto>(
        `/User/GetTargetSavingsByProfileId?profileID=${userId}`
      );
      data.targetSavings?.forEach((e) => {
        if (e.statusflag !== 2) self.targets.put(createTargetItem(e));
      });
    }),
    removeTarget: (id: string) => self.targets.delete(id),
  }));

export interface TargetItemModel extends Instance<typeof Target> {}
export interface TargetModel extends Instance<typeof TargetStore> {}
