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
      <table className="report-table">
        <tbody>
          <tr>
            <td className="report-body-title" colSpan={2}>
              <h2 className="report-h2">{entryTitle}</h2>
            </td>
          </tr>
          <tr>
            <td className="report-td" colSpan={2}>
              <p className="paragraph">
                <span className="span">
                  <strong>Description</strong>
                </span>
              </p>
              <p className="paragraph">{entryDescription}</p>
            </td>
          </tr>
          <tr>
            <td className="report-td" colSpan={2}>
              <p className="paragraph">
                <span className="span">
                  <strong>Learning</strong>
                </span>
              </p>
              <p className="paragraph">{entryLearning}</p>
            </td>
          </tr>
          <tr>
            <td className="report-td" colSpan={2}>
              <p className="paragraph">
                <span className="span">
                  <strong>Impact</strong>
                </span>
              </p>
              <p className="paragraph">{entryImpact}</p>
            </td>
          </tr>
          <tr valign="top">
            <td className="report-td-28">
              <p className="paragraph">
                <span className="span">
                  <strong>Mindset</strong>
                </span>
              </p>
              <p className="paragraph">{entryMindset}</p>
            </td>
            <td className="report-td-72">
              <p className="paragraph">
                <span className="span">
                  <strong>Next Steps</strong>
                </span>
              </p>
              <p className="paragraph">{entryNextSteps}</p>
            </td>
          </tr>
          <tr valign="top">
            <td className="report-td-28">
              <p className="paragraph">
                <span className="span">
                  <strong>Tags</strong>
                </span>
              </p>
              <p className="paragraph">{entryTags}</p>
            </td>
            <td className="report-td-72">
              <p className="paragraph">
                <span className="span">
                  <strong>Files</strong>
                </span>
              </p>
              <p className="paragraph">{entryFiles}</p>
            </td>
          </tr>
          <tr>
            <td style={{ background: "#648181" }} colSpan={2} valign="top" bgcolor="#648181" width="100%" height={22}>
              <p className="paragraph">
                <span className="span-light">
                  <strong>
                    Date {entryDate} by {entryAuthor}
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
