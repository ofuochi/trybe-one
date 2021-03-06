import { NavLink, Link, useHistory } from "react-router-dom";

import { routePath } from "../constants/route-paths";
import { authService } from "../services";

export const SideNavbar = () => {
  const history = useHistory();
  return (
    <div className="mdc-drawer__content mt-3">
      <div className="mdc-list-group">
        <nav className="mdc-list mdc-drawer-menu">
          <div className="mdc-list-item mdc-drawer-item">
            <NavLink className="mdc-drawer-link" to={routePath.dashboard}>
              Dashboard
              <i
                className="material-icons mdc-list-item__start-detail mdc-drawer-item-icon ml-auto"
                aria-hidden="true"
              >
                <img alt="" src="/assets/images/ic-dashboad.svg" />
              </i>
            </NavLink>
          </div>
          <div className="mdc-list-item mdc-drawer-item">
            <NavLink
              className="mdc-drawer-link"
              to={routePath.transactions.index}
            >
              Transactions
              <i
                className="mdc-list-item__start-detail mdc-drawer-item-icon ml-auto"
                aria-hidden="true"
              >
                <img alt="" src="/assets/images/ic-transaction.svg" />
              </i>
            </NavLink>
          </div>
          <div className="mdc-list-item mdc-drawer-item">
            <NavLink className="mdc-drawer-link" to={routePath.investments}>
              Investments
              <i
                className="mdc-list-item__start-detail mdc-drawer-item-icon ml-auto"
                aria-hidden="true"
              >
                <img alt="" src="/assets/images/ic-investment.svg" />
              </i>
            </NavLink>
          </div>
          <div className="mdc-list-item mdc-drawer-item">
            <NavLink className="mdc-drawer-link" to={routePath.spendTracker}>
              Spend Tracker
              <i
                className="mdc-list-item__start-detail mdc-drawer-item-icon ml-auto"
                aria-hidden="true"
              >
                <img alt="" src="/assets/images/ic-spendtracker.svg" />
              </i>
            </NavLink>
          </div>

          <div className="mdc-list-item mdc-drawer-item">
            <NavLink
              className="mdc-drawer-link"
              to={routePath.targetSavings.index}
            >
              Target Savings
              <i
                className="material-icons mdc-list-item__start-detail mdc-drawer-item-icon ml-auto"
                aria-hidden="true"
              >
                <img alt="" src="/assets/images/ic-targetsaving.svg" />
              </i>
            </NavLink>
          </div>
          <div className="mdc-list-item mdc-drawer-item">
            <NavLink 
              className="mdc-drawer-link" 
              to={routePath.accounts}
            >
              Accounts
              <i
                className="mdc-list-item__start-detail mdc-drawer-item-icon ml-auto"
                aria-hidden="true"
              >
                <img alt="" src="/assets/images/ic-account.svg" />
              </i>
            </NavLink>
          </div>
          <div className="mdc-list-item mdc-drawer-item">
            <span
              className="mdc-drawer-link"
              onClick={() =>
                authService.logout().then(() => history.replace(routePath.home))
              }
            >
              Logout
              <i
                className="mdc-list-item__start-detail mdc-drawer-item-icon ml-auto"
                aria-hidden="true"
              >
                <img alt="" src="/assets/images/ic-logout.svg" />
              </i>
            </span>
          </div>
        </nav>
      </div>
    </div>
  );
};
