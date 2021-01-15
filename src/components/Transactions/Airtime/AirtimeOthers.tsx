import { useFormik } from "formik";
import React from "react";
import Button from "react-bootstrap/Button";

export const AirtimeOthers = () => {
  const formik = useFormik({
    initialValues: {
      email: "",
    },
    onSubmit: (values) => {
      alert(JSON.stringify(values, null, 2));
    },
  });
  return (
    <div className="mt-3">
      <form onSubmit={formik.handleSubmit}>
      <input 
  type="radio" name="emotion" 
  id="airtel" className="input-hidden" />
<label htmlFor="airtel">
  <img 
    src="/assets/images/ic-airtel.svg" 
    alt="airtel" />
</label>

<input 
  type="radio" name="emotion"
  id="mtn" className="input-hidden" />
<label htmlFor="mtn">
  <img 
    src="/assets/images/ic-mtn.svg" 
    alt="mtn" />
</label>

<input 
  type="radio" name="emotion"
  id="9mobile" className="input-hidden" />
<label htmlFor="9mobile">
  <img 
    src="/assets/images/ic-9mobile.svg" 
    alt="9mobile" />
</label>
        <div className="form-group mb-0">
          <div className="input-group">
            <div className="input-group-prepend">
              <span className="input-group-text no-bg bd-0">
                <img alt="showimg" src="/assets/images/ic-amount.svg" />
              </span>
            </div>
            <input
              id="email"
              name="email"
              type="email"
              placeholder="Amount"
              className="form-control d-block w-100 pl-5 bdbtm-0"
              onChange={formik.handleChange}
              value={formik.values.email}
            />
            <label>Amount</label>
          </div>
        </div>

        <div className="form-group mb-0">
          <div className="input-group">
            <div className="input-group-prepend">
              <span className="input-group-text no-bg bd-0">
                <img alt="showimg" src="/assets/images/ic-account-dark.svg" />
              </span>
            </div>
            <input
              id="email"
              name="email"
              type="email"
              placeholder="08075578874 Default Number"
              className="form-control d-block w-100 pl-5"
              onChange={formik.handleChange}
              value={formik.values.email}
            />
            <label>Enter Number</label>
          </div>
        </div>
        <div className="row mx-0 mt-2 mb-3">
          <div>
            <span className="mr-2">
              <img alt="showimg" src="/assets/images/ic-contact.svg" />
            </span>
            <small className="text-grey">Selecet number from contact</small>
          </div>
        </div>

        <div className="form-group mb-0">
          <div className="input-group">
            <div className="input-group-prepend">
              <span className="input-group-text no-bg bd-0">
                <img alt="showimg" src="/assets/images/ic-bank.svg" />
              </span>
            </div>
            <select className="form-control d-block w-100 pl-5">
              <option value="" selected disabled>
                Source Account
              </option>
              <option>Current Account</option>
              <option>Savings Account</option>
              <option>Target Account</option>
            </select>
            <label>Source Account</label>
          </div>
        </div>

        <div className="form-group row m-0 justify-content-end mt-4">
          <Button size="lg" variant="danger" className="px-5">
            {" "}
            <img
              alt="showimg"
              className="mr-3"
              src="/assets/images/ic-send.svg"
            />
            Send
          </Button>
        </div>
      </form>
    </div>
  );
};
