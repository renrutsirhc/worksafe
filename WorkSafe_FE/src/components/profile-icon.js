import React from "react";
import { NavLink } from "react-router-dom";

import { useAuth0 } from "@auth0/auth0-react";
import { Avatar } from "antd";
import { UserOutlined } from "@ant-design/icons";
import Image from "react-bootstrap/Image";

const ProfileIcon = () => {
  const { user, isAuthenticated } = useAuth0();

  console.log(user);

  return isAuthenticated ? (
    <NavLink to="/profile" exact activeClassName="router-link-exact-active">
      <div className="avatar-icon">
        <Avatar
          src={
            <Image
              className="rounded-circle"
              style={{ width: 30 }}
              src={user["picture"]}
            ></Image>
          }
          size={40}
        />
      </div>
    </NavLink>
  ) : (
    <div className="avatar-icon">
      <Avatar size={40} icon={<UserOutlined />} />
    </div>
  );
};

export default ProfileIcon;
