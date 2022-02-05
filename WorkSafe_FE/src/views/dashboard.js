import React, { Component } from "react";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap";
import "bootstrap/dist/js/bootstrap.js";
import "bootstrap/dist/js/bootstrap.bundle.min";
import { Button } from "react-bootstrap";
import AddEntry from "./add-entry.js";
import EntryParent from "../components/entry-parent.js";
import { withAuth0 } from "@auth0/auth0-react";

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
        };

        this.handleShowAddEntry = this.handleShowAddEntry.bind(this);
        this.handleUpdateEntry = this.handleUpdateEntry.bind(this);
        this.handleAddEntry = this.handleAddEntry.bind(this);
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
                Authorization: 'Bearer ' + token
            }
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
                Authorization: 'Bearer ' + token
            }
        };
        let response = await fetch("/api/projects", options);
        if (response.ok) {
            let result = await response.json();
            this.setState({ projects: result, projectsLoaded: true });
        } else {
            //error
        }

    }

    async getEntries() {
        const { getAccessTokenSilently } = this.props.auth0;
        var token = await getAccessTokenSilently();
        var options = {
            headers: {
                Authorization: 'Bearer ' + token
            }
        };
        let response = await fetch("/api/users/" + this.state.user.sub + "/entries", options);
        if (response.ok) {
            let result = await response.json();
            console.log(result);
            this.setState({ entries: result });
            this.setState({ loading: false });
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
        this.getEntries();
        this.getTags();
    }

    handleUpdateEntry(entry) {
        var entries = this.state.entries;
        for (let i = 0; i < entries.length; i++) {
            if (entries[i].Id == entry.Id) {
                entries[i] = entry;
                this.setState({ entries: entries });
                break;
            }
        }
    }

    render() {
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
                    <Button
                        className="greenButton"
                        variant="light"
                        onClick={this.handleShowAddEntry}
                    >
                        Add Entry
                    </Button>
                    <div className="list-group">
                        <div className="d-flex">
                            <div className="mr-auto">
                                <h2 className="mt-3">Feed</h2>
                            </div>
                        </div>
                        {entries}
                    </div>
                </div>
            );
        }

        return (
            <div>
                <Button
                    className="greenButton"
                    variant="light"
                    onClick={this.handleShowAddEntry}
                >
                    Add Entry
                </Button>

                <h2>No Entries to Display...</h2>
            </div>
        );
    }
}

export default withAuth0(Dashboard);
