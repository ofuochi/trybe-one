import { Field, Form, Formik } from "formik";
import React from "react";
import { Link, useHistory } from "react-router-dom";
import * as Yup from "yup";

import { routePath } from "../../constants/route-paths";
import { useStore } from "../../hooks/use-store.hooks";
import { ErrorMsg } from "../common/ErrorMsg";
import { Title } from "../common/Title";

const LoginSchema = Yup.object().shape({
  nuban: Yup.string()
    .matches(/^\d/, "NUBAN must be digits")
    .required("required"),
  password: Yup.string().required(),
});

export const Login = () => {
  const { currentUserStore } = useStore();
  const history = useHistory();
  return (
    <div className="container-fluid vh-100">
      <Title title="Login" />
      <div className="row align-items-center h-100">
        <div className="col-lg-6 my-auto bg-login h-100">
          <div className="row justify-content-center">
            <div className="col-lg-8">
              <div className="card mt-5">
                <div className="card-body">
                  <div className="mb-3 text-left">
                    <h5>Who is a Trybe?</h5>
                    <p className="text-muted text-sm">
                      A Tryber introduces other students into the community and
                      also earns money doing so.
                    </p>
                  </div>
                  <div className="mb-3 text-left">
                    <h5>Earning as a Tryber</h5>
                    <p className="text-muted text-sm">
                      A Tryber introduces other students into the community and
                      also earns money doing so.
                    </p>
                  </div>
                  <div className="mb-3 text-left">
                    <h5>Other Benefits</h5>
                    <p className="text-muted text-sm">
                      A Tryber introduces other students into the community and
                      also earns money doing so.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="col-lg-6 my-auto mx-auto px-5">
          <div className="card bd-0">
            <div className="card-body card-repadd">
              <Formik
                validationSchema={LoginSchema}
                initialValues={{ nuban: "", password: "" }}
                onSubmit={(values, { setSubmitting }) => {
                  currentUserStore
                    .login(values.nuban, values.password)
                    .then(() => {
                      setSubmitting(false);
                      history.replace(routePath.dashboard);
                    })
                    .catch(() => setSubmitting(false));
                }}
              >
                {({ isSubmitting }) => (
                  <Form className="form-signin text-center">
                    <Link to={routePath.home}>
                      <img alt="logo" src="assets/images/logo.png" />
                    </Link>
                    <h2 className="mb-3 text-primary login-titile text-center mt-5">
                      Welcome to trybeOne
                    </h2>
                    <p className="desc-login mb-4 text-center">Please enter your details below to login</p>
                    <div className="form-group">
                    <div className="input-group">
                      <Field
                        id="inputEmail"
                        name="nuban"
                        className="form-control d-block w-100"
                        placeholder="Account Number"
                        autoFocus
                      />
                      <label>Account Number</label>
                      <ErrorMsg inputName="nuban" />
                      </div>
                    </div>
                    <div className="form-group">
                    <div className="input-group">       
                      <Field
                        type="password"
                        id="inputPassword"
                        name="password"
                        className="form-control d-block w-100"
                        placeholder="Password"
                      />
                      <ErrorMsg inputName="password" />
                      <label>Password</label>
                    </div>
                    </div>

                    <div className="form-group text-left">
                      <Link
                        to={routePath.forgotPassword}
                        className="text-primary"
                      >
                        Forgot Password?
                      </Link>
                    </div>

                    <button
                      className="btn btn-lg btn-primary btn-block"
                      type="submit"
                      disabled={isSubmitting}
                    >
                      Log in
                    </button>
                    <p className="mt-5 mb-3 lead">
                      New to the Trybe?
                      <Link to={routePath.signup} className="text-primary">
                        Sign up here
                      </Link>
                    </p>
                  </Form>
                )}
              </Formik>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
