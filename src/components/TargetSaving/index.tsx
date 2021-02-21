import { Pie, Progress } from "@ant-design/charts";
import { Field, Form, Formik } from "formik";
import { observer } from "mobx-react-lite";
import numeral from "numeral";
import React, { useState } from "react";
import { Button } from "react-bootstrap";
import Modal from "react-bootstrap/Modal";
import { Link, Route, Switch, useHistory } from "react-router-dom";
import * as Yup from "yup";

import { routePath } from "../../constants/route-paths";
import { useStore } from "../../hooks/use-store.hooks";
import { localStoreService } from "../../services";
import { ErrorMsg } from "../Common/ErrorMsg";
import { Title } from "../Common/Title";
import TokenizeCard from "../Common/TokenizeCard";
import { NewTargetSavings } from "./NewTargetSavings";

export const TargetSavings = observer(() => {
  const [showTargetDetails, setShowTargetDetails] = useState(false);
  const [showBreakTargetDetails, setShowBreakTargetDetails] = useState(false);
  const [showUpdateTargetDetails, setShowUpdateTargetDetails] = useState(false);
  const [isSubmittingBreaking, setIsSubmittingBreaking] = useState(false);
  const [showOpt, setShowOpt] = useState(false);
  const { targetStore } = useStore();
  const { location } = useHistory();
  const [
    targetSaving,
    setTargetSaving,
  ] = useState<API.GetTargetSavingsResponseDto>({});
  const [isSubmittingForm, setIsSubmittingForm] = useState(false);
  const currentUser = localStoreService.getCurrentUser();

  const pieConfig = {
    data: Array.from(targetStore.targets.values()).map((t) => ({
      targetAmountInView: t.targetAmountInView,
      item: t.item,
    })),
    innerRadius: 0.64,
    radius: 1,
    interactions: [{ type: "element-selected" }, { type: "element-active" }],
    appendPadding: 10,
    statistic: {
      content: {
        formatter: (_data1: any, data2: any) => {
          const d = data2.map(
            ({ targetAmountInView }: API.GetTargetSavingsResponseDto) =>
              targetAmountInView
          );
          const sum =
            d.length > 0
              ? d.reduce((prev: number, next: number) => prev + next)
              : 0;

          return `₦${numeral(sum).format("0,0")}`;
        },
      },
      title: {
        formatter: () => "Total",
      },
    },
    angleField: "targetAmountInView",
    colorField: "item",
    color: Array.from(targetStore.targets.values()).map(
      (target) => target.color
    ),
  };
  const handleSubmit = (
    values: API.UpdateTargetSavingsRequest,
    { setSubmitting, resetForm }: any
  ) => {
    setIsSubmittingForm(true);
    targetStore
      .updateTarget(values)
      .then(() => {
        setSubmitting(false);
        setIsSubmittingForm(false);
        setShowUpdateTargetDetails(false);

        resetForm();
      })
      .catch(() => {
        setSubmitting(false);
        setIsSubmittingForm(false);
        setShowUpdateTargetDetails(false);
      });
  };
  const initialValues: API.UpdateTargetSavingsRequest = {
    profileId: currentUser?.userId,
    newAmount: ("" as unknown) as number,
    targetId: targetSaving?.id,
  };
  return (
    <>
      <Title title="Target Savings" />
      {location.pathname === routePath.targetSavings.index ? (
        <div className="page-content">
          <div className="row">
            {targetStore.targets.size > 0 ? (
              <>
                <div className="col-lg-12">
                  <h4>Total Budget</h4>
                </div>
                <div className="col-lg-6">
                  <div className="d-flex row m-0 justify-content-between pie-size">
                    <Pie {...pieConfig} animation={false} />
                  </div>
                </div>
              </>
            ) : null}

            <div className="col-lg-6">
              <div className="alert alert-danger p-4">
                <h5>Target Savings</h5>
                <p className="small">
                  Target Savings helps you achieve your savings goals while you
                  sit back and relax
                </p>
              </div>
            </div>
          </div>

          {targetStore.targets.size > 0 ? (
            <>
              <div className="mt-4">
                <h5 className="mdc-top-app-bar__title mb-0 mb-4 p-0">
                  Target Savings
                </h5>
                {Array.from(targetStore.targets.values()).map((item) => (
                  <div className="col-lg-12 mb-4" key={item.id}>
                    <div className="form-group row justify-content-between m-0">
                      <div className="col-lg-2 text-left p-0">
                        <p className="mb-0">{item.item}</p>
                      </div>
                      <div className="col-lg-8 pl-0">
                        <span
                          style={{ cursor: "pointer" }}
                          onClick={() => {
                            setShowOpt(!showOpt);
                            setTargetSaving(item);
                          }}
                        >
                          <Progress
                            // height={15}
                            // autoFit={false}
                            percent={item.percentageCompletion}
                            progressStyle={{
                              cursor: "pointer",
                              fillOpacity: 0.7,
                              strokeOpacity: 0.7,
                            }}
                            animation={false}
                            color={item.color}
                          />
                        </span>
                      </div>
                      <div className="col-lg-2 p-0">
                        <p className="smaller mb-0 pt-1">
                          <b>{`₦${numeral(item.targetAmountInView).format(
                            "0,0"
                          )}`}</b>

                          <img
                            className="ml-2"
                            alt=""
                            src="/assets/images/ic-right-angle.svg"
                          />
                        </p>
                      </div>
                    </div>
                    {showOpt && targetSaving?.id === item.id ? (
                      <div>
                        <div className="row m-0 justify-content-between mt-2 mb-3 col-lg-10">
                          <Button
                            variant="light"
                            className="px-4 border"
                            onClick={() => setShowTargetDetails(true)}
                          >
                            See Details
                          </Button>

                          <Button
                            variant="danger"
                            className="px-4"
                            onClick={() => setShowUpdateTargetDetails(true)}
                          >
                            Update
                          </Button>

                          <Button
                            variant="light"
                            className="px-4 border-primary"
                            onClick={() => setShowBreakTargetDetails(true)}
                          >
                            Break Box
                          </Button>
                        </div>
                      </div>
                    ) : null}
                  </div>
                ))}
              </div>

              <div className="mt-5 row">
                <div className="col-lg-8"></div>
                <div className="col-lg-4 text-right">
                  <Link
                    className="px-4 btn btn-danger"
                    to={routePath.targetSavings.createTargetSaving}
                  >
                    New Target
                  </Link>
                </div>
              </div>
            </>
          ) : (
            <div className="mt-2 row">
              <div className="col-lg-8">
                <p>
                  You currently have no target Savings, click on new target to
                  create one
                </p>
              </div>
              <div className="col-lg-4 text-right">
                <Link
                  className="px-4 btn btn-danger"
                  to={routePath.targetSavings.tokenizeCard}
                >
                  New Target
                </Link>
              </div>
            </div>
          )}
        </div>
      ) : null}

      <Modal
        centered
        show={showTargetDetails}
        aria-labelledby="contained-modal-title-vcenter"
        onHide={() => setShowTargetDetails(false)}
      >
        <Modal.Header className="bd-0" closeButton></Modal.Header>
        <Modal.Body className="text-center">
          <h4 className="mb-3">{targetSaving?.item} Target Saving</h4>
          <p className="mb-3">
            Amount: {`₦${numeral(targetSaving?.amt).format("0,0")}`}
          </p>
          <p className="mb-3">
            Interest accrued:{" "}
            {`₦${numeral(targetSaving?.int_accrued).format("0,0.00")}`}
          </p>
          <p className="mb-4 text-success">
            Total Amount:{" "}
            {`₦${numeral(targetSaving?.targetAmountInView).format("0,0.00")}`}
          </p>
          <div className="row justify-content-center mb-4">
            <div className="col text-center">
              <Button
                className="px-4"
                variant="primary"
                onClick={() => setShowTargetDetails(false)}
              >
                Okay
              </Button>
            </div>
          </div>
        </Modal.Body>
      </Modal>
      <Modal
        centered
        show={showUpdateTargetDetails}
        aria-labelledby="contained-modal-title-vcenter"
        onHide={() => setShowUpdateTargetDetails(false)}
        backdrop={isSubmittingForm ? "static" : true}
        keyboard={isSubmittingForm}
      >
        <Modal.Header
          className="bd-0"
          closeButton={!isSubmittingForm}
        ></Modal.Header>
        <Modal.Body className="text-center">
          <Formik
            initialValues={initialValues}
            validationSchema={Yup.object().shape({
              newAmount: Yup.number()
                .min(1)
                .max(
                  targetSaving?.targetAmountInView || 1,
                  `New amount cannot be more than target of ₦${numeral(
                    targetSaving?.targetAmountInView
                  ).format("0,0")}`
                )
                .required("required"),
            })}
            onSubmit={handleSubmit}
          >
            {({ isSubmitting, handleChange }) => (
              <Form>
                <h4 className="mb-3">{targetSaving?.item} Target Saving</h4>
                <p className="mb-3">
                  Amount: {`₦${numeral(targetSaving?.amt).format("0,0")}`}
                </p>
                <p className="mb-3">
                  Interest accrued:{" "}
                  {`₦${numeral(targetSaving?.int_accrued).format("0,0.00")}`}
                </p>
                <div className="form-group mb-0">
                  <div className="input-group">
                    <Field
                      name="newAmount"
                      // displayType="input"
                      // onValueChange={({ value }: any) => {
                      //   setNewAmt(value);
                      //   handleChange(value);
                      // }}
                      placeholder="New Amount"
                      className="form-control d-block w-100 pl-5 bdbtm-0"
                      // thousandSeparator={true}
                      // prefix={"₦"}
                      // component={NumberFormat}
                    />
                    <ErrorMsg inputName="newAmount" />
                    <label htmlFor="newAmount">New Amount</label>
                  </div>
                </div>
                <div className="row justify-content-center mb-4">
                  <div className="col text-center">
                    <Button
                      className="px-4"
                      variant="primary"
                      type="submit"
                      disabled={isSubmitting}
                    >
                      Okay
                    </Button>
                  </div>
                </div>
              </Form>
            )}
          </Formik>
        </Modal.Body>
      </Modal>
      <Modal
        centered
        show={showBreakTargetDetails}
        aria-labelledby="contained-modal-title-vcenter"
        onHide={() => setShowBreakTargetDetails(false)}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header className="bd-0"></Modal.Header>
        <Modal.Body className="text-center">
          <h4 className="mb-3">
            Are you sure you want to Break {targetSaving?.item} Target Savings?
          </h4>
        </Modal.Body>
        <div className="row justify-content-center mb-4">
          <div className="col text-right">
            <Button
              className="px-4"
              variant="primary"
              disabled={isSubmittingBreaking}
              onClick={() => {
                setIsSubmittingBreaking(true);

                targetStore
                  .removeTarget(`${targetSaving?.id}`)
                  .then(() => {
                    setIsSubmittingBreaking(false);
                    setShowBreakTargetDetails(false);
                  })
                  .catch(() => {
                    setIsSubmittingBreaking(false);
                    setShowBreakTargetDetails(false);
                  });
              }}
            >
              Yes
            </Button>
          </div>
          <div className="col text-left">
            <Button
              className="btn-light border-primary px-4"
              disabled={isSubmittingBreaking}
              onClick={() => setShowBreakTargetDetails(false)}
            >
              No
            </Button>
          </div>
        </div>
      </Modal>
      <Switch>
        <Route
          path={routePath.targetSavings.tokenizeCard}
          component={TokenizeCard}
          exact
        />
        <Route
          path={routePath.targetSavings.createTargetSaving}
          component={NewTargetSavings}
          exact
        />
      </Switch>
    </>
  );
});
