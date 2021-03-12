import { Nav, Navbar } from "react-bootstrap";
import { NavLink, useHistory } from "react-router-dom";

import { routePath } from "../../constants/route-paths";

export const LandingHeader = () => {
  const history = useHistory();

  return (
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
  );
};
