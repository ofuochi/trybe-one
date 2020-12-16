import React from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import { Link } from 'react-router-dom';



class Pagefooter extends React.Component{
  render(){

    return(
<footer className="bg-dark padd-tb-50 p-40px-lr text-white">
<Container>
   <Row>
    <Col sm={4} md={4} lg={4} className="m-15px-tb">
      <div className="footer-logo"></div>
    </Col>
    <Col sm={4} md={4} lg={4} className="m-15px-tb">
    <h5 className="mb-4 footer-header">Quick Links</h5>
    <ul className="unlist">
      <li><Link to="/">About</Link></li>
      <li><Link to="/">Open Account</Link></li>
      <li><Link to="/">FAQ</Link></li>
    </ul>
</Col>
    <Col sm={4} md={4} lg={4} className="m-15px-tb">
    <h5 className="mb-4 footer-header">Contact</h5>
    <ul className="unlist">
      <li>+234 700 822 0000</li>
      <li>trybeone@sterling.ng</li>
      <li>20 Marina Road, Lagos-Island, Lagos, Nigeria.</li>
    </ul>
</Col>
  
  </Row> 
  <Row>
    <Col sm={12} md={12} lg={12} className="m-15px-tb">
      <hr className="hr-light" />
      </Col>
      <Col sm={6} md={6} lg={6} className="m-15px-tb text-small">
      © 2020 Sterling Bank. All Rights Reserved
        </Col>  
      <Col sm={6} md={6} lg={6} className="m-15px-tb">
      <div className="sterling-logo"></div>
        </Col>  
      </Row>
</Container>

</footer>

    )
  }
  
}  


export default Pagefooter;
