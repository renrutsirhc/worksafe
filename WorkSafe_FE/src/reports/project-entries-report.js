import React, { Component } from "react";
import ProjectReportFooter from "./project-report-footer";
import ProjectReportHeader from "./project-report-header";
import ProjectReportBody from "./project-report-body";
import UserReportBody from "./user-report-body";
import "../styles/report-styles.css";

class ProjectEntriesReport extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    var entries = this.props.entries.map(entry => {
      console.log(entry);
      return <UserReportBody key={entry.Id} entry={entry} />;
    });
    var project = this.props.entries[0].Project;

    return (
      <div>
        <ProjectReportHeader></ProjectReportHeader>
        <ProjectReportBody project={project}></ProjectReportBody>
        {entries}
        <ProjectReportFooter></ProjectReportFooter>
      </div>
    );
  }
}

export default ProjectEntriesReport;
