import React, { Component, useState, useEffect } from "react";
import { Container, Row } from "react-bootstrap";
import Alert from "react-bootstrap/Alert";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClose } from "@fortawesome/free-solid-svg-icons";
import "../styles/styles.css";

// Display error card
class ErrorCard extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Alert className="error-card">
        <Container>
          <Row>
            <Alert.Heading className="d-flex justify-content-between">
              <h3>{this.props.title}</h3>
              <div md="auto"></div>
              <button
                className="error-btn button"
                onClick={this.props.handleShowError}
              >
                <FontAwesomeIcon icon={faClose} />
              </button>
            </Alert.Heading>
          </Row>
        </Container>
        <p className="error-text"> {this.props.text}</p>
      </Alert>
    );
  }
}

export default ErrorCard;
