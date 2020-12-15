import { Form, Formik, FormikConfig, FormikValues } from "formik";
import React, { useState } from "react";
import { useStore } from "../../hooks/use-store.hooks";

interface FormikStepProps
  extends Pick<FormikConfig<FormikValues>, "children" | "validationSchema"> {}

export const FormikStep = ({ children }: FormikStepProps) => <>{children}</>;

export const FormikStepper = ({
  children,
  ...props
}: FormikConfig<FormikValues>) => {
  const childrenArray = React.Children.toArray(
    children
  ) as React.ReactElement<FormikStepProps>[];
  const [step, setStep] = useState(0);
  const { signupFormStore } = useStore();
  const currentChild = childrenArray[step];

  const isLastStep = () => step === childrenArray.length - 1;

  return (
    <Formik
      {...props}
      validationSchema={currentChild.props.validationSchema}
      onSubmit={async (values, helpers) => {
        if (isLastStep()) {
          await props.onSubmit(values, helpers);
        } else {
          setStep((s: number) => {
            const val = s + 1;
            signupFormStore.update(val);
            return val;
          });
          helpers.setTouched({});
        }
      }}
    >
      {({ isSubmitting }) => (
        <Form autoComplete="off">
          {currentChild}
          {step > 0 ? (
            <div className="col-lg-4 float-left">
              <button
                disabled={isSubmitting}
                className="btn btn-lg btn-primary btn-block"
                onClick={() =>
                  setStep((s) => {
                    const val = s - 1;
                    signupFormStore.update(val);
                    return val;
                  })
                }
              >
                Back
              </button>
            </div>
          ) : null}
          <div className="col-lg-4 float-right">
            <button
              disabled={isSubmitting}
              className="btn btn-lg btn-primary btn-block"
              type="submit"
            >
              {isSubmitting ? "Submitting" : isLastStep() ? "Submit" : "Next"}
            </button>
          </div>
        </Form>
      )}
    </Formik>
  );
};
