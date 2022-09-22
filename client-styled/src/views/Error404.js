import React, {useEffect} from "react";

// reactstrap components
import { Card, CardBody, Container, Row, Col } from "reactstrap";

// core components
import ColorNavbar2 from "components/Navbars/ColorNavbar.js";
import {Link} from "react-router-dom";

function Error404() {
  document.documentElement.classList.remove("nav-open");

  useEffect(() => {
    document.body.classList.add("error-404");

    window.scrollTo(0, 0);
    document.body.scrollTop = 0;

    return function cleanup() {
      document.body.classList.remove("error-404");
    };
  });

  return (
    <>
      <ColorNavbar2 />
      <div
        className="background-img"
        style={{
          backgroundImage:
            "url(" + require("assets/img/sections/martin-knize.jpg") + ")",
        }}
      >
        <div className="filter" />
        <Container>
          <Row>
            <h1 class="title">
              404
              <br />
              <p class="error-msg">The page you requested could not be found</p>
            </h1>
          </Row>


          <div className="container-cards">
            <Row>
              <h5 className="discover-pages text-center">Go to the <Link to="/"> Home Page</Link></h5>
              <br />
              <br />
              <br />
            </Row>
          </div>
        </Container>
      </div>
    </>
  );
}

export default Error404;
