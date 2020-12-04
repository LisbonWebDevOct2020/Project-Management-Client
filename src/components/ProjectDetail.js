import React from 'react';
import ProjectsService from '../utils/api';
import { withRouter } from 'react-router-dom';

class ProjectDetail extends React.Component {
  state = {
    id: '',
    title: '',
    description: '',
  };

  componentDidMount() {
    const projectsService = new ProjectsService();
    const id = this.props.match.params.id;
    projectsService.getProject(id).then((response) => {
      this.setState({
        id: response.data._id,
        title: response.data.title,
        description: response.data.description,
      });
    });
  }

  handleDelete(id) {
    const projectsService = new ProjectsService();
    projectsService.deleteProject(id).then(() => {
      this.props.history.push(`/projects`);
    });
  }

  render() {
    return (
      <div>
        <h2>{this.state.title}</h2>
        <h3>description: {this.state.description}</h3>
        <div>
          <button onClick={() => this.handleDelete(this.state.id)}>Delete Project</button>
        </div>
        <div>
          <button
            onClick={() => {
              this.props.history.push(`/projects/${this.state.id}/edit`);
            }}
          >
            Edit Project
          </button>
        </div>
      </div>
    );
  }
}

export default withRouter(ProjectDetail);
