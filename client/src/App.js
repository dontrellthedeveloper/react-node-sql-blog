import "./App.css";

import {BrowserRouter as Router, Routes, Route, Link} from "react-router-dom";
import Home from "./pages/Home";
import CreatePost from "./pages/CreatePost";
import Post from "./pages/Post";
import Registration from "./pages/Registration";
import Login from "./pages/Login";


function App() {


  return (
      <div className="App">
          <div className="navbar">
              <Link to="/"> Home Page</Link>
              <Link to="/createpost"> Create A Post</Link>
              <Link to='/login'>Login</Link>
              <Link to='/registration'>Registration</Link>
          </div>
        <Routes>
          <Route path='/' element={<Home/>} exact />
          <Route path='/createpost' element={<CreatePost/>} />
          <Route path="/post/:id" exact element={<Post/>} />
          <Route path="/registration" exact element={<Registration/>} />
          <Route path="/login" exact element={<Login/>} />
        </Routes>
      </div>
  );
}

export default App;
