import { Route, Switch, useHistory } from "react-router-dom";

import { routePath } from "../../constants/route-paths";
import { useStore } from "../../hooks/use-store.hooks";
import { Title } from "../Common/Title";
import TokenizeCard from "../Common/TokenizeCard";
import Donut from "./Donut";
import { NewTargetSavings } from "./NewTargetSavings";
import ProgressBars from "./ProgressBars";

export const TargetSavings = () => {
  const { location } = useHistory();
  const { targetStore } = useStore();
  return (
    <>
      <Title title="Target Savings" />
      {location.pathname === routePath.targetSavings.index ? (
        <div className="page-content">
          <div className="row">
            <Donut />
            <div className="col-lg-6">
              <div className="alert alert-danger p-4">
                <h5>Target Savings</h5>
                <p
                  className="small"
                  onClick={() => {
                    targetStore.removeTarget(
                      "12589b20-1401-408e-8182-df8343756673"
                    );
                  }}
                >
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
