import React, { Component } from "react";
import ProjectReportFooter from "./project-report-footer";
import ProjectReportHeader from "./project-report-header";
import ProjectReportBody from "./user-report-body";
import UserReportBody from "./user-report-body";
import "../styles/report-styles.css";

class ProjectEntriesReport extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    var projects = this.props.projects.map(project => <ProjectReportBody key={entry.project.Id} project={project} />);
    var entries = this.props.entries.map(entry => <UserReportBody key={entry.Id} entry={entry} />);

    return (
      <div>
        <ProjectReportHeader></ProjectReportHeader>
        {projects}
        {entries}
        <ProjectReportFooter></ProjectReportFooter>
      </div>
    );
  }
}

export default ProjectEntriesReport;
