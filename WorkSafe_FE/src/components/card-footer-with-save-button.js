import React, { Component, useState, useEffect } from "react";
import { Card } from "react-bootstrap";
import "../styles/styles.css";
import Moment from "react-moment";
import "moment-timezone";

class CardFooterWithSaveButton extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <Card.Footer>
                <div className="card-footer-text-container">
                    <h6 className="card-footer-text">
                        Last Updated{" "}
                        <Moment format="HH:MM, D MMM YYYY" withTitle>
                            {this.props.timeStamp}
                        </Moment>{" "}
                        by {this.props.authorName}
                    </h6>
                </div>
                <div className="card-footer-button-container">
                    <button className="button" onClick={this.props.handleSubmit}>
                        Save Changes
                    </button>
                </div>
            </Card.Footer>
        );
    }

}

export default CardFooterWithSaveButton;