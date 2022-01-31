import {NavLink} from "react-router-dom";
import React from "react";
// import { useAuth0 } from "@auth0/auth0-react";

const MainNav = () => {
  // const { isAuthenticated } = useAuth0();
  return(
  <div className="navbar-nav mr-auto">
    <NavLink
      to="/"
      exact
      className="nav-link"
      activeClassName="router-link-exact-active"
    >
      Dashboard
    </NavLink>
    

    <NavLink
      to="/external-api"
      exact
      className="nav-link"
      activeClassName="router-link-exact-active"
    >
      External API
    </NavLink>
  </div>
);
};

export default MainNav;