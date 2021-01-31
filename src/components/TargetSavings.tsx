import { Field, Form, Formik } from "formik";
import React, { useEffect, useState } from "react";
import {
  Cell,
  Legend,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
} from "recharts";
import api from "../config/api.config";
import { localStoreService } from "../services";

import { Title } from "./Common/Title";

export const TargetSavings = () => {
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
  }, [currentUser?.userId]);

  let data = targetSaving?.map((t) => ({
    name: t.item || "",
    value: t.amt || 0,
  }));
  if (data?.length === 0)
    data = [
      { name: "Car", value: 50 },
      { name: "Food", value: 39 },
      { name: "Groceries", value: 78 },
      { name: "Movies", value: 100 },
      { name: "Rent", value: 150 },
    ];
  const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#FF007F"];

  const initialValues: API.AddTargetSavingsRequestDto = {};
  return (
    <>
      <Title title="Target Savings" />
      <div className="col-lg-8 col-md-8 bd-right px-5 mt-4">
        <div className="page-content">
          <div className="row">
            <div className="col-lg-4">
              <div className="d-flex row m-0 mb-4 justify-content-between">
                <ResponsiveContainer height={250} minWidth={400}>
                  <PieChart>
                    <Tooltip />
                    <Legend
                      verticalAlign="top"
                      layout="vertical"
                      iconType="circle"
                      align="left"
                    />
                    <Pie
                      data={data}
                      cx={"35%"}
                      cy={"35%"}
                      innerRadius="40%"
                      outerRadius="70%"
                      fill="#8884d8"
                      paddingAngle={3}
                      dataKey="value"
                    >
                      {data?.map((entry, index) => (
                        <Cell
                          key={`cell-${index}`}
                          fill={COLORS[index % COLORS.length]}
                        />
                      ))}
                    </Pie>
                  </PieChart>
                </ResponsiveContainer>
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
                    <div className="form-group row m-0">
                      <p>Movies</p>
                      <Field
                        type="range"
                        min="0"
                        max="10"
                        step="0.01"
                        className="form-control-range"
                      />
                    </div>
                  </div>
                  <div className="col-lg-12">
                    <div className="form-group row m-0">
                      <p>Rent</p>
                      <Field
                        type="range"
                        min="0"
                        max="10"
                        step="0.01"
                        className="form-control-range"
                      />
                    </div>
                  </div>
                  <div className="col-lg-12">
                    <div className="form-group row m-0">
                      <p>Groceries</p>
                      <Field
                        type="range"
                        min="0"
                        max="10"
                        step="0.01"
                        className="form-control-range"
                      />
                    </div>
                  </div>
                  <div className="col-lg-12">
                    <div className="form-group row m-0">
                      <p>Car</p>
                      <Field
                        type="range"
                        min="0"
                        max="10"
                        step="0.01"
                        className="form-control-range"
                      />
                    </div>
                  </div>
                  <div className="col-lg-12">
                    <div className="form-group row m-0">
                      <p>Food</p>
                      <Field
                        type="range"
                        min="0"
                        max="10"
                        step="0.01"
                        className="form-control-range"
                      />
                    </div>
                  </div>
                </Form>
              )}
            </Formik>
          </div>
        </div>
      </div>
      <div className="col-lg-4 col-md-4">
        <div className="row mb-0 d-flex mt-3 justify-content-between">
          <div className="col s6">
            <div className="text-left">
              <button className="btn no-bg p-0">
                <img alt="" src="/assets/images/ic-search.svg" />
              </button>
            </div>
          </div>
          <div className="col s6">
            <div className="text-right">
              <button className="btn no-bg p-0">
                <img alt="" src="/assets/images/ic-notification.svg" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
