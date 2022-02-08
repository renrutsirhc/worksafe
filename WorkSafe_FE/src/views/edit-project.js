import React, { Component } from "react"
import {  Form, FormLabel, FormControl, Row, Card } from "react-bootstrap"
import { withAuth0 } from "@auth0/auth0-react"
import { CardHeaderWithCloseButton, CardFooterWithSaveButton, PillarButtonClickable } from "../components"
import { DateTime } from "luxon";

class EditProject extends Component {
    constructor(props) {
        super(props)
        this.state = {
            Project: this.props.project
        }

        this.handleTitleChange = this.handleTitleChange.bind(this)
        this.handleDescriptionChange = this.handleDescriptionChange.bind(this)
        this.handleProjectGoalChange = this.handleProjectGoalChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
        this.handlePillarEmbeddingChange = this.handlePillarEmbeddingChange.bind(this)
        this.handlePillarResourcesChange = this.handlePillarResourcesChange.bind(this)
        this.handlePillarNeedsChange = this.handlePillarNeedsChange.bind(this)
        this.handlePillarLeadershipChange = this.handlePillarLeadershipChange.bind(this)
        this.handlePillarConnectionChange = this.handlePillarConnectionChange.bind(this)
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
        this.setState(prevState => {
            let Project = Object.assign({}, prevState.Project)
            Project.PillarEmbedding = checked
            return { Project }
        })
    }

    handlePillarResourcesChange(checked) {
        this.setState(prevState => {
            let Project = Object.assign({}, prevState.Project)
            Project.PillarResources = checked
            return { Project }
        })
    }

    handlePillarNeedsChange(checked) {
        this.setState(prevState => {
            let Project = Object.assign({}, prevState.Project)
            Project.PillarNeeds = checked
            return { Project }
        })
    }

    handlePillarLeadershipChange(checked) {
        this.setState(prevState => {
            let Project = Object.assign({}, prevState.Project)
            Project.PillarLeadership = checked
            return { Project }
        })
    }

    handlePillarConnectionChange(checked) {
        this.setState(prevState => {
            let Project = Object.assign({}, prevState.Project)
            Project.PillarConnection = checked
            return { Project }
        })
    }

    async handleSubmit(event) {
        event.preventDefault()
        const { getAccessTokenSilently } = this.props.auth0
        var token = await getAccessTokenSilently()
        var project = this.state.Project
        var options = {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                Authorization: "Bearer " + token
            },
            body: JSON.stringify(project)
        }

        var url = "/api/projects/" + this.state.Project.Id;
        var response = await fetch(url, options)
        if (response.ok) {
            var result = await response.json()
            console.log(result)
            this.props.handleUpdateProject()
            this.props.setEditing()
        } else {
            //show error
        }
    }

    render() {
        const timeStamp = DateTime.fromISO(this.state.Project.TimeStamp);
        return (
       
            <Form>
                <Card>
                    <CardHeaderWithCloseButton title="Update Project" subTitle="" setEditing={this.props.setEditing} />
                    <Card.Body>
                        <Row>
                            <Form.Group>
                                <FormLabel>Title</FormLabel>
                                <FormControl type="text" value={this.state.Project.Title} onChange={this.handleTitleChange} placeholder="Project title" />
                            </Form.Group>
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
                                <div className="mb-2 d-flex flex-wrap">
                                    <PillarButtonClickable checked={this.state.Project.PillarEmbedding} disabled={false} pillarname={"Embedding"} toggleChecked={this.handlePillarEmbeddingChange} />
                                    <PillarButtonClickable checked={this.state.Project.PillarResources} disabled={false} pillarname={"Resources"} toggleChecked={this.handlePillarResourcesChange} />
                                    <PillarButtonClickable checked={this.state.Project.PillarNeeds} disabled={false} pillarname={"Needs"} toggleChecked={this.handlePillarNeedsChange} />
                                    <PillarButtonClickable checked={this.state.Project.PillarLeadership} disabled={false} pillarname={"Leadership"} toggleChecked={this.handlePillarLeadershipChange} />
                                    <PillarButtonClickable checked={this.state.Project.PillarConnection} disabled={false} pillarname={"Connection"} toggleChecked={this.handlePillarConnectionChange} />
                                </div>
                            </Form.Group>
                        </Row>
                    </Card.Body>
                    <CardFooterWithSaveButton text={"Last updated " + timeStamp.toLocaleString(DateTime.DATETIME_FULL) + " by " + this.state.Project.LastUpdatedBy.Name} handleSubmit={this.handleSubmit} />
                </Card>
            </Form>
        )
    }
}

export default withAuth0(EditProject)
