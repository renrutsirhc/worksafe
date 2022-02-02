import React, { Component } from "react";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap";
import "bootstrap/dist/js/bootstrap.js";
import "bootstrap/dist/js/bootstrap.bundle.min";
import Moment from "moment";
import Select from "react-dropdown-select";
import { Button } from "react-bootstrap";
import AddEntry from "./add-entry.js";
import EntryParent from "../components/entry-parent.js";
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

        this.handleShowAddEntry = this.handleShowAddEntry.bind(this);
        this.handleUpdateEntry = this.handleUpdateEntry.bind(this);
        this.handleAddEntry = this.handleAddEntry.bind(this);

       
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
  }

  render() {
    var projects = this.state.projects;
    class ProjectOption {
      constructor(label, value) {
        this.label = label;
        this.value = value;
      }
    }

    handleShowAddEntry() {
        if (this.state.addEntry == true) {
            this.setState({ addEntry: false })
        } else {
            this.setState({ addEntry: true })
        }
        
    }

    handleAddEntry(entry) {
        var entries = this.state.entries;
        entries.push(entry);
        entries.sort((entry1, entry2) => {
            var date1 = new Date(entry1.TimeStamp);
            var date2 = new Date(entry2.TimeStamp);
            if (date1.getTime() > date2.getTime()) {
                return -1;
            } else if (date1.getTime() < date2.getTime()) {
                return 1;
            } else {
                return 0;
            }
            
        })
        this.setState({ entries: entries });
    }

    if (this.state.addEntry) {
      return <AddEntry userId={this.state.user.sub} />;
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
                <AddEntry userId={this.state.user.sub} handleShowAddEntry={this.handleShowAddEntry} handleAddEntry={this.handleAddEntry} />
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
            {entries}
          </div>
        </div>
      );
    }

    return (
      <div>
        <Button variant="success" onClick={this.handleAddEntry}>
          Add Entry
        </Button>
        <h2>No Entries to Display...</h2>
      </div>
    );
  }
}

export default withAuth0(Dashboard);
