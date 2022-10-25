import React, {useState, useEffect, useContext} from "react";
import {useHistory, Link, useNavigate} from "react-router-dom";
import axios from "axios";

// reactstrap
import {Badge, Button, Card, Media, Container, Row, Col, CardBody, CardTitle} from "reactstrap";

// components
import ColorNavbar2 from "components/Navbars/ColorNavbar.js";
import BlogPostHeader from "components/Headers/BlogPostHeader.js";
import FooterGray from "components/Footers/FooterGray.js";

import { AuthContext } from "../helpers/AuthContext";


function Homepage() {
    const [listOfPosts, setListOfPosts] = useState([]);
    const [likedPosts, setLikedPosts] = useState([]);
    const { authState } = useContext(AuthContext);
    let history = useHistory();



    useEffect(() => {
        axios
            .get(`https://node-react-sql-blog-api.herokuapp.com/posts`, {
                headers: {accessToken: localStorage.getItem("accessToken")},
            })
            .then((response) => {
                setListOfPosts(response.data.listOfPosts);
            });
    }, []);


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

                                 {listOfPosts.map((value, key) => {
                                     return (
                                        <Col md="6" key={key} style={{marginBottom: '40px'}}>
                                            <Card className="card-plain card-blog text-center">
                                                <div className="card-image" style={{cursor: 'pointer'}} onClick={() => {
                                                    history.push(`/blog-post/${value.id}`);
                                                }}>
                                                    <img
                                                        alt="..."
                                                        className="img img-raised"
                                                        src={`https://node-react-sql-blog-api.herokuapp.com/${value.image}`}
                                                    />
                                                </div>
                                                <CardBody>
                                                    <h6 className="card-category ">Posted by
                                                        {' '}
                                                     <Link to={`/profile/${value.UserId}`}
                                                           className='text-warning'
                                                     style={{fontWeight: '600', textTransform: 'uppercase', lineHeight: '1.5em'}}
                                                     >
                                                        {value.username}
                                                     </Link>
                                                    </h6>
                                                    <CardTitle tag="h3" style={{cursor: 'pointer'}}>

                                                            {value.title}

                                                    </CardTitle>
                                                    <p  className="card-description">
                                                        {value.postText}
                                                    </p>
                                                    <br />
                                                    <Button
                                                        className="btn-round"
                                                        color="warning"
                                                        onClick={() => {
                                                            history.push(`/blog-post/${value.id}`);
                                                        }}
                                                    >
                                                        Read More
                                                    </Button>
                                                </CardBody>
                                            </Card>
                                        </Col>
                                     );
                                 })}

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

export default Homepage;
