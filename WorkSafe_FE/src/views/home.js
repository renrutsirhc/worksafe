import React, { Component } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import Dashboard from "./dashboard";

const Home = () => {
  const { getAccessTokenSilently } = useAuth0();

  const getToken = async () => {
    const token = await getAccessTokenSilently();
    return token;
  };

  return (
    <div>
      <Dashboard token={getToken()} />
    </div>
  );
};

export default Home;
