import React, { Component } from "react";
import { withAuth0 } from "@auth0/auth0-react";
import Dashboard from "./dashboard";

class Home extends Component {
    constructor(props) {
        super(props);
    }
    static displayName = Home.name;

    componentDidMount() {
        this.addUser();
    }

    async addUser() {
        var user = {
            Id: this.props.auth0.user.sub,
            Name: this.props.auth0.user.name,
            NickName: this.props.auth0.user.nickname,
            Email: this.props.auth0.user.email,
            Picture: this.props.auth0.user.picture,
            TimeStamp: this.props.auth0.user.updated_at,
        }

        const { getAccessTokenSilently } = this.props.auth0;
        var token = await getAccessTokenSilently();
        var options = {
            method: 'POST', // *GET, POST, PUT, DELETE, etc.
            headers: {
                'Content-Type': 'application/json',
                Authorization: 'Bearer ' + token
            },
            body: JSON.stringify(user)
        }
        var response = await fetch("/api/users", options);
        var result = await response.json();
        console.log(result);
    }

  render() {
    return (
      <div>
        <Dashboard />
      </div>
    );
  }
}

export default withAuth0(Home);
