import React from "react";
import "../styles/report-styles.css";

const UserReportHeader = props => {
  var userName = props.userName;
  return (
    <div>
      <h1>Monthly User Report</h1>
      <h6>Username {userName}</h6>
      <h6>Time Section</h6>
    </div>
  );
};

export default UserReportHeader;
