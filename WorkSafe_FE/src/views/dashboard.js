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

class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      entries: [],
      projects: [],
      addEntry: false,
    };

    this.handleAddEntry = this.handleAddEntry.bind(this);
  }

  componentDidMount() {
    this.getProjects();
    this.getEntries();
  }

  async getProjects() {
    let result = await fetch("/api/projects", {
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${this.props.token}`,
      },
    });
    let data = await result.json();
    this.setState({ projects: data });
  }

  async getEntries() {
    let result = await fetch("/api/users/Unit Test User ID/entries", {
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${this.props.token}`,
      },
    });
    let data = await result.json();
    this.setState({ entries: data });
    this.setState({ loading: false });
  }

  handleAddEntry() {
    this.setState({ addEntry: true });
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
    var entries = this.state.entries.map(function (entry, index) {
      return <EntryParent keyx={index} entry={entry} />;
      //return <a href="#" class="list-group-item list-group-item-action list-group-item-primary mb-2">
      //    <div class="d-flex w-100 justify-content-between">
      //        <h4 class="mb-1">{entry.Description}</h4>
      //    </div>
      //    <p class="mb-1">{entry.Description}</p>
      //    <small>Last updated: {Moment(entry.TimeStamp).format('YYYY-MM-DD')} Owner:</small>
      //</a>
    });

    if (this.state.loading) {
      return (
        <div>
          <h2>Loading...</h2>
        </div>
      );
    }

    if (this.state.addEntry) {
      return <AddEntry userId="Unit Test User ID" />;
    }

    if (this.state.entries.length > 0) {
      return (
        <div>
          <Button variant="success" onClick={this.handleAddEntry}>
            Add Entry
          </Button>
          <div className="list-group">
            <div className="d-flex">
              <div className="mr-auto">
                <h2>Feed</h2>
              </div>
              {/*<div class="mx-auto"></div>*/}
              {/*<div class="p-2"><button type="button"*/}
              {/*    class="btn btn-success">Get Report</button></div>*/}
              {/*<div class="p-2"><button type="button" class="btn btn-primary">New Report</button>*/}
              {/*</div>*/}
            </div>
            {entries}
          </div>
        </div>
      );
    }

    return (
      <div>
        <h2>No Entries to Display...</h2>
      </div>
    );
  }
}

export default Dashboard;
