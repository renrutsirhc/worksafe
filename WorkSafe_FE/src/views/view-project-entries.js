import React, { Component } from "react"
import { Card } from "react-bootstrap"
import "../styles/styles.css"
import { CardHeaderWithEditButton, CardFooter } from "../components"
import { ViewFullProject } from "../views"

// Display view-project-entries
class ViewProjectEntries extends Component {
  constructor(props) {
    super(props)
    this.state = {
      Project: this.props.project,
      entries: []
    }
  }

  async getEntriesByProject() {
    const { getAccessTokenSilently } = this.props.auth0
    var token = await getAccessTokenSilently()
    var options = {
      headers: {
        Authorization: "Bearer " + token
      }
    }
    let response = await fetch("/api/projects/" + this.state.project.id + "/entries", options)
    if (response.ok) {
      let result = await response.json()
      this.setState({ projects: result, projectsLoaded: true })
    } else {
      //error
    }
  }

  render() {
    var entries = this.state.entries.map(entry => <EntryParent key={entry.Id} entry={entry} projects={projects} tags={tags} handleUpdateEntry={this.handleUpdateEntry} />)

    if (this.state.entries.length > 0 && this.state.projectsLoaded) {
      return (
        <div>
          <ViewFullProject project={this.props.project} />
          <div className="list-group">
            <div className="d-flex">
              <div className="mx-auto"></div>
            </div>
            {entries}
          </div>
        </div>
      )
    }

    return (
      <div>
        <ViewFullProject project={this.props.project} />
        <div className="d-flex">
          <div className="mx-auto"></div>
          <div className="ml-auto"></div>
        </div>

        <h2>No Entries to Display...</h2>
      </div>
    )
  }
}

export default ViewProjectEntries
