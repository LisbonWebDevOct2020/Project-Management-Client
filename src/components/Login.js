import AuthService from '../utils/auth';
import { Link, withRouter } from 'react-router-dom';

import React, { Component } from 'react';

class Login extends Component {
  state = {
    username: '',
    password: '',
  };

  handleFormSubmit = (event) => {
    event.preventDefault();
    const { username, password } = this.state;
    const authService = new AuthService();
    authService.login(username, password).then((response) => {
      this.props.setCurrentUser(response.data);
      localStorage.setItem('loggedInUser', response.data._id);
      this.props.history.push('/projects');
    });
  };

  handleChange = (event) => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  };
  render() {
    return (
      <div>
        <form onSubmit={this.handleFormSubmit}>
          <label>Username:</label>
          <input
            type="text"
            name="username"
            value={this.state.username}
            onChange={this.handleChange}
          />
          <label>Password:</label>
          <input
            type="password"
            name="password"
            value={this.state.password}
            onChange={this.handleChange}
          />
          <button>Login</button>
        </form>
        <p>
          Don't have account?
          <Link to={'/signup'}> Signup</Link>
        </p>
      </div>
    );
  }
}

export default withRouter(Login);
