import React, { Component, useState, useEffect } from "react";
import { Card } from "react-bootstrap";
import "../styles/styles.css";
import Moment from "react-moment";
import "moment-timezone";

class CardFooter extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <Card.Footer>
                <h6 className="card-footer-text">
                    Last Updated{" "}
                    <Moment format="HH:MM, D MMM YYYY" withTitle>
                        {this.props.timeStamp}
                    </Moment>{" "}
                    by {this.props.authorName}
                </h6>
            </Card.Footer>
        );
    }

}

export default CardFooter;