import React, { Component } from "react";
import { withAuth0, useAuth0 } from "@auth0/auth0-react";
import Dashboard from "./dashboard";

const Home = (props) => {
  const { getAccessTokenSilently } = useAuth0();

  const getToken = async () => {
    addUser();
    const token = await getAccessTokenSilently();
    return token;
  };

  const addUser = async () => {
    var user = {
      Id: props.auth0.user.sub,
      Name: props.auth0.user.name,
      NickName: props.auth0.user.nickname,
      Email: props.auth0.user.email,
      Picture: props.auth0.user.picture,
      TimeStamp: props.auth0.user.updated_at,
    };

    var options = {
      method: "POST", // *GET, POST, PUT, DELETE, etc.
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    };
    var response = await fetch("/api/users", options);
    var result = await response.json();
    console.log(result);
  };

  return (
    <div>
      <Dashboard token={getToken()} />
    </div>
  );
};

export default withAuth0(Home);
