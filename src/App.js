import './App.css';
import React, { Component } from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import ListProjects from './components/ListProjects';
import AddProject from './components/AddProject';
import ProjectDetail from './components/ProjectDetail';
import EditProject from './components/EditProject';
import Navbar from './components/Navbar';
import Signup from './components/Signup';
import Login from './components/Login';
import AuthService from './utils/auth';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer, toast } from 'react-toastify';

class App extends Component {
  state = {
    loggedInUser: null,
  };

  setCurrentUser = (user) => {
    this.setState({
      loggedInUser: user,
    });
  };

  componentDidMount() {
    if (this.state.loggedInUser === null) {
      const authService = new AuthService();
      authService.loggedin().then((response) => {
        if (response.data._id) {
          this.setCurrentUser(response.data);
        }
      });
    } else {
      localStorage.removeItem('loggedInUser');
    }
  }
  render() {
    if (localStorage.getItem('loggedInUser')) {
      return (
        <div className="App">
          <ToastContainer />
          <Navbar loggedInUser={this.state.loggedInUser} setCurrentUser={this.setCurrentUser} />
          <Switch>
            <Route exact path="/" component={ListProjects} />
            <Route exact path="/projects" component={ListProjects} />
            <Route
              exact
              path="/projects/add"
              render={() => {
                if (localStorage.getItem('loggedInUser')) {
                  return <AddProject />;
                } else {
                  return <Redirect to="/login" />;
                }
              }}
            />
            <Route exact path="/projects/:id/edit" component={EditProject} />
            <Route exact path="/projects/:id" component={ProjectDetail} />
            <Route path="/signup" component={Signup} />
            <Route
              path="/login"
              render={() => {
                return <Login setCurrentUser={this.setCurrentUser} />;
              }}
            />
          </Switch>
        </div>
      );
    } else {
      return <Redirect to="/login" />;
    }
  }
}

export default App;
