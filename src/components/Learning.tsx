import "aos/dist/aos.css";

import AOS from "aos";
import { useEffect } from "react";
import { Col, Container, Row } from "react-bootstrap";

import { LandingHeader } from "./Common/LandingHeader";
import { Title } from "./Common/Title";

export const Learning = () => {
  useEffect(() => {
    AOS.init();
    AOS.refresh();
  }, []);
  return (
    <>
      <Title title="Blog" />
      <LandingHeader />
      <main role="main">
        <section className="mt-5">
          <Container>
            <Row>
              <h1>Section One</h1>
            </Row>
            <Row className="justify-content-center mt-3">
              <Col>
                <h2>Subsection 2a</h2>
              </Col>
              <Col>
                <h2>Subsection 2b</h2>
              </Col>
            </Row>
          </Container>
        </section>
      </main>
    </>
  );
};
