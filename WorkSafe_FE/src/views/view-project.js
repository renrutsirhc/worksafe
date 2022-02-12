import React, { Component } from "react";
import { Card } from "react-bootstrap";
import "../styles/dashboard.css";
import { CardHeaderWithViewEntryButton, CardFooter } from "../components";
import { DateTime } from "luxon";

// Display view-project card
class ViewProject extends Component {
  constructor(props) {
    super(props);
    this.handleUpdateSelectedProject =
      this.handleUpdateSelectedProject.bind(this);
  }

  handleUpdateSelectedProject() {
    this.props.handleUpdateSelectedProject(this.props.project);
  }

  render() {
    const timeStamp = DateTime.fromISO(this.props.project.TimeStamp);
    return (
      <div className="mt-3">
        <Card className="grow" onClick={this.props.setExpanded}>
          <CardHeaderWithViewEntryButton
                    title={this.props.project.Title}
                    subTitle={this.props.project.Owner.Name}
                    setEditing={this.props.setEditing}
                    handleUpdateSelectedProject={this.handleUpdateSelectedProject}
                    color={this.props.project.Color}
          />
          <Card.Body>
            <Card.Text> {this.props.project.Description}</Card.Text>
          </Card.Body>
          <CardFooter
            text={
              "Last updated " +
              timeStamp.toLocaleString(DateTime.DATETIME_FULL) +
              " by " +
              this.props.project.LastUpdatedBy.Name
            }
          />
        </Card>
      </div>
    );
  }
}

export default ViewProject;
