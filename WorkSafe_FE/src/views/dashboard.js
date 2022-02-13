import React, { Component } from "react";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap";
import "bootstrap/dist/js/bootstrap.js";
import "bootstrap/dist/js/bootstrap.bundle.min";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import AddEntry from "./add-entry.js";
import EntryParent from "../components/entry-parent.js";
import { withAuth0 } from "@auth0/auth0-react";
import ErrorCard from "./error-card";
import { Button, Modal } from 'react-bootstrap';
import { DeleteConfirmationModal } from "../components";

class Dashboard extends Component {
    constructor(props) {
        super(props);

        this.state = {
            loading: true,
            projectsLoaded: false,
            entries: [],
            projects: [],
            tags: [],
            addEntry: false,
            user: props.auth0.user,
            ShowError: false,
            ErrorTitle: "Error",
            ErrorText:
                "An error has occurred while trying to get data from the API. Please contact your developer.",
            //used for deleting entry features
            show: false,
            deletingEntry: null
        };

        this.handleShowAddEntry = this.handleShowAddEntry.bind(this);
        this.handleUpdateEntry = this.handleUpdateEntry.bind(this);
        this.handleAddEntry = this.handleAddEntry.bind(this);
        this.handleShowError = this.handleShowError.bind(this);
        this.handleModal = this.handleModal.bind(this);
        this.deleteEntry = this.deleteEntry.bind(this);
    }

    componentDidMount() {
        this.getTags();
        this.getProjects();
        this.getEntries();
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
            this.handleShowError();
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
            this.handleShowError();
        }
    }

    async getEntries() {
        const { getAccessTokenSilently } = this.props.auth0;
        var token = await getAccessTokenSilently();
        var options = {
            headers: {
                Authorization: "Bearer " + token,
            },
        };
        let response = await fetch(
            "/api/users/" + this.state.user.sub + "/entries",
            options
        );
        if (response.ok) {
            let result = await response.json();
            console.log(result);
            this.setState({ entries: result });
            this.setState({ loading: false });
        } else {
            this.handleShowError();
        }
    }


    handleShowError() {
        if (this.state.ShowError) {
            this.setState({ ShowError: false });
        } else {
            this.setState({ ShowError: true });
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
    this.getEntries();
    this.getTags();
  }

  handleUpdateEntry() {
    this.getEntries();
    this.getTags();
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
            this.handleUpdateEntry();
        } else {
            this.handleShowError();
        }
    };

    render() {
        if (this.state.ShowError) {
            return (
                <ErrorCard
                    title={this.state.ErrorTitle}
                    text={this.state.ErrorText}
                    handleShowError={this.handleShowError}
                />
            );
        }

        var projects = this.state.projects;
        var tags = this.state.tags;
        class ProjectOption {
            constructor(label, value) {
                this.label = label;
                this.value = value;
            }
        }
        var projectOptions = [];
        projects.map(function (project, index) {
            const po = new ProjectOption(project.Title, project.Id);
            projectOptions[index] = po;
        });
        var entries = this.state.entries.map((entry) => (
            <EntryParent
                key={entry.Id}
                entry={entry}
                projects={projects}
                tags={tags}
                handleUpdateEntry={this.handleUpdateEntry}
                handleModal={this.handleModal}

            />
        ));

        if (this.state.loading) {
            return (
                <div>
                    <h2>Loading...</h2>
                </div>
            );
        }

        if (this.state.addEntry) {
            return (
                <AddEntry
                    handleShowAddEntry={this.handleShowAddEntry}
                    handleAddEntry={this.handleAddEntry}
                    projects={projects}
                    tags={tags}
                    currentUser={this.state.user}
                />
            );
        }

        if (this.state.entries.length > 0 && this.state.projectsLoaded) {
            return (
                <div>
                    {/*add delete confirmation modal if show is true*/}
                    {this.state.show ? <DeleteConfirmationModal show={this.state.show} handleModal={this.handleModal} deleteEntry={this.deleteEntry} deletingEntry={this.state.deletingEntry} /> : ''}
                    <div className="list-group">
                        <div className="d-flex">
                            <div className="mr-auto">
                                <h2 className="mt-3">Feed</h2>
                            </div>
                            <div className="mx-auto"></div>
                            <div className="ml-auto">
                                <button
                                    className="button round-button"
                                    onClick={this.handleShowAddEntry}
                                >
                                    <FontAwesomeIcon icon={faPlus} />
                                </button>
                            </div>
                        </div>
                        {entries}
                    </div>
                </div>


            );
        }

        return (
            <div>
                <div className="d-flex">
                    <div className="mr-auto">
                        <h2 className="mt-3">Feed</h2>
                    </div>
                    <div className="mx-auto"></div>
                    <div className="ml-auto">
                        <button
                            className="button round-button"
                            onClick={this.handleShowAddEntry}
                        >
                            <FontAwesomeIcon icon={faPlus} />
                        </button>
                    </div>
                </div>

                <h2>No Entries to Display...</h2>
            </div>


        );
    }

}

export default withAuth0(Dashboard);
