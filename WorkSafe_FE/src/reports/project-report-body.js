import React from "react";
import "../styles/report-styles.css";

const ProjectReportBody = (props) => {
  console.log(props.project);
  var projectOwner = props.project.Owner.Name;
  var projectTitle = props.project.Title;
  var projectDescription = props.project.Description;
  var projectGoal = props.project.Goal;
  var projectTimeStamp = props.project.TimeStamp;

  // Pillar method
  var projectPillars = [];

  if (props.project.PillarConnection) {
    projectPillars.push("Connection ");
  }
  if (props.project.PillarLeadership) {
    projectPillars.push("Leadership ");
  }
  if (props.project.PillarNeeds) {
    projectPillars.push("Needs ");
  }
  if (props.project.PillarEmbedding) {
    projectPillars.push("Embedding ");
  }
  if (props.project.PillarResources) {
    projectPillars.push("Resources ");
  }
  // Need to finish this

  return (
    <div>
      <h2 className="mt-4">{projectTitle}</h2>
      <p>
        Owner: {projectOwner} <br></br>Creation time: {projectTimeStamp}{" "}
      </p>
      <span>
        <strong>Description</strong>
      </span>
      <p>{projectDescription}</p>
      <span>
        <strong>Goal</strong>
      </span>
      <p>{projectGoal}</p>
      <span>
        <strong>Pillars</strong>
      </span>
      <p className="mb-4">{projectPillars}</p>
      <hr></hr>
    </div>
  );
};

export default ProjectReportBody;
