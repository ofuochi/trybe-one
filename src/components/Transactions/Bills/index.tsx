import React, { useState } from "react";
import { Link, Route, Switch, useLocation } from "react-router-dom";
import { Field, Form, Formik } from "formik";
import { routePath } from "../../../constants/route-paths";
import { Waste } from "./Waste";
import { Electricity } from "./Electricity";
import Button from "react-bootstrap/Button";

export const Bills = ({}) => {
  const { pathname } = useLocation();
  const imgSrc = (currentRoute: string, active: string, inactive: string) =>
    pathname === currentRoute
      ? `/assets/images/${active}`
      : `/assets/images/${inactive}`;

  return (
    <div className="mt-5">
      <p className="mb-3 lead p-0">Which Bill would you like to pay for?</p>

      <Formik
       initialValues={{ billers: 'electricity',}}
       onSubmit={(values, actions) => {
         setTimeout(() => {
           alert(JSON.stringify(values, null, 2));
           actions.setSubmitting(false);
         }, 1000);
       }}
     >
<Form>

<div className="form-group mb-3">
      <div className="input-group">
       <Field
          as="select"
          name="billers"
          placeholder="Select Bill"
          className="form-control d-block w-100">
          <option value="" disabled>
            -Select Bill-
          </option>
          <option value="1">
          Electricity
          </option>
          <option value="2">
          Waste Management
          </option>
        </Field>
        <label>Select Bills</label>
        </div>
</div>



<div className="form-group mb-3">
      <div className="input-group">
       <Field
          as="select"
          name="disco"
          placeholder="Select Bill"
          className="form-control d-block w-100">
          <option value="" disabled>
            -Select Disco-
          </option>
          <option value="1">
          Ikeja Electric
          </option>
          <option value="2">
          Eko Electric
          </option>
        </Field>
        <label>Select Bills</label>
        </div>
</div>


<div className="form-group mb-5">
      <div className="input-group">
       <Field
          name="acc"
          placeholder="Account Number"
          className="form-control d-block w-100">
        </Field>
        <label>Select Bills</label>
        </div>
</div>


<div className="form-group row m-0 justify-content-end mt-4">
              <Button
                size="lg"
                variant="danger"
                className="px-5"
                type="submit"
              >
                Pay
              </Button>
            </div>
</Form>
        </Formik>



          <div className="text-center d-none">
            <Link to={routePath.transactions.bills.electricity}>
              <div className="img-w-42">
                <img
                  alt="showimg"
                  src={imgSrc(
                    routePath.transactions.bills.electricity,
                    "icn-electricity-active.svg",
                    "icn-electricity.svg"
                    
                  )}
                />
              </div>
              <p className="d-block text-smaller text-dark mb-0 mt-0">Electricity</p>
            </Link>
          </div>
          <div className="text-center d-none ml-6-re">
            <Link to={routePath.transactions.bills.waste}>
              <div className="img-w-42">
                <img
                  alt="showimg"
                  src={imgSrc(
                    routePath.transactions.bills.waste,
                    "icn-waste-active.svg",
                    "icn-waste.svg"
                  )}
                />
              </div>
              <p className="d-block text-smaller text-dark mb-0 mt-0">Waste Managment</p>
            </Link>
          </div>
       
      <Switch>
        <Route
          path={routePath.transactions.bills.electricity}
          component={Electricity}
        />

        <Route
          path={routePath.transactions.bills.waste}
          component={Waste}
        />
      </Switch>
    </div>
  );
};
