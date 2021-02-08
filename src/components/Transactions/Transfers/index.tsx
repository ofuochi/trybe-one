import React from "react";
import { Link, Route, Switch, useLocation } from "react-router-dom";

import { routePath } from "../../../constants/route-paths";
import { TransferOther } from "./TransferOther";
import { TransferSterling } from "./TransferSterling";

export const Transfer = () => {
  const { pathname } = useLocation();

  const imgSrc = (currentRoute: string, active: string, inactive: string) =>
    pathname === currentRoute
      ? `/assets/images/${active}`
      : `/assets/images/${inactive}`;

  return (
    <div className="mt-5">
      <p className="lead mb-3 p-0">
        Where would you like to send money to?
      </p>
      <div className="mdc-card info-card info-card--danger no-shadow overflow-x-auto">
        <div className="card-inner row mb-0 d-flex">
          <div className="text-center">
            <Link to="#">
              <div className="img-w-42">
                <img alt="showimg" src="/assets/images/icn-trybe.svg" />
              </div>
              <p className="d-block text-smaller text-dark mb-0 mt-0">
                TrybeOne <br /> Account
              </p>
            </Link>
          </div>
          <div className="text-center ml-6-re">
            <Link to={routePath.transactions.transfer.sterling}>
              <div className="img-w-42">
                <img
                  alt="showimg"
                  src={imgSrc(
                    routePath.transactions.transfer.sterling,
                    "icn-sterling-active.svg",
                    "icn-sterling.svg"
                  )}
                />
              </div>
              <p className="d-block text-smaller text-dark mb-0 mt-0">
                Sterling <br /> Account
              </p>
            </Link>
          </div>
          <div className="text-center ml-6-re">
            <Link to={routePath.transactions.transfer.others}>
              <div className="img-w-42">
                <img
                  alt="showimg"
                  src={imgSrc(
                    routePath.transactions.transfer.others,
                    "icn-bank-active.svg",
                    "icn-bank.svg"
                  )}
                />
              </div>
              <p className="d-block text-smaller text-dark mb-0 mt-0">
                Other <br /> Banks
              </p>
            </Link>
          </div>
          <div className="text-center ml-6-re">
            <Link to="#">
              <div className="img-w-42">
                <img alt="showimg" src="/assets/images/icn-foreign.svg" />
              </div>
              <p className="d-block text-smaller text-dark mb-0 mt-0">
                Foreign <br /> Accounts
              </p>
            </Link>
          </div>
        </div>
      </div>

      <Switch>
        <Route
          path={routePath.transactions.transfer.sterling}
          component={TransferSterling}
        />
        <Route
          path={routePath.transactions.transfer.others}
          component={TransferOther}
        />
      </Switch>
    </div>
  );
};
