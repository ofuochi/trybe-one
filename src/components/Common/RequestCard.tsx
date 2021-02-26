import { Field, Form, Formik } from "formik";
import React from "react";
import { Button } from "react-bootstrap";
import { useHistory } from "react-router-dom";
import * as Yup from "yup";

import { useStore } from "../../hooks/use-store.hooks";
import { localStoreService } from "../../services";
import { ErrorMsg } from "./ErrorMsg";
import { Title } from "./Title";

const validationSchema = Yup.object().shape({
  city: Yup.string().required("required"),
  name: Yup.string().required("required"),
  state: Yup.string().required("required"),
  address: Yup.string().required("required"),
});

const RequestCard = () => {
  const currentUser = localStoreService.getCurrentUser();
  const { cardStore } = useStore();
  const history = useHistory();
  const gender = currentUser?.title === "Mr" ? "M" : "F";
  const initialValues: API.VirtualCardRequestDto = {
    productID: 10142,
    email: currentUser?.email,
    customerUniqueIdentifier: currentUser?.phoneNumber,
    city: "",
    state: "",
    address: currentUser?.address,
    cardType: "main",
    phoneNumber: currentUser?.phoneNumber,
    name: `${currentUser?.name} ${currentUser?.lastName}`,
    gender,
    title: currentUser?.title,
    wallet_ShortCode: "ONB",
  };
  const handleSubmit = (
    values: API.ChargeCustomerRequestDto,
    { setSubmitting }: any
  ) => {
    cardStore
      .requestCard(values)
      .then((isSuccess) => {
        setSubmitting(false);
        if (isSuccess) history.goBack();
      })
      .catch(() => setSubmitting(false));
  };
  return (
    <div className="page-content">
      <Title title="Request Card" />
      <div className="col-lg-12 mb-4">
        <h4>Request Card</h4>
      </div>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ isSubmitting }) => (
          <Form>
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
    </div>
  );
};

export default RequestCard;
