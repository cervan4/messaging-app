import React, {Component} from 'react';
import axios from 'axios';
export default class CreateUser extends Component {
    constructor(props){
        super(props);
        this.onChangeUsername = this.onChangeUsername.bind(this);
        this.onChangePassword = this.onChangePassword.bind(this);
        this.onChangeEmail = this.onChangeEmail.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

        this.state = {
            email : '',
            username : '',
            password : '',
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
                    const Email = response.data[0].email;
                    const Username = response.data[0].username;
                    const Password = response.data[0].password;
                    this.setState({username:Username,email:Email,password:Password});
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
    onChangeEmail(e) {
        this.setState({
            email: e.target.value,
        })
    }
    onChangePassword(e) {
        this.setState({
            password: e.target.value
        })
    }
    onSubmit(e) {
        e.preventDefault();
        const user = {
            username: this.state.username,
            email: this.state.email,
            password: this.state.password,
        }
        console.log(user);
        axios.post('http://localhost:5000/users/add',user)
            .then(res => console.log(res.data));
        this.setState({
            username: '',
            email: '',
            password: ''
        })
    }
    displayUserData = (users) => {
        if(!users.length) return null;
            return users.map((user, index) => (
                <div key = {index}>
                    <h3>user.email</h3>
                    <h3>user.username</h3>
                    <h3>user.password</h3>
                </div>
            ));
    };
    render() {
        return( 
            <div>
          <div className = "Users-list">
              {this.displayUserData(this.state.users)}
          </div>
                <h3>Create New User</h3>
        <form onSubmit={this.onSubmit}>
          <div className="form-group"> 
            <label>Email: </label>
            <input  type="text"
                required
                className="form-control"
                value={this.state.email}
                onChange={this.onChangeEmail}
                />
            <label>Username: </label>
            <input  type="text"
                required
                className="form-control"
                value={this.state.username}
                onChange={this.onChangeUsername}
                />
            <label>Password: </label>
            <input  type="text"
                required
                className="form-control"
                value={this.state.password}
                onChange={this.onChangePassword}
                />
          </div>
          <div className="form-group">
            <input type="submit" value="Create User" className="btn btn-primary" />
          </div>
        </form>
            </div>
        )
    }
}