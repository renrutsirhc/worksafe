import React, { Component } from "react";
import ProjectReportFooter from "./project-report-footer";
import ProjectReportHeader from "./project-report-header";
import UserReportBody from "./user-report-body";

class ProjectEntriesReport extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <ProjectReportHeader></ProjectReportHeader>
        <UserReportBody></UserReportBody>
        <ProjectReportFooter></ProjectReportFooter>
      </div>
    );
  }
}

export default ProjectEntriesReport;
