import React, { Component } from "react";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap";
import "bootstrap/dist/js/bootstrap.js";
import "bootstrap/dist/js/bootstrap.bundle.min";
import ProjectParent from "./project-parent.js";
import { withAuth0 } from "@auth0/auth0-react";
import ErrorCard from "./error-card";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { AddProject, ViewProjectEntries } from "./";

class ProjectList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: true,
      projects: [],
      addProject: false,
      user: props.auth0.user,
      viewProjectEntries: false,
      selectedProject: {},
      ShowError: false,
      ErrorTitle: "Error",
      ErrorText:
        "An error has occurred while trying to get data from the API. Please contact your developer.",
    };

    this.handleShowAddProject = this.handleShowAddProject.bind(this);
    this.handleUpdateProject = this.handleUpdateProject.bind(this);
    this.handleAddProject = this.handleAddProject.bind(this);
    this.handleShowProjectEntries = this.handleShowProjectEntries.bind(this);
    this.handleUpdateSelectedProject =
      this.handleUpdateSelectedProject.bind(this);
    this.handleShowError = this.handleShowError.bind(this);
  }

  componentDidMount() {
    this.getProjects();
  }

  async getProjects() {
    const { getAccessTokenSilently } = this.props.auth0;
    var token = await getAccessTokenSilently();
    var options = {
      headers: {
        Authorization: "Bearer " + token,
      },
    };
    let response = await fetch("/api/projects", options);
    if (response.ok) {
      let result = await response.json();
      this.setState({ projects: result, loading: false });
    } else {
      this.handleShowError();
    }
  }

  handleShowAddProject() {
    if (this.state.addProject == true) {
      this.setState({ addProject: false });
    } else {
      this.setState({ addProject: true });
    }
  }

  handleAddProject(project) {
    this.getProjects();
  }

  handleUpdateProject(project) {
    this.getProjects();
  }

  handleShowError() {
    if (this.state.ShowError) {
      this.setState({ ShowError: false });
    } else {
      this.setState({ ShowError: true });
    }
  }

  handleUpdateSelectedProject(project) {
    this.setState(
      {
        selectedProject: project,
      },
      this.handleShowProjectEntries
    );
  }

  handleShowProjectEntries() {
    if (this.state.viewProjectEntries) {
      this.setState({
        viewProjectEntries: false,
      });
    } else {
      this.setState({
        viewProjectEntries: true,
      });
    }
  }

  render() {
    var projects = this.state.projects.map((project) => (
      <ProjectParent
        key={project.Id}
        project={project}
        handleUpdateProject={this.handleUpdateProject}
        handleUpdateSelectedProject={this.handleUpdateSelectedProject}
      />
    ));

    if (this.state.ShowError) {
      return (
        <ErrorCard
          title={this.state.ErrorTitle}
          text={this.state.ErrorText}
          handleShowError={this.handleShowError}
        />
      );
    }

    if (this.state.loading) {
      return (
        <div>
          <h2>Loading...</h2>
        </div>
      );
    }

    if (this.state.addProject) {
      return (
        <AddProject
          currentUser={this.props.auth0.user}
          handleShowAddProject={this.handleShowAddProject}
          handleAddProject={this.handleAddProject}
        />
      );
    }

    if (this.state.viewProjectEntries) {
      return (
        <ViewProjectEntries
          project={this.state.selectedProject}
          user={this.state.user}
          projects={this.state.projects}
          handleShowProjectEntries={this.handleShowProjectEntries}
        />
      );
    }

    if (this.state.projects.length > 0) {
      return (
        <div>
          <div className="list-group">
            <div className="d-flex">
              <div className="mr-auto">
                <h2>Projects</h2>
              </div>
              <div className="mx-auto"></div>
              <div className="ml-auto">
                <button
                  type="button"
                  className="button round-button"
                  onClick={this.handleShowAddProject}
                >
                  <FontAwesomeIcon icon={faPlus} />
                </button>
              </div>
            </div>
            {projects}
          </div>
        </div>
      );
    }

    return (
      <div>
        <button
          type="button"
          className="button"
          onClick={this.handleShowAddProject}
        >
          Add Project
        </button>
        <h2>No Projects to Display...</h2>
      </div>
    );
  }
}

export default withAuth0(ProjectList);
