import React, { useEffect, useState } from "react";
import {useParams, useHistory, useNavigate} from "react-router-dom";
import axios from "axios";
// reactstrap components
import {
  Button,
  Label,
  FormGroup,
  Input,
  NavItem,
  NavLink,
  Nav,
  TabContent,
  TabPane,
  Container,
  Row,
  Col,
} from "reactstrap";


import {Badge, Card, CardBody, CardTitle} from "reactstrap";



// core components
import ColorNavbar2 from "components/Navbars/ColorNavbar.js";
import ProfilePageHeader from "components/Headers/ProfilePageHeader.js";
import FooterWhite from "components/Footers/FooterWhite.js";
import FooterGray from "../components/Footers/FooterGray";

function ProfilePage() {
    const [activeTab, setActiveTab] = React.useState("1");

    let { id } = useParams();
    let history = useHistory();
    const [username, setUsername] = useState("");
    const [jobTitle, setJobTitle] = useState("");
    const [description, setDescription] = useState("");
    const [userImage, setUserImage] = useState("");

    const [listOfPosts, setListOfPosts] = useState([]);
    const [postImage, setPostImage] = useState('')

    const toggle = (tab) => {
        if (activeTab !== tab) {
          setActiveTab(tab);
        }
    };

    useEffect(() => {
        // axios.get(`http://localhost:3001/auth/basicinfo/${id}`).then((response) => {
        axios.get(`https://node-react-sql-blog-api.herokuapp.com/auth/basicinfo/${id}`).then((response) => {
            setUsername(response.data.username);
            setJobTitle(response.data.jobTitle)
            setDescription(response.data.description)
            setUserImage(response.data.image)
        });

        // axios.get(`http://localhost:3001/posts/byuserId/${id}`).then((response) => {
        axios.get(`https://node-react-sql-blog-api.herokuapp.com/posts/byuserId/${id}`).then((response) => {
            setListOfPosts(response.data);
            setPostImage(response.data.image)
        });
    }, []);


  document.documentElement.classList.remove("nav-open");

  React.useEffect(() => {
    document.body.classList.add("profile-page");
    return function cleanup() {
      document.body.classList.remove("profile-page");
    };
  });

  return (
    <>
      <ColorNavbar2 />
      <ProfilePageHeader />
      <div className="wrapper">
        <div className="profile-content section">
          <Container>
            <Row>
              <div className="profile-picture">
                <div
                  className="fileinput fileinput-new"
                  data-provides="fileinput"
                >
                  <div className="fileinput-new img-no-padding">
                    <img
                      alt="..."
                      src={`http://localhost:3001/${userImage}`}
                    />
                  </div>
                  <div className="name">
                    <h4 className="title text-center">
                        {username} <br />
                      {/*<small>Music Producer</small>*/}
                      <small>{jobTitle}</small>
                    </h4>
                  </div>
                </div>
              </div>
            </Row>
            <Row>
              <Col className="ml-auto mr-auto text-center" md="6">
                <p>
                    {description}
                </p>
                <br />
                <Button className="btn-round" color="default" outline>
                  <i className="fa fa-cog mr-1" />
                  Settings
                </Button>
              </Col>
            </Row>
            <br />
            <div className="nav-tabs-navigation">
              <div className="nav-tabs-wrapper">
                <Nav role="tablist" tabs>
                  <NavItem>
                    {/*<NavLink*/}
                    {/*  className={activeTab === "1" ? "active" : ""}*/}
                    {/*  onClick={() => {*/}
                    {/*    toggle("1");*/}
                    {/*  }}*/}
                    {/*>*/}
                    {/*  Follows*/}
                    {/*</NavLink>*/}
                  </NavItem>
                  <NavItem>
                    {/*<NavLink*/}
                    {/*  className={activeTab === "2" ? "active" : ""}*/}
                    {/*  onClick={() => {*/}
                    {/*    toggle("2");*/}
                    {/*  }}*/}
                    {/*>*/}
                    {/*  Following*/}
                    {/*</NavLink>*/}
                  </NavItem>
                </Nav>
              </div>
            </div>





            <Container>
                <Row>
                    <Col className="ml-auto mr-auto text-center title" md="6">
                        <h2>{username}'s Blog Posts</h2>
                        <h3 className="title-uppercase">
                            <small>Written by creators for creators</small>
                        </h3>
                    </Col>
                </Row>

                {listOfPosts.map((value, key) => {
                    return (
                        <>
                            <div className="article" key={key}>
                                <Row>
                                    <Col className="ml-auto mr-auto" md="8">
                                        <Card className="card-blog card-plain text-center">
                                            <div className="card-image" style={{cursor: 'pointer'}} onClick={() => {
                                                history.push(`/blog-post/${value.id}`);
                                            }}>
                                                    <img
                                                        alt="..."
                                                        className="img img-raised"
                                                        // src={require("assets/img/sections/bruno-abatti.jpg")}
                                                        src={`http://localhost:3001/${value.image}`}
                                                    />
                                            </div>
                                            <CardBody>
                                                {/*<div className="card-category">*/}
                                                {/*    <Badge className="main-tag" color="primary">*/}
                                                {/*        Featured*/}
                                                {/*    </Badge>*/}
                                                {/*</div>*/}
                                                <a href="javascrip: void(0);">
                                                    <CardTitle tag="h3">
                                                        {/*My Review of Pitchfork’s ‘Indie 500’ Album Review*/}
                                                        {value.title}
                                                    </CardTitle>
                                                </a>
                                                <div className="card-description">
                                                    <p>
                                                        {/*In the first sentence of Pitchfork’s review of my*/}
                                                        {/*collaborative project with 9th Wonder, INDIE 500, a*/}
                                                        {/*reviewer who is associated with music review site*/}
                                                        {/*rhapsody.com writes about how I criticize and then*/}
                                                        {/*distance myself from “celebrity straw men” with the*/}
                                                        {/*line “celebrities be making money...*/}
                                                        {value.postText}
                                                    </p>
                                                </div>
                                            </CardBody>
                                            <Button className="btn-round" color="danger" size="sm"                                               onClick={() => {
                                                history.push(`/blog-post/${value.id}`);
                                            }}>
                                                Read more
                                            </Button>
                                        </Card>
                                    </Col>
                                </Row>
                            </div>
                            <hr />
                            <br />
                            <br />
                        </>

                    );
                })}



                {/*<div className="article">*/}
                {/*    <Row>*/}
                {/*        <Col className="ml-auto mr-auto" md="8">*/}
                {/*            <Card className="card-blog card-plain text-center">*/}
                {/*                <div className="card-image">*/}
                {/*                    <a href="views/ProfilePage#pablo" onClick={(e) => e.preventDefault()}>*/}
                {/*                        <img*/}
                {/*                            alt="..."*/}
                {/*                            className="img img-raised"*/}
                {/*                            src={require("assets/img/sections/federico-beccari.jpg")}*/}
                {/*                        />*/}
                {/*                    </a>*/}
                {/*                </div>*/}
                {/*                <CardBody>*/}
                {/*                    <div className="card-category">*/}
                {/*                        <Badge className="main-tag" color="info">*/}
                {/*                            Popular*/}
                {/*                        </Badge>*/}
                {/*                    </div>*/}
                {/*                    <a href="javascrip: void(0);">*/}
                {/*                        <CardTitle tag="h3">*/}
                {/*                            You Should Get Excited About Virtual Reality.*/}
                {/*                        </CardTitle>*/}
                {/*                        <h6 className="title-uppercase">October 20, 2016</h6>*/}
                {/*                    </a>*/}
                {/*                    <div className="card-description">*/}
                {/*                        <p>*/}
                {/*                            In the first sentence of Pitchfork’s review of my*/}
                {/*                            collaborative project with 9th Wonder, INDIE 500, a*/}
                {/*                            reviewer who is associated with music review site*/}
                {/*                            rhapsody.com writes about how I criticize and then*/}
                {/*                            distance myself from “celebrity straw men” with the*/}
                {/*                            line “celebrities be making money...*/}
                {/*                        </p>*/}
                {/*                    </div>*/}
                {/*                </CardBody>*/}
                {/*                <Button className="btn-round" color="danger" size="sm">*/}
                {/*                    Read more*/}
                {/*                </Button>*/}
                {/*            </Card>*/}
                {/*        </Col>*/}
                {/*    </Row>*/}
                {/*</div>*/}
                {/*<hr />*/}
                {/*<br />*/}
                {/*<br />*/}
                {/*<div className="article">*/}
                {/*    <Col className="ml-auto mr-auto" md="8">*/}
                {/*        <Card className="card-blog card-plain text-center">*/}
                {/*            <div className="card-image">*/}
                {/*                <a href="views/ProfilePage#pablo" onClick={(e) => e.preventDefault()}>*/}
                {/*                    <img*/}
                {/*                        alt="..."*/}
                {/*                        className="img img-raised"*/}
                {/*                        src={require("assets/img/sections/leonard-cotte.jpg")}*/}
                {/*                    />*/}
                {/*                    <p className="image-thumb">Photo by Cam Adams</p>*/}
                {/*                </a>*/}
                {/*            </div>*/}
                {/*            <CardBody>*/}
                {/*                <div className="card-category">*/}
                {/*                    <Badge className="main-tag" color="warning">*/}
                {/*                        Trending*/}
                {/*                    </Badge>*/}
                {/*                </div>*/}
                {/*                <a href="javascrip: void(0);">*/}
                {/*                    <CardTitle tag="h3">*/}
                {/*                        Make Somebody Nervous Before You Die*/}
                {/*                    </CardTitle>*/}
                {/*                    <h6 className="title-uppercase">October 20, 2016</h6>*/}
                {/*                </a>*/}
                {/*                <div className="card-description">*/}
                {/*                    <p>*/}
                {/*                        You won’t find many concepts that are very useful or*/}
                {/*                        important if you insist on having a worldview that’s*/}
                {/*                        void of controversy, invulnerable to criticism, and*/}
                {/*                        incapable of making others feel confused...*/}
                {/*                    </p>*/}
                {/*                </div>*/}
                {/*            </CardBody>*/}
                {/*            <Button className="btn-round" color="danger" size="sm">*/}
                {/*                Read more*/}
                {/*            </Button>*/}
                {/*        </Card>*/}
                {/*    </Col>*/}
                {/*</div>*/}
                {/*<hr />*/}

            </Container>







          </Container>
        </div>
      </div>
      <FooterWhite />
    </>
  );
}

export default ProfilePage;
