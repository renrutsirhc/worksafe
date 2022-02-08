import React, { Component } from "react";
import { Card } from "react-bootstrap";
import "../styles/styles.css";
import { CardHeaderWithEditButton, CardFooter } from "../components"

// Display view-entry card
class ViewEntry extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="view-entry mt-3">
                <Card className="grow" onClick={this.props.setExpanded}>
                    <CardHeaderWithEditButton title={this.props.entry.Title} subTitle={this.props.entry.Project.Title} setEditing={this.props.setEditing} />
                    <Card.Body className="card-body">
                        <Card.Text> {this.props.entry.Description}</Card.Text>
                    </Card.Body>
                    <CardFooter timeStamp={this.props.entry.TimeStamp} authorName={this.props.entry.Author.Name}/>
                </Card>
            </div>
        );
    }
}

export default ViewEntry;
