import React, { Component } from "react";
import { Card } from "react-bootstrap";
import "../styles/styles.css";
import { CardHeaderWithEditButton, CardFooter } from "../components"
import { DateTime } from "luxon";

// Display view-entry card
class ViewEntry extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        const timeStamp = DateTime.fromISO(this.props.entry.TimeStamp);
        return (
            <div className="view-entry mt-3">
                <Card className="grow" onClick={this.props.setExpanded}>
                    <CardHeaderWithEditButton title={this.props.entry.Title} subTitle={this.props.entry.Project.Title} setEditing={this.props.setEditing} />
                    <Card.Body className="card-body">
                        <Card.Text> {this.props.entry.Description}</Card.Text>
                    </Card.Body>
                    <CardFooter text={"Last updated " + timeStamp.toLocaleString(DateTime.DATETIME_FULL) + " by " + this.props.entry.Author.Name} handleSubmit={this.handleSubmit}/>
                </Card>
            </div>
        );
    }
}

export default ViewEntry;
