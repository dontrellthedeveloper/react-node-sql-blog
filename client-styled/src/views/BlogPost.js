import React, { useEffect, useState, useContext } from "react";
import {useParams, useHistory, Link} from "react-router-dom";
import axios from "axios";

// reactstrap components
import {Badge, Button, Card, Media, Container, Row, Col, FormGroup, Input} from "reactstrap";

// core components
import FooterGray from "components/Footers/FooterGray.js";
import WhiteNavbar2 from "../components/Navbars/WhiteNavbar";

import { AuthContext } from "../helpers/AuthContext";


function BlogPost() {
  let { id } = useParams();
  const [postObject, setPostObject] = useState({});
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");
  const [listOfUsers, setListOfUsers] = useState([]);
  const { authState } = useContext(AuthContext);

  let history = useHistory()

  document.documentElement.classList.remove("nav-open");

  useEffect(() => {
    document.body.classList.add("blog-post");
    // window.scrollTo(0, 0);
    // document.body.scrollTop = 0;
    return function cleanup() {
      document.body.classList.remove("blog-post");
    };
  });


  useEffect(() => {
    axios.get(`https://node-react-sql-blog-api.herokuapp.com/posts/byId/${id}`).then((response) => {
      setPostObject(response.data);
      // console.log(response.data)
    });


    axios.get(`https://node-react-sql-blog-api.herokuapp.com/auth`).then((response) => {
      setListOfUsers(response.data);
      console.log(response.data)
    });


    axios.get(`https://node-react-sql-blog-api.herokuapp.com/comments/${id}`).then((response) => {
      setComments(response.data);
    });
  }, []);


  const addComment = () => {
    axios
        .post(
            `https://node-react-sql-blog-api.herokuapp.com/comments`,
            {
              commentBody: newComment,
              PostId: id,
            },
            {
              headers: {
                accessToken: localStorage.getItem("accessToken"),
              },
            }
        )
        .then((response) => {
          if (response.data.error) {
            console.log(response.data.error);
          } else {
            const commentToAdd = {
              commentBody: newComment,
              username: response.data.username,
              userId: response.data.userId
            };
            setComments([...comments, commentToAdd]);
            setNewComment("");
          }
        });
  };

  const deleteComment = (id) => {
    axios
        .delete(`https://node-react-sql-blog-api.herokuapp.com/comments/${id}`, {
          headers: { accessToken: localStorage.getItem("accessToken") },
        })
        .then(() => {
          setComments(
              comments.filter((val) => {
                return val.id != id;
              })
          );
        });
  };

  const deletePost = (id) => {
    axios
        .delete(`https://node-react-sql-blog-api.herokuapp.com/posts/${id}`, {
          headers: { accessToken: localStorage.getItem("accessToken") },
        })
        .then(() => {
          history.push("/");
        });
  };

  const postdate = new Date(postObject.createdAt);


  return (
    <>
      {/*<ColorNavbar2 />*/}
      <WhiteNavbar2 />
      {/*<BlogPostHeader />*/}
      <div className="wrapper">
        <div className="main">
          <div className="section section-white">
            <Container>
              <Row>
                <Col className="ml-auto mr-auto text-center title" md="6">
                  <h2>A place for storytelling</h2>
                  <h3 className="title-uppercase">
                    <small>Written by {postObject.username}</small>
                  </h3>
                </Col>
              </Row>
              <Row>
                <Col className="ml-auto mr-auto" md="10">
                  <div className="text-center">


                    <Badge className="main-tag" color="warning">
                      Trending
                    </Badge>
                    <a href="javascript: void(0);">
                      <h3 className="title">
                        {postObject.title}
                      </h3>
                    </a>
                    <h6 className="title-uppercase">
                      {postdate.toLocaleDateString()}
                    </h6>
                  </div>
                </Col>
                <Col className="ml-auto mr-auto" md="8">
                  <a href="javascript: void(0);">
                    <Card
                      data-radius="none"
                    >
                      <img src={`https://node-react-sql-blog-api.herokuapp.com/${postObject.image}`} alt=""/>
                    </Card>
                    <p className="image-thumb text-center">
                      Posted by {postObject.username}
                    </p>
                  </a>

                  {authState.username === postObject.username && (

                  <Row className="buttons-row mx-auto" style={{maxWidth: '450px'}}>
                    <Col md="12" sm="12">
                      <Button
                          block
                          className="btn-round"
                          color="danger"
                          outline
                          type="reset"
                          onClick={() => {
                            deletePost(postObject.id);
                          }}
                      >
                        Delete Post
                      </Button>
                    </Col>
                  </Row>


                  )}

                  <div className="article-content">
                    <h4>{postObject.title}</h4>
                    <p>
                      {postObject.postText}
                    </p>


                  </div>
                  <br />
                  <div className="article-footer">
                    <Container>
                      <Row>
                        <Col md="6">
                          <h5>Tags:</h5>
                          <Badge color="warning">Trending</Badge>
                        </Col>
                        <Col className="ml-auto" md="4">
                          <div className="sharing">
                            <h5>Spread the word</h5>
                            <Button
                              className="btn-just-icon mr-1"
                              color="twitter"
                            >
                              <i className="fa fa-twitter" />
                            </Button>
                            <Button
                              className="btn-just-icon mr-1"
                              color="facebook"
                            >
                              <i className="fa fa-facebook" />
                            </Button>
                            <Button className="btn-just-icon" color="google">
                              <i className="fa fa-google" />
                            </Button>
                          </div>
                        </Col>
                      </Row>
                    </Container>
                  </div>
                  <hr />
                  <Container>
                    <Row style={{display: 'block'}}>
                      <Media>

                        <Media body>
                          <Media heading>Posted by
                            {' '}
                            <Link to={`/profile/${postObject.UserId}`}
                                  className='text-warning'
                                  style={{fontWeight: '600', lineHeight: '1.5em'}}
                            >
                            {postObject.username}
                            </Link>
                          </Media>
                        </Media>
                      </Media>
                    </Row>



                    <Row style={{display: 'block'}}>
                      <div className="comments media-area">

                        <h3 className="text-center">Comments</h3>


                        {!authState.status ? (
                            <div></div>
                        ):(
                          <Col md="12" sm="12">
                            <FormGroup>
                              <Input
                                  className="textarea"
                                  value={newComment}
                                  placeholder="Add comment..."
                                  rows="4"
                                  type="textarea"
                                  onChange={(event) => {
                                    setNewComment(event.target.value);
                                  }}
                              />
                            </FormGroup>
                            <Row className="buttons-row mx-auto" style={{maxWidth: '450px'}}>
                              <Button
                                  block
                                  className="btn-round"
                                  color="primary"
                                  type="text"
                                  onClick={addComment}
                              >
                                Add Comment
                              </Button>
                            </Row>
                          </Col>

                        )}




                        {comments.map((comment, key) => {
                          return (

                            <Media>


                              <Media body>
                                <Media heading tag="h5">
                                  <Link to={`/profile/${comment.userId}`}
                                        className='text-warning'
                                        style={{fontWeight: '600', lineHeight: '1.5em'}}
                                  >
                                    {comment.username}
                                  </Link>

                                </Media>
                                <div className="pull-right">


                                  <h6 className="text-muted">{new Date(comment.createdAt).toLocaleString()}</h6>

                                  {authState.username === comment.username && (
                                  <Button
                                      className="btn-link pull-right"
                                      style={{color: '#f5593d'}}
                                      onClick={() => {
                                        deleteComment(comment.id);
                                      }}
                                  >
                                    <i className="fa fa-trash mr-1" />
                                    Delete Comment
                                  </Button>
                                  )}


                                </div>
                                <p>
                                  {comment.commentBody}
                                </p>
                                {/* end media */}
                              </Media>



                            </Media>

                          );
                        })}


                      </div>
                    </Row>
                  </Container>
                </Col>
              </Row>

            </Container>
          </div>
        </div>
      </div>
      <FooterGray />
    </>
  );
}

export default BlogPost;
