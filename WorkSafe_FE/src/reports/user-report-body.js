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
    var entryFiles = props.entry.Files.map((value) => {
        return <a href={value}>{value}</a>
    });
    var entryDate = DateTime.fromISO(props.entry.EntryDate).toLocaleString(
        DateTime.DATETIME_FULL
    );

    var project = props.entry.Project.Id == "" ? "" : <tr>
        <td colSpan={2} className="report-td">
            <h5 className="report-h5">Project</h5>
            <p className="report-p">{props.entry.Project.Title}</p>
        </td>
    </tr>

    return (
        <>
            <div className="table-container">
                <table className="report-table">
                    <tbody>
                        <tr>
                            <td colSpan={2} className="report-td">
                                <h2 className="report-h2">{entryTitle}</h2>
                                
                            </td>
                        </tr>
                        {project}
                        <tr>
                            <td colSpan={2} className="report-td">
                                <h5 className="report-h5">Description</h5>
                                <p className="report-p">{entryDescription}</p>
                            </td>
                        </tr>
                        <tr>
                            <td colSpan={2} className="report-td">
                                <h5 className="report-h5">Learning</h5>
                                <p className="report-p">{entryLearning}</p>
                            </td>
                        </tr>
                        <tr>
                            <td colSpan={2} className="report-td">
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
                        <tr valign="top" >
                            <td className="report-td" colSpan={2}>
                                <h5 className="report-h5">Tags</h5>
                                <p className="report-p">{entryTags}</p>
                            </td>
                        </tr>
                        <tr>
                            <td className="report-td" colSpan={2}>
                                <h5 className="report-h5">Files</h5>
                                {entryFiles}
                            </td>
                        </tr>
                        <tr>
                            <td colSpan={2} className="report-td">
                                <h4 className="report-h4">
                                    Last updated {entryDate} by {entryAuthor}
                                </h4>
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
