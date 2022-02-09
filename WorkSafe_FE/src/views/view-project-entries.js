import React, { Component } from "react"
import { Card } from "react-bootstrap"
import "../styles/styles.css"
import { CardHeaderWithEditButton, CardFooter, EntryParent } from "../components"
import { ViewFullProject, AddEntry } from "./"
import { withAuth0 } from "@auth0/auth0-react"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faPlus } from "@fortawesome/free-solid-svg-icons"

// Display view-project-entries
class ViewProjectEntries extends Component {
    constructor(props) {
        super(props)
        this.state = {
            Project: this.props.project,
            entries: [],
            projects: [],
            tags: [],
            addEntry: false,
            projectsLoaded: false
        }
        this.handleShowAddEntry = this.handleShowAddEntry.bind(this)
        this.handleAddEntry = this.handleAddEntry.bind(this)
    }

    componentDidMount() {
        this.getTags()
        this.getProjects()
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
            this.setState({ entries: result })
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
            this.setState({ projects: result, projectsLoaded: true })
        } else {
            //error
        }
    }

    handleShowAddEntry() {
        if (this.state.addEntry == true) {
            this.setState({ addEntry: false })
        } else {
            this.setState({ addEntry: true })
        }
    }

    handleAddEntry() {
        this.getEntriesByProject()
        this.getTags()
    }

    generatePillarsString() {
        var pillars = "";
        if (this.props.project.PillarEmbedding) {
            pillars = pillars + "Embedding | ";
        }
        if (this.props.project.PillarResources) {
            pillars = pillars + "Resources | ";
        }
        if (this.props.project.PillarNeeds) {
            pillars = pillars + "Needs | ";
        }
        if (this.props.project.PillarLeadership) {
            pillars = pillars + "Leadership | ";
        }
        if (this.props.project.PillarConnection) {
            pillars = pillars + "Connection | ";
        }
        if (pillars.length > 0) {
            pillars = pillars.substring(0, pillars.length - 3);
        }
        return pillars;
    }

    render() {
        var entries = this.state.entries.map(entry => <EntryParent key={entry.Id} entry={entry} projects={this.props.projects} tags={this.state.tags} handleUpdateEntry={this.handleUpdateEntry} />)
        var pillars = this.generatePillarsString();

        if (this.state.addEntry) {
            return <AddEntry handleShowAddEntry={this.handleShowAddEntry} handleAddEntry={this.handleAddEntry} projects={this.state.projects} tags={this.state.tags} currentUser={this.props.auth0.user} />
        }

        if (this.state.entries.length > 0 && this.state.projectsLoaded) {
            return (
                <div>
                    <div>
                        <h1>Project: {this.props.project.Title}</h1>
                        <p>Description: {this.props.project.Description}</p>
                        <p>Goal: {this.props.project.ProjectGoal}</p>
                        <p>Pillars: {pillars}</p>
                        <div className="d-flex">
                            <div className="mr-auto">
                            </div>
                            <div className="mx-auto"></div>
                            <div className="ml-auto">
                                <button className="button round-button" onClick={this.handleShowAddEntry}>
                                    <FontAwesomeIcon icon={faPlus} />
                                </button>
                            </div>
                        </div>




                    </div>

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
                <div>
                    <h1>Project Entries</h1>
                    <h2>{this.props.project.Title}</h2>
                    <p>Descrition: {this.props.project.Description}</p>
                    <p>Goal: {this.props.project.ProjectGoal}</p>
                    <p>Pillars: {pillars}</p>
                </div>
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
