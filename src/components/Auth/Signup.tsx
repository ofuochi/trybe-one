import { Field } from "formik";
import { observer } from "mobx-react-lite";
import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { toast } from "react-toastify";
import * as Yup from "yup";

import api from "../../config/api.config";
import { routePath } from "../../constants/route-paths";
import { useStore } from "../../hooks/use-store.hooks";
import { authService } from "../../services";
import { ErrorMsg } from "../Common/ErrorMsg";
import { FormikStep, FormikStepper } from "../Common/FormikStepper";
import { Title } from "../Common/Title";

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
  level: Yup.string().required("required"),
});
const StepTwoSchema = Yup.object().shape({
  mobile: Yup.string()
    .matches(phoneRegExp, "Phone number is not valid e.g 08074488857")
    .required("required"),
  dob: Yup.string().required("required"),
  trybersCode: Yup.string(),
  trybersReferralCode: Yup.string(),

  preferredName: Yup.string().required("required"),
  sideHustle: Yup.string().required("required"),
  serviceProvider: Yup.string().required("required"),
});
const StepThreeSchema = Yup.object().shape({
  videoUrl: Yup.string().url("invalid url"),

  instagramHandle: Yup.string().required("required"),
  twitterHandle: Yup.string().required("required"),
  transactionPIN: Yup.string().required("required"),
  password: Yup.string().required("required"),
});
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
  transactionPIN: "",
  password: "",
};

export const Signup = observer(() => {
  const [dateInput, setDateInput] = useState("text");
  const [countries, setCountries] = useState<API.SchoolCountryList>({});
  const [schools, setSchools] = useState<API.InstitutionList>({});
  const history = useHistory();
  const { signupFormStore } = useStore();

  useEffect(() => {
    api
      .get<API.SchoolCountryList>("/User/GetAllActiveCountries")
      .then(({ data }) => setCountries(data));
  }, []);
  const handleSubmit = async (
    values: API.CreateWalletRequestDto,
    { setSubmitting }: any
  ) => {
    setSubmitting(true);
    values.phoneNumber = values.mobile;
    try {
      const resp = await authService.signup(values);

      if (resp.data.responseCode !== "00") {
        toast.warning(resp.data.responseDescription);
        return;
      }
      const input: API.OTPRequestDto = {
        email: values.email,
        mobile: values.phoneNumber,
        clientID: "1",
      };
      const { data } = await api.post<API.OtpResponse>(
        "User/GenerateOTP",
        input
      );
      if (data.responseCode === "1") {
        const mobile = data.phoneNumber?.slice(data.phoneNumber?.length - 3);
        history.push(
          `${routePath.otp}?mobile=${mobile}&email=${values.email}&phone=${values.phoneNumber}`
        );
        setSubmitting(false);
      } else {
        setSubmitting(false);
        toast.error("An error has occurred");
      }
    } catch (error) {
      setSubmitting(false);
    }
  };
  const getSchools = ({ target }: any) => {
    const countryId = target.value;
    api
      .get<API.InstitutionList>(
        `/User/GetAllActiveInstitutionsByCountry?country=${countryId}`
      )
      .then(({ data }) => setSchools(data));
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
                <div className="col-lg-12">
                  <FormikStepper
                    initialValues={initSignupFormData}
                    onSubmit={handleSubmit}
                  >
                    {/* Step One */}
                    <FormikStep validationSchema={StepOneSchema}>
                      <div className="form-group">
                        <div className="input-group">
                          <Field
                            as="select"
                            name="title"
                            className="form-control d-block w-100"
                          >
                            <option value=""> -Select Title- </option>
                            <option value="Mr">Mr</option>
                            <option value="Ms">Ms</option>
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
                            as="select"
                            name="country"
                            className="form-control d-block w-100"
                            onChange={getSchools}
                            required
                          >
                            <option value="" disabled>
                              -Select Country-
                            </option>
                            {countries.schoolCountries?.length &&
                              countries.schoolCountries.map((country) => (
                                <option key={country.id} value={country.name}>
                                  {country.name}
                                </option>
                              ))}
                          </Field>
                          <label>Country</label>
                          <ErrorMsg inputName="country" />
                        </div>
                      </div>

                      <div className="form-group">
                        <div className="input-group">
                          <Field
                            as="select"
                            name="schoolName"
                            className="form-control d-block w-100"
                            placeholder="School name"
                          >
                            <option value=""> -Select School- </option>
                            {schools.institutions?.map((school) => (
                              <option key={school.id} value={school.id}>
                                {school.institutionName}
                              </option>
                            ))}
                          </Field>
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
                            name="level"
                            className="form-control d-block w-100"
                            placeholder="Level"
                          />
                          <label>Level</label>
                          <ErrorMsg inputName="level" />
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
                            <option value="Ms">Female</option>
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
                            name="transactionPIN"
                            type="transactionPIN"
                            className="form-control d-block w-100"
                            placeholder="PIN"
                          />
                          <label>PIN</label>
                          <ErrorMsg inputName="transactionPIN" />
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
