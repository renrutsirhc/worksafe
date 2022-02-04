import React, { Component } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare } from "@fortawesome/free-solid-svg-icons";
import { Button, Card } from "react-bootstrap";
import "../styles/dashboard.css";
import Moment from "react-moment";
import "moment-timezone";

class ViewFullEntry extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const tagButtons = this.props.entry.Tags.map((tag) => (
      <Button
        variant="secondary"
        size="sm"
        style={{ marginRight: "10px" }}
        disabled
      >
        {tag}
      </Button>
    ));

    return (
      <div className="view-entry mt-3">
        <Card className="grow" onClick={this.props.setExpanded}>
          <Card.Header className="header" as="h4">
            {this.props.entry.Title}
            <div className="editButton">
              <Button variant="light" onClick={this.props.setEditing}>
                <FontAwesomeIcon icon={faPenToSquare} />
              </Button>
            </div>
          </Card.Header>
          <Card.Body>
            <Card.Title>Title</Card.Title>
            <Card.Text>{this.props.entry.Title}</Card.Text>
            <Card.Title>Date</Card.Title>
            <Card.Text></Card.Text>
            <Card.Title>Project</Card.Title>
            <Card.Text>{this.props.entry.Project.Title}</Card.Text>
            <Card.Title>Description</Card.Title>
            <Card.Text>{this.props.entry.Description}</Card.Text>
            <Card.Title>Files</Card.Title>
            <Card.Text></Card.Text>
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
          <Card.Footer className="footer" as="h6">
            Last Updated{" "}
            <Moment format="HH:MM, D MMM YYYY" withTitle>
              {this.props.entry.TimeStamp}
            </Moment>{" "}
            by {this.props.entry.Author.Name}
          </Card.Footer>
        </Card>
      </div>
    );
  }
}

export default ViewFullEntry;
