import React from "react";
import { DateTime } from "luxon";

const ProjectReportFooter = (props) => {
  const time = DateTime.now().toLocaleString(DateTime.DATETIME_FULL);
  return <h6 className="report-h6">Report generated on: {time}</h6>;
};

export default ProjectReportFooter;
