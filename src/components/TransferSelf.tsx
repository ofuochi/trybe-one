import { useFormik } from "formik";
import React, { useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import { Link } from "react-router-dom";
import Button from 'react-bootstrap/Button'
import api from "../config/api.config";
import { localStoreService } from "../services";
import { Title } from "./common/Title";

export const TransferSelf = () => {
  // const [
  //   txData,
  //   setTxData,
  // ] = useState<API.WalletUserTransactionDetailsResponse>({});
  const [cards, setCards] = useState<API.GetCardResponseDto>({});
  useEffect(() => {
    // const endDate = moment(new Date());
    // const startDate = moment(endDate).subtract(2, "week");
    const currentUser = localStoreService.getCurrentUser();
    // const req: API.UserTransactionRequestDto = {
    //   number: currentUser?.nuban,
    //   startDate: startDate.toISOString(),
    //   endDate: endDate.toISOString(),
    // };
    // api
    //   .post<API.WalletUserTransactionDetailsResponse>(
    //     "/User/GetUserTransactions",
    //     req
    //   )
    //   .then(({ data }) => setTxData(data));

    const getCardInput: API.GetCardRequestDto = {
      accountId: currentUser?.nuban,
    };
    api
      .post<API.GetCardResponseDto>("/User/GetActiveCard", getCardInput)
      .then(({ data }) => setCards(data));
  }, []);
  const formik = useFormik({
    initialValues: {
      email: "",
    },
    onSubmit: (values) => {
      alert(JSON.stringify(values, null, 2));
    },
  });
  return (
    <>
      <Title title="Transactions" />
      <div className="col-lg-8 col-md-8 bd-right px-5 mt-4">
        <div className="page-content">
          <div className="mdc-card info-card info-card--danger overflow-x-auto re-shadow">
            <div className="card-inner row mb-0 d-flex">
              <div className="text-center">
                <Link to="/transferself">
                  <div className="img-w-42">
                    <img
                      alt="img show"
                      src="assets/images/icn-transfer-active.svg"
                    />
                  </div>
                  <p className="d-block text-smaller text-dark mb-0 mt-0">
                    Transfer
                  </p>
                </Link>
              </div>
              <div className="text-center ml-5-re">
                <Link to="#">
                  <div className="img-w-42">
                    <img alt="img show" src="assets/images/icn-paybills.svg" />
                  </div>
                  <p className="d-block text-smaller text-dark mb-0 mt-0">
                    Pay Bills
                  </p>
                </Link>
              </div>
              <div className="text-center ml-5-re">
                <Link to="/airtime">
                  <div className="img-w-42">
                    <img alt="showimg" src="assets/images/icn-airtime.svg" />
                  </div>
                  <p className="d-block text-smaller text-dark mb-0 mt-0">
                    Airtime & Data
                  </p>
                </Link>
              </div>
              <div className="text-center ml-5-re">
                <Link to="#">
                  <div className="img-w-42">
                    <img
                      alt="showimg"
                      src="assets/images/icn-subscription.svg"
                    />
                  </div>
                  <p className="d-block text-smaller text-dark mb-0 mt-0">
                    Subscription
                  </p>
                </Link>
              </div>
              <div className="text-center ml-5-re">
                <Link to="#">
                  <div className="img-w-42">
                    <img alt="showimg" src="assets/images/icn-bamboo.svg" />
                  </div>
                  <p className="d-block text-smaller text-dark mb-0 mt-0">
                    Bamboo
                  </p>
                </Link>
              </div>
              <div className="text-center ml-5-re">
                <Link to="#">
                  <div className="img-w-42">
                    <img alt="showimg" src="assets/images/icn-statement.svg" />
                  </div>
                  <p className="d-block text-smaller text-dark mb-0 mt-0">
                    Statement
                  </p>
                </Link>
              </div>
              <div className="text-center ml-5-re">
                <Link to="#">
                  <div className="img-w-42">
                    <img alt="showimg" src="assets/images/icn-more.svg" />
                  </div>
                  <p className="d-block text-smaller text-dark mb-0 mt-0">
                    More
                  </p>
                </Link>
              </div>
            </div>
          </div>

          <div className="mt-6">
            <p className="mb-0 lead mb-4 p-0">
              Where would you like to send money to?
            </p>
            <div className="mdc-card info-card info-card--danger no-shadow overflow-x-auto">
              <div className="card-inner row mb-0 d-flex">
                <div className="text-center">
                  <Link to="/transferself">
                    <div className="img-w-42">
                      <img alt="showimg" src="assets/images/icn-self.svg" />
                    </div>
                    <p className="d-block text-smaller text-dark mb-0 mt-0">
                      Self
                    </p>
                  </Link>
                </div>
                <div className="text-center ml-6-re">
                  <Link to="#">
                    <div className="img-w-42">
                      <img alt="showimg" src="assets/images/icn-trybe.svg" />
                    </div>
                    <p className="d-block text-smaller text-dark mb-0 mt-0">
                      TrybeOne <br /> Account
                    </p>
                  </Link>
                </div>
                <div className="text-center ml-6-re">
                  <Link to="/transfersterling">
                    <div className="img-w-42">
                      <img alt="showimg" src="assets/images/icn-sterling.svg" />
                    </div>
                    <p className="d-block text-smaller text-dark mb-0 mt-0">
                      Sterling <br /> Account
                    </p>
                  </Link>
                </div>
                <div className="text-center ml-6-re">
                  <Link to="/transferother">
                    <div className="img-w-42">
                      <img alt="showimg" src="assets/images/icn-bank.svg" />
                    </div>
                    <p className="d-block text-smaller text-dark mb-0 mt-0">
                      Other <br /> Banks
                    </p>
                  </Link>
                </div>
                <div className="text-center ml-6-re">
                  <Link to="#">
                    <div className="img-w-42">
                      <img alt="showimg" src="assets/images/icn-foreign.svg" />
                    </div>
                    <p className="d-block text-smaller text-dark mb-0 mt-0">
                      Foreign <br /> Accounts
                    </p>
                  </Link>
                </div>
              </div>
            </div>

            <div className="mt-3">
              <form onSubmit={formik.handleSubmit}>
                <div className="form-group mb-0">
                  <div className="input-group">
                    <div className="input-group-prepend">
                      <span className="input-group-text no-bg bd-0">
                        <img alt="showimg" src="assets/images/ic-amount.svg" />
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
                        <img
                          alt="showimg"
                          src="assets/images/ic-account-dark.svg"
                        />
                      </span>
                    </div>
                    <select className="form-control d-block w-100 pl-5 bdbtm-0">
                      <option value="" selected disabled>
                        Select Account
                      </option>
                      <option>Current Account</option>
                      <option>Savings Account</option>
                      <option>Target Account</option>
                    </select>
                    <label>Select Acount</label>
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
                    {" "}
                    <img
                      alt="showimg"
                      className="mr-3"
                      src="assets/images/ic-send.svg"
                    />
                    Send
                  </Button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
      <div className="col-lg-4 col-md-4">
        <div className="row mb-0 d-flex mt-3 justify-content-between">
          <div className="col s6">
            <div className="text-left">
              <button className="btn no-bg p-0">
                <img alt="showimg" src="assets/images/ic-search.svg" />
              </button>
            </div>
          </div>
          <div className="col s6">
            <div className="text-right">
              <button className="btn no-bg p-0">
                <img alt="img notify" src="assets/images/ic-notification.svg" />
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
                  <img alt="im card" src="assets/images/cardbg.png" />
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