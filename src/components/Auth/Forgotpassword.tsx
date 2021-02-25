import { Field, Form, Formik } from "formik";
import { useState } from "react";
import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import * as Yup from "yup";

import { routePath } from "../../constants/route-paths";
import { ErrorMsg } from "../Common/ErrorMsg";
import { Title } from "../Common/Title";

const validationSchema = Yup.object().shape({
  email: Yup.string().email().required("required"),
});
export const ForgotPassword = () => {
  const [isEmailSent, setIsEmailSent] = useState(false);
  return (
    <div className="container-fluid vh-100">
      <Title title="Forgot Password" />
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
            {isEmailSent ? (
              <div className="card-body card-repadd text-center">
                <Link to={routePath.home}>
                  <img alt="logo" src="/assets/images/logo.png" />
                </Link>

                <div className="mt-5">
                  <img alt="logo" src="/assets/images/ic-sentotp.svg" />
                </div>
              </div>
            ) : (
              <div className="card-body card-repadd">
                <Formik
                  validationSchema={validationSchema}
                  initialValues={{ email: "" }}
                  onSubmit={(values, { setSubmitting }) => {
                    setSubmitting(false);
                    setIsEmailSent(true);
                  }}
                >
                  {({ isSubmitting }) => (
                    <Form className="form-signin text-center">
                      <Link to={routePath.home}>
                        <img alt="logo" src="/assets/images/logo.png" />
                      </Link>
                      <h2 className="mb-3 text-primary login-titile text-center mt-5">
                        Password Reset
                      </h2>
                      <p className="desc-login mb-4 text-center">
                        Enter your email address and a reset link will be sent
                        to you
                      </p>
                      <div className="form-group mb-5">
                        <div className="input-group">
                          <Field
                            name="email"
                            className="form-control d-block w-100"
                            placeholder="Email Address"
                            autoFocus
                          />
                          <label htmlFor="email">Email Address</label>
                          <ErrorMsg inputName="email" />
                        </div>
                      </div>
                      <Button
                        type="submit"
                        disabled={isSubmitting}
                        className="btn btn-lg btn-primary btn-block"
                      >
                        Reset Password
                      </Button>
                      <p className="mt-5 mb-3 lead">
                        New to the Trybe?{" "}
                        <Link to={routePath.signup} className="text-primary">
                          Sign up here
                        </Link>
                      </p>
                    </Form>
                  )}
                </Formik>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
