import React, { Component } from "react";
import { withAuth0 } from "@auth0/auth0-react";
import ProjectList from "./project-list";

class Projects extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <ProjectList />
      </div>
    );
  }
}

export default withAuth0(Projects);
