import { Field, Form, Formik } from "formik";
import React, { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";

import api from "../../../config/api.config";
import { localStoreService } from "../../../services";
import { ErrorMsg } from "../../Common/ErrorMsg";

export const Bills = () => {
  const [userDetails, setUserDetails] = useState<
    API.UserResponseModel | undefined
  >();
  const [billCategories, setBillCategories] = useState<API.Category[]>([]);
  const [billers, setBillers] = useState<API.Biller[]>([]);
  const [billerItems, setBillerItems] = useState<API.BillerItemList[]>([]);
  const [accts, setAccts] = useState<API.UserNubanDto[]>([]);

  useEffect(() => {
    const currentUser = localStoreService.getCurrentUser();
    api
      .get<API.UserResponseModel>(
        `/User/GetUserByEmail?email=${currentUser?.email}`,
        { cache: { clearOnStale: true } }
      )
      .then(({ data }) => setUserDetails(data));
    api
      .get<API.InterswitchGetBillerCategoryResponseDto>(
        "/User/GetBillerCategories",
        { cache: { clearOnStale: true } }
      )
      .then(({ data }) =>
        setBillCategories(data.responseArray?.[0]?.categories || [])
      );
  }, []);

  const initialValues = {
    categoryId: "",
    billerId: "",
    billerItemId: "",
    account: "",
  };
  return (
    <div className="mt-5">
      <p className="mb-3 lead p-0">Which Bill would you like to pay for?</p>

      <Formik
        initialValues={initialValues}
        onSubmit={(values, actions) => {
          setTimeout(() => {
            alert(JSON.stringify(values, null, 2));
            actions.setSubmitting(false);
          }, 1000);
        }}
      >
        {({ isSubmitting, handleChange, resetForm, values }) => (
          <Form>
            <div className="form-group mb-3">
              <div className="input-group">
                <Field
                  as="select"
                  name="categoryId"
                  placeholder="Select Bill"
                  className="form-control d-block w-100"
                  onChange={(e: any) => {
                    resetForm();
                    handleChange(e);

                    setBillers([]);
                    setBillerItems([]);
                    setAccts([]);

                    const value = e.target.value;
                    value &&
                      api
                        .get<API.GetBillerByCategoryResponse>(
                          `/User/GetBillerByCategory?categoryId=${value}`,
                          { cache: { clearOnStale: true } }
                        )
                        .then(({ data }) => {
                          setBillers(
                            data.getBillerByCategoryArray?.[0]?.billers || []
                          );
                        });
                  }}
                >
                  <option value="" disabled>
                    -Select Bills Category-
                  </option>
                  {billCategories.map((b) => (
                    <option key={b.id} value={b.id}>
                      {b.name} - {b.description}
                    </option>
                  ))}
                </Field>
                <label htmlFor="categoryId">Select Bills Category</label>
                <ErrorMsg inputName="categoryId" />
              </div>
            </div>

            {billers.length ? (
              <div className="form-group mb-3">
                <div className="input-group">
                  <Field
                    as="select"
                    name="billerId"
                    placeholder="Select Biller"
                    onChange={(e: any) => {
                      resetForm({
                        values: {
                          categoryId: values.categoryId,
                          account: "",
                          billerId: "",
                          billerItemId: "",
                        },
                      });
                      handleChange(e);

                      setBillerItems([]);
                      setAccts([]);
                      initialValues.account = "";
                      initialValues.billerId = "";
                      initialValues.billerItemId = "";
                      const value = e.target.value;
                      value &&
                        api
                          .get<API.GetPaymentItemResponseDto>(
                            `/User/GetPaymentItem?billerId=${value}`,
                            { cache: { clearOnStale: true } }
                          )
                          .then(({ data }) => {
                            setBillerItems(
                              data.getPaymentItemResponseArray?.[0]
                                ?.billerItemLists || []
                            );
                          });
                    }}
                    className="form-control d-block w-100"
                  >
                    <option value="" disabled>
                      -Select Biller-
                    </option>

                    {billers.map((u) => (
                      <option key={u.id} value={u.id}>
                        {u.name} - {u.narration}
                      </option>
                    ))}
                  </Field>
                  <label htmlFor="billerId">Select Biller</label>
                  <ErrorMsg inputName="billerId" />
                </div>
              </div>
            ) : null}
            {billerItems.length ? (
              <div className="form-group mb-3">
                <div className="input-group">
                  <Field
                    as="select"
                    name="billerItemId"
                    placeholder="Select Biller Item"
                    onChange={(e: any) => {
                      handleChange(e);
                      const value = e.target.value;
                      initialValues.account = "";
                      initialValues.billerItemId = "";

                      value
                        ? setAccts(userDetails?.accountDetails || [])
                        : setAccts([]);
                    }}
                    className="form-control d-block w-100"
                  >
                    <option value="" disabled>
                      -Select Biller Item-
                    </option>

                    {billerItems.map((u) => (
                      <option key={u.id} value={u.id}>
                        {u.name}
                      </option>
                    ))}
                  </Field>
                  <label htmlFor="billerItemId">Select Biller Item</label>
                  <ErrorMsg inputName="billerItemId" />
                </div>
              </div>
            ) : null}
            {accts.length ? (
              <>
                <div className="form-group mb-5">
                  <div className="input-group">
                    <Field
                      as="select"
                      name="account"
                      placeholder="Select Account"
                      className="form-control d-block w-100"
                    >
                      <option value="" disabled>
                        -Select Account-
                      </option>

                      {accts.map((u) => (
                        <option key={u.accountNumber} value={u.accountNumber}>
                          {u.accountNumber}
                        </option>
                      ))}
                    </Field>
                    <label htmlFor="account">Select Account</label>
                    <ErrorMsg inputName="account" />
                  </div>
                </div>
                <div className="form-group row m-0 justify-content-end mt-4">
                  <Button
                    size="lg"
                    variant="danger"
                    className="px-5"
                    type="submit"
                    disabled={isSubmitting}
                  >
                    Pay
                  </Button>
                </div>
              </>
            ) : null}
          </Form>
        )}
      </Formik>
    </div>
  );
};
