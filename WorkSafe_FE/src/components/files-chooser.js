import React, { Component } from "react";
import { Form } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSave } from "@fortawesome/free-solid-svg-icons";
import UrlListItem from "./url-list-item";

class FilesChooser extends Component {
  constructor(props) {
    super(props);

    this.state = {
      value: "",
    };

    this.handleAddUrl = this.handleAddUrl.bind(this);
    this.handleUrlChange = this.handleUrlChange.bind(this);
    this.handleFileBrowser = this.handleFileBrowser.bind(this);
    this.handleDeleteFile = this.handleDeleteFile.bind(this);
  }

  handleAddUrl(event) {
    var files = this.props.files;
    files.push(this.state.value);
    this.setState(
      {
        value: "",
      },
      this.props.handleSetFiles(files)
    );
  }

  handleUrlChange(event) {
    this.setState({ value: event.target.value });
  }

  handleFileBrowser(event) {
    event.preventDefault();
    event.target.value;
  }

  handleDeleteFile(file) {
    var files = this.props.files;
    const index = files.indexOf(file);
    if (index > -1) {
      files.splice(index, 1);
    }
    this.props.handleSetFiles(files);
  }

  render() {
    var urlList = this.props.files.map((file) => (
      <UrlListItem file={file} handleDeleteFile={this.handleDeleteFile} />
    ));
    var buttonDisabled = false;

    if (this.state.value == "") {
      buttonDisabled = true;
    }

    return (
      <Form.Group className="mt-3">
        <Form.Label>Files</Form.Label>
        <Form.Control
          type="text"
          className="add-upload-input"
          value={this.state.value}
          onChange={this.handleUrlChange}
          placeholder="Paste a link..."
        />
        <button
          className="button"
          type="button"
          disabled={buttonDisabled}
          onClick={this.handleAddUrl}
        >
          <FontAwesomeIcon icon={faSave} /> Add URL
        </button>
        <ul>{urlList}</ul>
      </Form.Group>
    );
  }
}

export default FilesChooser;
