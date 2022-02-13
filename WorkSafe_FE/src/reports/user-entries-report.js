import React, { Component } from "react";
import UserReportFooter from "./user-report-footer";
import UserReportHeader from "./user-report-header";
import UserReportBody from "./user-report-body";
import "../styles/report-styles.css";

class UserEntriesReport extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    var entries = this.props.entries.map(entry => <UserReportBody key={entry.Id} entry={entry} />);

    return (
      <div>
        <UserReportHeader userName={this.props.entries[0].Author.Name}></UserReportHeader>
        <hr></hr>
        {entries}
        <UserReportFooter></UserReportFooter>
      </div>
    );
  }
}

export default UserEntriesReport;
