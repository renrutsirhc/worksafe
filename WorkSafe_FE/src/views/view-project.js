import React, { Component, useState, useEffect } from "react"
import { Card, Button } from "react-bootstrap"
import "../styles/dashboard.css"
import { CardHeaderWithViewEntryButton, CardFooter } from "../components"

// Display view-project card
class ViewProject extends Component {
  constructor(props) {
    super(props)
      this.handleUpdateSelectedProject = this.handleUpdateSelectedProject.bind(this)
  }

  handleUpdateSelectedProject() {
    this.props.handleUpdateSelectedProject(this.props.project)
  }

  render() {
    return (
      <div className="mt-3">
        <Card className="grow" onClick={this.props.setExpanded}>
          <CardHeaderWithViewEntryButton title={this.props.project.Title} subTitle={this.props.project.Owner.Name} setEditing={this.props.setEditing} handleUpdateSelectedProject={this.handleUpdateSelectedProject} />

          <Card.Body>
            <Card.Text> {this.props.project.Description}</Card.Text>
          </Card.Body>
          <CardFooter timeStamp={this.props.project.TimeStamp} authorName={this.props.project.LastUpdatedBy.Name} />
        </Card>
      </div>
    )
  }
}

export default ViewProject
