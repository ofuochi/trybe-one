import React, { useEffect } from "react";
import "aos/dist/aos.css";
import AOS from "aos";
import { NavLink, useHistory } from "react-router-dom";
import Pagefooter from "./Common/Pagefooter";

import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";

import Container from "react-bootstrap/Container";

import { routePath } from "../constants/route-paths";
import { Title } from "./Common/Title";
import { Button } from "react-bootstrap";

export const Learning = () => {
  const history = useHistory();
  useEffect(() => {
    AOS.init();
    AOS.refresh();
  }, []);
  return (
    <>

      <Navbar expand="lg" fixed="top" className="bg-white">
        <div className="container">
          <Navbar.Brand>
            <NavLink to={routePath.home} className="brand-logo">
              <img alt="logo" src="/assets/images/logo.png" />
            </NavLink>
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ml-auto">
              <Nav.Link>
                <span className="padd-btn">Ambassador</span>
              </Nav.Link>
              <Nav.Link>
                <span className="padd-btn">FAQ</span>
              </Nav.Link>
              <Nav.Link>
                <span
                  className="padd-btn text-primary mr-4"
                  onClick={() => history.push(routePath.login)}
                >
                  Login
                </span>
              </Nav.Link>
              <Nav.Link>
                <span
                  className="btn btn-sm padd-btnr btn-primary"
                  onClick={() => history.push(routePath.signup)}
                >
                  Join Trybe
                </span>
              </Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </div>
      </Navbar>


    </>
  );
};
