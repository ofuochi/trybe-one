import moment from "moment";
import numeral from "numeral";
import { useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import { Link } from "react-router-dom";

import api from "../config/api.config";
import { localStoreService } from "../services";
import { Title } from "./common/Title";

export const TargetSavings = () => {
  const [
    txData,
    setTxData,
  ] = useState<API.WalletUserTransactionDetailsResponse>({});
  const [cards, setCards] = useState<API.GetCardResponseDto>({});
  useEffect(() => {
    const endDate = moment(new Date());
    const startDate = moment(endDate).subtract(2, "week");
    const currentUser = localStoreService.getCurrentUser();
    const req: API.UserTransactionRequestDto = {
      number: currentUser?.nuban,
      startDate: startDate.toISOString(),
      endDate: endDate.toISOString(),
    };
    api
      .post<API.WalletUserTransactionDetailsResponse>(
        "/User/GetUserTransactions",
        req
      )
      .then(({ data }) => setTxData(data));

    const getCardInput: API.GetCardRequestDto = {
      accountId: currentUser?.nuban,
    };
    api
      .post<API.GetCardResponseDto>("/User/GetActiveCard", getCardInput)
      .then(({ data }) => setCards(data));
  }, []);

  
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
        <div className="col-lg-2">
         <div className="mb-1">
         <span
                style={{ width: "10px", height: "10px", float:"left" }}
                className="bg-doughnut-rent rounded-20 mr-1 mt-1 d-block"
              ></span>
              <span className="mt-3 small d-block">Rent</span>
         </div>
         <div className="mb-1">
         <span
                style={{ width: "10px", height: "10px", float:"left" }}
                className="bg-doughnut-cab rounded-20 mr-1 mt-1 d-block"
              ></span>
              <span className="mt-3 small d-block">Cab</span>
         </div>
         <div className="mb-1">
         <span
                style={{ width: "10px", height: "10px", float:"left" }}
                className="bg-doughnut-movies rounded-20 mr-1 mt-1 d-block"
              ></span>
              <span className="mt-3 small d-block">Movies</span>
         </div>
         <div className="mb-1">
         <span
                style={{ width: "10px", height: "10px", float:"left" }}
                className="bg-doughnut-feeding rounded-20 mr-1 mt-1 d-block"
              ></span>
              <span className="mt-3 small d-block">Feeding</span>
         </div>
        </div>
        <div className="col-lg-6">
          <div className="alert alert-danger p-4">
            <h5>Target Savings</h5>
            <p className="small">Target Savings helps you achieve your savings goals while you sit back and relax </p>
          </div>
        </div>
        </div>

          <div className="mt-4">
            <h5 className="mdc-top-app-bar__title mb-0 mb-4 p-0">
              Target Savings
            </h5>

            <div className="col-lg-12">

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

        {cards.data && cards.data.length > 0 && (
          <div className="mt-5 row">
            <h5 className="mdc-top-app-bar__title font-weight-light ml-4 mb-1 p-0">
              Your Cards
            </h5>

            <div className="cardslides">
              {cards.data?.map((card, i) => (
                <div key={i} style={{ display: "block" }}>
                  <img alt="" src="assets/images/cardbg.png" />
                </div>
              ))}
            </div>
          </div>
        )}

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
