import React from "react";
import { Redirect, Switch } from "react-router-dom";

import { routePath } from "../../constants/route-paths";
import { useStore } from "../../hooks/use-store.hooks";
import { localStoreService } from "../../services";
import { Login } from "../Auth/Login";
import { Otp } from "../Auth/Otp";
import { Signup } from "../Auth/Signup";
import { Dashboard } from "../Dashboard";
import { Home } from "../Home";
import { Investments } from "../Investments";
//import { NewTargetSavings } from "../TargetSaving/NewTargetSavings";
import { TargetSavings } from "../TargetSaving";
import { Transactions } from "../Transactions";
import { AuthRoute } from "./AuthRoute";
import RequestCard from "./RequestCard";
import TokenizeCard from "./TokenizeCard";

export const AppRoutes = () => {
  const { currentUserStore } = useStore();
  const currentUser = localStoreService.getCurrentUser();
  if (currentUser) {
    currentUserStore.updatedCurrentUser(currentUser.email);
  }

  return (
    <Switch>
      <AuthRoute path={routePath.dashboard} component={Dashboard} isPrivate />
      <AuthRoute
        path={routePath.transactions.index}
        component={Transactions}
        isPrivate
      />

      <AuthRoute
        path={routePath.investments}
        component={Investments}
        isPrivate
      />

      <AuthRoute
        path={routePath.targetSavings.index}
        component={TargetSavings}
        isPrivate
      />
      <AuthRoute
        path={routePath.card.tokenize}
        component={TokenizeCard}
        isPrivate
      />
      <AuthRoute
        path={routePath.card.request}
        component={RequestCard}
        isPrivate
      />

      <AuthRoute path={routePath.login} component={Login} />
      <AuthRoute path={routePath.signup} component={Signup} />
      <AuthRoute path={routePath.home} exact component={Home} />
      <AuthRoute path={routePath.otp} exact component={Otp} />
      <Redirect to={routePath.dashboard} />
    </Switch>
  );
};
