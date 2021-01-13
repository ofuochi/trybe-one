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

export const Home = () => {
  const history = useHistory();
  useEffect(() => {
    AOS.init();
    AOS.refresh();
  }, []);
  return (
    <>
      <Title title="Home" />

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
              <Nav.Link href="#home">
                <span className="padd-btn">Ambassador</span>
              </Nav.Link>
              <Nav.Link href="#link">
                <span className="padd-btn">FAQ</span>
              </Nav.Link>
              <Nav.Link href="#link">
                <span
                  className="padd-btn text-primary mr-4"
                  onClick={() => history.push(routePath.login)}
                >
                  Login
                </span>
              </Nav.Link>
              <Nav.Link href="#link">
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

      <main role="main">
        <section className="mt-5">
          <Container>
            <Row>
              <Col data-aos="fade-up-right" className="mb-5" lg="5">
                <p className="faint-text">Introducing</p>
                <h1 className="landing-texth1 text-bold">TrybeOne</h1>
                <p className="landing-desc mb-4">
                  TrybeOne is a community that intersects between pop culture
                  and finance, a world where you live on your terms and you are
                  <span>free to be</span> anyone you want to be.
                </p>

                <button
                  className="btn btn-primary px-5"
                  onClick={() => history.push(routePath.signup)}
                >
                  Join Trybe
                </button>
              </Col>
              <Col
                data-aos="fade-up-left"
                className="land-imgbg mb-4"
                lg="7"
              ></Col>
            </Row>
            <Row className="justify-content-center mt-3">
              <Col>
                <div className="motion-down">
                  <p className="arrow-down">
                    <img alt="point-img" src="/assets/images/ic-pointer.svg" />
                  </p>
                </div>
              </Col>
            </Row>
          </Container>
        </section>

        <section className="padd-b-50 pt-0">
          <Container>
            <Row>
              <Col ata-aos="fade-in" lg="12" className="text-center">
                <h2 className="section-title">Why TrybeOne</h2>
              </Col>
              <Col data-aos="fade-up" lg="4" md="4" sm="4">
                <Card className="bd-0">
                  <Card.Body>
                    <div className="card-image earn-image"></div>
                    <h3 className="card-title text-center">Earn</h3>
                    <p className="card-text">
                      Join the Trybe and learn exciting ways to make money
                      monthly as well as how to invest the money you make
                      wisely. Broke days are over!
                    </p>
                  </Card.Body>
                </Card>
              </Col>
              <Col data-aos="fade-up" lg="4" md="4" sm="4">
                <Card className="bd-0">
                  <Card.Body>
                    <div className="card-image learn-image"></div>
                    <h3 className="card-title text-center">Learn</h3>
                    <p className="card-text">
                      Let’s take learning outside the lecture halls! We bring
                      you up close with your favorite entrepreneurs, career
                      mentors, celebrities, influencers more! We also give you
                      access to online courses and insightful articles for your
                      journey to self-discovery and freedom.
                    </p>
                  </Card.Body>
                </Card>
              </Col>
              <Col data-aos="fade-up" lg="4" md="4" sm="4">
                <Card className="bd-0">
                  <Card.Body>
                    <div className="card-image fun-image"></div>
                    <h3 className="card-title text-center">Fun</h3>
                    <p className="card-text">
                      What is life if you cannot enjoy yourself and have some
                      fun? TrybeOne gives you access to the best events, venues
                      and giveaways to keep you smiling.
                    </p>
                  </Card.Body>
                </Card>
              </Col>
            </Row>
          </Container>
        </section>

        <section className="bg-light">
          <Container>
            <Row>
              <Col
                data-aos="fade-up"
                className="about-image"
                lg="6"
                md="6"
                sm="6"
              ></Col>
              <Col data-aos="fade-left" className="pt-5" lg="6" md="6" sm="6">
                <h2 className="section-head">About the Trybe</h2>
                <p className="card-text">
                  TrybeOne is the community that intersects between pop culture
                  and finance, a world where you live on your terms and you are
                  free to be anyone you want to be. We are the coolest Gen–Z and
                  Millennial 'geng', for Networking, Collaborating, Growth and
                  Fun.
                </p>

                <h2 className="section-head">Tryber</h2>
                <p className="card-text">
                  A Tryber is an ambassador of the TrybeOne community{" "}
                  <span>#FreeToBe</span>.
                </p>
                <Button
                  className="btn btn-primary px-4 mt-4"
                  onClick={() => history.push(routePath.signup)}
                >
                  Join Trybe
                </Button>
              </Col>
            </Row>
          </Container>
        </section>

        <section>
          <Container>
            <Row>
              <Col data-aos="fade-up" lg="7" md="7" sm="6">
                <h2 className="section-head">Benefits of joining the Trybe</h2>
                <div className="card-text">
                  <ul className="list-unset">
                    <li>Community access to a network of like-minded GenZs</li>
                    <li>Zero balance account</li>
                    <li>Free debit cards</li>
                    <li>
                      Access to the coolest events (block parties, career fairs
                      etc.)
                    </li>
                    <li>
                      Access to skill acquisition programs, business management
                      and advisory sessions.
                    </li>
                    <li>Access to fun and cool content</li>
                  </ul>
                </div>
              </Col>
              <Col
                data-aos="fade-left"
                className="benefit-image"
                lg="5"
                md="5"
                sm="6"
              ></Col>
            </Row>
          </Container>
        </section>
        <Pagefooter />
      </main>
    </>
  );
};
