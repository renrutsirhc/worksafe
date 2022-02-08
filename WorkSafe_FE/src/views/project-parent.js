import { ViewProject, ViewFullProject, EditProject } from "./";
import { Component } from "react";

class ProjectParent extends Component {
  constructor(props) {
    super(props)
    this.state = {
      Editing: false,
      Expanded: false
    }

    this.setEditing = this.setEditing.bind(this)
    this.setExpanded = this.setExpanded.bind(this)
  }

  setEditing() {
    if (this.state.Editing) {
      this.setState({
        Editing: false,
        Expanded: true
      })
    } else {
      this.setState({
        Editing: true,
        Expanded: true
      })
    }
  }

  setExpanded() {
    if (this.state.Expanded) {
      this.setState({ Expanded: false })
    } else {
      this.setState({ Expanded: true })
    }
  }

    render() {
        if (this.state.Editing) {
            return (
                <EditProject
                    project={this.props.project}
                    handleUpdateProject={this.props.handleUpdateProject}
                    setEditing={this.setEditing}
                    setExpanded={this.setExpanded}
                />
            );
        }
        if (this.state.Expanded) {
            return (
                <ViewFullProject
                    project={this.props.project}
                    setExpanded={this.setExpanded}
                    setEditing={this.setEditing}
                />
            );
        }
        return (
            <ViewProject project={this.props.project} setExpanded={this.setExpanded} setEditing={this.setEditing} />
        )
    }



}

export default ProjectParent
