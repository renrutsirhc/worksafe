import React, { Component } from "react";
import { Card } from "react-bootstrap";
import "../styles/dashboard.css";
import { CardHeaderWithEditButton, CardFooter } from "../components";
import { DateTime } from "luxon";

class ViewFullEntry extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const timeStamp = DateTime.fromISO(this.props.entry.TimeStamp);
    const entryDate = DateTime.fromISO(this.props.entry.EntryDate);

    const tagButtons = this.props.entry.Tags.map((tag) => (
      <button type="button" className="button tag-button" key={tag} disabled>
        {tag}
      </button>
    ));

    const urlList = this.props.entry.Files.map((file, index) => (
      <div>
        <a href={file} key={index}>
          {file}
        </a>
      </div>
    ));

    return (
      <div className="view-entry mt-3">
        <Card className="grow" onClick={this.props.setExpanded}>
          <CardHeaderWithEditButton
            entry={this.props.entry}
            title={this.props.entry.Title}
            subTitle={this.props.entry.Project.Title}
            color={this.props.entry.Project.Color}
            setEditing={this.props.setEditing}
            deleteEntry={this.props.deleteEntry}
            handleModal={this.props.handleModal}
            allowDelete={true}
          />
          <Card.Body>
            <Card.Title>Date</Card.Title>
            <Card.Text>
              {entryDate.toLocaleString(DateTime.DATE_FULL)}
            </Card.Text>
            <Card.Title>Project</Card.Title>
            <Card.Text>{this.props.entry.Project.Title}</Card.Text>
            <Card.Title>Description</Card.Title>
            <Card.Text>{this.props.entry.Description}</Card.Text>
            <Card.Title>Files</Card.Title>
            <div className="files-list">{urlList}</div>
            <Card.Title>Learning</Card.Title>
            <Card.Text>{this.props.entry.Learning}</Card.Text>
            <Card.Title>Mindset</Card.Title>
            <Card.Text>{this.props.entry.MindSet}</Card.Text>
            <Card.Title>Impact</Card.Title>
            <Card.Text>{this.props.entry.Impact}</Card.Text>
            <Card.Title>Next Steps</Card.Title>
            <Card.Text>{this.props.entry.NextSteps}</Card.Text>
            <Card.Title>Tags</Card.Title>
            {tagButtons}
          </Card.Body>
          <CardFooter
            text={
              "Last updated " +
              timeStamp.toLocaleString(DateTime.DATETIME_FULL) +
              " by " +
              this.props.entry.Author.Name
            }
            handleSubmit={this.handleSubmit}
          />
        </Card>
      </div>
    );
  }
}

export default ViewFullEntry;
