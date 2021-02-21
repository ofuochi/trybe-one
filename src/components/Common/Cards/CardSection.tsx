import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Slider from "react-slick";

import api from "../../../config/api.config";
import { routePath } from "../../../constants/route-paths";
import { localStoreService } from "../../../services";
import TargetsView from "./TargetsView";

const maskedPan = (pan: string) => {
  const first4 = pan.substring(0, 4);
  const last4 = pan.substring(pan.length - 4);

  const mask = pan.substring(4, pan.length - 4).replace(/\d/g, "*");
  return `${first4}${mask}${last4}`;
};

const CardSection = () => {
  const [cards, setCards] = useState<API.GetCardResponseDto>({});
  useEffect(() => {
    const currentUser = localStoreService.getCurrentUser();
    const getCardInput: API.GetCardRequestDto = {
      accountId: currentUser?.nuban,
    };
    api
      .post<API.GetCardResponseDto>("/User/GetActiveCard", getCardInput)
      .then(({ data }) => setCards(data));
  }, []);

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    className: "center",
    centerMode: true,
    centerPadding: "10px",
  };

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
        <div className="mt-3 row">
          <h5 className="mdc-top-app-bar__title font-weight-light ml-4 mb-1 p-0">
            Your Cards
          </h5>

          <div className="cardslides col-lg-12">
            <Slider {...settings}>
              {cards.data.map((card, i) => (
                <div key={i} style={{ display: "block" }}>
                  <img alt="" src="/assets/images/cardbg.png" />

                  <div className="masked-span">
                    {maskedPan(`${card.card_number}`)}
                  </div>
                </div>
              ))}
            </Slider>
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

      <TargetsView />
    </>
  );
};

export default CardSection;
