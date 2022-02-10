import React, { Component } from "react";
import UserReportFooter from "./user-report-footer";
import UserReportHeader from "./user-report-header";

class UserEntriesReport extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <UserReportHeader></UserReportHeader>
        <hr></hr>
        Body
        <hr></hr>
        <UserReportFooter></UserReportFooter>
      </div>
    );
  }
}

export default UserEntriesReport;
