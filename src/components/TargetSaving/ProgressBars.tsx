import { Progress } from "@ant-design/charts";
import { observer } from "mobx-react-lite";
import React, { useState } from "react";
import { Button, Form, Modal } from "react-bootstrap";
import { Link } from "react-router-dom";
import numeral from "numeral";
import { routePath } from "../../constants/route-paths";
import { useStore } from "../../hooks/use-store.hooks";
import { Formik, Field } from "formik";
import { ErrorMsg } from "../Common/ErrorMsg";
import * as Yup from "yup";
import { localStoreService } from "../../services";

const ProgressBars = observer(() => {
  const [showTargetDetails, setShowTargetDetails] = useState(false);
  const [showBreakTargetDetails, setShowBreakTargetDetails] = useState(false);
  const [showUpdateTargetDetails, setShowUpdateTargetDetails] = useState(false);
  const [isSubmittingBreaking, setIsSubmittingBreaking] = useState(false);
  const [isSubmittingForm, setIsSubmittingForm] = useState(false);

  const { targetStore } = useStore();
  const [showOpt, setShowOpt] = useState(false);
  const [
    targetSaving,
    setTargetSaving,
  ] = useState<API.GetTargetSavingsResponseDto>({});
  const initialValues: API.UpdateTargetSavingsRequest = {
    profileId: localStoreService.getCurrentUser()?.userId,
    newAmount: ("" as unknown) as number,
    targetId: targetSaving?.id,
  };
  const handleSubmit = async (
    values: API.UpdateTargetSavingsRequest,
    { setSubmitting }: any
  ) => {
    setIsSubmittingForm(true);
    await targetStore.updateTarget(values);

    setSubmitting(false);
    setIsSubmittingForm(false);
    setShowUpdateTargetDetails(false);
  };
  const updateSchema = Yup.object().shape({
    newAmount: Yup.number()
      .min(1)
      .max(
        targetSaving?.targetAmountInView || 1,
        `New amount cannot be more than target of ₦${numeral(
          targetSaving?.targetAmountInView
        ).format("0,0")}`
      )
      .required("required"),
  });
  return (
    <>
      {targetStore.getAllTargets.length > 0 ? (
        <>
          <div className="mt-4">
            <h5 className="mdc-top-app-bar__title mb-0 mb-4 p-0">
              Target Savings
            </h5>
            {targetStore.getAllTargets.map((item) => (
              <div className="col-lg-12 mb-4" key={item.id}>
                <div className="form-group row justify-content-between m-0">
                  <div className="col-lg-2 text-left p-0">
                    <p className="mb-0">{item.item}</p>
                  </div>
                  <div className="col-lg-8 pl-0">
                    <span
                      style={{ cursor: "pointer" }}
                      onClick={() => {
                        setShowOpt(!showOpt);
                        setTargetSaving(item);
                      }}
                    >
                      <Progress
                        // height={15}
                        // autoFit={false}
                        percent={item.percentageCompletion}
                        progressStyle={{
                          cursor: "pointer",
                          fillOpacity: 0.7,
                          strokeOpacity: 0.7,
                        }}
                        color={item.color}
                      />
                    </span>
                  </div>
                  <div className="col-lg-2 p-0">
                    <p className="smaller mb-0 pt-1">
                      <b>{`₦${numeral(item.targetAmountInView).format(
                        "0,0"
                      )}`}</b>

                      <img
                        className="ml-2"
                        alt=""
                        src="/assets/images/ic-right-angle.svg"
                      />
                    </p>
                  </div>
                </div>
                {showOpt && targetSaving?.id === item.id ? (
                  <div>
                    <div className="row m-0 justify-content-between mt-2 mb-3 col-lg-10">
                      <Button
                        variant="light"
                        className="px-4 border"
                        onClick={() => setShowTargetDetails(true)}
                      >
                        See Details
                      </Button>

                      <Button
                        variant="danger"
                        className="px-4"
                        onClick={() => setShowUpdateTargetDetails(true)}
                      >
                        Update
                      </Button>

                      <Button
                        variant="light"
                        className="px-4 border-primary"
                        onClick={() => setShowBreakTargetDetails(true)}
                      >
                        Break Box
                      </Button>
                    </div>
                  </div>
                ) : null}
              </div>
            ))}
          </div>

          <div className="mt-5 row">
            <div className="col-lg-8"></div>
            <div className="col-lg-4 text-right">
              <Link
                className="px-4 btn btn-danger"
                to={routePath.targetSavings.createTargetSaving}
              >
                New Target
              </Link>
            </div>
          </div>
        </>
      ) : (
        <div className="mt-2 row">
          <div className="col-lg-8">
            <p>
              You currently have no target Savings, click on new target to
              create one
            </p>
          </div>
          <div className="col-lg-4 text-right">
            <Link
              className="px-4 btn btn-danger"
              to={routePath.targetSavings.tokenizeCard}
            >
              New Target
            </Link>
          </div>
        </div>
      )}
      <Modal
        centered
        show={showTargetDetails}
        aria-labelledby="contained-modal-title-vcenter"
        onHide={() => setShowTargetDetails(false)}
      >
        <Modal.Header className="bd-0" closeButton></Modal.Header>
        <Modal.Body className="text-center">
          <h4 className="mb-3">{targetSaving?.item} Target Saving</h4>
          <p className="mb-3">
            Amount: {`₦${numeral(targetSaving?.amt).format("0,0")}`}
          </p>
          <p className="mb-3">
            Interest accrued:{" "}
            {`₦${numeral(targetSaving?.int_accrued).format("0,0.00")}`}
          </p>
          <p className="mb-4 text-success">
            Total Amount:{" "}
            {`₦${numeral(targetSaving?.targetAmountInView).format("0,0.00")}`}
          </p>
          <div className="row justify-content-center mb-4">
            <div className="col text-center">
              <Button
                className="px-4"
                variant="primary"
                onClick={() => setShowTargetDetails(false)}
              >
                Okay
              </Button>
            </div>
          </div>
        </Modal.Body>
      </Modal>
      <Modal
        centered
        show={showUpdateTargetDetails}
        aria-labelledby="contained-modal-title-vcenter"
        onHide={() => setShowUpdateTargetDetails(false)}
        backdrop={isSubmittingForm ? "static" : true}
        keyboard={isSubmittingForm}
      >
        <Modal.Header
          className="bd-0"
          closeButton={!isSubmittingForm}
        ></Modal.Header>
        <Modal.Body className="text-center">
          <Formik
            initialValues={initialValues}
            validationSchema={updateSchema}
            onSubmit={handleSubmit}
          >
            {({ isSubmitting, handleChange }) => (
              <Form>
                <h4 className="mb-3">{targetSaving?.item} Target Saving</h4>
                <p className="mb-3">
                  Amount: {`₦${numeral(targetSaving?.amt).format("0,0")}`}
                </p>
                <p className="mb-3">
                  Interest accrued:{" "}
                  {`₦${numeral(targetSaving?.int_accrued).format("0,0.00")}`}
                </p>
                <div className="form-group mb-0">
                  <div className="input-group">
                    <Field
                      name="newAmount"
                      // displayType="input"
                      // onValueChange={({ value }: any) => {
                      //   setNewAmt(value);
                      //   handleChange(value);
                      // }}
                      placeholder="New Amount"
                      className="form-control d-block w-100 pl-5 bdbtm-0"
                      // thousandSeparator={true}
                      // prefix={"₦"}
                      // component={NumberFormat}
                    />
                    <ErrorMsg inputName="newAmount" />
                    <label htmlFor="newAmount">New Amount</label>
                  </div>
                </div>
                <div className="row justify-content-center mb-4">
                  <div className="col text-center">
                    <Button
                      className="px-4"
                      variant="primary"
                      type="submit"
                      disabled={isSubmitting}
                    >
                      Okay
                    </Button>
                  </div>
                </div>
              </Form>
            )}
          </Formik>
        </Modal.Body>
      </Modal>
      <Modal
        centered
        show={showBreakTargetDetails}
        aria-labelledby="contained-modal-title-vcenter"
        onHide={() => setShowBreakTargetDetails(false)}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header className="bd-0"></Modal.Header>
        <Modal.Body className="text-center">
          <h4 className="mb-3">
            Are you sure you want to Break {targetSaving?.item} Target Savings?
          </h4>
        </Modal.Body>
        <div className="row justify-content-center mb-4">
          <div className="col text-right">
            <Button
              className="px-4"
              variant="primary"
              disabled={isSubmittingBreaking}
              onClick={async () => {
                setIsSubmittingBreaking(true);

                await targetStore.removeTarget(`${targetSaving.id}`);
                setIsSubmittingBreaking(false);
                setShowBreakTargetDetails(false);
              }}
            >
              Yes
            </Button>
          </div>
          <div className="col text-left">
            <Button
              className="btn-light border-primary px-4"
              disabled={isSubmittingBreaking}
              onClick={() => setShowBreakTargetDetails(false)}
            >
              No
            </Button>
          </div>
        </div>
      </Modal>
    </>
  );
});

export default ProgressBars;
