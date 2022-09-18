import React, {useEffect,useContext, useState} from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../helpers/AuthContext";
import {FormControl, InputLabel, Input, FormHelperText} from "@material-ui/core";

function CreatePost() {
    const { authState } = useContext(AuthContext);
    const [title, setTitle] = useState('')
    const [image, setImage] = useState('')
    const [postText, setPostText] = useState('')

    let navigate = useNavigate();

    // const initialValues = {
    //     title: "",
    //     postText: "",
    // };


    useEffect(() => {
        if (!localStorage.getItem("accessToken")) {
            navigate("/login");
        }
    }, []);



    const onSubmit = (data) => {

        const formData = new FormData()
        formData.append('image', image)
        formData.append('title', title)
        formData.append('postText', postText)


        axios
            .post("http://localhost:3001/posts", formData, {
                headers: { accessToken: localStorage.getItem("accessToken") },
            }).then((response) => {
            navigate(`/`);
        });
    };

    // const validationSchema = Yup.object().shape({
    //     title: Yup.string().required("You must input a Title!"),
    //     postText: Yup.string().required(),
    // });


    return (

        <>
            {/*<FormControl>*/}
            {/*    <InputLabel htmlFor="my-input">Email address</InputLabel>*/}
            {/*    <Input id="my-input" aria-describedby="my-helper-text" />*/}
            {/*    <FormHelperText id="my-helper-text">We'll never share your email.</FormHelperText>*/}
            {/*</FormControl>*/}

        <div className="loginContainer">
            <label>Title:</label>
            <input
                style={{width: '600px'}}
                type="text"
                onChange={(event) => {
                    setTitle(event.target.value);
                }}
            />
            <label>Upload Image:</label>

            <input name="image" type="file" size='lg' onChange={(event) => {
                setImage(event.target.files[0]);
            }} />

            <label>Body:</label>
            <input
                style={{width: '600px'}}
                type="text"
                onChange={(event) => {
                    setPostText(event.target.value);
                }}
            />

            <button onClick={onSubmit}> Create Post </button>
        </div>



        {/*<div className="createPostPage">*/}
        {/*    <Formik*/}
        {/*        initialValues={initialValues}*/}
        {/*        onSubmit={onSubmit}*/}
        {/*        // validationSchema={validationSchema}*/}
        {/*    >*/}
        {/*        <Form className="formContainer">*/}
        {/*            <label>Title: </label>*/}
        {/*            <ErrorMessage name="title" component="span" />*/}
        {/*            <Field*/}
        {/*                autoComplete="off"*/}
        {/*                id="inputCreatePost"*/}
        {/*                name="title"*/}
        {/*                placeholder="(Ex. Title...)"*/}
        {/*            />*/}

        {/*            <label htmlFor="">Upload an Image:</label>*/}
        {/*            <input id="file" name="image" type="file" size='lg' onChange={(event) => {*/}
        {/*                setImage(event.target.files[0]);*/}
        {/*            }} />*/}

        {/*            <label>Post: </label>*/}
        {/*            <ErrorMessage name="postText" component="span" />*/}
        {/*            <Field*/}
        {/*                autoComplete="off"*/}
        {/*                id="inputCreatePost"*/}
        {/*                name="postText"*/}
        {/*                placeholder="(Ex. Post...)"*/}
        {/*            />*/}

        {/*            <button type="submit"> Create Post</button>*/}
        {/*        </Form>*/}
        {/*    </Formik>*/}
        {/*</div>*/}
        </>
    );
}

export default CreatePost;