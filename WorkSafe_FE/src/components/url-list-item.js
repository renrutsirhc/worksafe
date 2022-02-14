import React, { Component } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClose } from "@fortawesome/free-solid-svg-icons";

class UrlListItem extends Component {
  constructor(props) {
    super(props);

    this.state = {};

    this.handleDeleteFile = this.handleDeleteFile.bind(this);
  }

  handleDeleteFile() {
    this.props.handleDeleteFile(this.props.file);
  }

  render() {
    return (
      <div className="url-list-item d-flex justify-content-between">
        <a href={this.props.file} className="url-link">
          {this.props.file}
        </a>
        <div></div>
        <button
          className="button grow card-header-button"
          onClick={this.handleDeleteFile}
          type="button"
        >
          <FontAwesomeIcon icon={faClose} />
        </button>
      </div>
    );
  }
}

export default UrlListItem;
