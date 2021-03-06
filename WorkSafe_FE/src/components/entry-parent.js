import { EditEntry, ViewEntry, ViewFullEntry } from "../views";
import { Component } from "react";
import { withAuth0 } from "@auth0/auth0-react";
//import EditEntry from "../Views/edit-entry";

class EntryParent extends Component {
    constructor(props) {
        super(props);
        let entry = this.props.entry;


        this.state = {
            Entry: entry,
            Editing: false,
            Expanded: false
        };

        this.setEditing = this.setEditing.bind(this);
        this.setExpanded = this.setExpanded.bind(this);
    }

    setEditing() {
        if (this.state.Editing) {
            this.setState({
                Editing: false,
                Expanded: true,
            });
        } else {
            this.setState({
                Editing: true,
                Expanded: true,
            });
        }
    }

    setExpanded() {
        if (this.state.Expanded) {
            this.setState({ Expanded: false });
        } else {
            this.setState({ Expanded: true });
        }
    }

    render() {
        if (this.state.Editing) {
            return (
                <EditEntry
                    entry={this.props.entry}
                    projects={this.props.projects}
                    tags={this.props.tags}
                    handleUpdateEntry={this.props.handleUpdateEntry}
                    setEditing={this.setEditing}
                    setExpanded={this.setExpanded}
                />
            );
        }
        if (this.state.Expanded) {
            return (
                <ViewFullEntry
                    entry={this.props.entry}
                    setExpanded={this.setExpanded}
                    setEditing={this.setEditing}
                    handleModal={this.props.handleModal}
                    allowDelete={this.props.allowDelete}
                />
            );
        }

        return (

            <ViewEntry
                entry={this.props.entry}
                setExpanded={this.setExpanded}
                setEditing={this.setEditing}
                handleModal={this.props.handleModal}
                allowDelete={this.props.allowDelete}
            />

        );
    }
}

export default withAuth0(EntryParent);
