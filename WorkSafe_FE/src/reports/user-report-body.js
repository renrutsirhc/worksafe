import React from "react";
import "../styles/report-styles.css";

const UserReportBody = (props) => {
  return (
    <div>
      <table className="report-table">
        <tbody>
          <tr>
            <td className="report-body-title" colSpan={2}>
              <h2 className="report-h2">I updated some things</h2>
              <h6>Project name</h6>
            </td>
          </tr>
          <tr>
            <td className="report-td" colSpan={2}>
              <p className="paragraph">
                <span className="span">
                  <strong>Description</strong>
                </span>
              </p>
              <p className="paragraph">
                Lorem ipsum dolor sit amet, consectetuer adipiscing elit.
                Maecenas porttitor congue massa. Fusce posuere, magna sed
                pulvinar ultricies, purus lectus malesuada libero, sit amet
                commodo magna eros quis urna.
              </p>
            </td>
          </tr>
          <tr>
            <td className="report-td" colSpan={2}>
              <p className="paragraph">
                <span className="span">
                  <strong>Learning</strong>
                </span>
              </p>
              <p className="paragraph">
                Lorem ipsum dolor sit amet, consectetuer adipiscing elit.
                Maecenas porttitor congue massa.
              </p>
            </td>
          </tr>
          <tr>
            <td className="report-td" colSpan={2}>
              <p className="paragraph">
                <span className="span">
                  <strong>Impact</strong>
                </span>
              </p>
              <p className="paragraph">
                Lorem ipsum dolor sit amet, consectetuer adipiscing elit.
                Maecenas porttitor congue massa. Fusce posuere, magna sed
                pulvinar ultricies, purus lectus malesuada libero, sit amet
                commodo magna eros quis urna. Nunc viverra imperdiet enim.
              </p>
            </td>
          </tr>
          <tr valign="top">
            <td className="report-td-28">
              <p className="paragraph">
                <span className="span">
                  <strong>Mindset</strong>
                </span>
              </p>
              <p className="paragraph">
                Lorem ipsum dolor sit amet, consectetuer.
              </p>
            </td>
            <td className="report-td-72">
              <p className="paragraph">
                <span className="span">
                  <strong>Next Steps</strong>
                </span>
              </p>
              <p className="paragraph">
                Lorem ipsum dolor sit amet, consectetuer adipiscing elit.
              </p>
              <p className="paragraph">Maecenas porttitor congue massa.</p>
              <p className="paragraph">
                Fusce posuere, magna sed pulvinar ultricies, purus lectus
                malesuada libero, sit amet commodo magna eros quis urna.
              </p>
            </td>
          </tr>
          <tr valign="top">
            <td className="report-td-28">
              <p className="paragraph">
                <span className="span">
                  <strong>Tags</strong>
                </span>
              </p>
              <p className="paragraph">Review</p>
              <p className="paragraph">&nbsp;</p>
            </td>
            <td className="report-td-72">
              <p className="paragraph">
                <span className="span">
                  <strong>Files</strong>
                </span>
              </p>
              <p className="paragraph">https://filestorage.com/filename.file</p>
              <p className="paragraph">
                https://filestorage.com/videofile.video
              </p>
            </td>
          </tr>
          <tr>
            <td
              style={{ background: "#648181" }}
              colSpan={2}
              valign="top"
              bgcolor="#648181"
              width="100%"
              height={22}
            >
              <p className="paragraph">
                <span className="span-light">
                  <strong>Freddie </strong>22/01/22
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
