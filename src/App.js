import './App.css';
import {BrowserRouter as Router, Route} from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css"
import Navbar from "./components/navbar.component";
//import login from "./components/login.component";
//<Route path = "/" exact component = {login} />
import CreateUser from "./components/create-user.component";

function App() {
  return (

    <Router>
      <div className = "container">
        <Navbar />
        <br />
        <Route path = "/create" component = {CreateUser} />
      </div>
    </Router>
  );
}

export default App;
