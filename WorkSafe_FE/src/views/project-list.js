import React, { Component } from "react"
import "bootstrap/dist/css/bootstrap.css"
import "bootstrap/dist/css/bootstrap.min.css"
import "bootstrap"
import "bootstrap/dist/js/bootstrap.js"
import "bootstrap/dist/js/bootstrap.bundle.min"
import ProjectParent from "./project-parent.js"
import { withAuth0 } from "@auth0/auth0-react"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faPlus } from "@fortawesome/free-solid-svg-icons"
import { AddProject } from "./"

class ProjectList extends Component {
  constructor(props) {
    super(props)

    this.state = {
      loading: true,
      projects: [],
      addProject: false,
      user: props.auth0.user
    }

    this.handleShowAddProject = this.handleShowAddProject.bind(this)
    this.handleUpdateProject = this.handleUpdateProject.bind(this)
    this.handleAddProject = this.handleAddProject.bind(this)
  }

  componentDidMount() {
    this.getProjects()
  }

  async getProjects() {
    const { getAccessTokenSilently } = this.props.auth0
    var token = await getAccessTokenSilently()
    var options = {
      headers: {
        Authorization: "Bearer " + token
      }
    }
    let response = await fetch("/api/projects", options)
    if (response.ok) {
      let result = await response.json()
      this.setState({ projects: result, loading: false })
    } else {
      //error
    }
  }

  handleShowAddProject() {
    if (this.state.addProject == true) {
      this.setState({ addProject: false })
    } else {
      this.setState({ addProject: true })
    }
  }

  handleAddProject(project) {
    this.getProjects()
  }

  handleUpdateProject(project) {
    var projects = this.state.projects
    for (let i = 0; i < projects.length; i++) {
      if (projects[i].Id == project.Id) {
        projects[i] = project
        this.setState({ projects: projects })
        break
      }
    }
  }

  render() {
    var projects = this.state.projects.map(project => <ProjectParent key={project.Id} project={project} handleUpdateProject={this.handleUpdateProject} />)

    if (this.state.loading) {
      return (
        <div>
          <h2>Loading...</h2>
        </div>
      )
    }

    if (this.state.addProject) {
      return <AddProject currentUser={this.state.user} handleShowAddProject={this.handleShowAddProject} handleAddProject={this.handleAddProject} />
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
                <button className="button round-button" onClick={this.handleShowAddProject}>
                  <FontAwesomeIcon icon={faPlus} />
                </button>
              </div>
            </div>
            {projects}
          </div>
        </div>
      )
    }

    return (
      <div>
        <button className="button" onClick={this.handleShowAddProject}>
          Add Project
        </button>
        <h2>No Entries to Display...</h2>
      </div>
    )
  }
}

export default withAuth0(ProjectList)
