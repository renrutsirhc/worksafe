import { DateTime } from "luxon";
import React from "react";

const UserReportFooter = (props) => {
  const time = DateTime.now().toLocaleString(DateTime.DATETIME_FULL);
  return <div className="report-h6">Report generated on: {time}</div>;
};

export default UserReportFooter;
