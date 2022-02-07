import { ViewProject, ViewFullProject, ViewProjectEntries } from "."
import { Component } from "react"

class ProjectViewEntriesParent extends Component {
  constructor(props) {
    super(props)
    this.state = {
      ViewEntries: false
    }

    this.setViewEntries = this.setViewEntries.bind(this)
  }

  setViewEntries() {
    if (this.state.ViewEntries) {
      this.setState({
        ViewEntries: true
      })
    } else {
      this.setState({
        ViewEntries: false
      })
    }
  }

  render() {
    if (this.state.ViewEntries) {
      return <ViewProjectEntries project={this.props.project} setExpanded={this.setExpanded} setEditing={this.setEditing} setViewEntries={this.setViewEntries} />
    }
    return <ViewProject project={this.props.project} setExpanded={this.setExpanded} setEditing={this.setEditing} setViewEntries={this.setViewEntries} />
  }
}

export default ProjectViewEntriesParent
