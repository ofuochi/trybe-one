import { RingProgress } from "@ant-design/charts";
import numeral from "numeral";
import React, { useEffect, useState } from "react";
import Slider from "react-slick";

import api from "../config/api.config";
import { Naira } from "../constants/currencies";
import { localStoreService } from "../services";
import { Title } from "./Common/Title";

const progressConfig = {
  height: 50,
  width: 50,
  autoFit: false,
  percent: 0.6,
  color: ["#F4664A", "#E8EDF3"],
  innerRadius: 0.85,
  radius: 0.98,
  statistic: {
    title: {
      style: {
        color: "#3d5",
        fontSize: "2px",
        lineHeight: "14px",
      },
      formatter: () => '<img alt="" src="/assets/images/ic-car.svg" />',
    },
  },
};

const sliderConfig = {
  dots: true,
  arrows:true,
  infinite: false,
  speed: 500,
  slidesToShow: 2,
  slidesToScroll: 1,

  responsive: [
    {
      breakpoint: 1024,
      settings: {
        slidesToShow: 2,
        slidesToScroll: 1,
        infinite: true,
        dots: true,
      },
    },
    {
      breakpoint: 600,
      settings: {
        slidesToShow: 2,
        slidesToScroll: 1,
      },
    },
    {
      breakpoint: 480,
      settings: {
        slidesToShow: 1,
        slidesToScroll: 1,
      },
    },
  ],
};
export const Dashboard = () => {
  const [walletInfo, setWalletInfo] = useState<API.FullDetailsData>();
  useEffect(() => {
    const user = localStoreService.getCurrentUser();
    api
      .get<API.WalletFullDetailsResponse>(
        `/User/GetWalletDetails?number=${user?.nuban}`
      )
      .then(({ data }) => setWalletInfo(data.data));
  }, []);
  const currentDate = new Date().toLocaleString("en-US", {
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
  return (
    <>
      <Title title="Dashboard" />
      <div className="row justify-content-end">
        <button className="btn btn-danger mr-3 mr--5">Become A Tryber</button>
      </div>
      <div className="page-content">
        <div className="row m-0">
          <div className="cardslide col-lg-12 dashboard-slide p-0">
            <Slider {...sliderConfig}>
              <div>
                <div className="slide">
                  <div className="row justify-content-left m-0 px-4 py-3">
                    <div className="mr-4">
                      <i className="mt-4 d-block">
                        <img
                          alt="img-alt"
                          src="assets/images/ic-dash-wallet.svg"
                        />{" "}
                      </i>
                    </div>
                    <div>
                      <p className="small">Account Balance</p>
                      <h2>{`${Naira}${numeral(
                        walletInfo?.availablebalance || 0
                      ).format("0,0.00")}`}</h2>
                    </div>
                  </div>
                </div>
              </div>
              <div>
                <div className="slide">
                  <div className="row justify-content-left m-0 px-4 py-3">
                    <div className="mr-4">
                      <i className="mt-4 d-block">
                        <img
                          alt="img-alt"
                          src="assets/images/ic-dash-investment.svg"
                        />{" "}
                      </i>
                    </div>
                    <div>
                      <p className="small">Total Investments</p>
                      <h2>N20,000</h2>
                    </div>
                  </div>
                </div>
              </div>
              <div>
                <div className="slide">
                  <div className="row justify-content-left m-0 px-4 py-3">
                    <div className="mr-4">
                      <i className="mt-4 d-block">
                        <img
                          alt="img-alt"
                          src="assets/images/ic-dash-book.svg"
                        />{" "}
                      </i>
                    </div>
                    <div>
                      <p className="small">Book Balance</p>
                      <h2>N20,000</h2>
                    </div>
                  </div>
                </div>
              </div>
            </Slider>
          </div>
        </div>

        <div className="row mt-5">
          <div className="col-lg-4">
            <div className="card shadow-sm">
              <div className="card-body text-center">
                <div className="row">
                  <i>
                    <img
                      alt="img-alt"
                      src="assets/images/ic-dash-earn.json].svg"
                    />{" "}
                  </i>
                  <h4 className="line-h70">Earn</h4>
                </div>
              </div>
            </div>
          </div>

          <div className="col-lg-4">
            <div className="card shadow-sm">
              <div className="card-body text-center">
                <div className="row">
                  <i>
                    <img
                      alt="img-alt"
                      src="assets/images/ic-dash-learn.json].svg"
                    />{" "}
                  </i>
                  <h4 className="line-h70">Learn</h4>
                </div>
              </div>
            </div>
          </div>

          <div className="col-lg-4">
            <div className="card shadow-sm">
              <div className="card-body text-center">
                <div className="row">
                  <i>
                    <img
                      alt="img-alt"
                      src="assets/images/ic-dash-fun.json].svg"
                    />{" "}
                  </i>
                  <h4 className="line-h70">Fun</h4>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="row mt-5">
          <div className="col-lg-12 mb-3">
            <div className="card shadow-sm mb-4 bd-0 bg-lite">
              <div className="card-body">
                <div className="row m-0">
                  <div className="progressdiv col-lg-1 p-0">
                    <RingProgress {...progressConfig} />
                  </div>
                  <div className="col-lg-11">
                    <h5 className="d-inline">Free Uber Code</h5>{" "}
                    <span className="small">N 3,000:00</span>
                    <div className="d-block">
                      <span className="text-muted small">{currentDate}</span>
                    </div>
                    <div className="d-block mt-3">
                      <p className="small">
                        Hi Trybers, welcome to the month of{" "}
                        {new Date().toLocaleString("en-us", { month: "long" })},
                        here is a free uber coupon for you. Enjoy 🙂
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="col-lg-12 mb-3">
            <div className="card shadow-sm mb-4 bd-0 bg-lite">
              <div className="card-body">
                <div className="row m-0">
                  <div className="progressdiv col-lg-1 p-0">
                    <RingProgress {...progressConfig} />
                  </div>
                  <div className="col-lg-11">
                    <h5 className="d-inline">Free Uber Code</h5>{" "}
                    <span className="small">N 3,000:00</span>
                    <div className="d-block">
                      <span className="text-muted small">{currentDate}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
