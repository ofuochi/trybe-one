import { useStore } from "../../hooks/use-store.hooks";

export const PageHeader = () => {
  const { currentUserStore } = useStore();
  const currentDate = new Date().toLocaleString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
  return (
    <header className="mdc-top-app-bar p-0">
      <div className="mdc-top-app-bar__row">
        <div className="mdc-top-app-bar__section mdc-top-app-bar__section--align-start">
          <button className="material-icons mdc-top-app-bar__navigation-icon mdc-icon-button d-block d-md-none sidebar-toggler">
            menu
          </button>
          <div className="px-4 mt-5">
            <h1 className="mb-0 mt-4 p-0 text-bold">
              Hello, {currentUserStore.firstName}
            </h1>
            <p className="text-muted lead">
              Welcome back {currentUserStore.firstName} |{" "}
              <span>{currentDate}</span> |{" "}
              <span>
                Partially Cloudy
                <i
                  className="mdc-list-item__start-detail mdc-drawer-item-icon ml-auto"
                  aria-hidden="true"
                >
                  <img
                    alt=""
                    className="w-24"
                    src="/assets/images/ic-cloudy.svg"
                  />
                </i>
              </span>
            </p>
          </div>
        </div>
      </div>
    </header>
  );
};
