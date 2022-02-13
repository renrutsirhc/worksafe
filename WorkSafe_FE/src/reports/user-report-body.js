import React from "react";
import "../styles/report-styles.css";

const UserReportBody = (props) => {
  var entryAuthor = props.entry.Author.Name;
  var entryTitle = props.entry.Title;
  var entryDescription = props.entry.Description;
  var entryLearning = props.entry.Learning;
  var entryImpact = props.entry.Impact;
  var entryMindset = props.entry.Mindset;
  var entryNextSteps = props.entry.NextSteps;
  var entryTags = props.entry.Tags.map((value) => {
    return value + " ";
  });
  var entryFiles = props.entry.Files;
  var entryDate = props.entry.EntryDate;

  return (
    <>
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
                <span className="light">
                  <strong>Description</strong>
                </span>
                <p>{entryDescription}</p>
              </td>
            </tr>
            <tr>
              <td colSpan={2}>
                <span>
                  <strong>Learning</strong>
                </span>
                <p>{entryLearning}</p>
              </td>
            </tr>
            <tr>
              <td colSpan={2}>
                <span>
                  <strong>Impact</strong>
                </span>
                <p>{entryImpact}</p>
              </td>
            </tr>
            <tr valign="top">
              <td className="report-td-28">
                <span className="span">
                  <strong>Mindset</strong>
                </span>
                <p>{entryMindset}</p>
              </td>
              <td className="report-td-72">
                <span className="span">
                  <strong>Next Steps</strong>
                </span>
                <p>{entryNextSteps}</p>
              </td>
            </tr>
            <tr valign="top">
              <td className="report-td-28">
                <span className="span">
                  <strong>Tags</strong>
                </span>
                <p>{entryTags}</p>
              </td>
              <td className="report-td-72">
                <span className="span">
                  <strong>Files</strong>
                </span>
                <p>{entryFiles}</p>
              </td>
            </tr>
            <tr>
              <td colSpan={2}>
                <span>
                  <strong>
                    Created {entryDate} by {entryAuthor}
                  </strong>
                </span>
              </td>
            </tr>
          </tbody>
        </table>
        <hr></hr>
      </div>
    </>
  );
};

export default UserReportBody;
