import React, { Component } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare } from "@fortawesome/free-solid-svg-icons";
import { Button, Card, ButtonGroup } from "react-bootstrap";
import "../styles/dashboard.css";
import Moment from "react-moment";
import PillarButton from "../components/pillar-button"
import "moment-timezone";

class ViewFullProject extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="mt-3">
                <Card className="grow" onClick={this.props.setExpanded}>
                    <Card.Header className="header" as="h4">
                        {this.props.project.Title}
                        <div className="editButton">
                            <Button variant="light" onClick={this.props.setEditing}>
                                <FontAwesomeIcon icon={faPenToSquare} />
                            </Button>
                        </div>
                    </Card.Header>
                    <Card.Body>
                        <Card.Title>Description</Card.Title>
                        <Card.Text>{this.props.project.Description}</Card.Text>
                        <Card.Title>Goal</Card.Title>
                        <Card.Text>{this.props.project.ProjectGoal}</Card.Text>
                        <Card.Title>Pillars</Card.Title>
                        <Card.Text>
                            <ButtonGroup className="mb-2">
                                <PillarButton checked={this.props.project.PillarEmbedding} disabled={true} pillarname={"Embedding"} />
                                <PillarButton checked={this.props.project.PillarResources} disabled={true} pillarname={"Resources"} />
                                <PillarButton checked={this.props.project.PillarNeeds} disabled={true} pillarname={"Needs"} />
                                <PillarButton checked={this.props.project.PillarLeadership} disabled={true} pillarname={"Leadership"} />
                                <PillarButton checked={this.props.project.PillarConnection} disabled={true} pillarname={"Connection"} />
                            </ButtonGroup>
                        </Card.Text>
                        <Card.Title>Creation Date</Card.Title>
                        <Card.Text>
                            <Moment format="HH:MM, D MMM YYYY" withTitle>
                                {this.props.project.CreationDate}
                            </Moment>{" "}
                        </Card.Text>
                    </Card.Body>
                    <Card.Footer className="footer" as="h6">
                        Last Updated{" "}
                        <Moment format="HH:MM, D MMM YYYY" withTitle>
                            {this.props.project.LastUpdatedBy.TimeStamp}
                        </Moment>{" "}
                        by {this.props.project.LastUpdatedBy.Name}
                    </Card.Footer>
                </Card>
            </div>
        );
    }
}

export default ViewFullProject;