// src/components/auth-nav.js

import React from "react";
import AuthenticationButton from "./authentication-button";
// import ProfileIcon from "./profile-icon";

const AuthNav = () => (
  <div className="navbar-nav ml-auto">
    {/* <ProfileIcon /> */}
    <AuthenticationButton />
  </div>
);

export default AuthNav;
