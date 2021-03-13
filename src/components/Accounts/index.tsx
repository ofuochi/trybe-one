import { Field, Form, Formik } from "formik";
import { useState } from "react";
import { Button } from "react-bootstrap";
import { toast } from "react-toastify";
import * as Yup from "yup";

import api from "../../config/api.config";
import { useStore } from "../../hooks/use-store.hooks";
import { localStoreService } from "../../services";
import { ErrorMsg } from "../Common/ErrorMsg";
import { Title } from "../Common/Title";

interface ResetPwDetails {
  oldPassword: string;
  password: string;
  confirmPassword: string;
}

export const AccountsLayout = () => {
  const {
    loaderStore: { setShowLoader },
  } = useStore();
  const [resetPwDetails, setResetPwDetails] = useState<ResetPwDetails>();
  const [isDetailsCollected, setIsDetailsCollected] = useState(false);

  const currentUser = localStoreService.getCurrentUser();

  const validationSchema = Yup.object().shape({
    oldPassword: Yup.string().required("required"),
    password: Yup.string().required("required"),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref("password"), null], "Passwords don't match!")
      .required("Required"),
  });

  return (
    <>
      <Title title="Accounts" />
      <div className="container accountWrapper px-4 mt-5">
        <h5 className="mb-4">Change Password</h5>
        {isDetailsCollected ? (
          <div className="col-md-10 col-lg-10 col-sm-12 col-xs-12">
            <Formik
              initialValues={{ otp: "" }}
              validationSchema={Yup.object().shape({
                otp: Yup.string().required("required"),
              })}
              onSubmit={async (values, { setSubmitting }) => {
                setShowLoader(true);
                const input: API.RequestPasswordRequest = {
                  email: currentUser?.email,
                  otpDetails: {
                    otp: values.otp,
                    reference: currentUser?.phoneNumber,
                  },
                  oldPassword: resetPwDetails?.oldPassword,
                  password: resetPwDetails?.password,
                };
                try {
                  const { data } = await api.post<API.UserResponseModel>(
                    "User/UpdatePassword",
                    input
                  );
                  if (data.responseCode === "00") {
                    toast.success(data.responseDescription, {
                      position: "top-center",
                    });
                  } else {
                    toast.error(data.responseDescription, {
                      position: "top-center",
                    });
                  }
                } catch (e) {}
                setSubmitting(false);
                setShowLoader(false);
                setIsDetailsCollected(false);
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
              onSubmit={(values, { setSubmitting, resetForm }) => {
                setShowLoader(true);
                setResetPwDetails({
                  oldPassword: values.oldPassword,
                  password: values.password,
                  confirmPassword: values.confirmPassword,
                });
                var input: API.OTPRequestDto = {
                  clientID: "1",
                  email: currentUser?.email,
                  mobile: currentUser?.phoneNumber,
                };
                api
                  .post<API.OtpResponse>("User/GenerateOTP", input)
                  .then(({ data }) => {
                    if (data.responseCode === "1") {
                      setIsDetailsCollected(true);
                    } else {
                      toast.error("Could not reset your password", {
                        position: "top-center",
                      });
                    }
                    setSubmitting(false);
                    setShowLoader(false);
                  })
                  .catch(() => {
                    setSubmitting(false);
                    setShowLoader(false);
                  });
                resetForm();
              }}
            >
              {({ isSubmitting }) => (
                <Form className="text-center">
                  <div className="form-group">
                    <div className="input-group">
                      <Field
                        name="oldPassword"
                        type="password"
                        className="form-control d-block w-100"
                        placeholder="Current Password"
                      />
                      <label htmlFor="oldPassword">Current Password</label>
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
