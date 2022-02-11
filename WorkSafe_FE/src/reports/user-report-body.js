import React from "react";
import "../styles/report-styles.css";

const UserReportBody = props => {
  var entryAuthor = props.entry.Author.Name;
  var entryTitle = props.entry.Title;
  var entryDescription = props.entry.Description;
  var entryLearning = props.entry.Learning;
  var entryImpact = props.entry.Impact;
  var entryMindset = props.entry.Mindset;
  var entryNextSteps = props.entry.NextSteps;
  var entryTags = props.entry.Tags;
  var entryFiles = props.entry.Files;
  var entryDate = props.entry.EntryDate;

  return (
    <div>
      <table>
        <tbody>
          <tr>
            <td colSpan={2}>
              <h2>{entryTitle}</h2>
            </td>
          </tr>
          <tr>
            <td colSpan={2}>
              <p>
                <span>
                  <strong>Description</strong>
                </span>
              </p>
              <p>{entryDescription}</p>
            </td>
          </tr>
          <tr>
            <td colSpan={2}>
              <p>
                <span>
                  <strong>Learning</strong>
                </span>
              </p>
              <p>{entryLearning}</p>
            </td>
          </tr>
          <tr>
            <td className="report-td" colSpan={2}>
              <p>
                <span>
                  <strong>Impact</strong>
                </span>
              </p>
              <p>{entryImpact}</p>
            </td>
          </tr>
          <tr valign="top">
            <td className="report-td-28">
              <p>
                <span>
                  <strong>Mindset</strong>
                </span>
              </p>
              <p>{entryMindset}</p>
            </td>
            <td className="report-td-72">
              <p>
                <span>
                  <strong>Next Steps</strong>
                </span>
              </p>
              <p>{entryNextSteps}</p>
            </td>
          </tr>
          <tr valign="top">
            <td className="report-td-28">
              <p>
                <span>
                  <strong>Tags</strong>
                </span>
              </p>
              <p>{entryTags}</p>
            </td>
            <td className="report-td-72">
              <p>
                <span>
                  <strong>Files</strong>
                </span>
              </p>
              <p>{entryFiles}</p>
            </td>
          </tr>
          <tr>
            <td style={{ background: "#648181" }} colSpan={2} valign="top" bgcolor="#648181" width="100%" height={22}>
              <p>
                <span className="span-light">
                  <strong>
                    Created {entryDate} by {entryAuthor}
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

export default UserReportBody;
