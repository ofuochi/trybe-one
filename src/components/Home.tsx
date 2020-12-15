import React from "react";
import { NavLink, useHistory } from "react-router-dom";

import { routePath } from "../constants/route-paths";
import { Title } from "./common/Title";

export const Home = () => {
  const history = useHistory();
  return (
    <>
      <Title title="Home" />
      <nav className="navbar navbar-expand-lg navbar-light bg-light rounded">
        <div className="container">
          <button
            className="navbar-toggler"
            type="button"
            data-toggle="collapse"
            data-target="#navbarsExample09"
            aria-controls="navbarsExample09"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          <div className="collapse navbar-collapse" id="navbarsExample09">
            <ul className="navbar-nav mr-auto">
              <li className="nav-item active">
                <NavLink to={routePath.home} className="brand-logo">
                  <img alt="logo" src="assets/images/logo.png" />
                </NavLink>
              </li>
            </ul>
            <form className="form-inline my-2 my-md-0">
              <li className="nav-item">
                <NavLink className="nav-link" to="#">
                  Ambassador
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link" to="#">
                  FAQ's
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link" to="#">
                  Ambassador
                </NavLink>
              </li>
              <li className="nav-item">
                <button
                  className="btn btn-light mr-4"
                  onClick={() => history.push(routePath.login)}
                >
                  Login
                </button>
              </li>
              <li className="nav-item">
                <button
                  className="btn btn-large btn-primary"
                  onClick={() => history.push(routePath.signup)}
                >
                  Join Trybe
                </button>
              </li>
            </form>
          </div>
        </div>
      </nav>

      <main role="main" className="container">
        <div className="starter-template">
          <h1>Bootstrap starter template</h1>
          <p className="lead">
            Use this document as a way to quickly start any new project.
            <br /> All you get is this text and a mostly bare bones HTML
            document.
            <br />
          </p>
        </div>
      </main>
    </>
  );
};
