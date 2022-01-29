import React, { Component } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import ViewEntry from "./view-entry";


class Home extends Component {
    static displayName = Home.name;    

    constructor(props) {
        super(props);
        this.state = {
            entries: [],
        };
        
    }

    componentDidMount() {
        this.getEntries();
    }


    render() {
        if (this.state.entries.length > 0) {
            return (
                <div>
                    <ViewEntry entry={this.state.entries[0]} />
                </div>
            );
        } else {
            return (
                <div>
                    <h2> No Entries to display</h2>
                </div>
            );
        };

    }

    async getEntries() {
        const response = await fetch('https://localhost:7001/api/users/auth0|61ef4114b7db1d0069b8de22/entries');
        const data = await response.json();
        console.log(data);
        this.setState({ entries: data });
    }

}

export default Home;