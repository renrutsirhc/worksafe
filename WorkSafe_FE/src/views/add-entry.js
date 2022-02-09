import React, { Component } from "react";
import { Select } from "react-dropdown-select";
import { Form, FormLabel, FormControl, Row, Col, Card } from "react-bootstrap";
import {
  CardHeaderWithCloseButton,
  CardFooterWithSaveButton,
} from "../components";
import ErrorCard from "./error-card";
import { withAuth0 } from "@auth0/auth0-react";
import { DateTime } from "luxon";

class AddEntry extends Component {
  constructor(props) {
    super(props);
    var entry = {
      Author: {
        Id: this.props.currentUser.sub,
        Name: this.props.currentUser.name,
      },
      Project: {
        Id: "",
        Title: "",
      },
      Description: "",
      Files: [],
      Impact: "",
      Learning: "",
      MindSet: "",
      NextSteps: "",
      Tags: [],
    };
    this.state = {
      Entry: entry,
      ShowError: false,
      ErrorTitle: "Error",
      ErrorText:
        "An error has occurred while trying to get data from the API. Please contact your developer.",
    };

    this.handleTitleChange = this.handleTitleChange.bind(this);
    this.handleEntryDateChange = this.handleEntryDateChange.bind(this);
    this.handleDescriptionChange = this.handleDescriptionChange.bind(this);
    this.handleLearningChange = this.handleLearningChange.bind(this);
    this.handleMindsetChange = this.handleMindsetChange.bind(this);
    this.handleImpactChange = this.handleImpactChange.bind(this);
    this.handleNextStepsChange = this.handleNextStepsChange.bind(this);
    this.handleProjectChange = this.handleProjectChange.bind(this);
    this.handleTagChange = this.handleTagChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleShowError = this.handleShowError.bind(this);
  }

  handleTitleChange(event) {
    this.setState((prevState) => {
      let Entry = Object.assign({}, prevState.Entry);
      Entry.Title = event.target.value;
      return { Entry };
    });
  }

  handleEntryDateChange(event) {
    var entryDate = DateTime.fromISO(event.target.value).toUTC();
    this.setState((prevState) => {
      let Entry = Object.assign({}, prevState.Entry);
      Entry.EntryDate = entryDate.toISO();
      return { Entry };
    });
  }

  handleProjectChange(event) {
    this.setState((prevState) => {
      let Entry = Object.assign({}, prevState.Entry);
      if (event[0] == undefined) {
        Entry.Project = {
          Project: {
            Id: "",
            Title: "",
          },
        };
      } else Entry.Project = this.getProject(event[0].value);
      console.log(Entry.Project);
      return { Entry };
    });
  }

  handleDescriptionChange(event) {
    this.setState((prevState) => {
      let Entry = Object.assign({}, prevState.Entry);
      Entry.Description = event.target.value;
      return { Entry };
    });
  }

  handleLearningChange(event) {
    this.setState((prevState) => {
      let Entry = Object.assign({}, prevState.Entry);
      Entry.Learning = event.target.value;
      return { Entry };
    });
  }

  handleMindsetChange(event) {
    this.setState((prevState) => {
      let Entry = Object.assign({}, prevState.Entry);
      Entry.MindSet = event.target.value;
      return { Entry };
    });
  }

  handleImpactChange(event) {
    this.setState((prevState) => {
      let Entry = Object.assign({}, prevState.Entry);
      Entry.Impact = event.target.value;
      return { Entry };
    });
  }
  handleNextStepsChange(event) {
    this.setState((prevState) => {
      let Entry = Object.assign({}, prevState.Entry);
      Entry.NextSteps = event.target.value;
      return { Entry };
    });
  }

  getProject(id) {
    for (var i = 0; i < this.props.projects.length; i++) {
      if (this.props.projects[i].Id == id) {
        return this.props.projects[i];
      }
    }
    return null;
  }

  feedProjectsOptions() {
    var options = this.props.projects.map((project) => {
      return {
        value: project.Id,
        label: project.Title,
      };
    });
    // console.log(options);
    return options;
  }

  handleTagChange(values) {
    this.setState((prevState) => {
      let Entry = Object.assign({}, prevState.Entry);
      Entry.Tags = values.map((tag) => tag.value);
      return { Entry };
    });
  }

  feedTagsOptions() {
    var options = this.props.tags.map((tag) => {
      return {
        label: tag,
        value: tag,
      };
    });
    return options;
  }

  handleShowError() {
    if (this.state.ShowError) {
      this.setState({ ShowError: false });
    } else {
      this.setState({ ShowError: true });
    }
  }

  async handleSubmit(event) {
    event.preventDefault();
    const { getAccessTokenSilently } = this.props.auth0;
    var token = await getAccessTokenSilently();
    var entry = this.state.Entry;
    var options = {
      method: "POST", // *GET, POST, PUT, DELETE, etc.
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
      body: JSON.stringify(entry),
    };

    var url = "/api/users/" + this.state.Entry.Author.Id + "/entries";
    var response = await fetch(url, options);
    if (response.ok) {
      var result = await response.json();
      console.log(result);
      this.props.handleAddEntry();
      this.props.handleShowAddEntry();
    } else {
      this.handleShowError();
    }
  }

  render() {
    if (this.state.ShowError) {
      return (
        <ErrorCard
          title={this.state.ErrorTitle}
          text={this.state.ErrorText}
          handleShowError={this.handleShowError}
        />
      );
    }

    const placeHolderOption = "";
    const projectsOptions = this.feedProjectsOptions();
    const tagsOptions = this.feedTagsOptions();
    const entryDate = DateTime.fromISO(this.state.Entry.EntryDate);
    const localEntryDate = entryDate.toLocal().toISODate();

    return (
      // add a button, call this.props.handleShowAddEntry



      <Form>
        <Card>
          <CardHeaderWithCloseButton
            title="Add Entry"
            subTitle=""
            setEditing={this.props.handleShowAddEntry}
          />
          <Card.Body>
            <Row sm={1} md={2}>
              <Col>
                <Form.Group>
                  <FormLabel>Title</FormLabel>
                  <FormControl
                    type="text"
                    value={this.state.Entry.Title}
                    onChange={this.handleTitleChange}
                    placeholder="Summarise the entry"
                  />
                </Form.Group>
              </Col>


              <Col md={3}>
                <Form.Group>
                  <FormLabel>Date</FormLabel>
                  <FormControl
                    type="date"
                    value={localEntryDate}
                    onChange={this.handleEntryDateChange}
                    name="date"
                  />
                </Form.Group>
              </Col>
            </Row>
            <Row sm={1} md={2}>
              <Form.Group className="mt-3">
                <Form.Label>Project</Form.Label>
                <Select
                  placeholder={placeHolderOption}
                  onChange={this.handleProjectChange}
                  options={projectsOptions}
                  backspaceDelete={false}
                  clearable={true}
                  dropdownHandle={false}
                />
              </Form.Group>
            </Row>
            <Row>
              <Form.Group className="mt-3">
                <Form.Label>Description</Form.Label>
                <Form.Control
                  as="textarea"
                  type="text"
                  value={this.state.Entry.Description || ""}
                  onChange={this.handleDescriptionChange}
                  placeholder="Describe the entry"
                />
              </Form.Group>
            </Row>
            <Row>
              <Form.Group className="mt-3">
                <Form.Label>Upload files</Form.Label>
                <Form.Control type="file" multiple />
              </Form.Group>
            </Row>
            <Row>
              <Form.Group className="mt-3">
                <Form.Label>Learning</Form.Label>
                <Form.Control
                  as="textarea"
                  value={this.state.Entry.Learning}
                  onChange={this.handleLearningChange}
                  placeholder="Describe the learning"
                />
              </Form.Group>
            </Row>
            <Row>
              <Form.Group className="mt-3">
                <Form.Label>Mindset</Form.Label>
                <Form.Control
                  type="text"
                  value={this.state.Entry.Mindset}
                  onChange={this.handleMindsetChange}
                  placeholder="Mind set used"
                />
              </Form.Group>
            </Row>
            <Row>
              <Col>
                <Form.Group className="mt-3">
                  <Form.Label>Impact</Form.Label>
                  <Form.Control
                    as="textarea"
                    value={this.state.Entry.Impact}
                    onChange={this.handleImpactChange}
                    placeholder="Impact of entry"
                  />
                </Form.Group>
              </Col>
            </Row>
            <Row>
              <Form.Group className="mt-3">
                <Form.Label>Next steps</Form.Label>
                <Form.Control
                  as="textarea"
                  value={this.state.Entry.NextSteps}
                  onChange={this.handleNextStepsChange}
                  placeholder="Next steps based on this entry"
                />
              </Form.Group>
            </Row>
            <Row sm={1} md={2}>
              <Form.Group className="mt-3">
                <Form.Label>Tag</Form.Label>
                <Select
                  placeholder={placeHolderOption}
                  options={tagsOptions}
                  onChange={(values) => this.handleTagChange(values)}
                  clearable={true}
                  dropdownHandle={false}
                  multi={true}
                  create={true}
                  color="#AAAAAA"
                />
              </Form.Group>
            </Row>
          </Card.Body>

          <CardFooterWithSaveButton
            text={""}
            handleSubmit={this.handleSubmit}
          />
        </Card>
      </Form>
    );
  }
}

export default withAuth0(AddEntry);
