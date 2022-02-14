import React, { Component } from "react";
import { Card } from "react-bootstrap";
import "../styles/styles.css";
import {
    CardHeaderWithEditButton,
    CardFooter,
    EntryParent,
} from "../components";
import { ViewFullProject, AddEntry } from "./";
import { withAuth0 } from "@auth0/auth0-react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { DeleteConfirmationModal } from "../components";

// Display view-project-entries
class ViewProjectEntries extends Component {
    constructor(props) {
        super(props);
        this.state = {
            Project: this.props.project,
            entries: [],
            projects: [],
            tags: [],
            addEntry: false,
            projectsLoaded: false,
            //used for deleting entry features
            show: false,
            deletingEntry: null
        };
        this.handleShowAddEntry = this.handleShowAddEntry.bind(this);
        this.handleAddEntry = this.handleAddEntry.bind(this);
        //used for deleting entry features
        this.handleModal = this.handleModal.bind(this);
        this.deleteEntry = this.deleteEntry.bind(this);
    }

    componentDidMount() {
        this.getTags();
        this.getProjects();
        this.getEntriesByProject();
    }

    async getEntriesByProject() {
        const { getAccessTokenSilently } = this.props.auth0;
        var token = await getAccessTokenSilently();
        var options = {
            headers: {
                Authorization: "Bearer " + token,
            },
        };
        var url = "/api/projects/" + this.props.project.Id + "/entries";
        let response = await fetch(url, options);
        if (response.ok) {
            let result = await response.json();
            this.setState({ entries: result });
        } else {
            //error
        }
    }

    async getTags() {
        const { getAccessTokenSilently } = this.props.auth0;
        var token = await getAccessTokenSilently();
        var options = {
            headers: {
                Authorization: "Bearer " + token,
            },
        };
        let response = await fetch("api/tags", options);
        if (response.ok) {
            let result = await response.json();
            this.setState({ tags: result });
        } else {
            //error
        }
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
            this.setState({ projects: result, projectsLoaded: true });
        } else {
            //error
        }
    }

    handleShowAddEntry() {
        if (this.state.addEntry == true) {
            this.setState({ addEntry: false });
        } else {
            this.setState({ addEntry: true });
        }
    }

    handleAddEntry() {
        this.getEntriesByProject();
        this.getTags();
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

    //used for deleting entry features
    handleModal(entry) {
        this.setState({ show: !this.state.show });
        this.setState({ deletingEntry: entry });
    }

    //used for deleting entry features
    deleteEntry = async (event) => {
        event.preventDefault();
        var entry = this.state.deletingEntry;
        const { getAccessTokenSilently } = this.props.auth0;
        var token = await getAccessTokenSilently();
        var options = {
            method: "DELETE", // *GET, POST, PUT, DELETE, etc.
            headers: {
                "Content-Type": "application/json",
                Authorization: "Bearer " + token,
            },
            body: JSON.stringify(entry),
        };

        var url =
            "/api/users/" +
            this.state.deletingEntry.Author.Id +
            "/entries/" +
            this.state.deletingEntry.Id;
        var response = await fetch(url, options);
        if (response.ok) {
            var result = await response.json();
            this.setState({ show: !this.state.show });
            this.setState({ deletingEntry: null });
            this.handleAddEntry();
        } else {
            this.handleShowError();
        }
    };

    render() {
        var entries = this.state.entries.map((entry) => (
            <EntryParent
                key={entry.Id}
                entry={entry}
                projects={this.props.projects}
                tags={this.state.tags}
                handleUpdateEntry={this.handleUpdateEntry}
                handleModal={this.handleModal}
            />
        ));
        var pillars = this.generatePillarsString();

        if (this.state.addEntry) {
            return (
                <AddEntry
                    handleShowAddEntry={this.handleShowAddEntry}
                    handleAddEntry={this.handleAddEntry}
                    projects={this.state.projects}
                    tags={this.state.tags}
                    currentUser={this.props.auth0.user}
                />
            );
        }

        if (this.state.entries.length > 0 && this.state.projectsLoaded) {
            return (
                <div>
                    {/*add delete confirmation modal if show is true*/}
                    {this.state.show ? <DeleteConfirmationModal show={this.state.show} handleModal={this.handleModal} deleteEntry={this.deleteEntry} deletingEntry={this.state.deletingEntry} /> : ''}
                    <div>
                        <h1>Project: {this.props.project.Title}</h1>
                        <h6>Description: {this.props.project.Description}</h6>
                        <h6>Goal: {this.props.project.ProjectGoal}</h6>
                        <h6>Pillars: {pillars}</h6>
                        <div className="d-flex">
                            <div className="mr-auto"></div>
                            <div className="mx-auto"></div>
                            <div className="ml-auto">
                                <button
                                    type="button"
                                    className="button round-button"
                                    onClick={this.handleShowAddEntry}
                                >
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
            );
        }

        return (
            <div>
                <div>
                    <h1>Project Entries</h1>
                    <h2>{this.props.project.Title}</h2>
                    <h6>Descrition: {this.props.project.Description}</h6>
                    <h6>Goal: {this.props.project.ProjectGoal}</h6>
                    <h6>Pillars: {pillars}</h6>
                </div>
                <div className="d-flex">
                    <div className="mx-auto"></div>
                    <div className="ml-auto"></div>
                </div>
                <h2>No Entries to Display...</h2>
            </div>
        );
    }
}

export default withAuth0(ViewProjectEntries);
