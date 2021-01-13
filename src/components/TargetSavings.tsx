import { Helmet } from "react-helmet";

import { Title } from "./common/Title";

export const TargetSavings = () => {
  return (
    <>
      <Title title="Transactions" />
      <div className="col-lg-8 col-md-8 bd-right px-5 mt-4">
        <div className="page-content">
          <div className="row">
            <div className="col-lg-4">
              <div className="d-flex row m-0 mb-4 justify-content-between">
                <canvas
                  style={{ width: "20px", height: "20px" }}
                  id="budgetChart"
                ></canvas>
              </div>
            </div>
            <div className="col-lg-2 pt-4">
              <div className="mb-1">
                <span
                  style={{ width: "10px", height: "10px", float: "left" }}
                  className="bg-doughnut-rent rounded-20 mr-1 mt-1 d-block"
                ></span>
                <span className="mt-3 small d-block">Rent</span>
              </div>
              <div className="mb-1">
                <span
                  style={{ width: "10px", height: "10px", float: "left" }}
                  className="bg-doughnut-cab rounded-20 mr-1 mt-1 d-block"
                ></span>
                <span className="mt-3 small d-block">Cab</span>
              </div>
              <div className="mb-1">
                <span
                  style={{ width: "10px", height: "10px", float: "left" }}
                  className="bg-doughnut-movies rounded-20 mr-1 mt-1 d-block"
                ></span>
                <span className="mt-3 small d-block">Movies</span>
              </div>
              <div className="mb-1">
                <span
                  style={{ width: "10px", height: "10px", float: "left" }}
                  className="bg-doughnut-feeding rounded-20 mr-1 mt-1 d-block"
                ></span>
                <span className="mt-3 small d-block">Feeding</span>
              </div>
            </div>
            <div className="col-lg-6">
              <div className="alert alert-danger p-4">
                <h5>Target Savings</h5>
                <p className="small">
                  Target Savings helps you achieve your savings goals while you
                  sit back and relax{" "}
                </p>
              </div>
            </div>
          </div>

          <div className="mt-4">
            <h5 className="mdc-top-app-bar__title mb-0 mb-4 p-0">
              Target Savings
            </h5>

            <div className="col-lg-12">
              <div className="form-group row m-0">
                <p>Rent</p>
                <input
                  type="range"
                  min="0"
                  max="10"
                  id="formControlRange"
                  className="form-control-range"
                ></input>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="col-lg-4 col-md-4">
        <div className="row mb-0 d-flex mt-3 justify-content-between">
          <div className="col s6">
            <div className="text-left">
              <button className="btn no-bg p-0">
                <img alt="" src="assets/images/ic-search.svg" />
              </button>
            </div>
          </div>
          <div className="col s6">
            <div className="text-right">
              <button className="btn no-bg p-0">
                <img alt="" src="assets/images/ic-notification.svg" />
              </button>
            </div>
          </div>
        </div>

        <div className="mt-4 row">
          <h5 className="mdc-top-app-bar__title font-weight-light ml-4 mb-1 p-0">
            Target Saving
          </h5>

          <ul className="collection bd-0  m-0 pl-3">
            <li className="d-flex row m-0 mb-4 justify-content-between">
              <canvas
                style={{ width: "20px", height: "20px" }}
                id="doughnutChart"
              ></canvas>
              <span
                style={{ width: "10px", height: "10px" }}
                className="bg-doughnut1 rounded-20 m-3 mt-4 d-block"
              ></span>
              <span className="p-title mt-3 d-block">New Phone</span>
              <span className="p-title mt-3 d-block text-right">N 952.87</span>
            </li>
            <li className="d-flex row m-0 mb-4 justify-content-between">
              <canvas
                style={{ width: "20px", height: "20px" }}
                id="doughnutChart2"
              ></canvas>
              <span
                style={{ width: "10px", height: "10px" }}
                className="bg-doughnut2 rounded-20 m-3 mt-4 d-block"
              ></span>
              <span className="title mt-3 d-block">New Phone</span>
              <span className="title mt-3 d-block text-right">N 952.87</span>
            </li>
            <li className="d-flex row m-0 mb-4 justify-content-between">
              <canvas
                style={{ width: "20px", height: "20px" }}
                id="doughnutChart3"
              ></canvas>
              <span
                style={{ width: "10px", height: "10px" }}
                className="bg-doughnut3 rounded-20 m-3 mt-4 d-block"
              ></span>
              <span className="title mt-3 d-block">New Phone</span>
              <span className="title mt-3 d-block text-right">N 952.87</span>
            </li>
          </ul>
        </div>
      </div>
      <Helmet defer>
        <script src="assets/vendors/chartjs/Chart.min.js"></script>
        <script src="assets/vendors/jvectormap/jquery-jvectormap.min.js"></script>
        <script src="assets/vendors/jvectormap/jquery-jvectormap-world-mill-en.js"></script>
        <script src="assets/js/chartjs.js"></script>
        <script src="assets/js/dashboard.js"></script>
      </Helmet>
    </>
  );
};
