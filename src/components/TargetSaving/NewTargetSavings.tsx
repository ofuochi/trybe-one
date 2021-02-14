import { Field, Form, Formik } from "formik";
import { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import { Redirect, useHistory } from "react-router-dom";
import { toast } from "react-toastify";
import * as Yup from "yup";

import api from "../../config/api.config";
import { routePath } from "../../constants/route-paths";
import { localStoreService } from "../../services";
import { ErrorMsg } from "../Common/ErrorMsg";
import { Title } from "../Common/Title";

const validationSchema = Yup.object().shape({
  targetPeriod: Yup.number().min(1).required("required"),
  item: Yup.string().required("required"),
  targetAmountInView: Yup.number().min(1).required("required"),
  savingsFrequencyID: Yup.number().min(1).required("required"),
  prefTimeID: Yup.number().min(1).required("required"),
  savingsTypeID: Yup.number().required("required"),
});

export const NewTargetSavings = () => {
  const currentUser = localStoreService.getCurrentUser();
  const [savingsFrequencyList, setSavingsFrequencyList] = useState<
    API.SavingsFrequencyDTO[]
  >();
  const [timeList, setTimeList] = useState<API.PreferredTimeDTO[]>();
  const history = useHistory();

  useEffect(() => {
    api
      .get<API.GetSavingsFrequencyResponseDTO>(
        "/User/GetAllActiveSavingsFrequency"
      )
      .then(({ data }) => setSavingsFrequencyList(data.savingsFrequencyList));
    api
      .get<API.GetPreferredTimeResponseDTO>("/User/GetAllActivePreferredTimes")
      .then(({ data }) => setTimeList(data.preferredTimes));
  }, []);
  const {
    cardToken,
    cardTokenizedAmount,
    cardReference,
  } = localStoreService.getCardToken();

  if (!cardToken) return <Redirect to={routePath.targetSavings.tokenizeCard} />;
  const initialValues: API.AddTargetSavingsRequestDto = {
    profileID: currentUser?.userId,
    txndate: new Date().toISOString(),
    savingsFrequencyID: ("" as unknown) as number,
    prefTimeID: ("" as unknown) as number,
    item: "",
    targetPeriod: "",
    amt: (cardTokenizedAmount as unknown) as number,
    savingsTypeID: ("" as unknown) as number,
    targetAmountInView: ("" as unknown) as number,
    paystackReference: cardReference || "",
    tokenizedID: cardToken,
  };
  const handleSubmit = (
    values: API.AddTargetSavingsRequestDto,
    { setSubmitting, resetForm }: any
  ) => {
    api
      .post<API.BaseResponse>("/User/SubmitTargetSavings", values)
      .then(({ data }) => {
        setSubmitting(false);
        if (data.responseCode === "00") {
          resetForm();
          toast.success(data.responseDescription, { position: "top-center" });
          history.push(routePath.targetSavings.index);
          // window.location.href = routePath.targetSavings.index;
        } else
          toast.error(data.responseDescription, { position: "top-center" });
      })
      .catch(() => {
        setSubmitting(false);
      });
  };
  return (
    <div className="page-content">
      <Title title="New Target Savings" />
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ isSubmitting }) => (
          <Form>
            <div className="row">
              <div className="col-lg-12 mb-4">
                <h4>New Target Savings </h4>
              </div>
              <div className="col-lg-12">
                <div className="custom-radio row justify-content-between m-0">
                  <Field
                    type="radio"
                    id="savingsTypeID1"
                    name="savingsTypeID"
                    value="1"
                  />
                  <label
                    className="px-3 py-3 btn btn-light shadow-sm col-lg-5"
                    htmlFor="savingsTypeID1"
                  >
                    <i className="i-ic">
                      <img
                        className="ml-2 w-30 mr-3"
                        alt=""
                        src="/assets/images/ic-target.svg"
                      />
                    </i>
                    Target Box
                  </label>
                  <Field
                    type="radio"
                    name="savingsTypeID"
                    value="2"
                    id="savingsTypeID2"
                  />
                  <label
                    className="px-3 py-3 btn btn-light shadow-sm col-lg-5"
                    htmlFor="savingsTypeID2"
                  >
                    <i className="i-ic">
                      <img
                        className="ml-2 w-30 mr-3"
                        alt=""
                        src="/assets/images/ic-targetb.svg"
                      />
                    </i>
                    Eye on the Goal
                  </label>
                  <ErrorMsg inputName="savingsTypeID" />
                </div>
              </div>
            </div>
            <div className="row">
              <div className="mt-4 col-lg-12">
                <h5 className="mdc-top-app-bar__title mb-0 mb-4 p-0">
                  Target box savings
                </h5>
              </div>

              <div className="col-lg-12">
                <div className="form-group mb-0">
                  <div className="input-group">
                    <Field
                      name="item"
                      placeholder="What are you saving for?"
                      className="form-control d-block w-100 bdbtm-0 bd-radius-0"
                    />
                    <label htmlFor="item">What are you saving for?</label>
                    <ErrorMsg inputName="item" />
                  </div>
                </div>
                <div className="form-group mb-0">
                  <div className="input-group">
                    <Field
                      name="targetAmountInView"
                      type="number"
                      placeholder="How much do you want to save"
                      className="form-control d-block w-100 bdbtm-0 bd-radius-0"
                    />
                    <label htmlFor="targetAmountInView">
                      How much do you want to save in total?
                    </label>
                    <ErrorMsg inputName="targetAmountInView" />
                  </div>
                </div>
                <div className="form-group mb-0">
                  <div className="input-group">
                    <Field
                      type="number"
                      name="targetPeriod"
                      placeholder="Period"
                      className="form-control d-block w-100 bdbtm-0 bd-radius-0"
                    />
                    <label htmlFor="targetPeriod">
                      How long do you want to save for? (in days)
                    </label>
                    <ErrorMsg inputName="targetPeriod" />
                  </div>
                </div>
                <div className="form-group mb-0">
                  <div className="input-group">
                    <Field
                      as="select"
                      name="savingsFrequencyID"
                      className="form-control d-block w-100"
                    >
                      <option value="" disabled>
                        - Select Frequency -
                      </option>
                      {savingsFrequencyList?.map((freq) =>
                        freq.isActive ? (
                          <option key={freq.id} value={freq.id}>
                            {freq.frequencyDescription}
                          </option>
                        ) : null
                      )}
                    </Field>
                    <label htmlFor="savingsFrequencyID">
                      How often should you be debited
                    </label>
                    <ErrorMsg inputName="savingsFrequencyID" />
                  </div>
                </div>
                <div className="form-group mb-0">
                  <div className="input-group">
                    <Field
                      as="select"
                      name="prefTimeID"
                      className="form-control d-block w-100"
                    >
                      <option value="" disabled>
                        - Select Time -
                      </option>
                      {timeList?.map((time) =>
                        time.isActive ? (
                          <option key={time.prefTimeId} value={time.prefTimeId}>
                            {time.time}
                          </option>
                        ) : null
                      )}
                    </Field>
                    <label htmlFor="prefTimeID">At what time of the day?</label>
                    <ErrorMsg inputName="prefTimeID" />
                  </div>
                </div>
                <div className="mt-4 row">
                  <div className="col-lg-7"></div>
                  <div className="col-lg-5 text-right">
                    <Button
                      variant="danger"
                      className="px-4"
                      type="submit"
                      disabled={isSubmitting}
                    >
                      <img
                        alt="showing"
                        className="mr-3"
                        src="/assets/images/ic-send.svg"
                      />
                      Create Target
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};
