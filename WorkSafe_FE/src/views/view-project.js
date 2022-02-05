import React, { Component, useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare } from "@fortawesome/free-solid-svg-icons";
import { Card, Button } from "react-bootstrap";
import "../styles/styles.css";
import Moment from 'react-moment';
import 'moment-timezone';

// Display view-project card
class ViewProject extends Component {
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
                            <Button className="grow" variant="light" onClick={this.props.setEditing}><FontAwesomeIcon icon={faPenToSquare} /></Button>
                        </div>
                    </Card.Header>
                    <Card.Body>
                        <Card.Text> {this.props.project.Description}</Card.Text>
                    </Card.Body>
                    <Card.Footer className="footer" as="h6">
                        Last Updated <Moment format="HH:MM, D MMM YYYY" withTitle>{this.props.project.LastUpdatedBy.TimeStamp}</Moment>{" "}
                        by{" "} {this.props.project.LastUpdatedBy.Name}
                    </Card.Footer>
                </Card>
            </div>
        );
    }
};

export default ViewProject;
