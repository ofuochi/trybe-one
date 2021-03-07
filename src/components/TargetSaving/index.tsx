import { Route, Switch, useHistory } from "react-router-dom";

import { routePath } from "../../constants/route-paths";
import { Title } from "../Common/Title";
import TokenizeCard from "../Common/TokenizeCard";
import Donut from "./Donut";
import { NewTargetSavings } from "./NewTargetSavings";
import ProgressBars from "./ProgressBars";

export const TargetSavings = () => {
  const { location } = useHistory();
  return (
    <>
      <Title title="Target Savings" />
      {location.pathname === routePath.targetSavings.index ? (
        <div className="page-content">
          <div className="row">
          <div className="col-lg-12">
            <h4>Total Budget</h4>
          </div>
            <Donut />
            <div className="col-lg-6">
              <div className="alert alert-danger p-4">
                <h5>Target Savings</h5>
                <p className="small">
                  Target Savings helps you achieve your savings goals while you
                  sit back and relax
                </p>
              </div>
            </div>
          </div>
          <ProgressBars />
        </div>
      ) : null}

      <Switch>
        <Route
          path={routePath.targetSavings.tokenizeCard}
          component={TokenizeCard}
          exact
        />
        <Route
          path={routePath.targetSavings.createTargetSaving}
          component={NewTargetSavings}
          exact
        />
      </Switch>
    </>
  );
};
