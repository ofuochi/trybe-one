import { Pie } from "@ant-design/charts";
import { Field, Form, Formik } from "formik";
import numeral from "numeral";
import React, { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import Modal from "react-bootstrap/Modal";
import { Link, Route, Switch, useHistory } from "react-router-dom";
import { toast } from "react-toastify";

import api from "../../config/api.config";
import { routePath } from "../../constants/route-paths";
import { localStoreService } from "../../services";
import { Title } from "../Common/Title";
import TokenizeCard from "../Common/TokenizeCard";
import { NewTargetSavings } from "./NewTargetSavings";

export const TargetSavings = () => {
  const [
    targetSaving,
    setTargetSaving,
  ] = useState<API.GetTargetSavingsResponseDto>();
  const [showTargetDetails, setShowTargetDetails] = useState(false);
  const [showBreakTargetDetails, setShowBreakTargetDetails] = useState(false);
  const [isSubmittingBreaking, setIsSubmittingBreaking] = useState(false);
  const { location } = useHistory();

  const [targetSavings, setTargetSavings] = useState<
    API.GetTargetSavingsResponseDto[]
  >([]);

  const currentUser = localStoreService.getCurrentUser();
  useEffect(() => {
    api
      .get<API.GetTargetSavingsResponseListDto>(
        `/User/GetTargetSavingsByProfileId?profileID=${currentUser?.userId}`
      )
      .then(({ data }) => {
        // const targets = data.targetSavings?.filter(
        //   (item) => item.statusflag !== 2
        // );
        setTargetSavings(data.targetSavings || []);
      });
  }, [targetSavings.length, currentUser?.userId]);

  const pieConfig = {
    data: targetSavings,
    innerRadius: 0.64,
    radius: 1,

    interactions: [{ type: "element-selected" }, { type: "element-active" }],
    appendPadding: 10,
    statistic: {
      content: {
        formatter: (_data1: any, data2: any) => {
          const sum = data2
            .map(
              (item: API.GetTargetSavingsResponseDto) => item.targetAmountInView
            )
            .reduce((prev: number, next: number) => prev + next);

          return `₦${numeral(sum).format("0,0")}`;
        },
      },
      title: {
        formatter: () => "Total",
      },
    },
    angleField: "targetAmountInView",
    colorField: "item",
  };
  const handleSubmit = (
    values: API.UpdateTargetSavingsRequest,
    { setSubmitting }: any
  ) => {
    api
      .post<API.BaseResponse>(
        "/User/UpdateTargetSavingsAmountByTargetId",
        values
      )
      .then(({ data }) => {
        setSubmitting(false);
        if (data.responseCode === "00") {
          toast.success(data.responseDescription, { position: "top-center" });
        } else
          toast.error(data.responseDescription, { position: "top-center" });
      })
      .catch(() => {
        setSubmitting(false);
      });
  };
  return (
    <>
      <Title title="Target Savings" />
      {location.pathname === routePath.targetSavings.index ? (
        <div className="page-content">
          <div className="row">
            {targetSavings && targetSavings.length > 0 ? (
              <>
                <div className="col-lg-12">
                  <h4>Total Budget</h4>
                </div>
                <div className="col-lg-6">
                  <div className="d-flex row m-0 justify-content-between">
                    <Pie {...pieConfig} />
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

          {targetSavings && targetSavings.length > 0 ? (
            <>
              <div className="mt-4">
                <h5 className="mdc-top-app-bar__title mb-0 mb-4 p-0">
                  Target Savings
                </h5>
                {targetSavings?.map((item) => (
                  <Formik
                    key={item.id}
                    initialValues={{
                      newAmount: item.amt,
                      profileId: currentUser?.userId,
                      targetId: item.id,
                    }}
                    enableReinitialize
                    onSubmit={handleSubmit}
                  >
                    {({ isSubmitting, handleChange }) => (
                      <Form>
                        <div
                          className="col-lg-12"
                          onClick={() => setTargetSaving(item)}
                        >
                          <div className="form-group row justify-content-between m-0">
                            <div className="col-lg-2 text-left p-0">
                              <p className="mb-0">{item.item}</p>
                            </div>
                            <div className="col-lg-8 pl-0">
                              <div className="form-group range-d m-0">
                                <Field
                                  type="range"
                                  min="100"
                                  max={item.targetAmountInView}
                                  onChange={(e: React.ChangeEvent<any>) => {
                                    item.amt = e.target.value;
                                    setTargetSaving(item);
                                    handleChange(e);
                                  }}
                                  step="100"
                                  name="newAmount"
                                  className="form-control-range ps0"
                                />
                              </div>
                            </div>
                            <div className="col-lg-2 p-0">
                              <p className="smaller mb-0 pt-1">
                                {`₦${numeral(item.amt).format("0,0")}`}
                                <span>
                                  <img
                                    className="ml-2"
                                    alt=""
                                    src="/assets/images/ic-right-angle.svg"
                                  />
                                </span>
                              </p>
                            </div>
                          </div>
                          {targetSaving?.id === item.id ? (
                            <div>
                              <div className="row m-0 justify-content-between mt-3">
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
                                  disabled={isSubmitting}
                                  type="submit"
                                >
                                  Update
                                </Button>

                                <Button
                                  variant="light"
                                  className="px-4 border-primary"
                                  onClick={() =>
                                    setShowBreakTargetDetails(true)
                                  }
                                >
                                  Break Box
                                </Button>
                              </div>
                            </div>
                          ) : null}
                        </div>
                      </Form>
                    )}
                  </Formik>
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
                const input: API.BreakBoxRequestModel = {
                  targetId: targetSaving?.id,
                };
                api
                  .post<API.BaseResponse>("/User/BreakBox", input)
                  .then(({ data }) => {
                    setIsSubmittingBreaking(false);
                    setShowBreakTargetDetails(false);
                    if (data.responseCode === "00") {
                      toast.success(data.responseDescription, {
                        position: "top-center",
                      });

                      const targets = targetSavings?.filter(
                        (target) => target.id !== targetSaving?.id
                      );
                      setTargetSavings(targets);
                    } else {
                      // const targets = targetSavings?.filter(
                      //   (target) => target.id !== targetSaving?.id
                      // );
                      // setTargetSavings(targets);
                      toast.error(data.responseDescription, {
                        position: "top-center",
                      });
                    }
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
};
