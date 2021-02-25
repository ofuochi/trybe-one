import React from "react";
import Table from "react-bootstrap/Table";
//import { useLocation } from "react-router-dom";

//import { routePath } from "../../../constants/route-paths";

export const Statement = () => {
  // const { pathname } = useLocation();
  //const imgSrc = (currentRoute: string, active: string, inactive: string) =>
  //   pathname === currentRoute
  //     ? `/assets/images/${active}`
  //     : `/assets/images/${inactive}`;
  return (
    <div className="mt-5">
      <p className="mb-0 lead bold p-0">Transaction Statement</p>
      <div className="mdc-card info-card info-card--danger no-shadow overflow-x-auto mt-5 p-0">
        <div className="card-inner row mb-0 d-flex justify-conten-between shadow-sm py-3 m-1 radius-10">
          <div className="col-lg-6">
            <div className="row flex flex-row m-0">
              <img
                className="w-30 mr-3"
                alt="img-plus"
                src="/assets/images/ic-plus.svg"
              />
              <p className="mr-3 pt-2">Income</p>
              <h4 className="pt-2">NGR 1952.68</h4>
            </div>
          </div>
          <div className="col-lg-6">
            <div className="row flex flex-row m-0">
              <img
                className="w-30 mr-3"
                alt="img-plus"
                src="/assets/images/ic-minus.svg"
              />
              <p className="mr-3 pt-2">Expenses</p>
              <h4 className="pt-2">NGR 1952.68</h4>
            </div>
          </div>
        </div>
        <div className="card-inner row mb-0 d-flex">
          <div className="col-lg-12 mt-5">
            <Table className="no-bd" hover>
              <thead>
                <tr>
                  <th>Date</th>
                  <th>Activity</th>
                  <th>Mode</th>
                  <th>Amount</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>02-07-2020</td>
                  <td>Transfer to self</td>
                  <td>
                    {" "}
                    <img
                      className="w-40 mr-3"
                      alt="img-plus"
                      src="/assets/images/icn-transfer.svg"
                    />{" "}
                  </td>
                  <td>+ ₦30,000</td>
                </tr>
                <tr>
                  <td>02-07-2020</td>
                  <td>Transfer to self</td>
                  <td>
                    {" "}
                    <img
                      className="w-40 mr-3"
                      alt="img-plus"
                      src="/assets/images/icn-transfer.svg"
                    />{" "}
                  </td>
                  <td>+ ₦30,000</td>
                </tr>
                <tr>
                  <td>02-07-2020</td>
                  <td>Transfer to self</td>
                  <td>
                    {" "}
                    <img
                      className="w-40 mr-3"
                      alt="img-plus"
                      src="/assets/images/icn-airtime.svg"
                    />{" "}
                  </td>
                  <td>+ ₦30,000</td>
                </tr>
                <tr>
                  <td>02-07-2020</td>
                  <td>Transfer to self</td>
                  <td>
                    {" "}
                    <img
                      className="w-40 mr-3"
                      alt="img-plus"
                      src="/assets/images/icn-subscription.svg"
                    />{" "}
                  </td>
                  <td>+ ₦30,000</td>
                </tr>
              </tbody>
            </Table>
          </div>
        </div>
      </div>
    </div>
  );
};
