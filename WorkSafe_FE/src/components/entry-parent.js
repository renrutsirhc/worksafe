import { ViewEntry, ViewFullEntry } from "../views";
import { Component } from "react";
//import EditEntry from "../Views/edit-entry";

class EntryParent extends Component {
    constructor(props) {
        super(props)
        this.state = {
            Editing: false,
            Expanded: false,
        }

        this.setEditing = this.setEditing.bind(this);
        this.setExpanded = this.setExpanded.bind(this);
    }

    setEditing() {
        if (this.state.Editing) {
            this.setState({ Editing: false })
        }
        else {
            this.setState({
                Editing: true,
                Expanded: false
            })
        }
    }

    setExpanded() {
        if (this.state.Expanded) {
            this.setState({ Expanded: false })
        }
        else {
            this.setState({ Expanded: true })
        }
    }

    render() {
        if (this.state.Editing) {
            return (
                <div>
                    <h2>Editing</h2>
                </div>
            )
        }
        if (this.state.Expanded) {
            return (
                <div>
                    <ViewFullEntry entry={this.props.entry} setExpanded={this.setExpanded} setEditing={this.setEditing} />
                </div>
            )
        }

        return (
            <ViewEntry entry={this.props.entry} setExpanded={this.setExpanded} setEditing={this.setEditing} />
        )
    }



}


export default EntryParent;
