import React from "react";

// reactstrap components
import {
    Button,
    Card,
    CardTitle,
    Form,
    Input,
    Container,
    Row,
    Col, Label, FormGroup,
} from "reactstrap";

// core components
import ColorNavbar2 from "components/Navbars/ColorNavbar2.js";
import ImageUpload from "../../components/CustomUpload/ImageUpload";
import TagsInput from "react-tagsinput";

function LoginPage() {
    document.documentElement.classList.remove("nav-open");
    React.useEffect(() => {
        document.body.classList.add("login-page");
        document.body.classList.add("full-screen");
        window.scrollTo(0, 0);
        document.body.scrollTop = 0;
        return function cleanup() {
            document.body.classList.remove("login-page");
            document.body.classList.remove("full-screen");
        };
    });
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
                        <h3>Add Blog Post</h3>
                        <div>
                            <Row>
                                <Col md="5" sm="5">
                                    <h6>Post Image</h6>
                                    <ImageUpload />

                                    <h6>
                                        Format <span className="icon-danger">*</span>
                                    </h6>
                                    <div className="form-check-radio">
                                        <Label check>
                                            <Input
                                                defaultValue="option1"
                                                id="exampleRadios1"
                                                name="exampleRadios"
                                                type="radio"
                                            />
                                            Digital <span className="form-check-sign" />
                                        </Label>
                                    </div>
                                    <div className="form-check-radio">
                                        <Label check>
                                            <Input
                                                defaultChecked
                                                defaultValue="option2"
                                                id="exampleRadios2"
                                                name="exampleRadios"
                                                type="radio"
                                            />
                                            Print <span className="form-check-sign" />
                                        </Label>
                                    </div>
                                </Col>
                                <Col md="7" sm="7">
                                    <FormGroup>
                                        <h6>
                                            Title <span className="icon-danger">*</span>
                                        </h6>
                                        <Input
                                            className="border-input"
                                            placeholder="enter the product name here..."
                                            type="text"
                                        />
                                    </FormGroup>
                                    <FormGroup>
                                        <h6>
                                            Tagline <span className="icon-danger">*</span>
                                        </h6>
                                        <Input
                                            className="border-input"
                                            placeholder="enter the product tagline here..."
                                            type="text"
                                        />
                                    </FormGroup>
                                    <Row className="price-row">
                                        {/*<Col md="6">*/}
                                        {/*  <h6>*/}
                                        {/*    Price <span className="icon-danger">*</span>*/}
                                        {/*  </h6>*/}
                                        {/*  <InputGroup className="border-input">*/}
                                        {/*    <Input*/}
                                        {/*      className="border-input"*/}
                                        {/*      defaultValue=""*/}
                                        {/*      placeholder="enter price"*/}
                                        {/*      type="text"*/}
                                        {/*    />*/}
                                        {/*    <InputGroupAddon addonType="append">*/}
                                        {/*      <InputGroupText>*/}
                                        {/*        <i className="fa fa-euro" />*/}
                                        {/*      </InputGroupText>*/}
                                        {/*    </InputGroupAddon>*/}
                                        {/*  </InputGroup>*/}
                                        {/*</Col>*/}
                                        {/*<Col md="6">*/}
                                        {/*  <h6>Discount</h6>*/}
                                        {/*  <InputGroup className="border-input">*/}
                                        {/*    <Input*/}
                                        {/*      className="border-input"*/}
                                        {/*      defaultValue=""*/}
                                        {/*      placeholder="enter discount"*/}
                                        {/*      type="text"*/}
                                        {/*    />*/}
                                        {/*    <InputGroupAddon addonType="append">*/}
                                        {/*      <InputGroupText>%</InputGroupText>*/}
                                        {/*    </InputGroupAddon>*/}
                                        {/*  </InputGroup>*/}
                                        {/*</Col>*/}
                                    </Row>
                                    <FormGroup>
                                        <h6>Blog Post</h6>
                                        <Input
                                            className="textarea"
                                            // maxLength="150"
                                            placeholder="Write your post here..."
                                            rows="13"
                                            type="textarea"
                                        />
                                        <h5>
                                            <small>
                        <span
                            className="pull-right"
                            id="textarea-limited-message"
                        >
                          {/*150 characters left*/}
                        </span>
                                            </small>
                                        </h5>
                                    </FormGroup>
                                    <FormGroup check>
                                        <Label check>
                                            <Input defaultValue="" type="checkbox" />
                                            Display on landing page{" "}
                                            <span className="form-check-sign" />
                                        </Label>
                                    </FormGroup>
                                </Col>
                            </Row>
                            <Row className="buttons-row">
                                <Col md="4" sm="4">
                                    <Button
                                        block
                                        className="btn-round"
                                        color="danger"
                                        outline
                                        type="reset"
                                    >
                                        Cancel
                                    </Button>
                                </Col>
                                <Col md="4" sm="4">
                                    <Button
                                        block
                                        className="btn-round"
                                        color="primary"
                                        outline
                                        type="submit"
                                    >
                                        Save
                                    </Button>
                                </Col>
                                <Col md="4" sm="4">
                                    <Button
                                        block
                                        className="btn-round"
                                        color="primary"
                                        type="submit"
                                    >
                                        Save &amp; Publish
                                    </Button>
                                </Col>
                            </Row>
                        </div>
                    </Container>
                    {/*<Container>*/}
                    {/*    <Row>*/}
                    {/*        <Col className="ml-auto mr-auto" lg="6" md="6" sm="6">*/}
                    {/*            <Card className="card-register-2">*/}
                    {/*                <CardTitle tag="h3">Create Post</CardTitle>*/}
                    {/*                <Form className="register-form">*/}
                    {/*                    <label>Title</label>*/}
                    {/*                    <Input*/}
                    {/*                        className="no-border"*/}
                    {/*                        placeholder="Post title..."*/}
                    {/*                        type="email"*/}
                    {/*                    />*/}

                    {/*                    <label>Image</label>*/}
                    {/*                    <Input*/}
                    {/*                        className="no-border"*/}
                    {/*                        placeholder="Image"*/}
                    {/*                        type="file"*/}
                    {/*                    />*/}
                    {/*                    <label>Text</label>*/}
                    {/*                    <Input*/}
                    {/*                        className="border-input"*/}
                    {/*                        placeholder="Write Post here..."*/}
                    {/*                        rows="10"*/}
                    {/*                        type="textarea"*/}
                    {/*                    />*/}
                    {/*                    <Button block className="btn-round" color="danger">*/}
                    {/*                        Create Post*/}
                    {/*                    </Button>*/}
                    {/*                </Form>*/}
                    {/*            </Card>*/}
                    {/*        </Col>*/}
                    {/*    </Row>*/}
                    {/*    <div className="demo-footer text-center">*/}
                    {/*        /!*<h6>*!/*/}
                    {/*        /!*  © {new Date().getFullYear()}, made with{" "}*!/*/}
                    {/*        /!*  <i className="fa fa-heart heart" /> by Creative Tim*!/*/}
                    {/*        /!*</h6>*!/*/}
                    {/*    </div>*/}
                    {/*</Container>*/}
                </div>
            </div>
        </>
    );
}

export default LoginPage;