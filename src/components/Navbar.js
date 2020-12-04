import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import AuthService from '../utils/auth';

class Navbar extends Component {
  logoutUser = () => {
    const authService = new AuthService();
    authService.logout().then(() => {
      this.props.setCurrentUser(null);
      localStorage.removeItem('loggedInUser');
    });
  };

  render() {
    if (this.props.loggedInUser) {
      return (
        <div>
          <p>Welcome {this.props.loggedInUser.username}</p>
          <nav>
            <ul>
              <NavLink
                to="/
              "
              >
                <li>
                  <button onClick={this.logoutUser}>Logout</button>
                </li>
              </NavLink>
              <li>
                <NavLink activeStyle={{ color: 'red' }} exact to="/">
                  Home
                </NavLink>
              </li>
              <li>
                <NavLink activeStyle={{ color: 'red' }} exact to="/projects">
                  List Projects
                </NavLink>
              </li>
              <li>
                <NavLink activeStyle={{ color: 'red' }} exact to="/projects/add">
                  Add Project
                </NavLink>
              </li>
            </ul>
          </nav>
        </div>
      );
    } else {
      return (
        <nav>
          <ul>
            <li>
              <NavLink activeStyle={{ color: 'red' }} exact to="/signup">
                Signup
              </NavLink>
            </li>
            <li>
              <NavLink activeStyle={{ color: 'red' }} exact to="/login">
                Login
              </NavLink>
            </li>
            <li>
              <NavLink activeStyle={{ color: 'red' }} exact to="/login-google">
                Login with Google
              </NavLink>
            </li>
          </ul>
        </nav>
      );
    }
  }
}

export default Navbar;
