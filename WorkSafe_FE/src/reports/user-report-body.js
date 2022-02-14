import React from "react";
import "../styles/report-styles.css";
import { DateTime } from "luxon";

const UserReportBody = (props) => {
  var entryAuthor = props.entry.Author.Name;
  var entryTitle = props.entry.Title;
  var entryDescription = props.entry.Description;
  var entryLearning = props.entry.Learning;
  var entryImpact = props.entry.Impact;
  var entryMindset = props.entry.MindSet;
  var entryNextSteps = props.entry.NextSteps;
  var entryTags = props.entry.Tags.map((value) => {
    return value + " ";
  });
  var entryFiles = props.entry.Files;
  var entryDate = DateTime.fromISO(props.entry.EntryDate).toLocaleString(
    DateTime.DATETIME_FULL
  );

  return (
    <>
      <div className="table-container">
        <table>
          <tbody>
            <tr>
              <td colSpan={2}>
                <h2 className="report-h2">{entryTitle}</h2>
              </td>
            </tr>
            <tr>
              <td colSpan={2}>
                <h5 className="report-h5">Description</h5>
                <p className="report-p">{entryDescription}</p>
              </td>
            </tr>
            <tr>
              <td colSpan={2}>
                <h5 className="report-h5">Learning</h5>
                <p className="report-p">{entryLearning}</p>
              </td>
            </tr>
            <tr>
              <td colSpan={2}>
                <h5 className="report-h5">Impact</h5>
                <p className="report-p">{entryImpact}</p>
              </td>
            </tr>
            <tr valign="top">
              <td className="report-td-28">
                <h5 className="report-h5">Mindset</h5>
                <p className="report-p">{entryMindset}</p>
              </td>
              <td className="report-td-72">
                <h5 className="report-h5">Next Steps</h5>
                <p className="report-p">{entryNextSteps}</p>
              </td>
            </tr>
            <tr valign="top" colSpan={2}>
              <td className="report-td-28">
                <h5 className="report-h5">Tags</h5>
                <p className="report-p">{entryTags}</p>
              </td>
            </tr>
            <tr>
              <td className="report-td-72" colSpan={2}>
                <h5 className="report-h5">Files</h5>
                <p className="report-p">{entryFiles}</p>
              </td>
            </tr>
            <tr>
              <td colSpan={2}>
                <p className="report-p">
                  Last updated {entryDate} by {entryAuthor}
                </p>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <hr></hr>
    </>
  );
};

export default UserReportBody;
