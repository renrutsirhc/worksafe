import React from "react";
import "../styles/report-styles.css";
import { DateTime } from "luxon";

const UserReportHeader = (props) => {
  var userName = props.userName;
  var selectedTags;
  if (props.selectedTags.length > 0) {
    selectedTags = "Tags: ";
    props.selectedTags.map((value) => {
      selectedTags += value + " | ";
    });
    selectedTags = selectedTags.substring(0, selectedTags.length - 3);
  }
  const startDate =
    props.startDate == null
      ? ""
      : "From: " +
        DateTime.fromISO(props.startDate).toLocaleString(DateTime.DATE_FULL);
  const endDate =
    props.endDate == null
      ? ""
      : "To: " +
        DateTime.fromISO(props.endDate).toLocaleString(DateTime.DATE_FULL);

  return (
    <div>
      <h1>Monthly User Report</h1>
      <h6>Author: {userName}</h6>
      <h6>{selectedTags}</h6>
      <h6>
        {startDate} {endDate}
      </h6>
      <hr></hr>
      <h6>Summary:</h6>
    </div>
  );
};

export default UserReportHeader;
