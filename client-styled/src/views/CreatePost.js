import React, {useEffect,useContext, useState} from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";
import { AuthContext } from "../helpers/AuthContext";
import {Button, Label, FormGroup, Input, InputGroupAddon, InputGroupText, InputGroup, Container, Row, Col} from "reactstrap";

import WhiteNavbar2 from "../components/Navbars/WhiteNavbar";
import FooterGray from "../components/Footers/FooterGray";

function CreatePost() {
  const { authState } = useContext(AuthContext);
  const [title, setTitle] = useState('')
  const [image, setImage] = useState('')
  const [postText, setPostText] = useState('')

  let history = useHistory();


  useEffect(() => {
    if (!localStorage.getItem("accessToken")) {
      history.push("/login");
    }
  }, []);


  const onSubmit = (data) => {

    const formData = new FormData()
    formData.append('image', image)
    formData.append('title', title)
    formData.append('postText', postText)


    axios
        .post("https://node-react-sql-blog-api.herokuapp.com/posts", formData, {
          headers: { accessToken: localStorage.getItem("accessToken") },
        }).then((response) => {
      history.push(`/`);
    });
  };


  return (
    <>
      <div className="main">
        <div className="section">
          <WhiteNavbar2 />
          <Container>
            <h3 className='text-center mb-5'>Add Blog Post</h3>
            <div>
              <Row className='mx-auto' style={{height: '650px', maxWidth: '700px'}}>

                <Col md="12" sm="12">
                  <FormGroup>
                    <h6>
                      Title <span className="icon-danger">*</span>
                    </h6>
                    <Input
                      className="border-input"
                      placeholder="enter the product name here..."
                      type="text"
                      onChange={(event) => {
                        setTitle(event.target.value);
                      }}
                    />
                  </FormGroup>
                  <FormGroup>
                    <h6>
                      Upload Image <span className="icon-danger">*</span>
                    </h6>
                    <Input
                        className="border-input"
                        placeholder="enter the product name here..."
                        type="file"
                        onChange={(event) => {
                          setImage(event.target.files[0]);
                        }}
                    />
                  </FormGroup>
                  <FormGroup>
                    <h6>Blog Post <span className="icon-danger">*</span></h6>
                    <Input
                      className="textarea"
                      // maxLength="150"
                      placeholder="Write your post here..."
                      rows="20"
                      type="textarea"
                      onChange={(event) => {
                        setPostText(event.target.value);
                      }}
                    />
                  </FormGroup>
                </Col>
              </Row>
              <Row className="buttons-row mx-auto" style={{maxWidth: '650px'}}>
                <Col md="6" sm="6">
                  <Button
                    block
                    className="btn-round"
                    color="danger"
                    outline
                    type="reset"
                    onClick={() => {
                      history.goBack()
                    }}
                  >
                    Cancel
                  </Button>
                </Col>
                <Col md="6" sm="6">
                  <Button
                    block
                    className="btn-round"
                    color="primary"
                    type="submit"
                    onClick={onSubmit}
                  >
                     Publish
                  </Button>
                </Col>
              </Row>
            </div>
          </Container>
        </div>
      </div>
      <FooterGray />
    </>
  );
}

export default CreatePost;
