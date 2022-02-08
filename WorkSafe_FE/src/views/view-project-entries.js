import React, { Component } from "react"
import { Card } from "react-bootstrap"
import "../styles/styles.css"
import { CardHeaderWithEditButton, CardFooter, EntryParent } from "../components"
import { ViewFullProject } from "../views"
import { withAuth0 } from "@auth0/auth0-react"

// Display view-project-entries
class ViewProjectEntries extends Component {
  constructor(props) {
    super(props)
    this.state = {
      Project: this.props.project,
      entries: [],
      tags: [],
      projectsLoaded: false
    }
  }

  componentDidMount() {
    this.getTags()
    this.getEntriesByProject()
  }

  async getEntriesByProject() {
    const { getAccessTokenSilently } = this.props.auth0
    var token = await getAccessTokenSilently()
    var options = {
      headers: {
        Authorization: "Bearer " + token
      }
    }
    var url = "/api/projects/" + this.props.project.Id + "/entries"
    let response = await fetch(url, options)
    if (response.ok) {
      let result = await response.json()
      this.setState({ entries: result, projectsLoaded: true })
    } else {
      //error
    }
  }

  async getTags() {
    const { getAccessTokenSilently } = this.props.auth0
    var token = await getAccessTokenSilently()
    var options = {
      headers: {
        Authorization: "Bearer " + token
      }
    }
    let response = await fetch("api/tags", options)
    if (response.ok) {
      let result = await response.json()
      this.setState({ tags: result })
    } else {
      //error
    }
  }

  render() {
    var entries = this.state.entries.map(entry => <EntryParent key={entry.Id} entry={entry} projects={this.props.projects} tags={this.state.tags} handleUpdateEntry={this.handleUpdateEntry} />)

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

export default withAuth0(ViewProjectEntries)
