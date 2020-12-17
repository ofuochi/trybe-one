import { Field } from "formik";
import { observer } from "mobx-react-lite";
import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { toast } from "react-toastify";
import * as Yup from "yup";
import { routePath } from "../../constants/route-paths";
import { useStore } from "../../hooks/use-store.hooks";
import { authService } from "../../services";

import { ErrorMsg } from "../common/ErrorMsg";
import { FormikStep, FormikStepper } from "../common/FormikStepper";
import { Title } from "../common/Title";

const phoneRegExp = /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;

const StepOneSchema = Yup.object().shape({
  title: Yup.string().required("required"),
  gender: Yup.string().required("required"),
  firstname: Yup.string().required("required"),
  lastname: Yup.string().required("required"),
  email: Yup.string().email().required("required"),
  address: Yup.string().required("required"),
  schoolName: Yup.string().required("required"),
  courseDuration: Yup.number().min(1).required("required"),
});
const StepTwoSchema = Yup.object().shape({
  mobile: Yup.string()
    .matches(phoneRegExp, "Phone number is not valid e.g 08074488857")
    .required("required"),
  dob: Yup.string().required("required"),
  trybersCode: Yup.string().required("required"),
  trybersReferralCode: Yup.string().required("required"),

  preferredName: Yup.string().required("required"),
  sideHustle: Yup.string().required("required"),
  serviceProvider: Yup.string().required("required"),
  level: Yup.string().required("required"),
});
const StepThreeSchema = Yup.object().shape({
  videoUrl: Yup.string().url("invalid url").required("required"),

  instagramHandle: Yup.string().required("required"),
  twitterHandle: Yup.string().required("required"),
  initialAccountSelected: Yup.string()
    .matches(/^\d{10}$/, "NUBAN must be 10 digits")
    .required("required"),
  password: Yup.string().required("required"),
});

export const Signup = observer(() => {
  const [dateInput, setDateInput] = useState("text");
  const history = useHistory();
  const { signupFormStore } = useStore();
  const initSignupFormData: API.CreateWalletRequestDto = {
    title: "",
    firstname: "",
    lastname: "",
    email: "",
    address: "",
    mobile: "",
    schoolName: "",
    courseDuration: "",
    gender: "Unspecified",

    dob: "",
    currencycode: "NGN",
    trybersCode: "",
    trybersReferralCode: "",
    preferredName: "",
    sideHustle: "",
    phoneNumber: "",
    initialAccountSelected: "",
    level: "",

    productCode: "CMPUS.HYPE1",
    branch: "NG0020555",
    sector: "4200",
    industry: "4202",
    nationality: "NG",

    serviceProvider: "",
    instagramHandle: "",
    twitterHandle: "",
    videoUrl: "",
    password: "",
  };
  return (
    <div className="container-fluid vh-100">
      <Title title="Signup" />

      <div className="row align-items-center h-100">
 
      <div className="col-lg-6 px-2">
          <div className="card bd-0">
            <div className="card-body card-repadd">
              <h5 className="mb-3 font-weight-normal text-left mb-5">
                Hi there, you are almost done 🙂
                <span className="text-primary">#FreeToBe</span>
              </h5>

              <h3 className="text-left">Step {signupFormStore.step} of 3</h3>
              <p className="text-left lead mb-5 text-muted">
                Tryber Personal Info
              </p>

              <div className="row">
                {/* <ul id="progressbar">
                  <li className="active">
                    <span className="d-block text-primary">1</span>
                    <span className="d-block text-primary">Personal info</span>
                  </li>
                  <li>
                    <span className="d-block">2</span>
                  </li>
                  <li>
                    <span className="d-block">3</span>
                  </li>
                </ul> */}
                <div className="col-lg-12">
                  <FormikStepper
                    initialValues={initSignupFormData}
                    onSubmit={(values, { setSubmitting }) => {
                      setSubmitting(true);
                      values.phoneNumber = values.mobile;

                      authService
                        .signup(values)
                        .then(() => {
                          setSubmitting(false);
                          toast.success(
                            "You've successfully registered. Please login.",
                            {
                              position: "top-center",
                              delay: 0,
                            }
                          );
                          history.push(routePath.login);
                        })
                        .catch(() => setSubmitting(false));
                    }}
                  >
                    {/* Step One */}
                    <FormikStep validationSchema={StepOneSchema}>
                      <div className="form-group">
                      <div className="input-group">
                        <Field
                          as="select"
                          name="title"
                          className="form-control d-block w-100">
                          <option value=""> -Select Title- </option>
                          <option value="Mr">Mr</option>
                          <option value="Mss">Mss</option>
                        </Field>
                        <label>Select Title</label>
                        <ErrorMsg inputName="title" />
                      </div>
                      </div>
                      <div className="form-group">
                      <div className="input-group">
                        <Field
                          name="firstname"
                          className="form-control d-block w-100"
                          placeholder="First name"
                        />
                         <label>First name</label>
                        <ErrorMsg inputName="firstname" />
                      </div>
                      </div>
                      <div className="form-group">
                      <div className="input-group">
                        <Field
                          name="lastname"
                          className="form-control d-block w-100"
                          placeholder="Last name"
                        />
                       <label>Last name</label>          
                        <ErrorMsg inputName="lastname" />
                      </div>
                      </div>
                      <div className="form-group">
                      <div className="input-group">
                        <Field
                          name="email"
                          className="form-control d-block w-100"
                          placeholder="Email"
                        />
                        <label>Email</label>
                        <ErrorMsg inputName="email" />
                      </div>
                      </div>

                      <div className="form-group">
                      <div className="input-group">
                        <Field
                          name="schoolName"
                          className="form-control d-block w-100"
                          placeholder="School name"
                        />
                        <label>School name</label>
                        <ErrorMsg inputName="schoolName" />
                      </div>
                      </div>
                      <div className="form-group">
                      <div className="input-group">
                        <Field
                          name="courseDuration"
                          className="form-control d-block w-100"
                          type="number"
                          min="1"
                          placeholder="Course Duration. e.g 4 years"
                        />
                        <label>Course Duration</label>
                        <ErrorMsg inputName="courseDuration" />
                      </div>
                      </div>
                      <div className="form-group">
                      <div className="input-group">
                        <Field
                          as="select"
                          name="gender"
                          className="form-control d-block w-100"
                        >
                          <option value=""> -Select Gender- </option>
                          <option value="Mr">Male</option>
                          <option value="Mss">Female</option>
                        </Field>
                        <label>Gender</label>
                        <ErrorMsg inputName="gender" />
                      </div>
                      </div>
                      <div className="form-group">
                      <div className="input-group">
                        <Field
                          as="textarea"
                          name="address"
                          className="form-control d-block w-100"
                          placeholder="Home address"
                        />
                        <label>Home address</label>
                        <ErrorMsg inputName="address" />
                      </div>
                      </div>
                    </FormikStep>

                    {/* Step Two */}
                    <FormikStep validationSchema={StepTwoSchema}>
                      <div className="form-group">
                      <div className="input-group">
                        <Field
                          name="mobile"
                          className="form-control d-block w-100"
                          placeholder="Phone number"
                        />
                        <label>Phone number</label>
                        <ErrorMsg inputName="mobile" />
                      </div>
                      </div>
                      <div className="form-group">
                      <div className="input-group">
                        <Field
                          name="dob"
                          className="form-control d-block w-100"
                          placeholder="Birthday"
                          type={dateInput}
                          onFocus={() => setDateInput("date")}
                          onBlur={() => setDateInput("text")}
                        />
                         <label>Birthday</label>
                        <ErrorMsg inputName="dob" />
                      </div>
                      </div>
                      <div className="form-group">
                      <div className="input-group">
                        <Field
                          name="trybersCode"
                          className="form-control d-block w-100"
                          placeholder="Trybers Code"
                        />
                        <label>Trybers Code</label>
                        <ErrorMsg inputName="trybersCode" />
                      </div>
                      </div>
                      <div className="form-group">
                      <div className="input-group">
                        <Field
                          name="trybersReferralCode"
                          className="form-control d-block w-100"
                          placeholder="Referral Code"
                        />
                        <label>Referral Code</label>
                        <ErrorMsg inputName="trybersReferralCode" />
                      </div>
                      </div>
                      <div className="form-group">
                      <div className="input-group">
                        <Field
                          name="sideHustle"
                          className="form-control d-block w-100"
                          placeholder="Side hustle"
                        />
                        <label>Side hustle</label>
                        <ErrorMsg inputName="sideHustle" />
                      </div>
                      </div>
                      <div className="form-group">
                      <div className="input-group">
                        <Field
                          name="serviceProvider"
                          className="form-control d-block w-100"
                          placeholder="Service provider"
                        />
                        <label>Service provider</label>
                        <ErrorMsg inputName="serviceProvider" />
                      </div>
                      </div>
                      <div className="form-group">
                      <div className="input-group">
                        <Field
                          name="preferredName"
                          className="form-control d-block w-100"
                          placeholder="Nickname"
                        />
                        <label>Nickname</label>
                        <ErrorMsg inputName="preferredName" />
                      </div>
                      </div>
                      <div className="form-group">
                      <div className="input-group">
                        <Field
                          name="level"
                          className="form-control d-block w-100"
                          placeholder="Level"
                        />
                        <label>Level</label>
                        <ErrorMsg inputName="level" />
                      </div>
                      </div>
                    </FormikStep>

                    {/* Step Three */}
                    <FormikStep validationSchema={StepThreeSchema}>
                      <div className="form-group">
                      <div className="input-group">
                        <Field
                          name="videoUrl"
                          className="form-control d-block w-100"
                          placeholder="Video URL"
                        />
                        <label>Video URL</label>
                        <ErrorMsg inputName="videoUrl" />
                      </div>
                      </div>

                      <div className="form-group">
                      <div className="input-group">
                        <Field
                          name="instagramHandle"
                          className="form-control d-block w-100"
                          placeholder="Instagram handle"
                        />
                         <label>Instagram handle</label>
                        <ErrorMsg inputName="instagramHandle" />
                      </div>
                      </div>
                      <div className="form-group">
                      <div className="input-group">
                        <Field
                          name="twitterHandle"
                          className="form-control d-block w-100"
                          placeholder="Twitter handle"
                        />
                      <label>Twitter handle</label>
                        <ErrorMsg inputName="twitterHandle" />
                      </div>
                      </div>
                      <div className="form-group">
                      <div className="input-group">
                        <Field
                          name="initialAccountSelected"
                          className="form-control d-block w-100"
                          placeholder="Account number"
                        />
                       <label>Account number</label>
                        <ErrorMsg inputName="initialAccountSelected" />
                      </div>
                      </div>
                      <div className="form-group">
                      <div className="input-group">
                        <Field
                          name="password"
                          type="password"
                          className="form-control d-block w-100"
                          placeholder="Password"
                        />
                      <label>Password</label>
                        <ErrorMsg inputName="password" />
                      </div>
                      </div>
                    </FormikStep>
                  </FormikStepper>
                </div>
              </div>
            </div>
          </div>
        </div>

      <div className="col-lg-6 my-auto bg-signup h-100 bg-red fixed-right d-none d-lg-block d-md-block">
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
      
         </div>
    </div>
  );
});
