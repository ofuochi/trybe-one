import { Field } from "formik";
import React, { useState } from "react";
import { Title } from "../common/Title";


export const Otp = () => {

  return (
    <div className="container-fluid vh-100">
      <Title title="Signup" />

      <div className="row align-items-center h-100">
 
      <div className="col-lg-6 px-2">
          <div className="card bd-0">
            <div className="card-body card-repadd">
         

              <h3 className="text-center">Please Enter The OTP to Verify Your Account</h3>
              <p className="text-center lead mb-5 text-muted">
              An OTP (one time Password) was sent to 0823*****23
              </p>

              <div className="row justify-content-center">
           
                <div className="col-lg-10 text-center">
              
                      <div className="form-group">
                      <div className="input-group">
                       <input type="text" className="form-control inp-otp" placeholder="****"/>
                      </div>
                      </div>
                      <p>OTP expires in <span className="text-primary">60s</span></p>

                      <button
                      className="btn btn-lg btn-primary px-5 mb-4"type="submit">
                        Validate OTP
                        </button>
                        <p>Did not receive OTP? Invalid OPT? <span className="text-primary">Resend</span></p>
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
