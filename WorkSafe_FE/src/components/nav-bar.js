import React from "react";

import MainNav from "./main-nav";
import AuthNav from "./auth-nav";

class NavBar extends React.Component {
  render() {
    return (
      <div className="nav-container mb-3">
        <nav className="navbar navbar-expand-md navbar-light bg-light">
          <div className="container">
            <div className="navbar-brand logo" />
            <MainNav />
            <AuthNav />
          </div>
          <hr></hr>
        </nav>
      </div>
    );
  }
}

export default NavBar;