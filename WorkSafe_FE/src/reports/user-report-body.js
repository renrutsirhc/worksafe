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
    <>
      <div>
        <table>
          <td>
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
                <td>{entryDescription}</td>
              </td>
            </tr>
            <tr>
              <td colSpan={2}>
                <span>
                  <strong>Learning</strong>
                </span>
                <td>{entryLearning}</td>
              </td>
            </tr>
            <tr>
              <td colSpan={2}>
                <span>
                  <strong>Impact</strong>
                </span>
                <td>{entryImpact}</td>
              </td>
            </tr>
            <td>
              <table>
                <tr valign="top" colSpan={3}>
                  <td className="report-td-28">
                    <span className="report-td-28">
                      <strong>Mindset</strong>
                    </span>
                    <td>{entryMindset}</td>
                  </td>
                  <td className="report-td-72">
                    <span className="report-td-72">
                      <strong>Next Steps</strong>
                    </span>
                    <td>{entryNextSteps}</td>
                  </td>
                </tr>
                <tr valign="top">
                  <td className="report-td-28">
                    <span>
                      <strong>Tags</strong>
                    </span>
                    <td>{entryTags}</td>
                  </td>
                  <td className="report-td-72">
                    <span>
                      <strong>Files</strong>
                    </span>
                    <td>{entryFiles}</td>
                  </td>
                </tr>
              </table>
            </td>
            <tr>
              <td>
                <span>
                  <strong>
                    Created {entryDate} by {entryAuthor}
                  </strong>
                </span>
              </td>
            </tr>
          </td>
        </table>
        <hr></hr>
      </div>
    </>
  );
};

export default UserReportBody;
