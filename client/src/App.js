import "./App.css";

import {BrowserRouter as Router, Routes, Route, Link} from "react-router-dom";
import Home from "./pages/Home";
import CreatePost from "./pages/CreatePost";


function App() {


  return (
      <div className="App">
          <Link to='/createpost'>Create A Post</Link>
          <Link to='/'>Home Page</Link>
        <Routes>
          <Route path='/' element={<Home/>} exact />
          <Route path='/createpost' element={<CreatePost/>} />
        </Routes>
      </div>
  );
}

export default App;
