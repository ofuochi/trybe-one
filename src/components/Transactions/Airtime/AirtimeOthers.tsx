import { Field, Form, Formik } from "formik";
import { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import { toast } from "react-toastify";
import * as Yup from "yup";

import api from "../../../config/api.config";
import { localStoreService } from "../../../services";
import { ErrorMsg } from "../../Common/ErrorMsg";

const validationSchema = Yup.object().shape({
  walletNumber: Yup.string().required("required"),
  mobileNo: Yup.string().required("required"),
  airtimeAmount: Yup.number().integer().min(1).required("required"),
  pin: Yup.string().required("required"),
  serviceId: Yup.string().required("required"),
  remarks: Yup.string().max(20),
});

export const AirtimeOthers = () => {
  const [userAccts, setUserAccts] = useState<API.UserNubanDto[] | undefined>();
  useEffect(() => {
    const currentUser = localStoreService.getCurrentUser();
    api
      .get<API.UserResponseModel>(
        `/User/GetUserByEmail?email=${currentUser?.email}`,
        { cache: { clearOnStale: true } }
      )
      .then(({ data }) => setUserAccts(data.accountDetails));
  }, []);
  const sessionID = localStoreService.getAuthToken() || undefined;
  const initialValues: API.CreditSwitchVendAirtimeRequestDto = {
    sessionID,
    appId: 1,
    walletNumber: "",
    mobileNo: "",
    airtimeAmount: "",
    pin: "",
    serviceId: "",
  };

  return (
    <div className="mt-3">
      <Formik
        validationSchema={validationSchema}
        initialValues={initialValues}
        onSubmit={(values, { setSubmitting, resetForm }) => {
          api
            .post<API.CreditSwitchVendAirtimeResponseDto>(
              "/User/CreditSwitchVendAirtime",
              values
            )
            .then(({ data }) => {
              setSubmitting(false);
              if (data.responseCode === "00") {
                resetForm();
                toast.success(data.responseDescription, {
                  position: "top-center",
                });
              } else
                toast.error(data.responseDescription, {
                  position: "top-center",
                });
            })
            .catch(() => {
              setSubmitting(false);
            });
        }}
      >
        {({ isSubmitting }) => (
          <Form>
            <p className="mt-5 lead mb-0 p-0">Select Network</p>
            <Field
              type="radio"
              id="airtel"
              className="input-hidden"
              name="serviceId"
              value="airtel"
            />
            <label htmlFor="airtel">
              <img src="/assets/images/ic-airtel.svg" alt="airtel" />
            </label>

            <Field
              type="radio"
              name="serviceId"
              id="mtn"
              className="input-hidden"
              value="mtn"
            />
            <label htmlFor="mtn">
              <img src="/assets/images/ic-mtn.svg" alt="mtn" />
            </label>
            <Field
              type="radio"
              name="serviceId"
              id="9mobile"
              className="input-hidden"
              value="9mobile"
            />
            <label htmlFor="9mobile">
              <img src="/assets/images/ic-9mobile.svg" alt="9mobile" />
            </label>
            <ErrorMsg inputName="serviceId" />
            <div className="form-group mb-0">
              <div className="input-group">
                <div className="input-group-prepend">
                  <span className="input-group-text no-bg bd-0">
                    <img alt="showimg" src="/assets/images/ic-amount.svg" />
                  </span>
                </div>

                <Field
                  id="airtimeAmount"
                  type="number"
                  placeholder="Amount"
                  className="form-control d-block w-100 pl-5 bdbtm-0"
                  name="airtimeAmount"
                />
                <label htmlFor="airtimeAmount">Amount</label>
                <ErrorMsg inputName="airtimeAmount" />
              </div>
            </div>

            <div className="form-group mb-0">
              <div className="input-group">
                <div className="input-group-prepend">
                  <span className="input-group-text no-bg bd-0">
                    <img
                      alt="showimg"
                      src="/assets/images/ic-account-dark.svg"
                    />
                  </span>
                </div>
                <Field
                  id="mobileNo"
                  placeholder="08075578874 Default Number"
                  className="form-control d-block w-100 pl-5 bdbtm-0"
                  name="mobileNo"
                />
                <label htmlFor="mobileNo">Enter Number</label>
                <ErrorMsg inputName="mobileNo" />
              </div>
            </div>

            <div className="form-group mb-0">
              <div className="input-group">
                <div className="input-group-prepend">
                  <span className="input-group-text no-bg bd-0">
                    <img alt="showimg" src="/assets/images/ic-bank.svg" />
                  </span>
                </div>
                <Field
                  as="select"
                  id="walletNumber"
                  className="form-control d-block w-100 pl-5"
                  name="walletNumber"
                >
                  <option value="" disabled>
                    Source Account
                  </option>
                  {userAccts?.map((acct) => (
                    <option key={acct.accountNumber} value={acct.accountNumber}>
                      {acct.accountNumber}
                    </option>
                  ))}
                </Field>
                <label htmlFor="walletNumber">Source Account</label>
                <ErrorMsg inputName="walletNumber" />
              </div>
            </div>
            <div className="form-group mb-0">
              <div className="input-group">
                <div className="input-group-prepend">
                  <span className="input-group-text no-bg bd-0">
                    <img alt="showimg" src="/assets/images/ic-bank.svg" />
                  </span>
                </div>
                <Field
                  name="pin"
                  id="pin"
                  placeholder="PIN"
                  type="password"
                  className="form-control d-block w-100 pl-5 bdbtm-0"
                />
                <ErrorMsg inputName="pin" />
                <label htmlFor="pin">PIN</label>
              </div>
            </div>
            <div className="form-group mb-0">
              <div className="input-group">
                <div className="input-group-prepend"></div>
                <Field
                  as="textarea"
                  id="remarks"
                  name="remarks"
                  rows={3}
                  className="form-control d-block w-100 pl-5"
                  placeholder="Remarks"
                />
                <label htmlFor="remarks">Remarks</label>
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
                  alt="showimg"
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
