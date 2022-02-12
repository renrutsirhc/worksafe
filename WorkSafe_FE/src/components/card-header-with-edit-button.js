import React, { Component } from "react";
import { faPenToSquare } from "@fortawesome/free-solid-svg-icons";
import { Card } from "react-bootstrap";
import {CardHeaderButton} from "../components"
import "../styles/styles.css";

class CardHeaderWithEditButton extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        var headerStyle;
        if (this.props.subTitle != "") {
            headerStyle = {
                backgroundColor: this.props.color,
                color: "#ffffff"
            }
            return (
                <Card.Header style={headerStyle}>
                    <div className="card-title-container">
                        <h4 className="card-title">{this.props.title}</h4>
                        <h6 className="card-project-title">{this.props.subTitle}</h6>
                    </div>
                    <div className="card-header-button-container">
                        <CardHeaderButton
                            color={this.props.color}
                            onClick={this.props.setEditing}
                            icon={faPenToSquare}
                        />
                    </div>
                </Card.Header>
            );
        } else {
            headerStyle = {
                backgroundColor: "#943A7A",
                color: "#ffffff"
            }
            return (
                <Card.Header style={headerStyle}>
                    <div className="card-title-container">
                        <h4 className="card-title">{this.props.title}</h4>
                    </div>
                    <div className="card-header-button-container">
                        <CardHeaderButton
                            color={this.props.color}
                            onClick={this.props.setEditing}
                            icon={faPenToSquare}
                        />
                    </div>
                </Card.Header>
            );
        }
    }
}

export default CardHeaderWithEditButton;
