import React, {useState} from 'react'
import './App.css';
import {BrowserRouter as Router, Route, Switch} from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css"
import Navbar from "./components/navbar.component";
import Register from "./components/create-user.component";
import Login from "./components/login-user.component";
import { Provider } from "react-redux";
import store from "./store";
import jwt_decode from "jwt-decode";
import setAuthToken from "./utils/setAuthToken";
import { setCurrentUser, logoutUser } from "./actions/authActions";
import PrivateRoute from "./components/private-route/PrivateRoute";
import Dashboard from "./components/dashboard/Dashboard";
import {registerUser} from "./actions/authActions"
if (localStorage.jwtToken) {
  const token = localStorage.jwtToken;
  setAuthToken(token);
  const decoded = jwt_decode(token);
  store.dispatch(setCurrentUser(decoded));
  const currentTime = Date.now() / 1000; // to get in milliseconds
  if (decoded.exp < currentTime) {
    store.dispatch(logoutUser());
    window.location.href = "./login";
  }
}
/*
        <>
          {id}
          <Login onIdSubmit = {setId}/>
        </>
        */
function App() {
  return (
<Provider store={store}>
    <Router>
      <div className = "container">
        <Navbar />
        <br />
        <Route path = "/create" render={(props) => <Register registerUser={registerUser} {...props} />} />
        <Route path = "/login" component = {Login}/>
        <Switch>
              <PrivateRoute exact path="/dashboard" component={Dashboard} />
            </Switch>
      </div>
    </Router>
</Provider>
  );
}

export default App;
