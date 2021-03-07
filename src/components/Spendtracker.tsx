import { Title } from "./Common/Title";
import { RingProgress } from "@ant-design/charts";
import Donut from "./TargetSaving/Donut";
import Form from 'react-bootstrap/Form'
export const Spendtracker = () => {

  var configGeneral = {
    height: 50,
    width: 50,
    autoFit: false,
    percent: 0.6,
    color: ['#5D83E5', '#E8EDF3'],
    innerRadius: 0.80,
    radius: 0.98,
    display: 'none',
    statistic: {
      title: {
        style: {
          color: '#363636',
          fontSize: '12px',
          lineHeight: '14px',
          
        },
        formatter: function formatter() {
          return '<img src="assets/images/ic-cat-general.svg" />';
        },
      },
    },
  };


  var configShopping = {
    height: 50,
    width: 50,
    autoFit: false,
    percent: 0.6,
    color: ['#C6E3FC', '#E8EDF3'],
    innerRadius: 0.80,
    radius: 0.98,
    display: 'none',
    statistic: {
      title: {
        style: {
          color: '#363636',
          fontSize: '12px',
          lineHeight: '14px',
          
        },
        formatter: function formatter() {
          return '<img src="assets/images/ic-cat-shopping.svg" />';
        },
      },
    },
  };


  var configCinema = {
    height: 50,
    width: 50,
    autoFit: false,
    percent: 0.6,
    color: ['#005199', '#E8EDF3'],
    innerRadius: 0.80,
    radius: 0.98,
    display: 'none',
    statistic: {
      title: {
        style: {
          color: '#363636',
          fontSize: '12px',
          lineHeight: '14px',
          
        },
        formatter: function formatter() {
          return '<img src="assets/images/ic-cat-cinema.svg" />';
        },
      },
    },
  };

  var configTransport = {
    height: 50,
    width: 50,
    autoFit: false,
    percent: 0.6,
    color: ['#FF7235', '#E8EDF3'],
    innerRadius: 0.80,
    radius: 0.98,
    display: 'none',
    statistic: {
      title: {
        style: {
          color: '#363636',
          fontSize: '12px',
          lineHeight: '14px',
          
        },
        formatter: function formatter() {
          return '<img src="assets/images/ic-cat-transport.svg" />';
        },
      },
    },
  };

  return (
    <>
      <Title title="Spend Tracker" />

      <div className="page-content">
        <div className="row m-0">
      <div>
      <h5 className="mdc-top-app-bar__title mb-0 mb-0 p-0">Track your spending</h5>
      <p className="text-muted small">We know keeping track of expensis can be stressful, Let us help you</p>
      </div>
      <div><img alt="img-alt" src="assets/images/ic-dash-earn.svg" /> </div>
        </div>
        <div className="row m-0">
          <div className="mr-2"><p className="mt-1">Filter by</p></div>
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
            <Donut />

       </div>

       <div className="row">
   <div className="col-lg-12">
   <h5 className="mdc-top-app-bar__title font-weight-light mb-3 p-0">
          Categories
          </h5>
   </div>

         <div className="col-lg-3 p-0">
              <div className="d-flex row m-0 mb-4 justify-content-left">
                <div className="spendtracker-cat">
                <RingProgress
                {...configGeneral}
                />
                </div>
                <div className="pl-2">
                <span className="mt-0 smaller d-block">General</span>
                <span className="mt-1 smaller d-block text-bold">NGR 2,000</span>
                </div>
 
              </div>
         </div>

         <div className="col-lg-3 p-0">
              <div className="d-flex row m-0 mb-4 justify-content-left">
                <div className="spendtracker-cat">
                <RingProgress
                {...configShopping}
                />
                </div>
                <div className="pl-2">
                <span className="mt-0 smaller d-block">Shoping</span>
                <span className="mt-1 small d-block text-bold">NGR 2,000</span>
                <span className="mt-1 smaller d-block text-muted">12 Transactions</span>
                </div>
 
              </div>
         </div>

         <div className="col-lg-3 p-0">
              <div className="d-flex row m-0 mb-4 justify-content-left">
                <div className="spendtracker-cat">
                <RingProgress
                {...configCinema}
                />
                </div>
                <div className="pl-2">
                <span className="mt-0 smaller d-block">Cinema</span>
                <span className="mt-1 small d-block text-bold">NGR 2,000</span>
                <span className="mt-1 smaller d-block text-muted">16 Transactions</span>
                </div>
 
              </div>
         </div>

         <div className="col-lg-3 p-0">
              <div className="d-flex row m-0 mb-4 justify-content-left">
                <div className="spendtracker-cat">
                <RingProgress
                {...configTransport}
                />
                </div>
                <div className="pl-2">
                <span className="mt-0 smaller d-block">Transportation</span>
                <span className="mt-1 small d-block text-bold">NGR 2,000</span>
                <span className="mt-1 smaller d-block text-muted">16 Transactions</span>
                </div>
 
              </div>
         </div>
       </div>
       </div>     

    </>
  );
};
