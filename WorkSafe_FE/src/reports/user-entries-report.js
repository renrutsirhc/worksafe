import React, { Component } from "react";
import UserReportFooter from "./user-report-footer";
import UserReportHeader from "./user-report-header";
import UserReportBody from "./user-report-body";

class UserEntriesReport extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <UserReportHeader></UserReportHeader>
        <hr></hr>
        <UserReportBody></UserReportBody>
        <hr></hr>
        <UserReportFooter></UserReportFooter>
      </div>
    );
  }
}

export default UserEntriesReport;
