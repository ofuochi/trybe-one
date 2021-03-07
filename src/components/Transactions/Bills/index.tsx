import { Field, Form, Formik } from "formik";
import React, { useEffect, useState } from "react";
import { Button, Spinner } from "react-bootstrap";
import NumberFormat from "react-number-format";
import { toast } from "react-toastify";
import * as Yup from "yup";
import numeral from "numeral";
import api from "../../../config/api.config";
import { localStoreService } from "../../../services";
import { ErrorMsg } from "../../Common/ErrorMsg";
import { useStore } from "../../../hooks/use-store.hooks";

export const Bills = () => {
  const [userDetails, setUserDetails] = useState<
    API.UserResponseModel | undefined
  >();
  const [billCategories, setBillCategories] = useState<API.Category[]>([]);
  const [billers, setBillers] = useState<API.Biller[]>([]);
  const [billerItems, setBillerItems] = useState<API.BillerItemList[]>([]);
  const [
    selectedBillerItem,
    setSelectedBillerItem,
  ] = useState<API.BillerItemList>();
  const [accts, setAccts] = useState<API.UserNubanDto[]>([]);
  const {
    loaderStore: { setShowLoader },
  } = useStore();
  useEffect(() => {
    const currentUser = localStoreService.getCurrentUser();
    api
      .get<API.UserResponseModel>(
        `/User/GetUserByEmail?email=${currentUser?.email}`
      )
      .then(({ data }) => setUserDetails(data));
    api
      .get<API.InterswitchGetBillerCategoryResponseDto>(
        "/User/GetBillerCategories"
      )
      .then(({ data }) =>
        setBillCategories(data.responseArray?.[0]?.categories || [])
      );
  }, []);

  let initialValues = {
    amount: selectedBillerItem?.amount || "",
    account: "",
    billerId: "",
    billerItemId: "",
    categoryId: "",
    consumerIdField: "",
    pin: "",
  };
  const amt = +(selectedBillerItem?.amount || 0);
  const validationSchema = Yup.object().shape({
    categoryId: Yup.string().required("required"),
    billerId: Yup.string().required("required"),
    billerItemId: Yup.string().required("required"),
    consumerIdField: Yup.string().required("required"),
    account: Yup.string().required("required"),
    pin: Yup.string().required("required"),
    amount: selectedBillerItem?.isAmountFixed
      ? Yup.number().notRequired()
      : Yup.number()
          .min(
            amt <= 0 ? 1 : amt,
            `min amount is ${numeral(amt <= 0 ? 1 : amt).format("0,0.00")}`
          )
          .default(amt)
          .required("required"),
  });
  return (
    <div className="mt-5">
      <p className="mb-3 lead p-0">Which Bill would you like to pay for?</p>

      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={(values, { setSubmitting, resetForm }) => {
          setShowLoader(true);
          const input: API.PayBillerRequestDto = {
            referenceid: Date.now().toString(),
            amt: values.amount || selectedBillerItem?.amount,
            requestType: 0,
            paymentcode: selectedBillerItem?.paymentCode,
            mobile: userDetails?.phoneNumber,
            email: userDetails?.email,
            subscriberInfo1: values.billerItemId,
            nuban: values.account,
            appId: 0,
            pin: values.pin,
            transactionType: selectedBillerItem?.isAmountFixed
              ? "bills"
              : "vtu",
            remark: "Payment",
          };
          api
            .post<API.WalletToWalletFTRes>("/User/PayBiller", input)
            .then(({ data }) => {
              setSubmitting(false);
              setShowLoader(false);
              if (data.responseCode === "00") {
                resetForm();
                setBillCategories([]);
                toast.success(data.responseDescription, {
                  position: "top-center",
                });
              } else
                toast.error(data.responseDescription, {
                  position: "top-center",
                });
            })
            .catch(() => {
              setSubmitting(false);
              setShowLoader(false);
            });
        }}
      >
        {({ isSubmitting, handleChange, resetForm, values, setFieldValue }) => (
          <Form>
            <div className="form-group mb-3">
              <div className="input-group">
                <Field
                  as="select"
                  name="categoryId"
                  placeholder="Select Bill"
                  className="form-control d-block w-100"
                  disabled={isSubmitting}
                  onChange={(e: any) => {
                    resetForm();
                    handleChange(e);

                    setBillers([]);
                    setBillerItems([]);
                    setAccts([]);
                    setSelectedBillerItem(undefined);

                    const value = e.target.value;
                    value &&
                      api
                        .get<API.GetBillerByCategoryResponse>(
                          `/User/GetBillerByCategory?categoryId=${value}`
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
                    disabled={isSubmitting}
                    onChange={(e: any) => {
                      resetForm({
                        values: {
                          categoryId: values.categoryId,
                          account: "",
                          billerId: "",
                          billerItemId: "",
                          amount: "",
                          consumerIdField: "",
                          pin: "",
                        },
                      });
                      handleChange(e);

                      setBillerItems([]);
                      setAccts([]);
                      setSelectedBillerItem(undefined);

                      initialValues.account = "";
                      initialValues.billerId = "";
                      initialValues.billerItemId = "";
                      const value = e.target.value;
                      value &&
                        api
                          .get<API.GetPaymentItemResponseDto>(
                            `/User/GetPaymentItem?billerId=${value}`
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
                    disabled={isSubmitting}
                    placeholder="Select Biller Item"
                    onChange={(e: any) => {
                      handleChange(e);

                      const value = e.target.value;
                      resetForm({
                        values: {
                          categoryId: values.categoryId,
                          account: values.account,
                          billerId: values.billerId,
                          billerItemId: value,
                          amount: "",
                          consumerIdField: "",
                          pin: values.pin,
                        },
                      });
                      setSelectedBillerItem(undefined);

                      if (value) {
                        setAccts(userDetails?.accountDetails || []);
                        const biller = billerItems.find((x) => x.id === value);
                        setTimeout(() => setSelectedBillerItem(biller));
                      }
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
            {selectedBillerItem && (
              <>
                <div className="form-group mb-3">
                  <div className="input-group">
                    <Field
                      name="amount"
                      placeholder="Amount"
                      className="form-control d-block w-100"
                      disabled={selectedBillerItem.isAmountFixed}
                      onValueChange={({ value }: any) => {
                        handleChange(value);
                        setFieldValue("amount", value);
                      }}
                      defaultValue={
                        +(selectedBillerItem.amount || 0) === 0
                          ? ""
                          : selectedBillerItem.amount
                      }
                      thousandSeparator={true}
                      component={NumberFormat}
                    />

                    <label htmlFor="amount">Amount</label>
                    <ErrorMsg inputName="amount" />
                  </div>
                </div>
                <div className="form-group mb-3">
                  <div className="input-group">
                    <Field
                      name="consumerIdField"
                      placeholder={selectedBillerItem.consumerIdField}
                      className="form-control d-block w-100"
                    />

                    <label htmlFor="consumerIdField">
                      {selectedBillerItem.consumerIdField}
                    </label>
                    <ErrorMsg inputName="consumerIdField" />
                  </div>
                </div>
                {accts.length ? (
                  <>
                    <div className="form-group mb-3">
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
                            <option
                              key={u.accountNumber}
                              value={u.accountNumber}
                            >
                              {u.accountNumber}
                            </option>
                          ))}
                        </Field>
                        <label htmlFor="account">Select Account</label>
                        <ErrorMsg inputName="account" />
                      </div>
                    </div>
                    <div className="form-group mb-3">
                      <div className="input-group">
                        <Field
                          name="pin"
                          placeholder="PIN"
                          type="password"
                          className="form-control d-block w-100"
                        />
                        <label htmlFor="pin">PIN</label>
                        <ErrorMsg inputName="pin" />
                      </div>
                    </div>
                    <div className="form-group row m-0 justify-content-end mt-4">
                      {isSubmitting ? (
                        <Button size="lg" variant="danger" disabled>
                          <Spinner animation="grow" role="status">
                            <span className="sr-only">Loading...</span>
                          </Spinner>{" "}
                          Paying...
                        </Button>
                      ) : (
                        <Button
                          size="lg"
                          variant="danger"
                          className="px-5"
                          type="submit"
                          disabled={isSubmitting}
                        >
                          Pay
                        </Button>
                      )}
                    </div>
                  </>
                ) : null}
              </>
            )}
          </Form>
        )}
      </Formik>
    </div>
  );
};
