import { Link } from "react-router-dom";

import { routePath } from "../../constants/route-paths";
import CardsView from "./CardsView";
import TargetsView from "./TargetsView";

const CardSection = () => {
  return (
    <>
      <CardsView />

      <div className="mt-4 row">
        <h5 className="mdc-top-app-bar__title font-weight-light ml-4 mb-1 p-0">
          Request for Card
        </h5>
        <div className="col-lg-12 text-center mt-4">
          <Link className="no-bg bd-0" to={routePath.card.request}>
            <img
              className="m-auto"
              alt=""
              src="/assets/images/ic-card-request.svg"
            />
          </Link>
        </div>
      </div>

      <TargetsView />
    </>
  );
};

export default CardSection;
