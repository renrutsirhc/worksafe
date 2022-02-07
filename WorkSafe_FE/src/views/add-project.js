import React, { Component } from "react"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faXmark } from "@fortawesome/free-solid-svg-icons"
import { Button, Form, ButtonGroup, FormLabel, FormControl, Row, Col, Card } from "react-bootstrap"
import CardHeader from "react-bootstrap/esm/CardHeader"
import { withAuth0 } from "@auth0/auth0-react"
import { CardHeaderWithCloseButton, CardFooterWithSaveButton, PillarButtonClickable } from "../components"

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
      LastUpdatedBy: {
        Id: "",
        Name: ""
      },
      PillarEmbedding: false,
      PillarResources: false,
      PillarNeeds: false,
      PillarLeadership: false,
      PillarConnection: false
    }
    this.state = {
      Project: project
    }

    this.handleTitleChange = this.handleTitleChange.bind(this)
    this.handleDescriptionChange = this.handleDescriptionChange.bind(this)
    this.handleProjectGoalChange = this.handleProjectGoalChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handlePillarEmbeddingChange = this.handlePillarEmbeddingChange.bind(this)
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

  handlePillarEmbeddingChange(checked) {
    console.log(checked)
    this.setState(prevState => {
      let Project = Object.assign({}, prevState.Project)
      Project.PillarEmbedding = checked
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
              <ButtonGroup className="mb-2 d-flex flex-wrap">
                <PillarButtonClickable checked={this.state.Project.PillarEmbedding} disabled={false} pillarname={"Embedding"} toggleChecked={this.handlePillarEmbeddingChange} />
                <PillarButtonClickable checked={this.state.Project.PillarResources} disabled={false} pillarname={"Resources"} toggleChecked={this.handlePillarEmbeddingChange} />
                <PillarButtonClickable checked={this.state.Project.PillarNeeds} disabled={false} pillarname={"Needs"} toggleChecked={this.handlePillarEmbeddingChange} />
                <PillarButtonClickable checked={this.state.Project.PillarLeadership} disabled={false} pillarname={"Leadership"} toggleChecked={this.handlePillarEmbeddingChange} />
                <PillarButtonClickable checked={this.state.Project.PillarConnection} disabled={false} pillarname={"Connection"} toggleChecked={this.handlePillarEmbeddingChange} />
              </ButtonGroup>
            </Row>
          </Card.Body>
          <CardFooterWithSaveButton timeStamp={this.state.Project.TimeStamp} authorName={this.state.Project.Owner.Name} handleSubmit={this.handleSubmit} />
        </Card>
      </Form>
    )
  }
}

export default withAuth0(AddProject)
