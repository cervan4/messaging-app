/*import React, {Component} from 'react';
import axios from 'axios';
export default class Login extends Component {
    constructor(props){
        super(props);
        this.onChangeUsername = this.onChangeUsername.bind(this);
        this.onChangePassword = this.onChangePassword.bind(this);
        this.onChangeuser = this.onChangeuser.bind(this);
        this.ontest = this.ontest.bind(this);

        this.state = {
            username : '',
            password : '',
            user : '',
            submited : false,
            users: [],
        }
    }
    //This code is to be able to display data from the database to the screen 
        componentDidMount = () => {
            this.getusersdata();
        };
        getusersdata = () => {
            axios.get('http://localhost:5000/users/')
                .then((response) =>{
                    this.setState({users:response.data});
                })
                .catch(() => {
                    alert('Error when getting data')
                })
        }
    onChangeUsername(e) {
        this.setState({
            username: e.target.value,
        });
    }
    onChangePassword(e) {
        this.setState({
            password: e.target.value
        })
    }

    onChangeuser(e) {
        e.preventDefault();
        this.setState({
            user: e.target.value
        })
    }
   
    ontest(e) {
        e.preventDefault();
        this.setState({
            submited: true
        })
      }
    displayUserData = (users) => {
        if(!users.length) return null;
            return users.map((user, index) => (
                <div key = {index} className = "user__display">
                    <h3>{user.email}</h3>
                    <h3>{user.username}</h3>
                    <h3>{user.password}</h3>
                </div>
            ));
    };
    render() {
        return( 
            <div>
               
        <form onSubmit={this.ontest}>
            <label>Username: </label>
            <input  type="text"
                required
                className="form-control"
                value={this.state.user}
                onChange={this.onChangeuser}
                />
            <label>Password: </label>
            <input  type="password"
                required
                className="form-control"
                value={this.state.password}
                onChange={this.onChangePassword}
                />
          <div className="form-group">
            <input type="submit" value="Login" className="btn btn-primary" />
            </div>
                </form>

            <div>

   { this.state.submited ? 
   this.state.users.filter(user => 
        user.username === this.state.user && user.password === this.state.password).map(searchedusers => {
          return(
            <tr key={searchedusers.username}>
              <td>{searchedusers.email}</td>
              <td>{searchedusers.password}</td>
            </tr>
          );
        })
        :<div>

            </div>
    }
            </div>
                </div>
        )
    }
}
*/

import React, { Component } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { loginUser } from "../actions/authActions";
import classnames from "classnames";
class Login extends Component {
  constructor() {
    super();
    this.state = {
      email: "",
      password: "",
      errors: {}
    };
  }
  componentDidMount() {
    if (this.props.auth.isAuthenticated) {
      this.props.history.push("/dashboard");
    }
  }
componentWillReceiveProps(nextProps) {
    if (nextProps.auth.isAuthenticated) {
      this.props.history.push("/dashboard"); // push user to dashboard when they login
    }
if (nextProps.errors) {
      this.setState({
        errors: nextProps.errors
      });
    }
  }
onChange = e => {
    this.setState({ [e.target.id]: e.target.value });
  };
onSubmit = e => {
    e.preventDefault();
const userData = {
      email: this.state.email,
      password: this.state.password
    };
    loginUser(userData); 
  };
render() {
    const { errors } = this.state;
return (
      <div className="container">
        <div style={{ marginTop: "4rem" }} className="row">
          <div className="col s8 offset-s2">
            <Link to="/" className="btn-flat waves-effect">
              <i className="material-icons left">keyboard_backspace</i> Back to
              home
            </Link>
            <div className="col s12" style={{ paddingLeft: "11.250px" }}>
              <h4>
                <b>Login</b> below
              </h4>
              <p className="grey-text text-darken-1">
                Don't have an account? <Link to="/create">Register</Link>
              </p>
            </div>
            <form noValidate onSubmit={this.onSubmit}>
              <div className="input-field col s12">
                <input
                  onChange={this.onChange}
                  value={this.state.email}
                  error={errors.email}
                  id="email"
                  type="email"
                  className={classnames("", {
                    invalid: errors.email || errors.emailnotfound
                  })}
                />
                <label htmlFor="email">Email</label>
                <span className="red-text">
                  {errors.email}
                  {errors.emailnotfound}
                </span>
              </div>
              <div className="input-field col s12">
                <input
                  onChange={this.onChange}
                  value={this.state.password}
                  error={errors.password}
                  id="password"
                  type="password"
                  className={classnames("", {
                    invalid: errors.password || errors.passwordincorrect
                  })}
                />
                <label htmlFor="password">Password</label>
                <span className="red-text">
                  {errors.password}
                  {errors.passwordincorrect}
                </span>
              </div>
              <div className="col s12" style={{ paddingLeft: "11.250px" }}>
                <button
                  style={{
                    width: "150px",
                    borderRadius: "3px",
                    letterSpacing: "1.5px",
                    marginTop: "1rem"
                  }}
                  type="submit"
                  className="btn btn-large waves-effect waves-light hoverable blue accent-3"
                >
                  Login
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  }
}
Login.propTypes = {
  loginUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};
const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors
});
export default connect(
  mapStateToProps,
  { loginUser }
)(Login);