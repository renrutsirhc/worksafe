import React, { Component } from "react";
import ProjectReportFooter from "./project-report-footer";
import ProjectReportHeader from "./project-report-header";
import UserReportBody from "./user-report-body";
import "../styles/report-styles.css";

class ProjectEntriesReport extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    var entries = this.props.entries.map((entry) => {
      console.log(entry);
      return <UserReportBody key={entry.Id} entry={entry} />;
    });

    return (
      <div>
        <ProjectReportHeader project={this.props.project}></ProjectReportHeader>
        {entries}
        <ProjectReportFooter></ProjectReportFooter>
      </div>
    );
  }
}

export default ProjectEntriesReport;
