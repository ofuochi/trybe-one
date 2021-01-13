import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { toast } from "react-toastify";

import api from "../../config/api.config";
import { routePath } from "../../constants/route-paths";
import { Title } from "../Common/Title";

export const Otp = () => {
  const [mobile, setMobile] = useState<string | undefined>(undefined);
  const [otp, setOtp] = useState("");
  const history = useHistory();

  useEffect(() => {
    const phone = getQueryVariable("mobile");
    setMobile(phone);
  }, []);

  const getQueryVariable = (variable: string) => {
    const query = window.location.search.substring(1);
    const vars = query.split("&");
    for (var i = 0; i < vars.length; i++) {
      const pair = vars[i].split("=");
      if (pair[0] === variable) {
        return pair[1];
      }
    }
  };

  const resendOtp = () => {
    const email = getQueryVariable("email");
    const phoneNumber = getQueryVariable("phone");
    const input: API.OTPRequestDto = {
      email,
      mobile: phoneNumber,
      clientID: "1",
    };
    api.post<API.OtpResponse>("User/GenerateOTP", input).then(({ data }) => {
      const phone = data.phoneNumber?.slice(data.phoneNumber?.length - 3);
      setMobile(phone);
    });
  };
  return (
    <div className="container-fluid vh-100">
      <Title title="Signup" />

      <div className="row align-items-center h-100">
        <div className="col-lg-6 px-2">
          <div className="card bd-0">
            <div className="card-body card-repadd">
              <h3 className="text-center">
                Please Enter The OTP to Verify Your Account
              </h3>
              <p className="text-center lead mb-5 text-muted">
                An OTP (one time Password) was sent to ****{mobile}
              </p>

              <div className="row justify-content-center">
                <div className="col-lg-10 text-center">
                  <div className="form-group">
                    <div className="input-group">
                      <input
                        type="text"
                        className="form-control inp-otp"
                        placeholder="****"
                        onChange={(input) => setOtp(input.target.value)}
                      />
                    </div>
                  </div>
                  <p>
                    OTP expires in <span className="text-primary">60s</span>
                  </p>

                  <button
                    className="btn btn-lg btn-primary px-5 mb-4"
                    onClick={() => {
                      const phoneNumber = getQueryVariable("phone");
                      const req: API.ValidateOtpRequest = {
                        mobile: phoneNumber,
                        otp,
                      };
                      api
                        .post<API.OtpResponse>("/User/ValidateOTP", req)
                        .then(() => {
                          toast.success(
                            "You've successfully registered. Please login.",
                            {
                              position: "top-center",
                              delay: 0,
                            }
                          );
                          history.push(routePath.login);
                        });
                    }}
                  >
                    Validate OTP
                  </button>
                  <p>
                    Did not receive OTP? Invalid OPT?
                    <button
                      className="text-primary btn btn-link"
                      onClick={resendOtp}
                    >
                      resend
                    </button>
                  </p>
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
};
