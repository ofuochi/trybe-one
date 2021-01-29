import { Field, Form, Formik } from "formik";
import { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import { toast } from "react-toastify";
import * as Yup from "yup";
import api from "../../../config/api.config";
import { localStoreService } from "../../../services";

import { ErrorMsg } from "../../Common/ErrorMsg";

const Schema = Yup.object().shape({
  frmacct: Yup.string().required("required"),
  toacct: Yup.string()
    .required("required")
    .notOneOf([Yup.ref("frmacct")], "'from' and 'to' acct cannot be the same"),
  amt: Yup.number().min(1).required("required"),
  remarks: Yup.string().required("required"),
  pin: Yup.string().required("required"),
});

const initialValues: API.WalletToWalletFTReq = {
  amt: "",
  remarks: "",
  frmacct: "",
  toacct: "",
  channelID: 1,
  currencycode: "NGN",
  transferType: 0,
  pin: "",
};
export const TransferSelf = () => {
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

  const handleSubmit = (
    values: API.WalletToWalletFTReq,
    { setSubmitting, resetForm }: any
  ) => {
    values.paymentRef = Date.now().toString();
    api
      .post<API.WalletToWalletFTRes>("/User/WalletToWalletFT", values)
      .then(({ data }) => {
        setSubmitting(false);

        if (data.responseCode === "00") {
          resetForm();
          toast.success(data.responseDescription, { position: "top-center" });
        } else toast.error(data.responseDescription);
      })
      .catch(() => {
        setSubmitting(false);
      });
  };

  return (
    <div className="mt-3">
      <Formik
        validationSchema={Schema}
        initialValues={initialValues}
        onSubmit={handleSubmit}
      >
        {({ isSubmitting }) => (
          <Form>
            <div className="form-group mb-0">
              <div className="input-group">
                <div className="input-group-prepend">
                  <span className="input-group-text no-bg bd-0">
                    <img alt="showimg" src="/assets/images/ic-amount.svg" />
                  </span>
                </div>
                <Field
                  name="amt"
                  type="number"
                  placeholder="Amount"
                  className="form-control d-block w-100 pl-5 bdbtm-0"
                />
                <ErrorMsg inputName="amt" />
                <label>Amount</label>
              </div>
            </div>
            <div className="form-group mb-0">
              <div className="input-group">
                <div className="input-group-prepend">
                  <span className="input-group-text no-bg bd-0">
                    <img alt="" src="/assets/images/ic-account-dark.svg" />
                  </span>
                </div>

                <Field
                  as="select"
                  name="frmacct"
                  placeholder="From Account"
                  className="form-control d-block w-100 pl-5 bdbtm-0"
                >
                  <option value="" disabled>
                    -From Acct-
                  </option>
                  {userAccts?.map((acct) => (
                    <option key={acct.accountNumber} value={acct.accountNumber}>
                      {acct.accountNumber}
                    </option>
                  ))}
                </Field>
                <label>From Account</label>
                <ErrorMsg inputName="frmacct" />
              </div>
            </div>
            <div className="form-group mb-0">
              <div className="input-group">
                <div className="input-group-prepend">
                  <span className="input-group-text no-bg bd-0">
                    <img alt="" src="/assets/images/ic-account-dark.svg" />
                  </span>
                </div>

                <Field
                  as="select"
                  name="toacct"
                  placeholder="To Account"
                  className="form-control d-block w-100 pl-5 bdbtm-0"
                >
                  <option value="" disabled>
                    -To Acct-
                  </option>
                  {userAccts?.map((acct) => (
                    <option key={acct.accountNumber} value={acct.accountNumber}>
                      {acct.accountNumber}
                    </option>
                  ))}
                </Field>
                <label>To Account</label>
                <ErrorMsg inputName="toacct" />
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
                  placeholder="PIN"
                  type="password"
                  className="form-control d-block w-100 pl-5 bdbtm-0"
                />
                <ErrorMsg inputName="pin" />
                <label>PIN</label>
              </div>
            </div>
            <div className="form-group mb-0">
              <div className="input-group">
                <div className="input-group-prepend"></div>

                <Field
                  as="textarea"
                  name="remarks"
                  rows={3}
                  className="form-control d-block w-100 pl-5"
                  placeholder="Reason or comment for transfer (optional)"
                />
                <label>Home address</label>
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
