// src/components/login-button.js

import React from "react";
import { useAuth0 } from "@auth0/auth0-react";

// import { Button } from "react-bootstrap";

const LoginButton = () => {
  const { loginWithRedirect } = useAuth0();
  return (
    <button
      className="btn btn-secondary btn-block"
      onClick={() => loginWithRedirect()}
      id="qsLoginBtn"
    >
      Log In
    </button>
  );
};

export default LoginButton;