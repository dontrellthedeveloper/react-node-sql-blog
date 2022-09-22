import React, { useState, useContext, useEffect } from "react";

// reactstrap components
import {Button, Card, CardTitle, Form, Input, Container, Row, Col,} from "reactstrap";

import axios from "axios";
import {useHistory} from "react-router-dom";
import { AuthContext } from "../helpers/AuthContext";


// core components
import ColorNavbar2 from "components/Navbars/ColorNavbar.js";

function LoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const { setAuthState } = useContext(AuthContext);

  let history = useHistory();

  document.documentElement.classList.remove("nav-open");


  useEffect(() => {
    document.body.classList.add("login-page");
    document.body.classList.add("full-screen");
    window.scrollTo(0, 0);
    document.body.scrollTop = 0;

    return function cleanup() {
      document.body.classList.remove("login-page");
      document.body.classList.remove("full-screen");
    };
  });

  const login = () => {
    const data = { username: username, password: password };
    // axios.post("http://localhost:3001/auth/login", data).then((response) => {
    axios.post("https://node-react-sql-blog-api.herokuapp.com/auth/login", data).then((response) => {
      if (response.data.error) {
        alert(response.data.error);
      } else {
        localStorage.setItem("accessToken", response.data.token);
        setAuthState({
          username: response.data.username,
          id: response.data.id,
          status: true,
        });
        history.push("/");
      }
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
              "url(" + require("assets/img/sections/bruno-abatti.jpg") + ")",
          }}
        >
          <div className="filter" />
          <Container>
            <Row>
              <Col className="ml-auto mr-auto" lg="4" md="6" sm="6">
                <Card className="card-register">
                  <CardTitle tag="h3">Welcome</CardTitle>
                  <Form className="register-form">
                    <label>Username</label>
                    <Input
                      className="no-border"
                      placeholder="Username"
                      type="text"
                      onChange={(event) => {
                        setUsername(event.target.value);
                      }}
                    />
                    <label>Password</label>
                    <Input
                      className="no-border"
                      placeholder="Password"
                      type="password"
                      onChange={(event) => {
                        setPassword(event.target.value);
                      }}
                    />
                    <Button onClick={login} block className="btn-round" color="danger">
                      Login
                    </Button>
                  </Form>
                </Card>
              </Col>
            </Row>
          </Container>
        </div>
      </div>
    </>
  );
}

export default LoginPage;
