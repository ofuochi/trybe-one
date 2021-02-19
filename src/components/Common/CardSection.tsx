/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Slider from "react-slick";

import api from "../../config/api.config";
import { localStoreService } from "../../services";
import { Field, Formik } from "formik";
import { Form } from "react-bootstrap";
import { ErrorMsg } from "./ErrorMsg";
import * as Yup from "yup";
import { Link } from "react-router-dom";
import { routePath } from "../../constants/route-paths";

const validationSchema = Yup.object().shape({
  pin: Yup.string().required("required"),
  card: Yup.object({
    cvv: Yup.string().required("required"),
    expiry_month: Yup.number()
      .min(1, "Expiry month must be greater than 0")
      .required("required"),
    expiry_year: Yup.number()
      .min(
        new Date().getFullYear(),
        `Expiry year must be at least ${new Date().getFullYear()}`
      )
      .required("required"),
    number: Yup.number().positive("PAN must be positive").required("required"),
  }),
});

const CardSection = () => {
  const [cards, setCards] = useState<API.GetCardResponseDto>({});
  // const [show, setShow] = useState(false);
  // const handleClose = () => setShow(false);
  // const handleShow = () => setShow(true);
  const currentUser = localStoreService.getCurrentUser();
  useEffect(() => {
    const getCardInput: API.GetCardRequestDto = {
      accountId: currentUser?.nuban,
    };
    api
      .post<API.GetCardResponseDto>("/User/GetActiveCard", getCardInput)
      .then(({ data }) => setCards(data));
  }, []);

  const initialValues: API.ChargeCustomerRequestDto = {
    amount: "1",
    email: currentUser?.email,
    profileId: currentUser?.userId,
    pin: "",
    card: {
      cvv: "",
      expiry_month: 0,
      expiry_year: 0,
      number: "",
    },
  };
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    className: "center",
    centerMode: true,
    centerPadding: "10px",
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

      {cards.data && cards.data.length > 0 && (
        <div className="mt-3 row">
          <h5 className="mdc-top-app-bar__title font-weight-light ml-4 mb-1 p-0">
            Your Cards
          </h5>

          <div className="cardslides col-lg-12">
          <Slider {...settings}>
            {cards.data?.map((card, i) => (
              <div key={i} style={{ display: "block" }}>
                
                <img alt="" src="/assets/images/cardbg.png" />
               
              </div>
            ))}
            </Slider>
          </div>
        </div>
      )}

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

      <div className="mt-4 row">
        <h5 className="mdc-top-app-bar__title font-weight-light ml-4 mb-1 p-0">
          Target Saving
        </h5>

        <ul className="collection bd-0  m-0 pl-3">
          <li className="d-flex row m-0 mb-4 justify-content-between">
            <canvas
              style={{ width: "20px", height: "20px" }}
              id="doughnutChart"
            ></canvas>
            <span
              style={{ width: "10px", height: "10px" }}
              className="bg-doughnut1 rounded-20 m-3 mt-4 d-block"
            ></span>
            <span className="p-title mt-3 d-block">New Phone</span>
            <span className="p-title mt-3 d-block text-right">N 952.87</span>
          </li>
          <li className="d-flex row m-0 mb-4 justify-content-between">
            <canvas
              style={{ width: "20px", height: "20px" }}
              id="doughnutChart2"
            ></canvas>
            <span
              style={{ width: "10px", height: "10px" }}
              className="bg-doughnut2 rounded-20 m-3 mt-4 d-block"
            ></span>
            <span className="title mt-3 d-block">New Phone</span>
            <span className="title mt-3 d-block text-right">N 952.87</span>
          </li>
          <li className="d-flex row m-0 mb-4 justify-content-between">
            <canvas
              style={{ width: "20px", height: "20px" }}
              id="doughnutChart3"
            ></canvas>
            <span
              style={{ width: "10px", height: "10px" }}
              className="bg-doughnut3 rounded-20 m-3 mt-4 d-block"
            ></span>
            <span className="title mt-3 d-block">New Phone</span>
            <span className="title mt-3 d-block text-right">N 952.87</span>
          </li>
        </ul>
      </div>

      <Modal
        // show={show}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
        // onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header className="bd-0" closeButton>
          Request for card
        </Modal.Header>
        <Modal.Body className="p-4">
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={(values, { setSubmitting }) => {
              console.log(values);
            }}
          >
            {({ isSubmitting }) => (
              <Form>
                <div className="form-group mb-0">
                  <div className="input-group">
                    <Field
                      placeholder="Pan"
                      type="number"
                      name="card.number"
                      className="form-control d-block w-100 bdbtm-0 bd-radius-0"
                    />
                    <label htmlFor="card.number">Pan</label>
                    <ErrorMsg inputName="card.number" />
                  </div>
                </div>
                <div className="form-group mb-0">
                  <div className="input-group">
                    <Field
                      placeholder="Expiry Month"
                      type="number"
                      name="card.expiry_month"
                      className="form-control d-block w-100 bdbtm-0 bd-radius-0"
                    />
                    <label htmlFor="card.expiry_month">Expiry Month</label>
                    <ErrorMsg inputName="card.expiry_month" />
                  </div>
                </div>

                <div className="form-group mb-0">
                  <div className="input-group">
                    <Field
                      placeholder="Expiry Year"
                      type="number"
                      name="card.expiry_year"
                      className="form-control d-block w-100 bdbtm-0 bd-radius-0"
                    />
                    <label htmlFor="card.expiry_year">Expiry Year</label>
                    <ErrorMsg inputName="card.expiry_year" />
                  </div>
                </div>

                <div className="form-group mb-0">
                  <div className="input-group">
                    <Field
                      placeholder="CVV"
                      type="number"
                      name="card.cvv"
                      className="form-control d-block w-100 bdbtm-0 bd-radius-0"
                    />
                    <label htmlFor="card.cvv">CVV</label>
                    <ErrorMsg inputName="card.cvv" />
                  </div>
                </div>

                <div className="form-group mb-0">
                  <div className="input-group">
                    <Field
                      placeholder="PIN"
                      name="pin"
                      type="number"
                      className="form-control d-block w-100 bdbtm-0 bd-radius-0"
                    />
                    <label htmlFor="pin">PIN</label>
                    <ErrorMsg inputName="pin" />
                  </div>
                </div>
                <div className="form-group row m-0 justify-content-end mt-4">
                  <Button
                    size="lg"
                    variant="danger"
                    className="px-5"
                    type="submit"
                    disabled={isSubmitting}
                  >
                    <img
                      alt="button"
                      className="mr-3"
                      src="/assets/images/ic-send.svg"
                    />
                    Send
                  </Button>
                </div>
              </Form>
            )}
          </Formik>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default CardSection;
