import React, { Component } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare, faListAlt } from "@fortawesome/free-solid-svg-icons";
import { Card } from "react-bootstrap";
import "../styles/styles.css";

class CardHeaderWithViewEntryButton extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    if (this.props.subTitle != "") {
      return (
        <Card.Header>
          <div className="card-title-container">
            <h4 className="card-title">{this.props.title}</h4>
            <h6 className="card-project-title">{this.props.subTitle}</h6>
          </div>
          <div className="card-header-button-container">
            <button
              type="button"
              className="button grow card-header-button"
              onClick={this.props.handleUpdateSelectedProject}
            >
              <FontAwesomeIcon icon={faListAlt} />
            </button>
            <button
              type="button"
              className="button grow card-header-button"
              onClick={this.props.setEditing}
            >
              <FontAwesomeIcon icon={faPenToSquare} />
            </button>
          </div>
        </Card.Header>
      );
    } else {
      return (
        <Card.Header>
          <div className="card-title-container">
            <h4 className="card-title">{this.props.title}</h4>
          </div>
          <div className="card-header-button-container">
            <button
              type="button"
              className="button grow card-header-button"
              onClick={this.props.handleUpdateSelectedProject}
            >
              <FontAwesomeIcon icon={faListAlt} />
            </button>
            <button
              type="button"
              className="button grow card-header-button"
              onClick={this.props.setEditing}
            >
              <FontAwesomeIcon icon={faPenToSquare} />
            </button>
          </div>
        </Card.Header>
      );
    }
  }
}

export default CardHeaderWithViewEntryButton;
