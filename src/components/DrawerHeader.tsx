import { observer } from "mobx-react-lite";

import { useStore } from "../hooks/use-store.hooks";

export const DrawerHeader = observer(() => {
  const { currentUserStore } = useStore();
  return (
    <div className="mdc-drawer__header">
      <div className="brand-logo">
        <div className="user-info d-flex">
          <div>
            <img
              className="rounded-15 responsive-img"
              src="/assets/images/image 20.png"
              alt="logo"
            />
          </div>
          <div>
            <h4 className="font-weight-normal d-block mt-2 ml-3 mb-0">
              {currentUserStore.firstName}
            </h4>
            <p className="email ml-3 text-primary text-small">
              Status: <span>Community Member</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
});
