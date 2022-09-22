/*eslint-disable*/
import React from "react";

// reactstrap components
import { Container, Row } from "reactstrap";

// core components

function FooterGray() {
  return (
    <>
      <footer className="footer footer-gray footer-white">
        <Container>
          <Row>

            <div className="credits ml-auto mr-auto">
              <span className="copyright">
                © {new Date().getFullYear()}
                , made with <i className="fa fa-heart heart" /> by Dontrell Dev
              </span>
            </div>
          </Row>
        </Container>
      </footer>
    </>
  );
}

export default FooterGray;
