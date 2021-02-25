import React from "react";
import { Link, Route, Switch, useLocation } from "react-router-dom";

import { routePath } from "../../constants/route-paths";
import { Title } from "../Common/Title";
import { Airtime } from "./Airtime";
import { Bills } from "./Bills";
import RecentTransactions from "./Recent";
import { Statement } from "./Statment";
import { Transfer } from "./Transfers";

export const Transactions = () => {
  const { pathname } = useLocation();
  const imgSrc = (currentRoute: string, active: string, inactive: string) =>
    pathname === currentRoute
      ? `/assets/images/${active}`
      : `/assets/images/${inactive}`;
  return (
    <div className="page-content">
      <Title title="Transactions" />
      <div className="mdc-card info-card info-card--danger overflow-x-auto re-shadow">
        <div className="card-inner row mb-0 d-flex">
          <div className="text-center">
            <Link to={routePath.transactions.transfer.index}>
              <div className="img-w-42">
                <img
                  alt="showimg"
                  src={imgSrc(
                    routePath.transactions.transfer.index,
                    "icn-transfer-active.svg",
                    "icn-transfer.svg"
                  )}
                />
              </div>
              <p className="d-block text-smaller text-dark mb-0 mt-0">
                Transfer
              </p>
            </Link>
          </div>
          <div className="text-center ml-5-re">
            <Link to={routePath.transactions.bills.index}>
              <div className="img-w-42">
                <img
                  alt="showimg"
                  src={imgSrc(
                    routePath.transactions.bills.index,
                    "icn-paybills-active.svg",
                    "icn-paybills.svg"
                  )}
                />
              </div>
              <p className="d-block text-smaller text-dark mb-0 mt-0">
                Pay Bills
              </p>
            </Link>
          </div>
          <div className="text-center ml-5-re">
            <Link to={routePath.transactions.airtime.index}>
              <div className="img-w-42">
                <img
                  alt="showimg"
                  src={imgSrc(
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
              <p className="d-block text-smaller text-dark mb-0 mt-0">Bamboo</p>
            </Link>
          </div>
          <div className="text-center ml-5-re">
            <Link to={routePath.transactions.statement.index}>
              <div className="img-w-42">
                <img
                  alt="showimg"
                  src={imgSrc(
                    routePath.transactions.statement.index,
                    "icn-statement-active.svg",
                    "icn-statement.svg"
                  )}
                />
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
              <p className="d-block text-smaller text-dark mb-0 mt-0">More</p>
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
        <Route path={routePath.transactions.bills.index} component={Bills} />
        <Route
          path={routePath.transactions.statement.index}
          component={Statement}
        />
      </Switch>
    </div>
  );
};
