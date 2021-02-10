import React, { useEffect, useState } from "react";
import { Link, Route, Switch, useLocation } from "react-router-dom";

import api from "../../config/api.config";
import { routePath } from "../../constants/route-paths";
import { localStoreService } from "../../services";
import { Title } from "../Common/Title";
import { Airtime } from "./Airtime";
import { Bills } from "./Bills";
import RecentTransactions from "./Recent";
import { Transfer } from "./Transfers";
import { Statment } from "./Statment";

export const Transactions = () => {
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
  const { pathname } = useLocation();
  const imgSrc = (currentRoute: string, active: string, inactive: string) =>
    pathname === currentRoute
      ? `/assets/images/${active}`
      : `/assets/images/${inactive}`;
  return (
    <>
      <Title title="Transactions" />
      <div className="col-lg-8 col-md-8 bd-right px-5 mt-4">
        <div className="page-content">
          <div className="mdc-card info-card info-card--danger overflow-x-auto re-shadow">
            <div className="card-inner row mb-0 d-flex">
              <div className="text-center">
                <Link to={routePath.transactions.transfer.index}>
                  <div className="img-w-42">
                  <img alt="showimg" src={imgSrc(
                    routePath.transactions.transfer.index,
                    "icn-transfer-active.svg",
                    "icn-transfer.svg" )} />
                  </div>
                  <p className="d-block text-smaller text-dark mb-0 mt-0">
                    Transfer
                  </p>
                </Link>
              </div>
              <div className="text-center ml-5-re">
                <Link to={routePath.transactions.bills.index}>
                  <div className="img-w-42">
                    <img alt="showimg" src={imgSrc(
                    routePath.transactions.bills.index,
                    "icn-paybills-active.svg",
                    "icn-paybills.svg" )} />
                  </div>
                  <p className="d-block text-smaller text-dark mb-0 mt-0">
                    Pay Bills
                  </p>
                </Link>
              </div>
              <div className="text-center ml-5-re">
                <Link to={routePath.transactions.airtime.index}>
                  <div className="img-w-42">
                    <img alt="showimg" src={imgSrc(
                    routePath.transactions.airtime.index,
                    "icn-airtime-active.svg",
                    "icn-airtime.svg"
                    
                  )}
                />
                </div>
                  <p className="d-block text-smaller text-dark mb-0 mt-0">
                    Airtime &amp; Data
                  </p>
                </Link>
              </div>
              <div className="text-center ml-5-re">
                <Link to="#">
                  <div className="img-w-42">
                    <img alt="" src="/assets/images/icn-subscription.svg" />
                  </div>
                  <p className="d-block text-smaller text-dark mb-0 mt-0">
                    Subscription
                  </p>
                </Link>
              </div>
              <div className="text-center ml-5-re">
                <Link to="#">
                  <div className="img-w-42">
                    <img alt="" src="/assets/images/icn-bamboo.svg" />
                  </div>
                  <p className="d-block text-smaller text-dark mb-0 mt-0">
                    Bamboo
                  </p>
                </Link>
              </div>
              <div className="text-center ml-5-re">
                <Link to={routePath.transactions.statement.index}>
                  <div className="img-w-42">
                    <img alt="showimg" src={imgSrc(
                    routePath.transactions.statement.index,
                    "icn-statement-active.svg",
                    "icn-statement.svg"
                  )} />
                  </div>
                  <p className="d-block text-smaller text-dark mb-0 mt-0">
                    Statement
                  </p>
                </Link>
              </div>
              <div className="text-center ml-5-re">
                <Link to="#">
                  <div className="img-w-42">
                    <img alt="" src="/assets/images/icn-more.svg" />
                  </div>
                  <p className="d-block text-smaller text-dark mb-0 mt-0">
                    More
                  </p>
                </Link>
              </div>
            </div>
          </div>

          <Switch>
            <Route
              path={routePath.transactions.index}
              component={RecentTransactions}
              exact
            />
            <Route
              path={routePath.transactions.transfer.index}
              component={Transfer}
            />
            <Route
              path={routePath.transactions.airtime.index}
              component={Airtime}
            />
             <Route
              path={routePath.transactions.bills.index}
              component={Bills}
            />
            <Route
              path={routePath.transactions.statement.index}
              component={Statment}
            />
          </Switch>
        </div>
      </div>
      <div className="col-lg-4 col-md-4">
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
            Target Saving
          </h5>

          <ul className="collection bd-0  m-0 pl-3">
            <li className="d-flex row m-0 mb-4 justify-content-between">
              <canvas
                style={{ width: "20px", height: "20px" }}
                id="doughnutChart"
              ></canvas>
              <span
                style={{ width: "10px", height: "10px" }}
                className="bg-doughnut1 rounded-20 m-3 mt-4 d-block"
              ></span>
              <span className="p-title mt-3 d-block">New Phone</span>
              <span className="p-title mt-3 d-block text-right">N 952.87</span>
            </li>
            <li className="d-flex row m-0 mb-4 justify-content-between">
              <canvas
                style={{ width: "20px", height: "20px" }}
                id="doughnutChart2"
              ></canvas>
              <span
                style={{ width: "10px", height: "10px" }}
                className="bg-doughnut2 rounded-20 m-3 mt-4 d-block"
              ></span>
              <span className="title mt-3 d-block">New Phone</span>
              <span className="title mt-3 d-block text-right">N 952.87</span>
            </li>
            <li className="d-flex row m-0 mb-4 justify-content-between">
              <canvas
                style={{ width: "20px", height: "20px" }}
                id="doughnutChart3"
              ></canvas>
              <span
                style={{ width: "10px", height: "10px" }}
                className="bg-doughnut3 rounded-20 m-3 mt-4 d-block"
              ></span>
              <span className="title mt-3 d-block">New Phone</span>
              <span className="title mt-3 d-block text-right">N 952.87</span>
            </li>
          </ul>
        </div>
      </div>
    </>
  );
};
