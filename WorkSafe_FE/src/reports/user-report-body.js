import React from "react"
import "../styles/report-styles.css"

const UserReportBody = props => {
  return (
    <table width="100%" cellSpacing={0} cellPadding={0} bgcolor="#f6f9e1">
      <tbody>
        <tr>
          <td className="report-body-title" colSpan={2} valign="top" bgcolor="#e1e5da" width="100%" height={22}>
            <h2 className="western" lang="en-GB">
              I updated some things Great Project
            </h2>
          </td>
        </tr>
        <tr>
          <td style={{ background: "#e1e5da" }} colSpan={2} valign="top" bgcolor="#e1e5da" width="100%" height={22}>
            <p className="western" lang="en-GB">
              <span style={{ color: "#ffffff" }}>
                <strong>Description</strong>
              </span>
            </p>
            <p lang="en-GB">Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Maecenas porttitor congue massa. Fusce posuere, magna sed pulvinar ultricies, purus lectus malesuada libero, sit amet commodo magna eros quis urna.</p>
          </td>
        </tr>
        <tr>
          <td style={{ background: "#e1e5da" }} colSpan={2} valign="top" bgcolor="#e1e5da" width="100%" height={22}>
            <p className="western" lang="en-GB">
              <span style={{ color: "#ffffff" }}>
                <strong>Learning</strong>
              </span>
            </p>
            <p lang="en-GB">Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Maecenas porttitor congue massa.</p>
          </td>
        </tr>
        <tr>
          <td style={{ background: "#e1e5da" }} colSpan={2} valign="top" bgcolor="#e1e5da" width="100%" height={22}>
            <p className="western" lang="en-GB">
              <span style={{ color: "#ffffff" }}>
                <strong>Impact</strong>
              </span>
            </p>
            <p lang="en-GB">Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Maecenas porttitor congue massa. Fusce posuere, magna sed pulvinar ultricies, purus lectus malesuada libero, sit amet commodo magna eros quis urna. Nunc viverra imperdiet enim.</p>
          </td>
        </tr>
        <tr valign="top">
          <td style={{ background: "#e1e5da" }} bgcolor="#e1e5da" width="28%" height={22}>
            <p className="western" lang="en-GB">
              <span style={{ color: "#ffffff" }}>
                <strong>Mindset</strong>
              </span>
            </p>
            <p lang="en-GB">Lorem ipsum dolor sit amet, consectetuer.</p>
          </td>
          <td style={{ background: "#e1e5da" }} bgcolor="#e1e5da" width="72%">
            <p className="western" lang="en-GB">
              <span style={{ color: "#ffffff" }}>
                <strong>Next Steps</strong>
              </span>
            </p>
            <p lang="en-GB">Lorem ipsum dolor sit amet, consectetuer adipiscing elit.</p>
            <p lang="en-GB">Maecenas porttitor congue massa.</p>
            <p lang="en-GB">Fusce posuere, magna sed pulvinar ultricies, purus lectus malesuada libero, sit amet commodo magna eros quis urna.</p>
          </td>
        </tr>
        <tr valign="top">
          <td style={{ background: "#e1e5da" }} bgcolor="#e1e5da" width="28%" height={22}>
            <p className="western" lang="en-GB">
              <span style={{ color: "#ffffff" }}>
                <strong>Tags</strong>
              </span>
            </p>
            <p lang="en-GB">Review</p>
            <p lang="en-GB">&nbsp;</p>
          </td>
          <td style={{ background: "#e1e5da" }} bgcolor="#e1e5da" width="72%">
            <p className="western" lang="en-GB">
              <span style={{ color: "#ffffff" }}>
                <strong>Files</strong>
              </span>
            </p>
            <p lang="en-GB">https://filestorage.com/filename.file</p>
            <p lang="en-GB">https://filestorage.com/videofile.video</p>
          </td>
        </tr>
        <tr>
          <td style={{ background: "#648181" }} colSpan={2} valign="top" bgcolor="#648181" width="100%" height={22}>
            <p className="western" lang="en-GB">
              <span style={{ color: "#ffffff" }}>
                <strong>Freddie </strong>22/01/22
              </span>
            </p>
          </td>
        </tr>
      </tbody>
    </table>
  )
}

export default UserReportBody
