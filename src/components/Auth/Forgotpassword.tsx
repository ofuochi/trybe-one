import { Field, Form, Formik } from "formik";
import { useState } from "react";
import { Button } from "react-bootstrap";
import { Link, useHistory } from "react-router-dom";
import { toast } from "react-toastify";
import * as Yup from "yup";

import api from "../../config/api.config";
import { routePath } from "../../constants/route-paths";
import { ErrorMsg } from "../Common/ErrorMsg";
import { Title } from "../Common/Title";

const validationSchema = Yup.object().shape({
  password: Yup.string().required("required"),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password"), null], "Passwords don't match!")
    .required("Required"),
  otp: Yup.string().required("required"),
});
export const ForgotPassword = () => {
  const [isEmailSent, setIsEmailSent] = useState(false);
  const history = useHistory();
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
              <div className="card-body card-repadd">
                <Formik
                  validationSchema={validationSchema}
                  initialValues={{ password: "", otp: "", confirmPassword: "" }}
                  onSubmit={(values, { setSubmitting }) => {
                    const input: API.RequestPasswordRequest = {
                      password: values.password,
                    };
                    api
                      .post<API.UserResponseModel>(`/User/ResetPassword`, input)
                      .then(({ data }) => {
                        setSubmitting(false);
                        if (data.responseCode === "00") {
                          toast.success(data.responseDescription, {
                            position: "top-center",
                          });
                          history.push(routePath.login);
                        } else {
                          toast.error(data.responseDescription, {
                            position: "top-center",
                          });
                        }
                      })
                      .catch(() => setSubmitting(false));
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
                        Enter your new password and the OTP sent to you
                      </p>
                      <div className="form-group mb-5">
                        <div className="input-group">
                          <Field
                            name="password"
                            type="password"
                            className="form-control d-block w-100"
                            placeholder="New Password"
                            autoFocus
                          />
                          <label htmlFor="password">New Password</label>
                          <ErrorMsg inputName="password" />
                        </div>
                        <div className="input-group">
                          <Field
                            name="confirmPassword"
                            type="password"
                            className="form-control d-block w-100"
                            placeholder="Confirm Password"
                            autoFocus
                          />
                          <label htmlFor="confirmPassword">
                            Confirm Password
                          </label>
                          <ErrorMsg inputName="confirmPassword" />
                        </div>
                        <div className="input-group">
                          <Field
                            name="otp"
                            type="password"
                            className="form-control d-block w-100"
                            placeholder="OTP"
                            autoFocus
                          />
                          <label htmlFor="otp">OTP</label>
                          <ErrorMsg inputName="otp" />
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
            ) : (
              <div className="card-body card-repadd">
                <Formik
                  validationSchema={Yup.object().shape({
                    email: Yup.string().email().required("required"),
                  })}
                  initialValues={{ email: "" }}
                  onSubmit={async (values, { setSubmitting }) => {
                    const { data } = await api.get<API.UserResponseModel>(
                      `/User/GetUserByEmail?email=${values.email}`
                    );
                    if (values.email !== data.email)
                      toast.error("Email does not exist", {
                        position: "top-center",
                      });
                    else {
                      const input: API.OTPRequestDto = {
                        email: values.email,
                        mobile: data.phoneNumber,
                        clientID: "1",
                      };
                      const { data: otpResp } = await api.post<API.OtpResponse>(
                        "User/GenerateOTP",
                        input
                      );
                      if (otpResp.responseCode === "1") {
                        setIsEmailSent(true);
                        toast.success("OTP has been set to your Email", {
                          position: "top-center",
                        });
                      }
                    }

                    setSubmitting(false);
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
                        Enter your email and a password reset OTP will be sent
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
