import ViewEntry from "../views/view-entry";
import { Component } from "react";
//import EditEntry from "../Views/edit-entry";

class EntryParent extends Component {
    constructor(props) {
        super(props)
        this.state = {
            editing: false,
            expanded: false,
        }

        this.setEditing = this.setEditing.bind(this);
        this.setExpanded = this.setExpanded.bind(this);
    }

    setEditing() {
        if (this.state.Editing) {
            this.setState({ Editing: false })
        }
        else {
            this.setState({ Editing: true })
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
        if (this.state.editing) {
            return (
                < h2 > Editing</h2 >
            )
        }
        if (this.state.expanded) {
            return (
                <h2> Expanded </h2>
            )
        }

        return (
            <ViewEntry entry={this.props.entry} setExpanded={this.setExpanded} setEditing={this.setEditing} />
        )
    }



}


export default EntryParent;
