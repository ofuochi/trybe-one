import { observer } from "mobx-react-lite";
import Slider from "react-slick";

import { useStore } from "../../hooks/use-store.hooks";

const settings = {
  dots: true,
  infinite: false,
  speed: 500,
  slidesToShow: 1,
  slidesToScroll: 1,
  className: "center",
  centerMode: true,
  centerPadding: "10px",
};

const CardsView = observer(() => {
  const {
    cardStore: { cards },
  } = useStore();
  return (
    <>
      <div className="row m-0 mb-0 d-flex mt-3 justify-content-between">
        <div className="col s6">
          <div className="text-left">
            <button className="btn no-bg p-0">
              <img alt="" src="/assets/images/ic-search.svg" />
            </button>
          </div>
        </div>
        <div className="col s6">
          <div className="text-right">
            <button className="btn no-bg p-0">
              <img alt="" src="/assets/images/ic-notification.svg" />
            </button>
          </div>
        </div>
      </div>

      {cards.length > 0 && (
        <div className="mt-3 row">
          <h5 className="mdc-top-app-bar__title font-weight-light ml-4 mb-1 p-0">
            Your Cards
          </h5>

          <div className="cardslides col-lg-12">
            <Slider {...settings}>
              {cards.map((card, i) => (
                <div key={i} style={{ display: "block" }}>
                  <img alt="" src="/assets/images/cardbg.png" />

                  <div className="masked-span">{card.pan}</div>
                </div>
              ))}
            </Slider>
          </div>
        </div>
      )}
    </>
  );
});

export default CardsView;
