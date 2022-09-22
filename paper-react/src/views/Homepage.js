import React from "react";

// reactstrap components
import {Badge, Button, Card, Media, Container, Row, Col, CardBody, CardTitle} from "reactstrap";

// core components
import ColorNavbar2 from "components/Navbars/ColorNavbar2.js";
import BlogPostHeader from "components/Headers/BlogPostHeader.js";
import FooterGray from "components/Footers/FooterGray.js";

function BlogPost() {
    document.documentElement.classList.remove("nav-open");

    React.useEffect(() => {
        document.body.classList.add("blog-post");
        window.scrollTo(0, 0);
        document.body.scrollTop = 0;
        return function cleanup() {
            document.body.classList.remove("blog-post");
        };
    });
    return (
        <>
            <ColorNavbar2 />
            <BlogPostHeader />

            <div className="wrapper">
                <div className="main">



                    <div className="section section-white">

                        {/* ********* END BLOGS 4 ********* */}
                        <div className="blog-4">
                            <Container>
                                <Row>
                                    <Col className="ml-auto mr-auto text-center title" md="6">
                                        <h2>A place for storytelling</h2>
                                        <h3 className="title-uppercase">
                                            <small>Written by designers for designers</small>
                                        </h3>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col md="6">
                                        <Card className="card-plain card-blog text-center">
                                            <div className="card-image">
                                                <a href="#pablo" onClick={(e) => e.preventDefault()}>
                                                    <img
                                                        alt="..."
                                                        className="img img-raised"
                                                        src={require("assets/img/sections/val-vesa.jpg")}
                                                    />
                                                </a>
                                            </div>
                                            <CardBody>
                                                <h6 className="card-category text-warning">Travel</h6>
                                                <CardTitle tag="h3">
                                                    <a href="#pablo" onClick={(e) => e.preventDefault()}>
                                                        Learning different cultures through travel
                                                    </a>
                                                </CardTitle>
                                                <p className="card-description">
                                                    A wonderful serenity has taken possession of my entire
                                                    soul, like these sweet mornings of spring which I enjoy
                                                    with my whole heart. I am alone, and feel the charm of
                                                    existence in this spot.
                                                </p>
                                                <br />
                                                <Button
                                                    className="btn-round"
                                                    color="warning"
                                                    href="#pablo"
                                                    onClick={(e) => e.preventDefault()}
                                                >
                                                    Read More
                                                </Button>
                                            </CardBody>
                                        </Card>
                                    </Col>
                                    <Col md="6">
                                        <Card className="card-plain card-blog text-center">
                                            <div className="card-image">
                                                <a href="#pablo" onClick={(e) => e.preventDefault()}>
                                                    <img
                                                        alt="..."
                                                        className="img img-raised"
                                                        src={require("assets/img/sections/rodrigo-ardilha.jpg")}
                                                    />
                                                </a>
                                            </div>
                                            <CardBody>
                                                <h6 className="card-category text-info">Travel</h6>
                                                <CardTitle tag="h3">
                                                    <a href="#pablo" onClick={(e) => e.preventDefault()}>
                                                        Kick-Ass ways to disappear like a Ninja!
                                                    </a>
                                                </CardTitle>
                                                <p className="card-description">
                                                    In the end, the judge ruled that Levandowski could be
                                                    brought in and examined, but that each question asked to
                                                    him would be vetted in advance and should have some basis
                                                    in evidence.
                                                </p>
                                                <br />
                                                <Button
                                                    className="btn-round"
                                                    color="primary"
                                                    href="#pablo"
                                                    onClick={(e) => e.preventDefault()}
                                                >
                                                    Read More
                                                </Button>
                                            </CardBody>
                                        </Card>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col md="6">
                                        <Card className="card-plain card-blog text-center">
                                            <div className="card-image">
                                                <a href="#pablo" onClick={(e) => e.preventDefault()}>
                                                    <img
                                                        alt="..."
                                                        className="img img-raised"
                                                        src={require("assets/img/sections/federico-beccari.jpg")}
                                                    />
                                                </a>
                                            </div>
                                            <CardBody>
                                                <h6 className="card-category text-danger">Lifestyle</h6>
                                                <CardTitle tag="h3">
                                                    <a href="#pablo" onClick={(e) => e.preventDefault()}>
                                                        We will breathe clean air and exercise
                                                    </a>
                                                </CardTitle>
                                                <p className="card-description">
                                                    Don't be scared of the truth because we need to restart
                                                    the human foundation in truth And I love you like Kanye
                                                    loves Kanye I love Rick Owens’ bed design but the back is
                                                    too high for the beams and angle of the ceiling...
                                                </p>
                                                <br />
                                                <Button
                                                    className="btn-round"
                                                    color="danger"
                                                    href="#pablo"
                                                    onClick={(e) => e.preventDefault()}
                                                >
                                                    Read More
                                                </Button>
                                            </CardBody>
                                        </Card>
                                    </Col>
                                    <Col md="6">
                                        <Card className="card-plain card-blog text-center">
                                            <div className="card-image">
                                                <a href="#pablo" onClick={(e) => e.preventDefault()}>
                                                    <img
                                                        alt="..."
                                                        className="img img-raised"
                                                        src={require("assets/img/sections/pedro-lastra.jpg")}
                                                    />
                                                </a>
                                            </div>
                                            <CardBody>
                                                <h6 className="card-category text-success">Best Seller</h6>
                                                <CardTitle tag="h3">
                                                    <a href="#pablo" onClick={(e) => e.preventDefault()}>
                                                        Readers Pick of The Month
                                                    </a>
                                                </CardTitle>
                                                <p className="card-description">
                                                    “Raising equity is very expensive” In essence, it lets new
                                                    consumer businesses apply to raise funding on its
                                                    platform, and gives investors a new way to find and back
                                                    those tricks to finance their growing businesses.
                                                </p>
                                                <br />
                                                <Button
                                                    className="btn-round"
                                                    color="success"
                                                    href="#pablo"
                                                    onClick={(e) => e.preventDefault()}
                                                >
                                                    Read More
                                                </Button>
                                            </CardBody>
                                        </Card>
                                    </Col>
                                </Row>
                            </Container>
                        </div>
                        {/* ********* END BLOGS 4 ********* */}


                    </div>


                </div>
            </div>
            <FooterGray />
        </>
    );
}

export default BlogPost;
