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

export const Electricity = () => {
  const [userDetails, setUserDetails] = useState<
    API.UserResponseModel | undefined
  >();
  const [billerCategories, setBillerCategories] = useState<API.MyArray[]>([]);

  useEffect(() => {
    const currentUser = localStoreService.getCurrentUser();
    api
      .get<API.UserResponseModel>(
        `/User/GetUserByEmail?email=${currentUser?.email}`,
        { cache: { clearOnStale: true } }
      )
      .then(({ data }) => setUserDetails(data));
    api
      .get<API.InterswitchGetBillerCategoryResponseDto>(
        "/User/GetBillerCategories",
        { cache: { clearOnStale: true } }
      )
      .then(({ data }) => setBillerCategories(data.responseArray || []));
    api.get<API.GetBillerByCategoryResponse>(
      `/User/GetBillerByCategory?categoryId=${1}`,
      { cache: { clearOnStale: true } }
    );
    api.get<API.GetPaymentItemResponseDto>(
      `/User/GetPaymentItem?billerId=${905}`,
      { cache: { clearOnStale: true } }
    );
  }, []);
  const sessionID = localStoreService.getAuthToken() || undefined;
  const initialValues: API.CreditSwitchVendAirtimeRequestDto = {
    sessionID,
    appId: 1,
    walletNumber: "",
    mobileNo: userDetails?.phoneNumber || "",
    airtimeAmount: "",
    pin: "",
    serviceId: "",
  };

  return (
    <div className="mt-3">
      <Formik
        validationSchema={validationSchema}
        enableReinitialize
        initialValues={initialValues}
        onSubmit={(values, { setSubmitting, resetForm }) => {
          api
            .post<API.CreditSwitchVendAirtimeResponseDto>(
              "/User/PayBiller",
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
            <ErrorMsg inputName="serviceId" />
            <div className="form-group mb-0">
              <div className="input-group">
                <Field
                  id="airtimeAmount"
                  type="number"
                  placeholder="Meter Number"
                  className="form-control d-block w-100 bdbtm-0 bd-radius-0"
                  name="airtimeAmount"
                />
                <label htmlFor="airtimeAmount">Meter Number</label>
                <ErrorMsg inputName="airtimeAmount" />
              </div>
            </div>
            <div className="form-group mb-0">
              <div className="input-group">
                <Field
                  as="select"
                  id="walletNumber"
                  className="form-control d-block w-100 bdbtm-0 bd-radius-0"
                  name="walletNumber"
                >
                  <option value="" disabled>
                    Select Disco
                  </option>
                  {userDetails?.accountDetails?.map((acct) => (
                    <option key={acct.accountNumber} value={acct.accountNumber}>
                      {acct.accountNumber}
                    </option>
                  ))}
                </Field>
                <label htmlFor="walletNumber">Select Disco</label>
                <ErrorMsg inputName="walletNumber" />
              </div>
            </div>

            <div className="form-group mb-0">
              <div className="input-group">
                <Field
                  id="mobileNo"
                  placeholder="Enter Amount"
                  className="form-control d-block w-100 bdbtm-0 bd-radius-0"
                  name="mobileNo"
                />
                <label htmlFor="mobileNo">Enter Amount</label>
                <ErrorMsg inputName="mobileNo" />
              </div>
            </div>

            <div className="form-group mb-0">
              <div className="input-group">
                <Field
                  as="select"
                  id="walletNumber"
                  className="form-control d-block w-100 bd-radius-0"
                  name="walletNumber"
                >
                  <option value="" disabled>
                    Select Account to be debited
                  </option>
                  {userDetails?.accountDetails?.map((acct) => (
                    <option key={acct.accountNumber} value={acct.accountNumber}>
                      {acct.accountNumber}
                    </option>
                  ))}
                </Field>
                <label htmlFor="walletNumber">
                  Select Account to be debited
                </label>
                <ErrorMsg inputName="walletNumber" />
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
