import axios from "axios";
import { useEffect, useState } from "react";

const Home = () => {
    const [listOfPosts, setListOfPosts] = useState([]);

    useEffect(() => {
        axios.get("http://localhost:3001/posts").then((response) => {
            setListOfPosts(response.data);
            // console.log(response)
        });
    }, []);

    return (
        <div>
            {listOfPosts.map((value, key) => {
                return (
                    <div className="post" key={key}>
                        <div className="title"> {value.title} </div>
                        <div className="body">{value.postText}</div>
                        <div className="footer">{value.username}</div>
                    </div>
                );
            })}
        </div>
    );
};

export default Home;
