import React, { Component } from "react";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap";
import "bootstrap/dist/js/bootstrap.js";
import "bootstrap/dist/js/bootstrap.bundle.min";
import Moment from "moment";
import Select from "react-dropdown-select";
import { Button } from "react-bootstrap";
import AddEntry from "./add-entry.js"
import EntryParent from "../components/entry-parent.js"
import { withAuth0 } from "@auth0/auth0-react";

class Dashboard extends Component {
    constructor(props) {
        super(props)

        this.state = {
            loading: true,
            entries: [],
            projects: [],
            addEntry: false,
            user: props.auth0.user,
        }

        this.handleAddEntry = this.handleAddEntry.bind(this);
        this.handleUpdateEntry = this.handleUpdateEntry.bind(this);

       
    }

    componentDidMount() {
        this.getProjects();
        this.getEntries();
    }

    async getProjects() {
        let result = await fetch("/api/projects");
        let data = await result.json();
        this.setState({ projects: data });
    }

    async getEntries() {
        let result = await fetch("/api/users/" + this.state.user.sub + "/entries");
        let data = await result.json();
        this.setState({ entries: data });
        this.setState({ loading: false });
    }

    handleAddEntry() {
        this.setState({ addEntry: true })
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
        var entries = this.state.entries.map(entry => (
            <EntryParent key={entry.Id} entry={entry} handleUpdateEntry={this.handleUpdateEntry} />
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
                <AddEntry userId={this.state.user.sub} />
            )
        }

        if (this.state.entries.length > 0) {
            return (
                <div>
                    <Button className="greenButton" variant="light" onClick={this.handleAddEntry}>Add Entry</Button>
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
                <Button className="greenButton" variant="light" onClick={this.handleAddEntry}>Add Entry</Button>
                <h2>No Entries to Display...</h2>
            </div>
        );
    }
}

export default withAuth0(Dashboard);
