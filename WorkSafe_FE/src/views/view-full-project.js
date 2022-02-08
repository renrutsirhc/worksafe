import React, { Component } from "react";
import { Card, ButtonGroup } from "react-bootstrap";
import "../styles/dashboard.css";
import PillarButton from "../components/pillar-button"
import { DateTime } from "luxon";
import { CardHeaderWithEditButton, CardFooter } from "../components"

class ViewFullProject extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        const timeStamp = DateTime.fromISO(this.props.project.TimeStamp);
        const creationTime = DateTime.fromISO(this.props.project.CreationTime);
        const localCreationTime = creationTime.toLocaleString(DateTime.DATE_FULL)

        return (
            <div className="mt-3 d-flex flex-wrap">
                <Card className="grow" onClick={this.props.setExpanded}>
                    <CardHeaderWithEditButton title={this.props.project.Title} subTitle={this.props.project.Owner.Name} setEditing={this.props.setEditing} />
                    <Card.Body>
                        <Card.Title>Description</Card.Title>
                        <Card.Text>{this.props.project.Description}</Card.Text>
                        <Card.Title>Goal</Card.Title>
                        <Card.Text>{this.props.project.ProjectGoal}</Card.Text>
                        <Card.Title>Pillars</Card.Title>
                        <Card.Text>
                            <ButtonGroup className="mb-2 d-flex flex-wrap">
                                <PillarButton checked={this.props.project.PillarEmbedding} disabled={true} pillarname={"Embedding"} />
                                <PillarButton checked={this.props.project.PillarResources} disabled={true} pillarname={"Resources"} />
                                <PillarButton checked={this.props.project.PillarNeeds} disabled={true} pillarname={"Needs"} />
                                <PillarButton checked={this.props.project.PillarLeadership} disabled={true} pillarname={"Leadership"} />
                                <PillarButton checked={this.props.project.PillarConnection} disabled={true} pillarname={"Connection"} />
                            </ButtonGroup>
                        </Card.Text>
                        <Card.Title>Creation Date</Card.Title>
                        <Card.Text>
                            {localCreationTime}
                        </Card.Text>
                    </Card.Body>
                    <CardFooter text={"Last updated " + timeStamp.toLocaleString(DateTime.DATETIME_FULL) + " by " + this.props.project.LastUpdatedBy.Name} />
                </Card>
            </div>
        );
    }
}

export default ViewFullProject;