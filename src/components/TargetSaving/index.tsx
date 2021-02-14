import { Pie } from "@ant-design/charts";
import numeral from "numeral";
import { Field, Form, Formik } from "formik";
import React, { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import Modal from "react-bootstrap/Modal";
import { Link, Route, Switch, useHistory } from "react-router-dom";

import api from "../../config/api.config";
import { routePath } from "../../constants/route-paths";
import { localStoreService } from "../../services";
import { Title } from "../Common/Title";
import TokenizeCard from "../Common/TokenizeCard";
import { NewTargetSavings } from "./NewTargetSavings";
import TargetOptions from "./TargetOption";

export const TargetSavings = () => {
  const [visible, setVisible] = useState(false);
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const { location } = useHistory();

  const [targetSaving, setTargetSaving] = useState<
    API.GetTargetSavingsResponseDto[]
  >();

  const currentUser = localStoreService.getCurrentUser();
  useEffect(() => {
    api
      .get<API.GetTargetSavingsResponseListDto>(
        `/User/GetTargetSavingsByProfileId?profileID=${currentUser?.userId}`
      )
      .then(({ data }) => setTargetSaving(data.targetSavings));
  }, [currentUser?.userId, targetSaving?.length]);

  let data = targetSaving?.map((t) => ({
    name: t.item || "",
    value: t.targetAmountInView || 0,
  }));

  const COLORS: string[] = [];

  const stringToColour = (str: string) => {
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
      hash = str.charCodeAt(i) + ((hash << 5) - hash);
    }
    let colour = "#";
    for (let i = 0; i < 3; i++) {
      const value = (hash >> (i * 8)) & 0xff;
      colour += ("00" + value.toString(16)).substr(-2);
    }
    return colour;
  };
  targetSaving?.forEach((e) => {
    COLORS.push(stringToColour(e.item || ""));
  });
  const pieConfig = {
    data: data || [],
    innerRadius: 0.64,
    radius: 1,
    interactions: [{ type: "element-selected" }, { type: "element-active" }],
    appendPadding: 10,
    statistic: {
      content: {
        formatter: (data1: any, data2: any) => {
          const list: any[] = data2.map((item: any) => item.value);

          const sum =
            list.length > 0
              ? list.reduce((prev: number, next: number) => prev + next)
              : 0;

          return `₦${numeral(sum).format("0,0")}`;
        },
      },
      title: {
        formatter: () => "Total",
      },
    },
    angleField: "value",
    colorField: "name",
  };
  const initialValues: API.AddTargetSavingsRequestDto = {};
  return (
    <>
      <Title title="Target Savings" />
      {location.pathname === routePath.targetSavings.index ? (
        <div className="page-content">
          <div className="row">
            {data && data.length > 0 ? (
              <div className="col-lg-12">
                <h4>Total Budget</h4>
              </div>
            ) : null}
            <div className="col-lg-6">
              <div className="d-flex row m-0 justify-content-between">
                <Pie {...pieConfig} />
              </div>
            </div>
            <div className="col-lg-6">
              <div className="alert alert-danger p-4">
                <h5>Target Savings</h5>
                <p className="small">
                  Target Savings helps you achieve your savings goals while you
                  sit back and relax{" "}
                </p>
              </div>
            </div>
          </div>

          {data && data.length > 0 ? (
            <>
              <div className="mt-4">
                <h5 className="mdc-top-app-bar__title mb-0 mb-4 p-0">
                  Target Savings
                </h5>

                <Formik
                  initialValues={initialValues}
                  enableReinitialize
                  onSubmit={(initialValues) => {}}
                >
                  {({ isSubmitting }) => (
                    <Form>
                      <div className="col-lg-12">
                        <div
                          onClick={() => setVisible(!visible)}
                          className="form-group row justify-content-between m-0"
                        >
                          <div className="col-lg-2 text-left p-0">
                            <p className="mb-0">Movies</p>
                          </div>
                          <div className="col-lg-8 pl-0">
                            <div className="form-group range-d m-0">
                              <Field
                                type="range"
                                min="0"
                                max="10"
                                step="0.01"
                                className="form-control-range ps0"
                              />
                            </div>
                          </div>
                          <div className="col-lg-2 p-0">
                            <p className="smaller mb-0 pt-1">
                              NGR 4000.00{" "}
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
                        {visible && <TargetOptions handleClick={handleShow} />}
                      </div>
                      <div className="col-lg-12">
                        <div className="form-group row justify-content-between m-0 mt-4">
                          <div className="col-lg-2 text-left p-0">
                            <p className="mb-0">Rent</p>
                          </div>
                          <div className="col-lg-8 pl-0">
                            <div className="form-group range-d m-0">
                              <Field
                                type="range"
                                min="0"
                                max="10"
                                step="0.01"
                                className="form-control-range ps1"
                              />
                            </div>
                          </div>
                          <div className="col-lg-2 p-0">
                            <p className="smaller mb-0 pt-1">
                              NGR 4000.00{" "}
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
                      </div>
                      <div className="col-lg-12">
                        <div className="form-group row justify-content-between m-0 mt-4">
                          <div className="col-lg-2 text-left p-0">
                            <p className="mb-0">Groceries</p>
                          </div>
                          <div className="col-lg-8 pl-0">
                            <div className="form-group range-d m-0">
                              <Field
                                type="range"
                                min="0"
                                max="10"
                                step="0.01"
                                className="form-control-range ps2"
                              />
                            </div>
                          </div>
                          <div className="col-lg-2 p-0">
                            <p className="smaller mb-0 pt-1">
                              NGR 4000.00{" "}
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
                      </div>
                      <div className="col-lg-12">
                        <div className="form-group row justify-content-between m-0 mt-4">
                          <div className="col-lg-2 text-left p-0">
                            <p className="mb-0">Car</p>
                          </div>
                          <div className="col-lg-8 pl-0">
                            <div className="form-group range-d m-0">
                              <Field
                                type="range"
                                min="0"
                                max="10"
                                step="0.01"
                                className="form-control-range ps3"
                              />
                            </div>
                          </div>
                          <div className="col-lg-2 p-0">
                            <p className="smaller mb-0 pt-1">
                              NGR 4000.00{" "}
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
                      </div>
                      <div className="col-lg-12">
                        <div className="form-group row justify-content-between m-0 mt-4">
                          <div className="col-lg-2 text-left p-0">
                            <p className="mb-0">Food</p>
                          </div>
                          <div className="col-lg-8 pl-0">
                            <div className="form-group range-d m-0">
                              <Field
                                type="range"
                                min="0"
                                max="10"
                                step="0.01"
                                className="form-control-range ps4"
                              />
                            </div>
                          </div>
                          <div className="col-lg-2 p-0">
                            <p className="smaller mb-0 pt-1">
                              NGR 4000.00{" "}
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
                      </div>
                    </Form>
                  )}
                </Formik>
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
        show={show}
        aria-labelledby="contained-modal-title-vcenter"
        centered
        onHide={handleClose}
      >
        <Modal.Header className="bd-0" closeButton></Modal.Header>
        <Modal.Body className="text-center">
          <h4 className="mb-3"> Rent Target Saving</h4>
          <p className="mb-3">Amount: NGR 20,000.00</p>
          <p className="mb-3">Intrest accrued (10%): NGR 5,000.00 </p>
          <p className="mb-4 text-success">Total Amount: NGR 25,000.00 </p>
          <div className="row justify-content-center mb-4">
            <div className="col text-right">
              <Button className="px-4" variant="primary" onClick={handleClose}>
                Break Box
              </Button>
            </div>
            <div className="col text-left">
              <Button
                className="btn-light border-primary px-4"
                onClick={handleClose}
              >
                Cancel
              </Button>
            </div>
          </div>
        </Modal.Body>
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
