import React from "react";
import { DateTime } from "luxon";

const ProjectReportFooter = (props) => {
  const time = DateTime.now().toLocaleString(DateTime.DATETIME_FULL);
  return <div className="report-h6">Report generated on: {time}</div>;
};

export default ProjectReportFooter;
