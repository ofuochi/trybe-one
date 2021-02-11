import React from "react";
import { Button } from "react-bootstrap";

interface TargeOptionsProps {
  handleClick: any;
}
const TargetOptions = ({ handleClick }: TargeOptionsProps) => (
  <div>
    <div className="row m-0 justify-content-between mt-3">
      <Button
        variant="light"
        className="px-4 border"
        onClick={handleClick}
        type="submit"
      >
        Update amount to be debited
      </Button>

      <Button
        variant="danger"
        className="px-4"
        onClick={handleClick}
        type="submit"
      >
        Update
      </Button>

      <Button
        variant="light"
        className="px-4 border-primary"
        onClick={handleClick}
        type="submit"
      >
        Break Box
      </Button>
    </div>
  </div>
);

export default TargetOptions;
