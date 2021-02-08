import React from "react";
import { Link, Route, Switch, useLocation } from "react-router-dom";

import { routePath } from "../../../constants/route-paths";
import { AirtimeOthers } from "./AirtimeOthers";
import AirtimeSelf from "./AirtimeSelf";

export const Airtime = () => {
  const { pathname } = useLocation();

  const imgSrc = (currentRoute: string, active: string, inactive: string) =>
    pathname === currentRoute
      ? `/assets/images/${active}`
      : `/assets/images/${inactive}`;
  return (
    <div className="mt-5">
      <p className="mb-3 lead p-0">Where would you like to send airtime to?</p>
      <div className="mdc-card info-card info-card--danger no-shadow overflow-x-auto">
        <div className="card-inner row mb-0 d-flex">
          <div className="text-center">
            <Link to={routePath.transactions.airtime.self}>
              <div className="img-w-42">
                <img
                  alt="showimg"
                  src={imgSrc(
                    routePath.transactions.airtime.self,
                    "icn-self.svg",
                    "icn-self-inactive.svg"
                  )}
                />
              </div>
              <p className="d-block text-smaller text-dark mb-0 mt-0">Self</p>
            </Link>
          </div>
          <div className="text-center ml-6-re">
            <Link to={routePath.transactions.airtime.others}>
              <div className="img-w-42">
                <img
                  alt="showimg"
                  src={imgSrc(
                    routePath.transactions.airtime.others,
                    "ic-others-active.svg",
                    "ic-others.svg"
                  )}
                />
              </div>
              <p className="d-block text-smaller text-dark mb-0 mt-0">Others</p>
            </Link>
          </div>
        </div>
      </div>

      <Switch>
        <Route
          path={routePath.transactions.airtime.self}
          component={AirtimeSelf}
        />

        <Route
          path={routePath.transactions.airtime.others}
          component={AirtimeOthers}
        />
      </Switch>
    </div>
  );
};
