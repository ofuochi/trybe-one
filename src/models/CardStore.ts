import { values } from "mobx";
import { flow, Instance, types } from "mobx-state-tree";
import { toast } from "react-toastify";

import api from "../config/api.config";

const createCardInstance = (card: API.CardObj) => ({
  blockStatus: card.block_status,
  pan: card.card_number as string,
  provider: card.card_provider,
  cardName: card.card_name,
  expiryDate: card.expiry_date,
  cardStatus: card.card_status,
  cvv: card.cvv2,
});
const Card = types.model({
  provider: types.maybe(types.string),
  cardName: types.maybe(types.string),
  pan: types.identifier,
  expiryDate: types.maybe(types.string),
  cvv: types.maybe(types.string),
  cardStatus: types.maybe(types.string),
  blockStatus: types.maybe(types.string),
});

export const CardStore = types
  .model({
    cardList: types.map(Card),
  })
  .actions((self) => ({
    fetchCards: flow(function* (nuban: string) {
      const input: API.GetCardRequestDto = {
        accountId: nuban,
      };
      const {
        data,
      }: {
        data: API.GetCardResponseDto;
      } = yield api.post<API.GetCardResponseDto>("/User/GetAllCard", input);

      if (data.responseCode === "00") {
        data.data?.forEach((card) =>
          self.cardList.put(createCardInstance(card))
        );
      }
    }),
    requestCard: flow(function* (input: API.ChargeCustomerRequestDto) {
      const {
        data,
      }: {
        data: API.VirtualCardResponsetDto;
      } = yield api.post<API.VirtualCardResponsetDto>(
        "/User/RequestCard",
        input
      );
      if (data.responseCode === "00") {
        toast.success(data.responseMessage, { position: "top-center" });
        self.cardList.put(createCardInstance({ ...data.data }));
        return true;
      } else toast.error(data.responseMessage, { position: "top-center" });
      return false;
    }),
    //block card action
    blockCard: flow(function* (input: API.ManageCardRequestDto) {
      const {
        data,
      }: {
        data: API.BlockCardResponseDto;
      } = yield api.post<API.BlockCardResponseDto>("/User/BlockCard", input);
      if (data.responseCode === "00") {
        const card = self.cardList.get(`${input.pan}`);
        if (card) card.blockStatus = "BLOCKED";
        toast.success(data.responseMessage, { position: "top-center" });
      } else toast.error(data.responseMessage, { position: "top-center" });
    }),
    unblockCard: flow(function* (input: API.ManageCardRequestDto) {
      const {
        data,
      }: {
        data: API.BlockCardResponseDto;
      } = yield api.post<API.BlockCardResponseDto>("/User/UnblockCard", input);
      if (data.responseCode === "00") {
        const card = self.cardList.get(`${input.pan}`);
        if (card) card.blockStatus = "NOT BLOCKED";
        toast.success(data.responseMessage, { position: "top-center" });
      } else toast.error(data.responseMessage, { position: "top-center" });
    }),
  }))
  .views((self) => ({
    get cards() {
      return (values(self.cardList) as unknown) as CardModel[];
    },
  }));

export interface CardModel extends Instance<typeof Card> {}
export interface CardStoreModel extends Instance<typeof CardStore> {}
