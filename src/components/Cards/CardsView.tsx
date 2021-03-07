import { Field, Formik } from "formik";
import { observer } from "mobx-react-lite";
import { useState } from "react";
import { Button, Form, Modal } from "react-bootstrap";
import Slider from "react-slick";
import * as Yup from "yup";

import { useStore } from "../../hooks/use-store.hooks";
import { CardModel } from "../../models/CardStore";
import { localStoreService } from "../../services";
import { maskedPan } from "../../util/methods-util";
import { ErrorMsg } from "../Common/ErrorMsg";

const reqCardValidationSchema = Yup.object().shape({
  city: Yup.string().required("required"),
  name: Yup.string().required("required"),
  state: Yup.string().required("required"),
  address: Yup.string().required("required"),
});

const settings = {
  dots: true,
  arrows:true,
  infinite: false,
  speed: 500,
  slidesToShow: 1,
  slidesToScroll: 1,
  className: "center",
  centerMode: true,
  centerPadding: "10px",
};

const CardsView = observer(() => {
  const [showRequestCard, setShowRequestCard] = useState(false);
  const [showBlockCard, setShowBlockCard] = useState(false);
  const [showTrackCard, setShowTrackCard] = useState(false);
  const [showUnblockCard, setShowUnblockCard] = useState(false);
  const [selectedCard, setSelectedCard] = useState<CardModel | undefined>();
  const [blockLoading, setBlockLoading] = useState(false);
  const [unblockLoading, setUnblockLoading] = useState(false);
  const { cardStore } = useStore();
  const currentUser = localStoreService.getCurrentUser();
  const initialReqCardValues: API.VirtualCardRequestDto = {
    productID: 10142,
    email: currentUser?.email,
    customerUniqueIdentifier: currentUser?.phoneNumber,
    city: "",
    state: "",
    address: currentUser?.address,
    cardType: "main",
    phoneNumber: currentUser?.phoneNumber,
    name: `${currentUser?.name} ${currentUser?.lastName}`,
    gender: currentUser?.title === "Mr" ? "M" : "F",
    title: currentUser?.title,
    wallet_ShortCode: "ONB",
  };
  const handleReqCardSubmit = (
    values: API.ChargeCustomerRequestDto,
    { setSubmitting }: any
  ) => {
    cardStore
      .requestCard(values)
      .then((isSuccess) => {
        setSubmitting(false);
        if (isSuccess) setShowRequestCard(false);
      })
      .catch(() => setSubmitting(false));
  };

  const handleCardBlock = () => {
    setBlockLoading(true);
    cardStore
      .blockCard({
        customerUniqueIdentifier: currentUser?.nuban,
        expiryDate: selectedCard?.expiryDate,
        pan: selectedCard?.pan,
        wallet_ShortCode: "ONB",
      })
      .then(() => {
        setShowBlockCard(false)
        setBlockLoading(false);
      })
      .catch(() => setShowBlockCard(false));
  };
  const handleCardUnblock = () => {
    setUnblockLoading(true);
    cardStore
      .unblockCard({
        customerUniqueIdentifier: currentUser?.nuban,
        expiryDate: selectedCard?.expiryDate,
        pan: selectedCard?.pan,
        wallet_ShortCode: "ONB",
      })
      .then(() => {
        setShowUnblockCard(false)
        setUnblockLoading(false);
      })
      .catch(() => setShowUnblockCard(false));
  };
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

      {cardStore.cards.length > 0 && (
        <div className="mt-3 row">
          <h5 className="mdc-top-app-bar__title font-weight-light ml-4 mb-1 p-0">
            Your Cards
          </h5>

          <div className="cardslides col-lg-12">
            {cardStore.cards.length ? (
              <Slider {...settings}>
                {cardStore.cards.map((card, i) => (
                  <div key={i} style={{ display: "block" }}>
                    <img alt="" src="/assets/images/cardbg.png" />
                    <div className="row masked-cardbtm">
                      {card.blockStatus === "BLOCKED" ? (
                        <Button
                          onClick={() => {
                            setSelectedCard(card);
                            setShowUnblockCard(true);
                          }}
                          className="btn btn-sm btn-light mr-2 bd-rad-5"
                        >
                          <i>
                            <img
                              className="w-16 float-left mr-2 mt-1"
                              alt="showimg"
                              src="/assets/images/ic-block-card.svg"
                            />
                          </i>
                          <span className="text-smaller">Unblock Card</span>
                        </Button>
                      ) : (
                        <>
                          <Button
                            onClick={() => {
                              setSelectedCard(card);
                              setShowBlockCard(true);
                            }}
                            className="btn btn-sm btn-light mr-2 bd-rad-5"
                          >
                            <i>
                              <img
                                className="w-16 float-left mr-2 mt-1"
                                alt="showimg"
                                src="/assets/images/ic-block-card.svg"
                              />
                            </i>
                            <span className="text-smaller">Block Card</span>
                          </Button>

                          <Button
                            onClick={() => setShowTrackCard(true)}
                            className="btn btn-sm btn-light"
                          >
                            <i>
                              <img
                                className="w-16 float-left mr-2 mt-1"
                                alt="showimg"
                                src="/assets/images/ic-track-card.svg"
                              />
                            </i>
                            <span className="text-smaller">Track Card</span>
                          </Button>
                        </>
                      )}
                    </div>
                    <div className="masked-span">
                      {maskedPan(card.pan)}
                      {card.blockStatus === "BLOCKED" ? (
                        <b style={{ color: "red" }}> BLOCKED</b>
                      ) : null}
                    </div>
                  </div>
                ))}
                <div style={{ display: "block" }}>
                  <div className="no-bg bd-0">
                    <img
                      className="m-auto hoverable"
                      alt=""
                      onClick={() => {
                        setShowRequestCard(true);
                      }}
                      src="/assets/images/ic-card-request.svg"
                    />
                  </div>
                </div>
              </Slider>
            ) : (
              <div className="mt-4 row">
                <h5 className="mdc-top-app-bar__title font-weight-light ml-4 mb-1 p-0">
                  Request for Card
                </h5>
                <div className="col-lg-12 text-center mt-4">
                  <div className="no-bg bd-0">
                    <img
                      className="m-auto hoverable"
                      alt=""
                      onClick={() => setShowRequestCard(true)}
                      src="/assets/images/ic-card-request.svg"
                    />
                  </div>
                </div>
              </div>
            )}
            <Formik
              initialValues={initialReqCardValues}
              validationSchema={reqCardValidationSchema}
              onSubmit={handleReqCardSubmit}
            >
              {({ isSubmitting, submitForm }) => (
                <Form>
                  <div>
                    <Modal
                      size="lg"
                      show={showRequestCard}
                      aria-labelledby="contained-modal-title-vcenter"
                      onHide={() => setShowRequestCard(false)}
                      centered
                      backdrop={isSubmitting ? "static" : true}
                      keyboard={isSubmitting}
                    >
                      <Modal.Header
                        className="bd-0"
                        closeButton={!isSubmitting}
                      ></Modal.Header>
                      <Modal.Body className="py-1 px-5">
                        <h4 className="mb-4">Request for Cards</h4>

                        <div className="form-group mb-0">
                          <div className="input-group">
                            <Field
                              placeholder="Name on Card"
                              name="name"
                              className="form-control d-block w-100 bdbtm-0 bd-radius-0"
                            />
                            <label htmlFor="name">Name on Card</label>
                            <ErrorMsg inputName="name" />
                          </div>
                        </div>

                        <div className="form-group mb-0">
                          <div className="input-group">
                            <Field
                              placeholder="State"
                              name="state"
                              className="form-control d-block w-100 bdbtm-0 bd-radius-0"
                            />
                            <label htmlFor="state">State</label>
                            <ErrorMsg inputName="state" />
                          </div>
                        </div>
                        <div className="form-group mb-0">
                          <div className="input-group">
                            <Field
                              placeholder="City"
                              name="city"
                              className="form-control d-block w-100 bdbtm-0 bd-radius-0"
                            />
                            <label htmlFor="city">City</label>
                            <ErrorMsg inputName="city" />
                          </div>
                        </div>

                        <div className="form-group mb-0">
                          <div className="input-group">
                            <Field
                              as="textarea"
                              rows={3}
                              placeholder="Address"
                              name="address"
                              className="form-control d-block w-100 bd-radius-0"
                            />
                            <label htmlFor="address">Address</label>
                            <ErrorMsg inputName="address" />
                          </div>
                        </div>
                        <div className="row justify-content-end mt-5 mb-5">
                          <div className="col-lg-5">
                            <Button
                              className="px-4 btn-lg btn-block"
                              variant="primary"
                              onClick={submitForm}
                              disabled={isSubmitting}
                            >
                              Submit
                            </Button>
                          </div>
                        </div>
                      </Modal.Body>
                    </Modal>
                  </div>
                </Form>
              )}
            </Formik>

            <Modal
              centered
              size="lg"
              show={showUnblockCard}
              aria-labelledby="contained-modal-title-vcenter"
              backdrop="static"
              keyboard={false}
              onHide={() => setShowUnblockCard(false)}
            >
              <Modal.Header className="bd-0"></Modal.Header>
              <Modal.Body className="py-1 px-5 text-center">
                <h4 className="mb-4">
                  Are you sure you want to unblock this card
                </h4>

                <div className="row justify-content-center mt-5 mb-5">
                  <Button
                    className="px-4 btn-lg mr-4"
                    onClick={handleCardUnblock}
                    disabled={unblockLoading}
                  >
                    {unblockLoading ? "Loading..." : "Yes"}
                  </Button>
                  <Button
                    className="px-4 btn-lg"
                    variant="secondary"
                    onClick={() => setShowUnblockCard(false)}
                  >
                    Cancel
                  </Button>
                </div>
              </Modal.Body>
            </Modal>
            <div>
              <Modal
                centered
                size="lg"
                show={showBlockCard}
                aria-labelledby="contained-modal-title-vcenter"
                backdrop="static"
                keyboard={false}
                onHide={() => setShowBlockCard(false)}
              >
                <Modal.Header className="bd-0" ></Modal.Header>
                <Modal.Body className="py-1 px-5 text-center">
                  <h4 className="mb-4">
                    Are you sure you want to block this card
                  </h4>
                  <div className="row justify-content-center mt-5 mb-5 flex-column">
                    <img alt="showimg" src="/assets/images/ic-successful.svg" />
                    <p className="mt-3">Card blocked successfully</p>
                  </div>

                  <div className="row justify-content-center mt-5 mb-5">
                    <Button
                      className="px-4 btn-lg mr-4"
                      onClick={handleCardBlock}
                      disabled={blockLoading}
                    >
                      {blockLoading ? "Loading..." : "Yes"}
                    </Button>
                    <Button
                      className="px-4 btn-lg"
                      variant="secondary"
                      onClick={() => setShowBlockCard(false)}
                    >
                      Cancel
                    </Button>
                  </div>
                </Modal.Body>
              </Modal>
            </div>

            <div>
              <Modal
                centered
                size="lg"
                show={showTrackCard}
                aria-labelledby="contained-modal-title-vcenter"
                onHide={() => setShowTrackCard(false)}
              >
                <Modal.Header
                  className="bd-0 bg-primary text-white text-title text-bold lead"
                  closeButton
                >
                  Card Tracking
                </Modal.Header>
                <Modal.Body className="py-0">
                  <div className="row bg-danger-alt py-2 px-5">
                    <div className="col-lg-4">
                      <p className="mb-1 small">SHIPPED VIA</p>
                      <p className="mb-0 small text-bold">DHL</p>
                    </div>
                    <div className="col-lg-4">
                      <p className="mb-1 small">STATUS</p>
                      <p className="mb-0 small text-bold">In Transit</p>
                    </div>
                    <div className="col-lg-4">
                      <p className="mb-1 small">EXPECTED DELIVERY DATE</p>
                      <p className="mb-0 text-bold small">Monday, June 14</p>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-lg-12">
                      <ul className="pt-5 mt-3" id="trackingbar">
                        <li className="active text-center">
                          <span className="d-block lead mt-3">
                            Card Order Placed
                          </span>
                          <span className="lead-info">
                            Card is currently at Ikeja Terminal
                          </span>
                        </li>
                        <li className="active text-center">
                          <span className="d-block lead mt-3">Enroute</span>
                          <span className="lead-info">
                            Card has been delivered to No 14 timoty street lekki
                          </span>
                        </li>
                        <li className="text-center">
                          <span className="d-block lead mt-3">Completed</span>
                        </li>
                      </ul>
                    </div>
                  </div>

                  <Formik
                    initialValues={{ billers: "electricity" }}
                    onSubmit={(values, actions) => {
                      setTimeout(() => {
                        alert(JSON.stringify(values, null, 2));
                        actions.setSubmitting(false);
                      }, 1000);
                    }}
                  >
                    <Form>
                      <div className="row justify-content-end mt-5 mb-3 px-5">
                        <div className="col-lg-4">
                          <Button
                            className="px-4 btn-lg btn-block"
                            variant="primary"
                          >
                            Close
                          </Button>
                        </div>
                      </div>
                    </Form>
                  </Formik>
                </Modal.Body>
              </Modal>
            </div>
          </div>
        </div>
      )}
    </>
  );
});

export default CardsView;
