import { Field, Form, Formik } from "formik";
import React from "react";
import { Link, useHistory } from "react-router-dom";
import * as Yup from "yup";

import { routePath } from "../../constants/route-paths";
import { useStore } from "../../hooks/use-store.hooks";
import { ErrorMsg } from "../Common/ErrorMsg";
import { Title } from "../Common/Title";


export const Resetpassword = () => {
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
            <div className="card-body card-repadd text-center">
               <Link to={routePath.home}>
                      <img alt="logo" src="/assets/images/logo.png" />
                    </Link>

             <div className="mt-5">
            <img alt="logo" src="/assets/images/ic-sentotp.svg" />
             </div>        
              
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
