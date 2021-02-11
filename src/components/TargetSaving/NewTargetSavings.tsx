import { Field, Form, Formik } from "formik";
import React from "react";
import { Button } from "react-bootstrap";
import { useHistory } from "react-router-dom";
import { toast } from "react-toastify";
import * as Yup from "yup";
import api from "../../config/api.config";
import { routePath } from "../../constants/route-paths";
import { localStoreService } from "../../services";
import { ErrorMsg } from "../Common/ErrorMsg";

import { Title } from "../Common/Title";

const validationSchema = Yup.object().shape({
  period: Yup.number().min(1).required("required"),
  item: Yup.string().required("required"),
  amt: Yup.number().min(1).required("required"),
  savingsFrequencyID: Yup.number().min(1).required("required"),
  nextRenewalDate: Yup.string().required("required"),
});

export const NewTargetSavings = () => {
  const currentUser = localStoreService.getCurrentUser();
  const history = useHistory();
  const initialValues: API.AddTargetSavingsRequestDto = {
    profileID: currentUser?.userId,
    id: currentUser?.userId,
    txndate: new Date().toISOString(),
    nextRenewalDate: "",
    savingsFrequencyID: 0,
    item: "",
    period: 0,
    amt: 0,
  };
  const handleSubmit = (
    values: API.AddTargetSavingsRequestDto,
    { setSubmitting, resetForm }: any
  ) => {
    api
      .post<API.BaseResponse>("/User/SubmitTargetSavings", values)
      .then(({ data }) => {
        setSubmitting(false);

        if (data.responseCode === "00") {
          resetForm();
          toast.success(data.responseDescription, { position: "top-center" });
          history.push(routePath.targetSavings.index);
        } else
          toast.error(data.responseDescription, { position: "top-center" });
      })
      .catch(() => {
        setSubmitting(false);
      });
  };
  return (
    <>
      <Title title="New Target Savings" />
      <div className="col-lg-8 col-md-8 bd-right pl-5 pr-3 mt-4">
        <div className="page-content">
          <div className="row">
            <div className="col-lg-12 mb-4">
              <h4>New Target Savings </h4>
            </div>
            <div className="col-lg-12">

<div className="custom-radio row justify-content-between m-0">
<input type="radio" id="cat" name="animal" value="" checked />
<label className="px-3 py-3 btn btn-light shadow-sm col-lg-5" htmlFor="cat">    
<i className="i-ic">
      <img
        className="ml-2 w-30 mr-3"
        alt=""
        src="/assets/images/ic-target.svg"
      />
    </i>
    Target Box</label>

<input type="radio" id="dog" name="animal" value="" />
<label className="px-3 py-3 btn btn-light shadow-sm col-lg-5" htmlFor="dog" >     <i className="i-ic">
      <img
        className="ml-2 w-30 mr-3"
        alt=""
        src="/assets/images/ic-targetb.svg"
      />
    </i>
    Eye on the Goal</label>
</div>
</div>
            
            
            </div>



            <Formik
              initialValues={initialValues}
              validationSchema={validationSchema}
              onSubmit={handleSubmit}
            >
              {({ isSubmitting }) => (
                <Form>
                
                
                <div className="row">
<div className="mt-4 col-lg-12">
<h5 className="mdc-top-app-bar__title mb-0 mb-4 p-0">
              Target box savings
            </h5>
</div>


<div className="col-lg-12">       

                
                  <div className="form-group mb-0">
                  <div className="input-group">
                    <Field
                      name="amt"
                      type="number"
                      min={1}
                      placeholder="How much do you want to save"
                      className="form-control d-block w-100 bdbtm-0 bd-radius-0"
                    />
                    <label htmlFor="amt">How much do you want to save</label>
                    <ErrorMsg inputName="amt" />
                    </div>
                  </div>

         <div className="form-group mb-0">
         <div className="input-group">
                    <Field
                      name="item"
                      placeholder="Name of Target you want to save for"
                      className="form-control d-block w-100 bdbtm-0 bd-radius-0"
                    />
                    <label htmlFor="item">
                      Name of Target you want to save for
                    </label>
                    <ErrorMsg inputName="item" />
                  </div>
         </div>
                  
                  <div className="form-group mb-0">
                    <div className="input-group">
                        <Field
                      type="number"
                      min="1"
                      name="period"
                      placeholder="Period"
                      className="form-control d-block w-100 bdbtm-0 bd-radius-0"
                    />
                    <label htmlFor="period">
                      How long do you want to save for? (days)
                    </label>
                    <ErrorMsg inputName="period" />
                    </div>
                  </div>

                  <div className="form-group mb-0">
                  <div className="input-group">
                    <Field
                      type="number"
                      min={1}
                      name="savingsFrequencyID"
                      placeholder="How often should you be debited"
                      className="form-control d-block w-100 bdbtm-0 bd-radius-0"
                    />
                    <label htmlFor="savingsFrequencyID">
                      How often should you be debited
                    </label>
                    <ErrorMsg inputName="savingsFrequencyID" />
                  </div>
                  </div>


                  <div className="form-group mb-0">
                  <div className="input-group">
                    <Field
                      type="time"
                      name="nextRenewalDate"
                      placeholder="What time of the day should we debit you"
                      className="form-control d-block w-100 bd-radius-0"
                    />
                    <label htmlFor="nextRenewalDate">
                      What time of the day should we debit you
                    </label>
                    <ErrorMsg inputName="nextRenewalDate" />
                  </div>
                  </div>


                  <div className="mt-4 row">
                    <div className="col-lg-7"></div>
                    <div className="col-lg-5 text-right">
                      <Button
                        variant="danger"
                        className="px-4"
                        type="submit"
                        disabled={isSubmitting}
                      >
                        <img
                          alt="showing"
                          className="mr-3"
                          src="/assets/images/ic-send.svg"
                        />
                        Create Target
                      </Button>
                    </div>
                  </div>
                  </div>
                  </div>
                </Form>
              )}
            </Formik>

        </div>
      </div>
      <div className="col-lg-4 col-md-4">
        <div className="row mb-0 d-flex mt-3 justify-content-between">
          <div className="col s6">
            <div className="text-left">
              <button className="btn no-bg p-0">
                <img alt="" src="/assets/images/ic-search.svg" />
              </button>
            </div>
          </div>
          <div className="col s6">
            <div className="text-right">
              <button className="btn no-bg p-0">
                <img alt="" src="/assets/images/ic-notification.svg" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
