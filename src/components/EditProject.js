import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import ProjectService from '../utils/api';
class EditProject extends Component {
  state = {
    id: '',
    title: '',
    description: '',
  };

  componentDidMount() {
    const projectId = this.props.match.params.id;
    const projectService = new ProjectService();
    projectService.getProject(projectId).then((response) => {
      this.setState({
        id: this.props.match.params.id,
        title: response.data.title,
        description: response.data.desscription,
      });
    });
  }

  handleChange = (event) => {
    let { name, value } = event.target;

    this.setState({
      [name]: value,
    });
  };

  handleFormSubmit = (event) => {
    event.preventDefault();
    const projectService = new ProjectService();
    projectService.updateProject(this.state).then(() => {
      this.props.history.push(`/projects/${this.state.id}`);
    });
  };

  render() {
    return (
      <div>
        <form onSubmit={this.handleFormSubmit}>
          <label htmlFor="title">Title</label>
          <input onChange={this.handleChange} type="text" name="title" value={this.state.title} />
          <label htmlFor="description">Description</label>
          <input
            onChange={this.handleChange}
            type="text"
            name="description"
            value={this.state.description}
          />
          <button>Edit Project</button>
        </form>
      </div>
    );
  }
}

export default withRouter(EditProject);
