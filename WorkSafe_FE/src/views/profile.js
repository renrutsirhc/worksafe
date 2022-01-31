// src/views/profile.js

import React from "react";

import { useAuth0 } from "@auth0/auth0-react";
import { AutoComplete, Avatar } from "antd";
import { Image } from "react-bootstrap";

const Profile = () => {
  const { user } = useAuth0();
  const { name, nickname, picture, email } = user;

  const styleObjs = {};

  return (
    <div style={styleObjs}>
      <div className="row align-items-center">
        <div className="col-md-2 mb-3">
          <Avatar
            src={
              <Image
                className="rounded-circle"
                style={{ width: 150 }}
                src={picture}
              ></Image>
            }
            size={200}
          />
        </div>
        <div className="col-md-5 text-md-left">
          <h2>{name}</h2>
          <hr></hr>
          <p className="lead text-muted">{nickname}</p>
          <p className="lead text-muted">{email}</p>
        </div>
      </div>
    </div>
  );
};

export default Profile;
