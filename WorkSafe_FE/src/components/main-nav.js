import { NavLink } from "react-router-dom";
import React from "react";
import { User } from '@auth0/auth0-react';

// const { user } = User();

class MainNav extends React.Component {
  
  render() {
    
    return (
      <div className="navbar-nav mr-auto">
        <NavLink
          to="/"
          exact
          className="nav-link"
          activeClassName="router-link-exact-active"
        >
          Home
        </NavLink>
        <NavLink
          to="/profile"
          exact
          className="nav-link"
          activeClassName="router-link-exact-active"
        >
          Profile
        </NavLink>
        <NavLink
          to="/external-api"
          exact
          className="nav-link"
          activeClassName="router-link-exact-active"
        >
          External API
        </NavLink>
        {/* { user && (<><div>Can view by User Only</div></>)} */}
        
      </div>
    );
  }
}

export default MainNav;