import React from "react";
import "../styles/report-styles.css";

const ProjectReportBody = props => {
  console.log(props.project);
  var projectOwner = props.project.Owner.Name;
  var projectTitle = props.project.Title;
  var projectDescription = props.project.Description;
  var projectGoal = props.project.Goal;
  var projectTimeStamp = props.project.TimeStamp;

  // Pillar method
  var projectPillars = props.PillarConnection | props.PillarEmbedding | props.PillarLeadership | props.PillarNeeds | props.PillarResources;
  var isPillarTrue = projectPillars == true;

  if (props.PillarConnection) {
    projectPillars.append("Connection");
    return result;
  } else if (props.PillarLeadership) {
    projectPillars.append("Leadership");
    return result;
  } else if (props.PillarNeeds) {
    projectPillars.append("Needs");
    return result;
  } else if (props.PillarEmbedding) {
    projectPillars.append("Embedding");
    return result;
  } else if (props.PillarResources) {
    projectPillars.append("Resources");
    return result;
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
      <p className="mb-4">
        <ul id="projectPillars"></ul>
      </p>
      <hr></hr>
    </div>
  );
};

export default ProjectReportBody;
