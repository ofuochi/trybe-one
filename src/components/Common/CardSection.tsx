import { useEffect, useState } from "react";
import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'

import api from "../../config/api.config";
import { localStoreService } from "../../services";

const CardSection = () => {
  const [cards, setCards] = useState<API.GetCardResponseDto>({});
  useEffect(() => {
    const currentUser = localStoreService.getCurrentUser();

    const getCardInput: API.GetCardRequestDto = {
      accountId: currentUser?.nuban,
    };
    api
      .post<API.GetCardResponseDto>("/User/GetActiveCard", getCardInput)
      .then(({ data }) => setCards(data));
  }, []);

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
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

      {cards.data && cards.data.length > 0 && (
        <div className="mt-5 row">
          <h5 className="mdc-top-app-bar__title font-weight-light ml-4 mb-1 p-0">
            Your Cards
          </h5>

          <div className="cardslides">
            {cards.data?.map((card, i) => (
              <div key={i} style={{ display: "block" }}>
                <img alt="" src="/assets/images/cardbg.png" />
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="mt-4 row">
      <h5 className="mdc-top-app-bar__title font-weight-light ml-4 mb-1 p-0">
          Request for Card
        </h5>
    <div className="col-lg-12 text-center mt-4">
    <Button className="no-bg bd-0" onClick={handleShow}>
      <img
                          className="m-auto"
                          alt=""
                          src="/assets/images/ic-card-request.svg"
                        />
      </Button>
    </div>
      </div>
      
      <div className="mt-4 row">
        <h5 className="mdc-top-app-bar__title font-weight-light ml-4 mb-1 p-0">
          Target Saving
        </h5>

        <ul className="collection bd-0  m-0 pl-3">
          <li className="d-flex row m-0 mb-4 justify-content-between">
            <canvas
              style={{ width: "20px", height: "20px" }}
              id="doughnutChart"
            ></canvas>
            <span
              style={{ width: "10px", height: "10px" }}
              className="bg-doughnut1 rounded-20 m-3 mt-4 d-block"
            ></span>
            <span className="p-title mt-3 d-block">New Phone</span>
            <span className="p-title mt-3 d-block text-right">N 952.87</span>
          </li>
          <li className="d-flex row m-0 mb-4 justify-content-between">
            <canvas
              style={{ width: "20px", height: "20px" }}
              id="doughnutChart2"
            ></canvas>
            <span
              style={{ width: "10px", height: "10px" }}
              className="bg-doughnut2 rounded-20 m-3 mt-4 d-block"
            ></span>
            <span className="title mt-3 d-block">New Phone</span>
            <span className="title mt-3 d-block text-right">N 952.87</span>
          </li>
          <li className="d-flex row m-0 mb-4 justify-content-between">
            <canvas
              style={{ width: "20px", height: "20px" }}
              id="doughnutChart3"
            ></canvas>
            <span
              style={{ width: "10px", height: "10px" }}
              className="bg-doughnut3 rounded-20 m-3 mt-4 d-block"
            ></span>
            <span className="title mt-3 d-block">New Phone</span>
            <span className="title mt-3 d-block text-right">N 952.87</span>
          </li>
        </ul>
      </div>



      <Modal
        show={show}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
        onHide={handleClose}
        backdrop="static"
        keyboard={false}>
        <Modal.Header className="bd-0" closeButton>Request for card</Modal.Header>
        <Modal.Body className="p-4">
 
             <div className="form-group mb-0">
              <div className="input-group">
                <select className="form-control d-block w-100 bdbtm-0 bd-radius-0">
                  <option>Mr</option>
                  <option>Mrs</option>
                  <option>Miss</option>
                </select>
                <label >Title</label>
              </div>
            </div>

            <div className="form-group mb-0">
              <div className="input-group">
                <input placeholder="Name" className="form-control d-block w-100 bdbtm-0 bd-radius-0" type="text" />
                <label >Name</label>
              </div>
            </div>

            <div className="form-group mb-0">
              <div className="input-group">
                <select className="form-control d-block w-100 bdbtm-0 bd-radius-0">
                  <option>Lagos</option>
                  <option>Abuja</option>
                </select>
                <label >State</label>
              </div>
            </div>

            <div className="form-group mb-0">
              <div className="input-group">
                <select className="form-control d-block w-100 bdbtm-0 bd-radius-0">
                  <option>Lagos</option>
                  <option>Abuja</option>
                </select>
                <label >City</label>
              </div>
            </div>

            <div className="form-group mb-0">
              <div className="input-group">
                <input placeholder="Phone Number" className="form-control d-block w-100 bdbtm-0 bd-radius-0" type="text" />
                <label>Phone Number</label>
              </div>
            </div>

            <div className="form-group mb-0">
              <div className="input-group">
                <textarea placeholder="Address" className="form-control d-block w-100 bd-radius-0"></textarea>
                <label>Address</label>
              </div>
            </div>


            <div className="form-group row m-0 justify-content-end mt-4">
              <Button
                variant="danger"
                className="px-5">
                Request for Card
              </Button>
            </div>
        </Modal.Body>
      </Modal>

    </>
  );
};

export default CardSection;
