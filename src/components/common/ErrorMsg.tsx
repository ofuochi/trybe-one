import React from "react";
import { ErrorMessage } from "formik";

interface ErrorMsgProps {
  inputName: string;
}
export const ErrorMsg = ({ inputName }: ErrorMsgProps) => (
  <ErrorMessage
    name={inputName}
    render={(error) => <small className="text-danger">{error}</small>}
  />
);
