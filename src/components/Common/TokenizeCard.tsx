import { Field, Form, Formik } from "formik";
import React, { useState } from "react";
import { Button } from "react-bootstrap";
import { useHistory } from "react-router-dom";
import { toast } from "react-toastify";
import * as Yup from "yup";

import api from "../../config/api.config";
import { routePath } from "../../constants/route-paths";
import { localStoreService } from "../../services";
import { ErrorMsg } from "./ErrorMsg";
import { Title } from "./Title";

const validationSchema = Yup.object().shape({
  card: Yup.object({
    cvv: Yup.string()
      .matches(/^\d{3}$/, "CVV must be 3 digits")
      .required("required"),
    expiry_month: Yup.number()
      .min(1, "Expiry month must be between 1 and 12")
      .max(12, "Expiry month must be between 1 and 12")
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

const TokenizeCard = () => {
  const history = useHistory();
  const [isSuccess, setIsSuccess] = useState(false);
  const [paystackResp, setPaystackResp] = useState<API.PaystackResponseData>();
  const currentUser = localStoreService.getCurrentUser();

  const initialValues: API.ChargeCustomerRequestDto = {
    amount: "10",
    email: currentUser?.email,
    profileId: currentUser?.userId,
    pin: "",
    card: {
      cvv: "",
      expiry_month: ("" as unknown) as number,
      expiry_year: ("" as unknown) as number,
      number: "",
    },
  };
  const handleSubmit = async (
    values: API.ChargeCustomerRequestDto,
    { setSubmitting }: any
  ) => {
    try {
      const { data } = await api.post<API.ChargeCustomerResponseDTO>(
        "/User/ChargeCustomerCard",
        values
      );

      if (data.responseCode === "00") {
        if (data.data?.status === "open_url") {
          const win = window.open(data.data.url, "_blank");
          win?.focus();
          setPaystackResp(data.data);
          setIsSuccess(true);
        }
      } else toast.error(data.responseDescription);
    } catch (e) {}
    setSubmitting(false);
  };
  return (
    <div className="page-content">
      <Title title="Tokenize Card" />
      <div className="col-lg-12 mb-4">
        <h4>Tokenize Card</h4>
      </div>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ isSubmitting }) => (
          <Form>
            {isSuccess ? (
              <div className="form-group row m-0 justify-content-center mt-4">
                <Button
                  size="lg"
                  variant="danger"
                  className="px-5"
                  onClick={() => {
                    initialValues.reference = paystackResp?.reference;
                    api
                      .post<API.ChargeCustomerResponseDTO>(
                        "/User/ValidateCharge",
                        initialValues
                      )
                      .then(({ data }) => {
                        if (data.responseCode === "00") {
                          toast.success(data.responseDescription, {
                            position: "top-center",
                          });
                          setIsSuccess(false);
                          history.replace(
                            routePath.targetSavings.createTargetSaving
                          );
                        } else toast.error(data.responseDescription);
                      })
                      .catch(() => {
                        setIsSuccess(false);
                        history.push(routePath.cardRequest.new);
                      });
                  }}
                >
                  Validate Payment
                </Button>
              </div>
            ) : (
              <>
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
                      type="password"
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
              </>
            )}
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default TokenizeCard;
