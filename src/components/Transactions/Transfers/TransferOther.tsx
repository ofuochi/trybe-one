import { useFormik } from "formik";
import React from "react";
import Button from "react-bootstrap/Button";

export const TransferOther = () => {
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
              placeholder="Source Amount"
              className="form-control d-block w-100 pl-5 bdbtm-0"
              onChange={formik.handleChange}
              value={formik.values.email}
            />
            <label>Source Account</label>
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
              placeholder="Destination Account"
              className="form-control d-block w-100 pl-5 bdbtm-0"
              onChange={formik.handleChange}
              value={formik.values.email}
            />
            <label>Destination Account</label>
          </div>
        </div>

        <div className="form-group mb-0">
          <div className="input-group">
            <div className="input-group-prepend">
              <span className="input-group-text no-bg bd-0">
                <img alt="showimg" src="/assets/images/ic-bank.svg" />
              </span>
            </div>
            <select className="form-control d-block w-100 pl-5 bdbtm-0">
              <option value="" selected disabled>
                Choose the bank
              </option>
              <option>Current Account</option>
              <option>Savings Account</option>
              <option>Target Account</option>
            </select>
            <label>Choose the bank</label>
          </div>
        </div>

        <div className="form-group mb-0">
          <div className="input-group">
            <div className="input-group-prepend">
              <span className="input-group-text no-bg bd-0">
                <img alt="showimg" src="/assets/images/ic-account-dark.svg" />
              </span>
            </div>
            <select className="form-control d-block w-100 pl-5 bdbtm-0">
              <option value="" selected disabled>
                John Doe
              </option>
              <option>John Doe</option>
              <option>John Doe</option>
            </select>
          </div>
        </div>

        <div className="form-group mb-0">
          <div className="input-group">
            <div className="input-group-prepend"></div>
            <textarea
              rows={3}
              className="form-control d-block w-100 pl-5"
              placeholder="Reason or comment for transfer (optional)"
            ></textarea>
          </div>
        </div>
        <div className="form-group row m-0 justify-content-end mt-4">
          <Button size="lg" variant="danger" className="px-5">
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
