import React, {useEffect} from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import axios from "axios";
import {useHistory} from "react-router-dom";

// reactstrap components
import {
  Button,
  Card,
  CardTitle,
  // Form,
  Input,
  Container,
  Row,
  Col,
} from "reactstrap";

// core components
import ColorNavbar2 from "components/Navbars/ColorNavbar.js";

function RegisterPage() {
  const initialValues = {
    username: "",
    password: "",
  };

  let history = useHistory();

  document.documentElement.classList.remove("nav-open");

  useEffect(() => {
    document.body.classList.add("register-page");
    document.body.classList.add("full-screen");
    window.scrollTo(0, 0);
    document.body.scrollTop = 0;

    return function cleanup() {
      document.body.classList.remove("register-page");
      document.body.classList.remove("full-screen");
    };
  });

  const validationSchema = Yup.object().shape({
    username: Yup.string().min(3).max(15).required(),
    password: Yup.string().min(4).max(20).required(),
  });

  const onSubmit = (data) => {
    // axios.post("http://localhost:3001/auth", data).then(() => {
    axios.post("https://node-react-sql-blog-api.herokuapp.com/auth", data).then(() => {
      console.log(data);
      history.push("/login");
    });
  };


  return (
    <>
      <ColorNavbar2 />
      <div className="wrapper">
        <div
          className="page-header"
          style={{
            backgroundImage:
              "url(" + require("assets/img/sections/soroush-karimi.jpg") + ")",
          }}
        >
          <div className="filter" />
          <Container>
            <Row>
              <Col className="ml-auto" lg="6" md="6" sm="7" xs="12">
                <div className="info info-horizontal">
                  <div className="icon">
                    <i className="fa fa-umbrella" />
                  </div>
                  <div className="description">
                    <h3>We've got you covered</h3>
                    <p>
                      Larger, yet dramatically thinner. More powerful, but
                      remarkably power efficient. Everything you need in a
                      single case.
                    </p>
                  </div>
                </div>
                <div className="info info-horizontal">
                  <div className="icon">
                    <i className="fa fa-map-signs" />
                  </div>
                  <div className="description">
                    <h3>Clear Directions</h3>
                    <p>
                      Efficiently unleash cross-media information without
                      cross-media value. Quickly maximize timely deliverables
                      for real-time schemas.
                    </p>
                  </div>
                </div>
                <div className="info info-horizontal">
                  <div className="icon">
                    <i className="fa fa-user-secret" />
                  </div>
                  <div className="description">
                    <h3>We value your privacy</h3>
                    <p>
                      Completely synergize resource taxing relationships via
                      premier niche markets.
                    </p>
                  </div>
                </div>
              </Col>

              <Col className="mr-auto" lg="6" md="6" sm="5" xs="12">
                <Card className="card-register">
                  <CardTitle className="text-center" tag="h3">
                    Register
                  </CardTitle>
                  {/*<div className="social">*/}
                  {/*  <Button className="btn-just-icon mr-1" color="facebook">*/}
                  {/*    <i className="fa fa-facebook" />*/}
                  {/*  </Button>*/}
                  {/*  <Button className="btn-just-icon mr-1" color="google">*/}
                  {/*    <i className="fa fa-google" />*/}
                  {/*  </Button>*/}
                  {/*  <Button className="btn-just-icon" color="twitter">*/}
                  {/*    <i className="fa fa-twitter" />*/}
                  {/*  </Button>*/}
                  {/*</div>*/}
                  <div className="division">
                    <div className="line l" />
                    <span>today</span>
                    <div className="line r" />
                  </div>


                  <Formik
                      initialValues={initialValues}
                      onSubmit={onSubmit}
                      validationSchema={validationSchema}
                  >

                    <Form className="register-form">
                      {/*<Input placeholder="Email" type="text" />*/}
                      {/*<Input placeholder="Password" type="password" />*/}
                      <ErrorMessage name="username" component="span" />
                      <Field
                          autoComplete="off"
                          id="inputCreatePost"
                          name="username"
                          placeholder="Username..."
                          className='form-control'
                      />
                      <ErrorMessage name="password" component="span" />
                      <Field
                          autoComplete="off"
                          type="password"
                          id="inputCreatePost"
                          name="password"
                          placeholder="Password..."
                          className='form-control'
                      />
                      {/*<Input placeholder="Confirm Password" type="password" />*/}
                      <Button block className="btn-round" color="default" type='submit'>
                        Register
                      </Button>
                    </Form>
                  </Formik>

                  <div className="login">
                    <p>
                      Already have an account?{" "}
                      <a href="views/RegisterPage#pablo" onClick={(e) => e.preventDefault()}>
                        Log in
                      </a>
                      .
                    </p>
                  </div>
                </Card>
              </Col>
            </Row>
          </Container>

        </div>
      </div>
    </>
  );
}

export default RegisterPage;
