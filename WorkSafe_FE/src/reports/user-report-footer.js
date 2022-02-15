import { DateTime } from "luxon";
import React from "react";

const UserReportFooter = (props) => {
  const time = DateTime.now().toLocaleString(DateTime.DATETIME_FULL);
  return <h6 className="report-h6">Report generated on: {time}</h6>;
};

export default UserReportFooter;
