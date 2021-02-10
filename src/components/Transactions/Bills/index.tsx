import React from "react";
import { Link, Route, Switch, useLocation } from "react-router-dom";

import { routePath } from "../../../constants/route-paths";
import { Waste } from "./Waste";
import { Electricity } from "./Electricity";

export const Bills = () => {
  const { pathname } = useLocation();

  const imgSrc = (currentRoute: string, active: string, inactive: string) =>
    pathname === currentRoute
      ? `/assets/images/${active}`
      : `/assets/images/${inactive}`;
  return (
    <div className="mt-5">
      <p className="mb-3 lead p-0">Which Bill would you like to pay for?</p>
      
      <div className="mdc-card info-card info-card--danger no-shadow overflow-x-auto">
        <div className="card-inner row mb-0 d-flex">
          <div className="text-center">
            <Link to={routePath.transactions.bills.electricity}>
              <div className="img-w-42">
                <img
                  alt="showimg"
                  src={imgSrc(
                    routePath.transactions.bills.electricity,
                    "icn-electricity-active.svg",
                    "icn-electricity.svg"
                    
                  )}
                />
              </div>
              <p className="d-block text-smaller text-dark mb-0 mt-0">Electricity</p>
            </Link>
          </div>
          <div className="text-center ml-6-re">
            <Link to={routePath.transactions.bills.waste}>
              <div className="img-w-42">
                <img
                  alt="showimg"
                  src={imgSrc(
                    routePath.transactions.bills.waste,
                    "icn-waste-active.svg",
                    "icn-waste.svg"
                  )}
                />
              </div>
              <p className="d-block text-smaller text-dark mb-0 mt-0">Waste Managment</p>
            </Link>
          </div>
        </div>
      </div>

      <Switch>
        <Route
          path={routePath.transactions.bills.electricity}
          component={Electricity}
        />

        <Route
          path={routePath.transactions.bills.waste}
          component={Waste}
        />
      </Switch>
    </div>
  );
};
