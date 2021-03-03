import { observer } from "mobx-react-lite";
import React from "react";
import { Field, Formik } from "formik";
import Slider from "react-slick";
import { useState } from "react";
import { Button, Form, Modal } from "react-bootstrap";
//import { routePath } from "../../constants/route-paths";

import { useStore } from "../../hooks/use-store.hooks";

const settings = {
  dots: true,
  infinite: false,
  speed: 500,
  slidesToShow: 1,
  slidesToScroll: 1,
  className: "center",
  centerMode: true,
  centerPadding: "10px",
};

const CardsView = observer(() => {
  const [showAddCards, setShowAddCards] = useState(false);
  const [showBlockCards, setShowBlockCards] = useState(false);
  const [showTrackCards, setShowTrackCards] = useState(false);
  const {
    cardStore: { cards },
  } = useStore();
  return (
    <>
      <div className="row m-0 mb-0 d-flex mt-3 justify-content-between">
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

      {cards.length > 0 && (
        <div className="mt-3 row">
          <h5 className="mdc-top-app-bar__title font-weight-light ml-4 mb-1 p-0">
            Your Cards
          </h5>

          <div className="cardslides col-lg-12">
            {cards.length ? (
              <Slider {...settings}>
                {cards.map((card, i) => (
                  <div key={i} style={{ display: "block" }}>
                    <img alt="" src="/assets/images/cardbg.png" />
                    <div className="row masked-cardbtm">
                      <Button  onClick={() => setShowBlockCards(true)} className="btn btn-sm btn-light mr-2 bd-rad-5"><i><img className="w-16 float-left mr-2 mt-1" alt="showimg" src="/assets/images/ic-block-card.svg" /></i><span className="text-smaller">Block Card</span></Button>
                      <Button  onClick={() => setShowTrackCards(true)} className="btn btn-sm btn-light"><i><img className="w-16 float-left mr-2 mt-1" alt="showimg" src="/assets/images/ic-track-card.svg" /></i><span className="text-smaller">Track Card</span></Button>
                    </div>
                    <div className="masked-span">{card.pan}</div>
                  </div>
                ))}
                <div style={{ display: "block" }}>
                  <div className="no-bg bd-0 hoverable">
                    <img
                      className="m-auto"
                      alt=""
                      onClick={() => setShowAddCards(true)}
                      src="/assets/images/ic-card-request.svg"
                    />
                  </div>
                </div>
              </Slider>
            ) : (
              <div className="mt-4 row">
                <h5 className="mdc-top-app-bar__title font-weight-light ml-4 mb-1 p-0">
                  Request for Card
                </h5>
                <div className="col-lg-12 text-center mt-4">
                  <div className="no-bg bd-0 hoverable">
                    <img
                      className="m-auto"
                      alt=""
                      onClick={() => setShowAddCards(true)}
                      src="/assets/images/ic-card-request.svg"
                    />
                  </div>
                </div>
              </div>
            )}
            <div>
        <Modal
        centered
        size="lg"
        show={showAddCards}
        aria-labelledby="contained-modal-title-vcenter"
        onHide={() => setShowAddCards(false)}
      >
        <Modal.Header className="bd-0" closeButton></Modal.Header>
        <Modal.Body className="py-1 px-5">
        <h4 className="mb-4">Request for Cards</h4>
      
        <Formik
       initialValues={{ billers: 'electricity',}}
       onSubmit={(values, actions) => {
         setTimeout(() => {
           alert(JSON.stringify(values, null, 2));
           actions.setSubmitting(false);
         }, 1000);
       }}
     >
<Form>


<div className="form-group mb-3">
      <div className="input-group">
       <Field
          as="select"
          name="disco"
          placeholder="Select type of card"
          className="form-control d-block w-100">
          <option value="" disabled>
            -Select type of card-
          </option>
          <option value="1">
          Virtual
          </option>
          <option value="2">
          NonVirtual
          </option>
        </Field>
        <label>Select type of card</label>
        </div>
</div>


        <div className="form-group mb-2">
      <div className="input-group">
       <Field
          as="select"
          name="title"
          placeholder="Account Number"
          className="form-control d-block w-100 bdtop-0 bdleft-0 bdright-0 bd-radius-0">
            <option>Mr</option>
            <option>Mrs</option>
        </Field>
        <label>Title</label>
        </div>
</div>
<div className="form-group mb-2">
      <div className="input-group">
       <Field
          name="acc"
          placeholder="Account Number"
          className="form-control d-block w-100 bdtop-0 bdleft-0 bdright-0 bd-radius-0">
        </Field>
        <label>Name</label>
        </div>
</div>
<div className="form-group mb-2">
      <div className="input-group">
       <Field
          as="select"
          name="state"
          placeholder="State"
          className="form-control d-block w-100 bdtop-0 bdleft-0 bdright-0 bd-radius-0">
            <option>State</option>
            <option>State</option>
        </Field>
        <label>State</label>
        </div>
</div>
<div className="form-group mb-2">
      <div className="input-group">
       <Field
          as="select"
          name="City"
          placeholder="City"
          className="form-control d-block w-100 bdtop-0 bdleft-0 bdright-0 bd-radius-0">
            <option>City</option>
            <option>City</option>
        </Field>
        <label>City</label>
        </div>
</div>
<div className="form-group mb-2">
      <div className="input-group">
       <Field
          name="Address"
          placeholder="Address"
          className="form-control d-block w-100 bdtop-0 bdleft-0 bdright-0 bd-radius-0">
        </Field>
        <label>Address</label>
        </div>
</div>
<div className="form-group mb-2">
      <div className="input-group">
       <Field
          name="Phone Number"
          placeholder="Phone Number"
          className="form-control d-block w-100 bdtop-0 bdleft-0 bdright-0 bd-radius-0">
        </Field>
        <label>Phone Number</label>
        </div>
</div>
        <div className="row justify-content-end mt-5 mb-5">
            <div className="col-lg-5">
              <Button
                className="px-4 btn-lg btn-block"
                variant="primary"
                
              >
                Request for Cards
              </Button>
            </div>
          </div>
         


        </Form>
      </Formik>


        </Modal.Body>
      </Modal>
            </div>

            <div>
            <Modal
        centered
        size="lg"
        show={showBlockCards}
        aria-labelledby="contained-modal-title-vcenter"
        onHide={() => setShowBlockCards(false)}
      >
        <Modal.Header className="bd-0" closeButton></Modal.Header>
        <Modal.Body className="py-1 px-5 text-center">
        <h4 className="mb-4">Are you sure you want to block this card</h4>
      
        <div className="row justify-content-center mt-5 mb-5 flex-column">
        <img alt="showimg" src="/assets/images/ic-successful.svg" />
        <p className="mt-3">Card blocked successfully</p>
        </div>


        <div className="row justify-content-center mt-5 mb-5">
            
              <Button
                className="px-4 btn-lg mr-4"
                variant="primary">
                Just Kidding
              </Button>
            
              <Button
                className="px-4 btn-lg"
                variant="secondary">
                Yes o
              </Button>
            
          </div>



        </Modal.Body>
      </Modal>
            </div>


            <div>
            <Modal
        centered
        size="lg"
        show={showTrackCards}
        aria-labelledby="contained-modal-title-vcenter"
        onHide={() => setShowTrackCards(false)}
      >
        <Modal.Header className="bd-0 bg-primary" closeButton>
          Card Tracking
        </Modal.Header>
        <Modal.Body className="py-0">
                  <div className="row bg-danger-alt p-2">
            <div className="col-lg-4">
              <p className="mb-1">SHIPPED VIA</p>
              <p className="mb-0 text-bold">DHL</p>
            </div>
            <div className="col-lg-4">
              <p className="mb-1">STATUS</p>
              <p className="mb-0 text-bold">In Transit</p>
            </div>
            <div className="col-lg-4">
              <p className="mb-1">EXPECTED DELIVERY DATE</p>
              <p className="mb-0 text-bold">Monday, June 14</p>
            </div>
          </div>
          <div className="row">
          <div className="col-lg-12">
          <ul className="mt-4" id="trackingbar">
            <li className="active"><span className="d-block text-primary">1</span><span className="d-block text-primary">Personal info</span></li>
            <li className="active"><span className="d-block text-primary">2</span><span className="d-block text-primary">Social info</span></li>
            <li><span className="d-block">3</span></li>
          </ul>
       </div>  
          </div>
       
      
        <Formik
       initialValues={{ billers: 'electricity',}}
       onSubmit={(values, actions) => {
         setTimeout(() => {
           alert(JSON.stringify(values, null, 2));
           actions.setSubmitting(false);
         }, 1000);
       }}
     >
<Form>
       
        <div className="row justify-content-end mt-5 mb-5">
            <div className="col-lg-5">
              <Button
                className="px-4 btn-lg btn-block"
                variant="primary"
                
              >
                Request for Cards
              </Button>
            </div>
          </div>
         


        </Form>
      </Formik>


        </Modal.Body>
      </Modal>
            </div>
          </div>
        </div>

      )}
    </>
  );
});

export default CardsView;
