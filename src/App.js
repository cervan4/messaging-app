import React, {useState} from 'react'
import './App.css';
import {BrowserRouter as Router, Route} from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css"
import Navbar from "./components/navbar.component";
//import login from "./components/login.component";
//<Route path = "/" exact component = {login} />
import CreateUser from "./components/create-user.component";
import Login from "./components/login-user.component";
/*
        <>
          {id}
          <Login onIdSubmit = {setId}/>
        </>
        */
function App() {
  const [id,setId] = useState()
  return (

    <Router>
      <div className = "container">
        <Navbar />
        <br />
        <Route path = "/create" component = {CreateUser} />
        <Route path = "/login" component = {Login}/>
      </div>
    </Router>
  );
}

export default App;
