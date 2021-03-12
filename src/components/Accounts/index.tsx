import { Field, Form, Formik } from "formik";
import React, { useState } from "react";
import { Button } from "react-bootstrap";
import { toast } from "react-toastify";
import * as Yup from "yup";

import api from "../../config/api.config";
import { localStoreService } from "../../services";
import { ErrorMsg } from "../Common/ErrorMsg";
import { Title } from "../Common/Title";

export const AccountsLayout = () => {
  const [loading, setLoading] = useState(false);
  const [isEmailSent, setIsEmailSent] = useState(false);
  const [updateValues, setUpdateValues] = useState<
    API.RequestPasswordRequest | undefined
  >();
  const [otpValues, setOtpValues] = useState<API.OTPRequestDto | undefined>();
  const currentUser = localStoreService.getCurrentUser();

  const validationSchema = Yup.object().shape({
    oldPassword: Yup.string().required("required"),
    password: Yup.string().required("required"),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref("password"), null], "Passwords don't match!")
      .required("Required"),
    // otp: Yup.string().required("required"),
  });

  const handleOtp = async (
    input: typeof otpValues
  ): Promise<API.OtpResponse | undefined> => {
    try {
      const { data } = await api.post<API.OtpResponse>(
        "User/GenerateOTP",
        input
      );
      setOtpValues({
        ...otpValues,
        clientID: currentUser?.userId,
        mobile: currentUser?.phoneNumber,
      });
      if (data.responseCode === "1") {
        setIsEmailSent(true);
        toast.success("OTP has been set to your Email", {
          position: "top-center",
        });
      }
      setLoading(false);
      toast.success(data.responseCode, { position: "top-center" });
      return data;
    } catch (e) {}
  };
  const handleUpdateValue = async (
    input: typeof updateValues
  ): Promise<API.UserResponseModel | undefined> => {
    setLoading(true);
    // handleOtp(otpValues);
    try {
      console.log("hi there! ");
      const { data } = await api.post<API.UserResponseModel>(
        "User/UpdatePassword",
        input
      );
      setUpdateValues({
        ...updateValues,
        email: currentUser?.email,
        password: "",
      });
      setLoading(false);
      setIsEmailSent(true);
      toast.success(data.responseCode, { position: "top-center" });
      return data;
    } catch (e) {}
  };
  return (
    <>
      <Title title="Accounts" />
      <div className="container accountWrapper px-4 mt-5">
        <h5 className="mb-4">Change Password</h5>
        {isEmailSent ? (
          <div className="col-md-10 col-lg-10 col-sm-12 col-xs-12">
            <Formik
              initialValues={{ otp: "" }}
              onSubmit={(values, actions) => {
                setTimeout(() => {
                  alert(JSON.stringify(values, null, 2));
                  actions.setSubmitting(false);
                }, 1000);
              }}
            >
              {({ isSubmitting }) => (
                <Form className="form-signin text-center">
                  <h2 className="mb-3 text-primary login-titile text-center mt-5">
                    Update Password
                  </h2>
                  <p className="desc-login mb-4 text-center">
                    Enter the OTP sent to you
                  </p>
                  <div className="form-group mb-5">
                    <div className="input-group">
                      <Field
                        name="otp"
                        className="form-control d-block w-100"
                        placeholder="Email OTP"
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
                </Form>
              )}
            </Formik>
          </div>
        ) : (
          <div className="col-md-10 col-lg-10 col-sm-12 col-xs-12">
            <Formik
              validationSchema={validationSchema}
              initialValues={{
                oldPassword: "",
                password: "",
                confirmPassword: "",
              }}
              onSubmit={(values, { setSubmitting }) => {
                setTimeout(() => {
                  alert(JSON.stringify(values, null, 2));
                  setSubmitting(false);
                }, 1000);
              }}
            >
              {({ isSubmitting }) => (
                <Form className="text-center">
                  <div className="form-group">
                    <div className="input-group">
                      <Field
                        name="oldPassword"
                        className="form-control d-block w-100"
                        placeholder="Current Password"
                        autoFocus
                      />
                      <label htmlFor="oldPassword">New Password</label>
                      <ErrorMsg inputName="oldPassword" />
                    </div>
                  </div>
                  <div className="form-group">
                    <div className="input-group">
                      <Field
                        type="password"
                        name="password"
                        className="form-control d-block w-100"
                        placeholder="New Password"
                      />
                      <label htmlFor="password">New Password</label>
                      <ErrorMsg inputName="password" />
                    </div>
                  </div>
                  <div className="form-group">
                    <div className="input-group">
                      <Field
                        type="password"
                        name="confirmPassword"
                        className="form-control d-block w-100"
                        placeholder="Confirm Password"
                      />
                      <label htmlFor="confirmPassword">Confirm Password</label>
                      <ErrorMsg inputName="confirmPassword" />
                    </div>
                  </div>
                  <Button
                    className="btn btn-lg btn-primary btn-block"
                    type="submit"
                    disabled={isSubmitting}
                    // onClick={() => handleUpdateValue(values)}
                  >
                    {isSubmitting ? "Saving..." : "Save New Password"}
                  </Button>
                </Form>
              )}
            </Formik>
          </div>
        )}
      </div>
    </>
  );
};

// export default AccountsLayout;
