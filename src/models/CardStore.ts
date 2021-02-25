import { values } from "mobx";
import { flow, Instance, types } from "mobx-state-tree";
import { toast } from "react-toastify";

import api from "../config/api.config";

const maskedPan = (pan: string) => {
  const first4 = pan.substring(0, 4);
  const last4 = pan.substring(pan.length - 4);

  const mask = pan.substring(4, pan.length - 4).replace(/\d/g, "*");
  return `${first4}${mask}${last4}`;
};
const createCardInstance = (card: API.CardObj) => ({
  blockStatus: card.block_status,
  pan: `${maskedPan(card.card_number as string)}`,
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
      } = yield api.post<API.GetCardResponseDto>("/User/GetActiveCard", input);

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
  }))
  .views((self) => ({
    get cards() {
      return (values(self.cardList) as unknown) as CardModel[];
    },
  }));

export interface CardModel extends Instance<typeof Card> {}
export interface CardStoreModel extends Instance<typeof CardStore> {}
