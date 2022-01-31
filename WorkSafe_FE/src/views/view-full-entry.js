import React, { Component } from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare } from "@fortawesome/free-solid-svg-icons";
import { Button, Card } from 'react-bootstrap'
import "../styles/dashboard.css";
import Moment from 'react-moment';
import 'moment-timezone';

class ViewFullEntry extends Component {
    constructor(props) {
        super(props)
    }

    render() {
        return (
            <div className="view-entry mt-3">
                <Card className="grow" onClick={this.props.setExpanded}>
                    <Card.Header style={{ backgroundColor: "#D6E06D" }} as="h4">
                        {this.props.entry.Title}
                        <div className="EditButton">
                            <Button variant="light" onClick={this.props.setEditing}><FontAwesomeIcon icon={faPenToSquare} /></Button>
                        </div>
                    </Card.Header>
                    <Card.Body>
                        <Card.Title style={{ backgroundColor: "#f6fad2" }}>Title</Card.Title>
                        <Card.Text>{this.props.entry.Title}</Card.Text>
                        <Card.Title style={{ backgroundColor: "#f6fad2" }}>Date</Card.Title>
                        <Card.Text></Card.Text>
                        <Card.Title style={{ backgroundColor: "#f6fad2" }}>Description</Card.Title>
                        <Card.Text>{this.props.entry.Description}</Card.Text>
                        <Card.Title style={{ backgroundColor: "#f6fad2" }}>Files</Card.Title>
                        <Card.Text></Card.Text>
                        <Card.Title style={{ backgroundColor: "#f6fad2" }}>Learning</Card.Title>
                        <Card.Text>{this.props.entry.Learning}</Card.Text>
                        <Card.Title style={{ backgroundColor: "#f6fad2" }}>Mindset</Card.Title>
                        <Card.Text>{this.props.entry.Mindset}</Card.Text>
                        <Card.Title style={{ backgroundColor: "#f6fad2" }}>Impact</Card.Title>
                        <Card.Text>{this.props.entry.Impact}</Card.Text>
                        <Card.Title style={{ backgroundColor: "#f6fad2" }}>Next Steps</Card.Title>
                        <Card.Text>{this.props.entry.NextSteps}</Card.Text>
                    </Card.Body>
                    <Card.Footer style={{ backgroundColor: "#E0E88F" }} as="h6">
                        Last Updated <Moment format="HH:MM, D MMM YYYY" withTitle>{this.props.entry.TimeStamp}</Moment> by {this.props.entry.Author.Name}
                    </Card.Footer>
                </Card>
            </div>
        )
    }
}

export default ViewFullEntry;