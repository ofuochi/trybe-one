import { Field, Form, Formik } from "formik";
import React, { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import Modal from 'react-bootstrap/Modal'
import {
  Cell,
  Legend,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
} from "recharts";
import api from "../config/api.config";
import { routePath } from "../constants/route-paths";
import { localStoreService } from "../services";

import { Title } from "./Common/Title";

export const TargetSavings = () => {
  const [ visible, setVisible ] = React.useState(false)
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  function TargetOptionsComponent() {
    return <div>
      <div className="row m-0 justify-content-between mt-3">
      <Button
                variant="light"
                className="px-4 border"
                onClick={handleShow}
                type="submit">
                Update amount to be debited
              </Button>

              <Button
                variant="danger"
                className="px-4" 
                onClick={handleShow}             
                type="submit">
                Update
              </Button>

              <Button
                variant="light"
                className="px-4 border-primary"
                onClick={handleShow}
                type="submit">
                Break Box
              </Button> 
      
      </div>
    </div>;
  }
  const [targetSaving, setTargetSaving] = useState<
    API.GetTargetSavingsResponseDto[]
  >();

  const currentUser = localStoreService.getCurrentUser();
  useEffect(() => {
    api
      .get<API.GetTargetSavingsResponseListDto>(
        `/User/GetTargetSavingsByProfileId?profileID=${currentUser?.userId}`
      )
      .then(({ data }) => setTargetSaving(data.targetSavings));
  }, [currentUser?.userId]);

  let data = targetSaving?.map((t) => ({
    name: t.item || "",
    value: t.amt || 0,
  }));
  if (data?.length === 0)
    data = [
      { name: "Car", value: 50 },
      { name: "Food", value: 39 },
      { name: "Groceries", value: 78 },
      { name: "Movies", value: 100 },
      { name: "Rent", value: 150 },
    ];
  const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#FF007F"];

  const initialValues: API.AddTargetSavingsRequestDto = {};
  return (
   
   <>
      <Title title="Target Savings" />
      <div className="col-lg-8 col-md-8 bd-right pl-5 pr-3 mt-4">
        <div className="page-content">
          <div className="row">
            <div className="col-lg-12">
              <h4>Total Budget</h4>
            </div>
            <div className="col-lg-6">
              <div className="d-flex row m-0 justify-content-between">
                <ResponsiveContainer height={250} minWidth={300}>
                  <PieChart>
                  <text className="smaller" dy={18} y="30%" x="52%" textAnchor="middle">
                  NGR 2000.00
      </text>
                  <Pie
                      data={data}
                      cx={"35%"}
                      cy={"35%"}
                      innerRadius="40%"
                      outerRadius="70%"
                      fill="#8884d8"
                      paddingAngle={3}
                      dataKey="value"
                    >
                      {data?.map((entry, index) => (
                        <Cell
                          key={`cell-${index}`}
                          fill={COLORS[index % COLORS.length]}
                        />
                      ))}
                    </Pie>
                    <span className="abs-val">2000win</span>
                    <Tooltip />
                    <Legend
                      verticalAlign="top"
                      layout="vertical"
                      iconType="circle"
                      align="left"
                    />
               
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </div>

            <div className="col-lg-6">
              <div className="alert alert-danger p-4">
                <h5>Target Savings</h5>
                <p className="small">
                  Target Savings helps you achieve your savings goals while you
                  sit back and relax{" "}
                </p>
              </div>
            </div>
          </div>
          <div className="mt-2 row">
            <div className="col-lg-8">
            <p>You currently have no target Savings, click on new target to create one</p>  
            </div>
            <div className="col-lg-4 text-right">
            <Button
                variant="danger"
                className="px-4"
                type="submit">
                New Target
              </Button>    
            </div>

            
          </div>
          <div className="mt-4">
            <h5 className="mdc-top-app-bar__title mb-0 mb-4 p-0">
              Target Savings
            </h5>

            <Formik
              initialValues={initialValues}
              enableReinitialize
              onSubmit={(initialValues) => {}}
            >
              {({ isSubmitting }) => (
                <Form>
                  <div className="col-lg-12">
                
                    <div onClick={() => setVisible(!visible)} className="form-group row justify-content-between m-0">
                      <div className="col-lg-2 text-left p-0"><p className="mb-0">Movies</p></div>
                      <div className="col-lg-8 pl-0">
                      <div className="form-group range-d m-0"><Field
                        type="range"
                        min="0"
                        max="10"
                        step="0.01"
                        className="form-control-range ps0"
                      /></div>
                      </div>
                      <div className="col-lg-2 p-0">
                      <p className="smaller mb-0 pt-1">NGR 4000.00 <span><img className="ml-2" alt="" src="/assets/images/ic-right-angle.svg" /></span></p>
                      </div>
                    </div>
                    {visible && <TargetOptionsComponent />}

                  </div>
                  <div className="col-lg-12">
                    <div className="form-group row justify-content-between m-0 mt-4">
                      <div className="col-lg-2 text-left p-0"><p className="mb-0">Rent</p></div>
                      <div className="col-lg-8 pl-0">
                      <div className="form-group range-d m-0"><Field
                        type="range"
                        min="0"
                        max="10"
                        step="0.01"
                        className="form-control-range ps1"
                      /></div>
                      </div>
                      <div className="col-lg-2 p-0">
                      <p className="smaller mb-0 pt-1">NGR 4000.00 <span><img className="ml-2" alt="" src="/assets/images/ic-right-angle.svg" /></span></p>
                      </div>
                    </div>
                  </div>
                  <div className="col-lg-12">
                    <div  className="form-group row justify-content-between m-0 mt-4">
                      <div className="col-lg-2 text-left p-0"><p className="mb-0">Groceries</p></div>
                      <div className="col-lg-8 pl-0">
                      <div className="form-group range-d m-0"><Field
                        type="range"
                        min="0"
                        max="10"
                        step="0.01"
                        className="form-control-range ps2"
                      /></div>
                      </div>
                      <div className="col-lg-2 p-0">
                      <p className="smaller mb-0 pt-1">NGR 4000.00 <span><img className="ml-2" alt="" src="/assets/images/ic-right-angle.svg" /></span></p>
                      </div>
                    </div>
                  </div>
                  <div className="col-lg-12">
                    <div className="form-group row justify-content-between m-0 mt-4">
                      <div className="col-lg-2 text-left p-0"><p className="mb-0">Car</p></div>
                      <div className="col-lg-8 pl-0">
                      <div className="form-group range-d m-0"><Field
                        type="range"
                        min="0"
                        max="10"
                        step="0.01"
                        className="form-control-range ps3"
                      /></div>
                      </div>
                      <div className="col-lg-2 p-0">
                      <p className="smaller mb-0 pt-1">NGR 4000.00 <span><img className="ml-2" alt="" src="/assets/images/ic-right-angle.svg" /></span></p>
                      </div>
                    </div>
                  </div>
                  <div className="col-lg-12">
                    <div  className="form-group row justify-content-between m-0 mt-4">
                      <div className="col-lg-2 text-left p-0"><p className="mb-0">Food</p></div>
                      <div className="col-lg-8 pl-0">
                      <div className="form-group range-d m-0"><Field
                        type="range"
                        min="0"
                        max="10"
                        step="0.01"
                        className="form-control-range ps4"
                      /></div>
                      </div>
                      <div className="col-lg-2 p-0">
                      <p className="smaller mb-0 pt-1">NGR 4000.00 <span><img className="ml-2" alt="" src="/assets/images/ic-right-angle.svg" /></span></p>
                      </div>
                    </div>
                  </div>
                </Form>
              )}
            </Formik>
          </div>

          <div className="mt-5 row">
            <div className="col-lg-8">
           
            </div>
            <div className="col-lg-4 text-right">
            <Link className="px-4 btn btn-danger" to={routePath.newtargetsavings}>New Target</Link>
      
            </div>

            
          </div>
        </div>
      </div>

      <Modal show={show}  aria-labelledby="contained-modal-title-vcenter"
      centered onHide={handleClose}>
        <Modal.Header className="bd-0" closeButton>
        </Modal.Header>
        <Modal.Body className="text-center">
        <h4 className="mb-3"> Rent Target Saving</h4>
        <p className="mb-3">Amount: NGR 20,000.00</p>
        <p className="mb-3">Intrest accrued (10%): NGR 5,000.00 </p>
        <p className="mb-4 text-success">Total Amount: NGR 25,000.00 </p>
        <div className="row justify-content-center mb-4">
          <div className="col text-right">
          <Button className="px-4" variant="primary" onClick={handleClose}>
            Break Box
          </Button> 
          </div>
          <div className="col text-left">
          <Button className="btn-light border-primary px-4" onClick={handleClose}>
            Cancel
          </Button>     
          </div>
   
        </div>
        </Modal.Body>

      </Modal>


      <div className="col-lg-4 col-md-4">
        <div className="row mb-0 d-flex mt-3 justify-content-between">
          <div className="col s6">
            <div className="text-left">
              <button className="btn no-bg p-0">
                <img alt="" src="/assets/images/ic-search.svg" />
              </button>
            </div>
          </div>
          <div className="col s6">
            <div className="text-right">
              <button className="btn no-bg p-0">
                <img alt="" src="/assets/images/ic-notification.svg" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
