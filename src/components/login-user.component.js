import React, {Component} from 'react';
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
