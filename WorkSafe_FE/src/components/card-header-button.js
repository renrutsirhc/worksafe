import React, { Component } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "../styles/styles.css";

class CardHeaderButton extends Component {
    constructor(props) {
        super(props);
        this.state = {
            hover: false
        }

        this.setHover = this.setHover.bind(this);
        this.setNoHover = this.setNoHover.bind(this);
    }

    setHover() {
        this.setState({hover: true})
    }

    setNoHover() {
        this.setState({hover: false})
    }

    render() {
        var buttonStyle;
        if (this.state.hover) {
            buttonStyle = {
                background: "#ffffff",
                color: this.props.color,
            }
        } else {
            buttonStyle = {
                backgroundColor: this.props.color,
            }
        }
        return (
            <button
                type="button"
                className="button grow card-header-button"
                onClick={this.props.onClick}
                onMouseEnter={this.setHover}
                onMouseLeave={this.setNoHover}
                style={buttonStyle}
            >
                <FontAwesomeIcon icon={this.props.icon} />
            </button>
            
            )
    }
}
export default CardHeaderButton;