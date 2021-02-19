import { RingProgress } from "@ant-design/charts";
import { observer } from "mobx-react-lite";
import numeral from "numeral";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import api from "../../config/api.config";
import { routePath } from "../../constants/route-paths";
import { useStore } from "../../hooks/use-store.hooks";
import { localStoreService } from "../../services";

const CardSection = observer(() => {
  const [cards, setCards] = useState<API.GetCardResponseDto>({});
  const { targetStore } = useStore();
  useEffect(() => {
    const currentUser = localStoreService.getCurrentUser();
    const getCardInput: API.GetCardRequestDto = {
      accountId: currentUser?.nuban,
    };
    api
      .post<API.GetCardResponseDto>("/User/GetActiveCard", getCardInput)
      .then(({ data }) => setCards(data));
    api
      .get<API.GetTargetSavingsResponseListDto>(
        `/User/GetTargetSavingsByProfileId?profileID=${currentUser?.userId}`
      )
      .then(({ data }) => targetStore.setTargets(data.targetSavings || []));
  }, [targetStore]);

  return (
    <>
      <div className="row m-0 mb-0 d-flex mt-3 justify-content-between">
        <div className="col s6">
          <div className="text-left">
            <button className="btn no-bg p-0">
              <img alt="" src="/assets/images/ic-search.svg" />
            </button>
          </div>
        </div>
        <div className="col s6">
          <div className="text-right">
            <button className="btn no-bg p-0">
              <img alt="" src="/assets/images/ic-notification.svg" />
            </button>
          </div>
        </div>
      </div>

      {cards.data && cards.data.length > 0 && (
        <div className="mt-5 row">
          <h5 className="mdc-top-app-bar__title font-weight-light ml-4 mb-1 p-0">
            Your Cards
          </h5>

          <div className="cardslides">
            {cards.data?.map((card, i) => (
              <div key={i} style={{ display: "block" }}>
                <img alt="" src="/assets/images/cardbg.png" />
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="mt-4 row">
        <h5 className="mdc-top-app-bar__title font-weight-light ml-4 mb-1 p-0">
          Request for Card
        </h5>
        <div className="col-lg-12 text-center mt-4">
          <Link className="no-bg bd-0" to={routePath.card.request}>
            <img
              className="m-auto"
              alt=""
              src="/assets/images/ic-card-request.svg"
            />
          </Link>
        </div>
      </div>

      {targetStore.targets.length > 0 ? (
        <div className="mt-4 row">
          <h5 className="mdc-top-app-bar__title font-weight-light ml-4 mb-1 p-0">
            Target Saving
          </h5>

          <ul className="collection bd-0  m-0 pl-3">
            {targetStore.targets.map((t) => (
              <li
                className="d-flex row m-0 mb-4 justify-content-between"
                key={t.id}
              >
                <RingProgress
                  width={50}
                  height={50}
                  percent={t.percentageCompletion}
                  color={t.color}
                />
                <span
                  style={{
                    width: "10px",
                    height: "10px",
                    backgroundColor: t.color,
                  }}
                  className="bg-doughnut1 rounded-20 m-3 mt-4 d-block"
                ></span>
                <span className="p-title mt-3 d-block">{t.item}</span>
                <span className="p-title mt-3 d-block text-right">{`₦${numeral(
                  t.targetAmountInView
                ).format("0,0")}`}</span>
              </li>
            ))}
          </ul>
        </div>
      ) : null}
    </>
  );
});

export default CardSection;
