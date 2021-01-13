import moment from "moment";
import { useEffect, useState } from "react";

import api from "../../config/api.config";
import { localStoreService } from "../../services";

const List = () => {
  const [
    txData,
    setTxData,
  ] = useState<API.WalletUserTransactionDetailsResponse>({});

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
  }, []);
  return (
    <div className="mt-6">
      <h5 className="mdc-top-app-bar__title mb-0 mb-4 p-0">
        Recent Transactions
      </h5>
      <table className="highlight table">
        <tbody>
          {txData.data?.map((tx, i) => (
            <tr key={i}>
              <td>
                <img
                  alt=""
                  className="w-40"
                  src="/assets/images/icn-transfer.svg"
                />
              </td>
              <td>{tx.remarks}</td>
              <td>{moment(tx.trA_DATE).format("D MMM YYYY")}</td>
              <td>
                <span
                  className={`new badge blue-outline bg-white ${
                    tx.deb_cre_ind === 1 ? "text-danger" : "text-success"
                  }`}
                >
                  {tx.deb_cre_ind === 1 ? "Debit" : "Credit"}
                </span>
              </td>
              <td>{`₦${numeral(tx.amt).format("0,0")}`}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default List;
