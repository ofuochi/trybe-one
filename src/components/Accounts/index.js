import React from "react";
import { Field, Form, Formik } from "formik";
import { routePath } from "../../constants/route-paths";
import { Link } from "react-router-dom";
import { Title } from "../Common/Title";

export const AccountsLayout = () => {
  return (
    <>
      <Title title="Accounts" />
      <div className="container accountWrapper px-4 mt-5">
        <h5 className = "mb-4">Change Password</h5>
        <div className = "col-md-10 col-lg-10 col-sm-12 col-xs-12">
          <Formik
            initialValues={{ currentPassword: "", newPassword: "", confirmPassword: "" }}
            // onSubmit={}
          >
            <Form className="text-center">
              <div className="form-group">
                <div className="input-group">
                  <Field
                    id="currentPassword"
                    name="currentPassword"
                    className="form-control d-block w-100"
                    placeholder="Current Password"
                    autoFocus
                  />
                  <label>Current Password</label>
                </div>
              </div>
              <div className="form-group">
                <div className="input-group">
                  <Field
                    type="password"
                    id="newPassword"
                    name="newPassword"
                    className="form-control d-block w-100"
                    placeholder="New Password"
                  />
                  <label>New Password</label>
                </div>
              </div>
              <div className="form-group">
                <div className="input-group">
                  <Field
                    type="password"
                    id="confirmPassword"
                    name="confirmPassword"
                    className="form-control d-block w-100"
                    placeholder="Confirm Password"
                  />
                  <label>Confirm Password</label>
                </div>
              </div>

              <button
                className="btn btn-lg btn-primary btn-block"
                type="submit"
              >
                Save New Password
              </button>
              <p className="mt-5 mb-3 lead">
                New to the Trybe?
                <Link to={routePath.signup} className="text-primary ml-2">
                  Sign up here
                </Link>
              </p>
            </Form>
          </Formik>
        </div>
      </div>
    </>
  );
};

// export default AccountsLayout;
