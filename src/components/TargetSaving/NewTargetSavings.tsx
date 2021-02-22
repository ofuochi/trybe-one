import { Field, Form, Formik } from "formik";
import React, { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import NumberFormat from "react-number-format";
import { Link, useHistory } from "react-router-dom";
import { toast } from "react-toastify";
import * as Yup from "yup";
import Reference from "yup/lib/Reference";

import api from "../../config/api.config";
import { Naira } from "../../constants/currencies";
import { routePath } from "../../constants/route-paths";
import { useStore } from "../../hooks/use-store.hooks";
import { localStoreService } from "../../services";
import { ErrorMsg } from "../Common/ErrorMsg";
import { Title } from "../Common/Title";

const validationSchema = Yup.object().shape({
  targetPeriod: Yup.number().min(1).required("required"),
  item: Yup.string().required("required"),
  tokenizedID: Yup.string().required("required"),
  targetAmountInView: Yup.number()
    .min(100, `Target amount must be at least ${Naira}100`)
    .required("required"),
  amt: Yup.number()
    .max(
      Yup.ref("targetAmountInView") as Reference<number>,
      "Amount must be at most equal to the target amount"
    )
    .moreThan(0)
    .required("required"),
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
  const { targetStore } = useStore();
  const [cards, setCards] = useState<API.CustomerChargeDetail[]>([]);
  const [selectedCard, setSelectedCard] = useState<API.CustomerChargeDetail>(
    {}
  );
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
    api
      .get<API.CustomerChargeDetailsDto>(
        `/User/GetCustomerChargeDetails?emailAddress=${currentUser?.email}`
      )
      .then(({ data }) => setCards(data.customerChargeDetails || []));
  }, [currentUser?.email]);

  const initialValues: API.AddTargetSavingsRequestDto = {
    profileID: currentUser?.userId,
    txndate: new Date().toISOString(),
    savingsFrequencyID: ("" as unknown) as number,
    prefTimeID: ("" as unknown) as number,
    item: "",
    targetPeriod: "",
    amt: ("" as unknown) as number,
    savingsTypeID: ("" as unknown) as number,
    targetAmountInView: ("" as unknown) as number,
    tokenizedID: "",
  };
  const handleSubmit = (
    values: API.AddTargetSavingsRequestDto,
    { setSubmitting, resetForm }: any
  ) => {
    values.paystackReference = selectedCard.paystackRefrerence;
    api
      .post<API.BaseResponse>("/User/SubmitTargetSavings", values)
      .then(({ data }) => {
        setSubmitting(false);
        if (data.responseCode === "00") {
          resetForm();
          toast.success(data.responseDescription, { position: "top-center" });
          targetStore.addTarget(values);
          history.replace(routePath.targetSavings.index);
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
        {({ isSubmitting, handleChange, setFieldValue }) => (
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
                <div className="row justify-content-between m-0">
                  <h5 className="mdc-top-app-bar__title mb-0 mb-4 p-0">
                    Target box savings
                  </h5>
                  <Link to={routePath.targetSavings.tokenizeCard}>
                    Add Card To Debit
                  </Link>
                </div>
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
                      placeholder="Target amount"
                      className="form-control d-block w-100 bdbtm-0 bd-radius-0"
                      onValueChange={({ value }: any) =>
                        setFieldValue("targetAmountInView", value)
                      }
                      thousandSeparator={true}
                      prefix={"₦"}
                      component={NumberFormat}
                    />
                    <label htmlFor="targetAmountInView">
                      What is your total target amount?
                    </label>
                    <ErrorMsg inputName="targetAmountInView" />
                  </div>
                </div>
                <div className="form-group mb-0">
                  <div className="input-group">
                    <Field
                      name="amt"
                      placeholder="Amount"
                      className="form-control d-block w-100 bdbtm-0 bd-radius-0"
                      onValueChange={({ value }: any) =>
                        setFieldValue("amt", value)
                      }
                      thousandSeparator={true}
                      prefix={"₦"}
                      component={NumberFormat}
                    />
                    <label htmlFor="amt">
                      How much do you want to save frequently?
                    </label>
                    <ErrorMsg inputName="amt" />
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
                      className="form-control d-block w-100 bdbtm-0 bd-radius-0"
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
                      className="form-control d-block w-100 bdbtm-0 bd-radius-0"
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
                <div className="form-group mb-0">
                  <div className="input-group">
                    <Field
                      as="select"
                      name="tokenizedID"
                      className="form-control d-block w-100"
                      onChange={(e: React.ChangeEvent<any>) => {
                        handleChange(e);
                        const card = cards.filter(
                          (card) => card.authCode === e.target.value
                        )[0];
                        setSelectedCard(card);
                      }}
                    >
                      <option value="" disabled>
                        - Select Card -
                      </option>
                      {cards.map((card) => (
                        <option key={card.authCode} value={card.authCode}>
                          {`${card.last4} - ${card.cardType}`}
                        </option>
                      ))}
                    </Field>
                    <label htmlFor="tokenizedID">Card to debit</label>
                    <ErrorMsg inputName="tokenizedID" />
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
