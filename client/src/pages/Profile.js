import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

function Profile() {
    let { id } = useParams();
    let navigate = useNavigate();
    const [username, setUsername] = useState("");
    const [listOfPosts, setListOfPosts] = useState([]);
    const [postImage, setPostImage] = useState('')

    useEffect(() => {
        axios.get(`http://localhost:3001/auth/basicinfo/${id}`).then((response) => {
            setUsername(response.data.username);
        });

        axios.get(`http://localhost:3001/posts/byuserId/${id}`).then((response) => {
            setListOfPosts(response.data);
            setPostImage(response.data.image)
        });
    }, []);

    return (
        <div className="profilePageContainer">
            <div className="basicInfo">
                {" "}
                <h1> Username: {username} </h1>
            </div>
            <div className="listOfPosts">
                {listOfPosts.map((value, key) => {
                    return (
                        <div key={key} className="post">
                            <div className="title"> {value.title} </div>
                            <div
                                className="body"
                                onClick={() => {
                                    navigate(`/post/${value.id}`);
                                }}
                            >
                                <img style={{width: '100%', height: '200px'}} src={`http://localhost:3001/${value.image}`} alt='no image'/>
                                {/*{value.postText}*/}
                            </div>
                            <div className="footer">
                                <div className="username">{value.username}</div>
                                {/*<div className="buttons">*/}
                                {/*    <label> {value.Likes.length}</label>*/}
                                {/*</div>*/}
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}

export default Profile;