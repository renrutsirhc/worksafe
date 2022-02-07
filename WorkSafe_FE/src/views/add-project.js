import React, { Component } from "react"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faXmark } from "@fortawesome/free-solid-svg-icons"
import { Button, Form, ButtonGroup, FormLabel, FormControl, Row, Col, Card } from "react-bootstrap"
import CardHeader from "react-bootstrap/esm/CardHeader"
import { withAuth0 } from "@auth0/auth0-react"
import { CardHeaderWithCloseButton, CardFooterWithSaveButton } from "../components"

class AddProject extends Component {
  constructor(props) {
    super(props)
    var project = {
      Owner: {
        Id: this.props.currentUser.sub,
        Name: this.props.currentUser.name
      },
      Project: {
        Id: "",
        Title: ""
      },
      Description: "",
      ProjectGoal: "",
      TimeStamp: "",
      CreationTime: "",
      LastUpdatedBy: "",
      Pillar: ""
    }
    this.state = {
      Project: project
    }

    this.handleTitleChange = this.handleTitleChange.bind(this)
    this.handleDescriptionChange = this.handleDescriptionChange.bind(this)
    this.handleProjectGoalChange = this.handleProjectGoalChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleTitleChange(event) {
    this.setState(prevState => {
      let Project = Object.assign({}, prevState.Project)
      Project.Title = event.target.value
      return { Project }
    })
    console.log(this.state)
  }

  handleDescriptionChange(event) {
    this.setState(prevState => {
      let Project = Object.assign({}, prevState.Project)
      Project.Description = event.target.value
      return { Project }
    })
    console.log(this.state)
  }

  handleProjectGoalChange(event) {
    this.setState(prevState => {
      let Project = Object.assign({}, prevState.Project)
      Project.ProjectGoal = event.target.value
      return { Project }
    })
    console.log(this.state)
  }

  async handleSubmit(event) {
    event.preventDefault()
    const { getAccessTokenSilently } = this.props.auth0
    var token = await getAccessTokenSilently()
    var project = this.state.Project
    var options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token
      },
      body: JSON.stringify(project)
    }

    var url = "/api/projects"
    var response = await fetch(url, options)
    if (response.ok) {
      var result = await response.json()
      console.log(result)
      this.props.handleAddProject()
      this.props.handleShowAddProject()
    } else {
      //show error
    }
  }

  render() {
    return (
      // add a button, call this.props.handleShowAddProject

      <Form>
        <Card>
          <CardHeaderWithCloseButton title="Add Project" subTitle="" setEditing={this.props.handleShowAddProject} />
          <Card.Body>
            <Row sm={1} md={2}>
              <Col>
                <Form.Group>
                  <FormLabel>Title</FormLabel>
                  <FormControl type="text" value={this.state.Project.Title} onChange={this.handleTitleChange} placeholder="Project title" />
                </Form.Group>
              </Col>
            </Row>
            <Row>
              <Form.Group className="mt-3">
                <Form.Label>Description</Form.Label>
                <Form.Control as="textarea" type="text" value={this.state.Project.Description || ""} onChange={this.handleDescriptionChange} placeholder="Short description" />
              </Form.Group>
            </Row>
            <Row>
              <Form.Group className="mt-3">
                <Form.Label>Project Goal</Form.Label>
                <Form.Control as="textarea" value={this.state.Project.ProjectGoal} onChange={this.handleProjectGoalChange} placeholder="Project Goal" />
              </Form.Group>
            </Row>
            <Row>
              <Form.Group className="mt-3">
                <Form.Label>Pillars</Form.Label>
              </Form.Group>
            </Row>
          </Card.Body>
          <CardFooterWithSaveButton timeStamp={this.state.Project.TimeStamp} authorName={this.state.Project.Owner.Name} handleSubmit={this.handleSubmit} />
        </Card>
      </Form>
    )
  }
}

export default withAuth0(AddProject)
