import {useState, useEffect} from "react";

import "assets/css/bootstrap.min.css";
import "assets/scss/paper-kit.scss";
import "assets/demo/demo.css";
import "assets/demo/react-demo.css";
import './App.scss';

import {BrowserRouter, Route, Switch} from "react-router-dom";
import Homepage from "./views/Homepage";
import CreatePost from "./views/CreatePost";
import BlogPost from "./views/BlogPost";
import RegisterPage from "./views/RegisterPage";
import LoginPage from "./views/LoginPage";
import ProfilePage from "./views/ProfilePage";
import Error404 from "./views/Error404";

import {AuthContext} from "./helpers/AuthContext";
import ScrollToTop from "./helpers/ScrollToTop";

import axios from 'axios'


const App = () => {
    const [authState, setAuthState] = useState({
        username: "",
        id: 0,
        status: false,
    });

    useEffect(() => {
        axios
            .get("https://node-react-sql-blog-api.herokuapp.com/auth/auth", {
                headers: {
                    accessToken: localStorage.getItem("accessToken"),
                },
            })
            .then((response) => {
                if (response.data.error) {
                    setAuthState({ ...authState, status: false });
                } else {
                    setAuthState({
                        username: response.data.username,
                        id: response.data.id,
                        status: true,
                    });
                }
            });
    }, []);





    return (
        <AuthContext.Provider value={{authState, setAuthState}}>
            <BrowserRouter>
                <ScrollToTop />
                <Switch>
                    <Route path="/"  exact render={(props) => <Homepage {...props} />} />
                    <Route path="/create-post" render={(props) => <CreatePost {...props} />}/>
                    <Route path="/blog-post/:id" render={(props) => <BlogPost {...props} />} />
                    <Route path="/register" render={(props) => <RegisterPage {...props} />}/>
                    <Route path="/login" render={(props) => <LoginPage {...props} />} />
                    <Route path="/profile/:id" render={(props) => <ProfilePage {...props} />}/>
                    <Route path="/*" render={(props) => <Error404 {...props} />} />
                </Switch>
            </BrowserRouter>
        </AuthContext.Provider>
    );
};

export default App;
