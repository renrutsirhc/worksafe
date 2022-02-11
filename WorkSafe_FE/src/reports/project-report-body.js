import React from "react";
import "../styles/report-styles.css";

const ProjectReportBody = props => {
  var projectOwner = props.entry.Project.Owner;
  var projectTitle = props.entry.Project.Title;
  var projectDescription = props.entry.Project.Description;
  var projectGoal = props.entry.Project.Goal;
  var projectPillars = props.entry.Project.Pillars;
  var projectTimeStamp = props.entry.Project.TimeStamp;

  return (
    <div>
      <table className="report-table">
        <tbody>
          <tr>
            <td className="report-body-title" colSpan={2}>
              <h2 className="report-h2">{projectTitle}</h2>
            </td>
          </tr>
          <tr>
            <td className="report-td" colSpan={2}>
              <p className="paragraph">
                <span className="span">
                  <strong>Description</strong>
                </span>
              </p>
              <p className="paragraph">{projectDescription}</p>
            </td>
          </tr>
          <tr>
            <td className="report-td" colSpan={2}>
              <p className="paragraph">
                <span className="span">
                  <strong>Goal</strong>
                </span>
              </p>
              <p className="paragraph">{projectGoal}</p>
            </td>
          </tr>
          <tr>
            <td className="report-td" colSpan={2}>
              <p className="paragraph">
                <span className="span">
                  <strong>Pillars</strong>
                </span>
              </p>
              <p className="paragraph">{projectPillars}</p>
            </td>
          </tr>
          <tr>
            <td style={{ background: "#648181" }} colSpan={2} valign="top" bgcolor="#648181" width="100%" height={22}>
              <p className="paragraph">
                <span className="span-light">
                  <strong>
                    Date {projectTimeStamp} by {projectOwner}
                  </strong>
                </span>
              </p>
            </td>
          </tr>
        </tbody>
      </table>
      <hr></hr>
    </div>
  );
};

export default ProjectReportBody;
