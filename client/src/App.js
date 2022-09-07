import "./App.css";

import {BrowserRouter as Router, Routes, Route, Link} from "react-router-dom";
import Home from "./pages/Home";
import CreatePost from "./pages/CreatePost";
import Post from "./pages/Post";


function App() {


  return (
      <div className="App">
          <div className="navbar">
              <Link to="/"> Home Page</Link>
              <Link to="/createpost"> Create A Post</Link>
          </div>
        <Routes>
          <Route path='/' element={<Home/>} exact />
          <Route path='/createpost' element={<CreatePost/>} />
          <Route path="/post/:id" exact element={<Post/>} />
        </Routes>
      </div>
  );
}

export default App;
