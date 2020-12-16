import React from "react";
import { Redirect, Route } from "react-router-dom";

import { routePath } from "../../constants/route-paths";
import { AuthLayout } from "../../layouts/AuthLayout";
import { DefaultLayout } from "../../layouts/DefaultLayout";
import { authService } from "../../services";

interface IWithAuthProps {
  component: any;
  isPrivate?: boolean;
  [key: string]: any;
}

export const AuthRoute: React.FC<IWithAuthProps> = ({
  component: AppComponent,
  isPrivate,
  ...rest
}) => {
  const isAuthenticated = authService.isAuthenticated();

  if (isPrivate && !isAuthenticated) {
    return <Redirect to={routePath.login} />;
  }
  if (!isPrivate && isAuthenticated) {
    return <Redirect to={routePath.dashboard} />;
  }
  const Layout = isAuthenticated ? AuthLayout : DefaultLayout;

  return (
    <Route
      {...rest}
      render={(props) => (
        <Layout>
          <AppComponent {...props} />
        </Layout>
      )}
    />
  );
};
