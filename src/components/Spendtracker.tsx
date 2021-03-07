import { Pie, RingProgress } from "@ant-design/charts";
import numeral from "numeral";
import { useEffect, useState } from "react";
import Form from "react-bootstrap/Form";

import api from "../config/api.config";
import { Naira } from "../constants/currencies";
import { localStoreService } from "../services";
import { randCol } from "../util/methods-util";
import { Title } from "./Common/Title";

const ringConfig = (color: string, percent: number, icon?: string) => ({
  height: 50,
  width: 50,
  autoFit: false,
  percent,
  color: [color, "#E8EDF3"],
  innerRadius: 0.8,
  radius: 0.98,
  display: "none",
  statistic: {
    title: {
      style: {
        color: "#363636",
        fontSize: "12px",
        lineHeight: "14px",
      },
      formatter: () => icon || "",
    },
  },
});

const getSpending = async (
  input: API.GetUserSpendingByCategoryIDRequest
): Promise<API.GetUserSpendingResponse | undefined> => {
  try {
    const { data } = await api.post<API.GetUserSpendingResponse>(
      "/User/GetUserSpendingByDateAndCatID",
      input
    );
    return data;
  } catch (e) {}
};

interface CategoriesObj {
  [category: string]: {
    category: API.UserTransactionCategoryDto;
    transactions: API.UserSpending[];
  };
}
export const SpendTracker = () => {
  const [catsObj, setCatsObj] = useState<CategoriesObj>({});
  useEffect(() => {
    const transCats: CategoriesObj = {};
    api
      .get<API.UserTransactionCategoryDtoList>(
        "/User/GetAllActiveTransactionCategories"
      )
      .then(({ data }) => {
        data.categories?.forEach((c) => {
          const user = localStoreService.getCurrentUser();
          getSpending({
            spendIngCategoryID: c.id,
            userId: user?.userId,
          }).then((data) => {
            transCats[`${c.id}`] = {
              category: c,
              transactions: data?.spendings || [],
            };
            setCatsObj({ ...transCats });
          });
        });
      });
  }, []);

  const trs = Object.keys(catsObj).map((k) => catsObj[k].transactions.length);
  const totalTransCount = trs.length === 0 ? 0 : trs.reduce((a, b) => a + b);

  const pieConfig = {
    data: Object.keys(catsObj).map((k) => ({
      categoryName: catsObj[k].category.categoryName,
      total: catsObj[k].transactions
        .map((c) => c.totalAmount || 0)
        .reduce((a, b) => a + b),
    })),
    innerRadius: 0.64,
    radius: 1,
    interactions: [{ type: "element-selected" }, { type: "element-active" }],
    appendPadding: 10,
    statistic: {
      content: {
        formatter: (_data1: any, data2: any) => {
          const d = data2.map(
            ({ targetAmountInView }: API.GetTargetSavingsResponseDto) =>
              targetAmountInView
          );
          const sum =
            d.length > 0
              ? d.reduce((prev: number, next: number) => prev + next)
              : 0;

          return `₦${numeral(sum).format("0,0")}`;
        },
      },
      title: {
        formatter: () => "Total",
      },
    },
    angleField: "total",
    colorField: "categoryName",
    color: Object.keys(catsObj).map((k) =>
      randCol(k + catsObj[k].category.categoryName)
    ),
  };
  return (
    <>
      <Title title="Spend Tracker" />

      <div className="page-content">
        <div className="row m-0">
          <div>
            <h5 className="mdc-top-app-bar__title mb-0 mb-0 p-0">
              Track your spending
            </h5>
            <p className="text-muted small">
              We know keeping track of expenses can be stressful, Let us help
              you
            </p>
          </div>
          <div>
            <img alt="img-alt" src="assets/images/ic-dash-earn.svg" />{" "}
          </div>
        </div>
        <div className="row m-0">
          <div className="mr-2">
            <p className="mt-1">Filter by</p>
          </div>
          <div>
            <Form.Group>
              <Form.Label>Example select</Form.Label>
              <Form.Control className="p-1" as="select">
                <option>Days</option>
                <option>Weeks</option>
                <option>Months</option>
              </Form.Control>
            </Form.Group>
          </div>
        </div>

        <div className="row justify-content-center">
          <Pie {...pieConfig} />
        </div>

        <div className="row">
          {Object.keys(catsObj).length > 0 ? (
            <div className="col-lg-12">
              <h5 className="mdc-top-app-bar__title font-weight-light mb-3 p-0">
                Categories
              </h5>
            </div>
          ) : null}

          {Object.keys(catsObj).map((categoryId) => (
            <div key={catsObj[categoryId].category.id} className="col-lg-3 p-0">
              <div className="d-flex row m-0 mb-4 justify-content-left">
                <div className="spendtracker-cat">
                  <RingProgress
                    {...ringConfig(
                      randCol(
                        categoryId + catsObj[categoryId].category.categoryName
                      ),
                      catsObj[categoryId].transactions.length / totalTransCount,
                      catsObj[categoryId].category.categoryIcon
                    )}
                  />
                </div>
                <div className="pl-2">
                  <span className="mt-0 smaller d-block">
                    {catsObj[categoryId].category.categoryName}
                  </span>
                  <span className="mt-1 small d-block text-bold">
                    {`${Naira}${numeral(
                      catsObj[categoryId].transactions
                        .map((c) => c.totalAmount || 0)
                        .reduce((a, b) => a + b)
                    ).format("0,0.00")}`}
                  </span>
                  <span className="mt-1 smaller d-block text-muted">
                    {catsObj[categoryId].transactions.length} Transaction(s)
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};
