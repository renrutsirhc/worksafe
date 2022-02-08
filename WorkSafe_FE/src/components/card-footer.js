import React, { Component, useState, useEffect } from "react";
import { Card } from "react-bootstrap";
import "../styles/styles.css";

class CardFooter extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <Card.Footer>
                <h6 className="card-footer-text">
                    {this.props.text}
                </h6>
            </Card.Footer>
        );
    }

}

export default CardFooter;