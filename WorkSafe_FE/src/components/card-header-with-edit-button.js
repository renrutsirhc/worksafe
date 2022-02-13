import React, { Component, useContext } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare, faTrashCan } from "@fortawesome/free-solid-svg-icons";
import { Card } from "react-bootstrap";
import "../styles/styles.css";

class CardHeaderWithEditButton extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        var deletebutton;
        // only apply delete button to entry cards
        if (this.props.allowDelete) {
            deletebutton = <button
                entry={this.props.entry}
                className="button grow card-header-button"
                onClick={(e) => { e.stopPropagation(); this.props.handleModal(this.props.entry) }}
            >
                <FontAwesomeIcon icon={faTrashCan} />
            </button>
        }
        if (this.props.subTitle != "") {
            return (
                <Card.Header>
                    <div className="card-title-container">
                        <h4 className="card-title">
                            {this.props.title}
                        </h4>
                        <h6 className="card-project-title">
                            {this.props.subTitle}
                        </h6>
                    </div>
                    <div className="card-header-button-container">
                        {deletebutton}
                        <button
                            className="button grow card-header-button"
                            onClick={this.props.setEditing}
                        >
                            <FontAwesomeIcon icon={faPenToSquare} />
                        </button>
                    </div>
                </Card.Header>
            )
        } else {
            return (
                <Card.Header>
                    <div className="card-title-container">
                        <h4 className="card-title">
                            {this.props.title}
                        </h4>
                    </div>
                    <div className="card-header-button-container">
                        {deletebutton}
                        <button
                            className="button grow card-header-button"
                            onClick={this.props.setEditing}
                        >
                            <FontAwesomeIcon icon={faPenToSquare} />
                        </button>
                    </div>
                </Card.Header>
            )
        }

    }
}

export default CardHeaderWithEditButton;