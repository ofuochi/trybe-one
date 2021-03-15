import "aos/dist/aos.css";

import AOS from "aos";
import { useEffect } from "react";
import { Col, Container, Row } from "react-bootstrap";
import Slider from "react-slick";
import { LandingHeader } from "./Common/LandingHeader";
import { Title } from "./Common/Title";

const sliderlandingConfig = {
  dots: false,
  arrows: true,
  infinite: false,
  speed: 500,
  slidesToShow: 1,
  slidesToScroll: 1,

  responsive: [
    {
      breakpoint: 1024,
      settings: {
        slidesToShow: 1,
        slidesToScroll: 1,
        infinite: true,
        dots: false,
      },
    },
    {
      breakpoint: 600,
      settings: {
        slidesToShow: 1,
        slidesToScroll: 1,
      },
    },
    {
      breakpoint: 480,
      settings: {
        slidesToShow: 1,
        slidesToScroll: 1,
      },
    },
  ],
};
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
        <section className="bg-pale">
          <Container>
            <Row>
              <Col lg="12">
              <Slider className="blog-slide" {...sliderlandingConfig}>
              <div>
                <div className="slide">
                  <img src="/assets/images/img-slideblog-1.jpg" />
                </div>
              </div>
              <div>
                <div className="slide">
                <img src="/assets/images/img-slideblog-1.jpg" />
                </div>
              </div>
              <div>
                <div className="slide">
                <img src="/assets/images/img-slideblog-1.jpg" />
                </div>
              </div>
            </Slider>
              </Col>
            </Row>

            <Row className="justify-content-center mt-4">
              <Col>
              <img src="/assets/images/img-blog-sec-1.jpg" />
              </Col>
              <Col>
              <img src="/assets/images/img-blog-sec-2.jpg" />
              </Col>
              <Col>
              <img src="/assets/images/img-blog-sec-3.jpg" />
              </Col>
              <Col>
              <img src="/assets/images/img-blog-sec-4.jpg" />
              </Col>
            </Row>
          </Container>
        </section>
      </main>
    </>
  );
};
