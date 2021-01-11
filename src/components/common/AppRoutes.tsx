import React from "react";
import { Redirect, Switch } from "react-router-dom";

import { routePath } from "../../constants/route-paths";
import { useStore } from "../../hooks/use-store.hooks";
import { localStoreService } from "../../services";
import { Login } from "../Auth/Login";
import { Signup } from "../Auth/Signup";
import { Otp } from "../Auth/Otp";
import { Dashboard } from "../Dashboard";
import { Home } from "../Home";
import { Investments } from "../Investments";
import { Transactions } from "../Transactions";
import { TransferSelf } from "../TransferSelf";
import { TransferOther } from "../TransferOther";
import { TransferSterling } from "../TransferSterling";
import { Airtime } from "../Airtime";
import { TargetSavings } from "../TargetSavings";
import { AuthRoute } from "./AuthRoute";
import { AirtimeOthers } from "../AirtimeOthers";

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
        path={routePath.transactions}
        component={Transactions}
        isPrivate
      />
      <AuthRoute
        path={routePath.investments}
        component={Investments}
        isPrivate
      />
      <AuthRoute
        path={routePath.transferself}
        component={TransferSelf}
        isPrivate
      />
      <AuthRoute
        path={routePath.transferother}
        component={TransferOther}
        isPrivate
      />
         <AuthRoute
        path={routePath.transfersterling}
        component={TransferSterling}
        isPrivate
      />
         <AuthRoute
        path={routePath.airtime}
        component={Airtime}
        isPrivate
      />
        <AuthRoute
        path={routePath.targetsavings}
        component={TargetSavings}
        isPrivate
      />
               <AuthRoute
        path={routePath.airtimeothers}
        component={AirtimeOthers}
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
