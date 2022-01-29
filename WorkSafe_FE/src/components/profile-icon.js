import React from "react";

import { useAuth0 } from "@auth0/auth0-react";
import { Avatar } from "antd";
import { UserOutlined } from "@ant-design/icons";

// const ProfileIcon = () => {
//   const { isAuthenticated } = useAuth0();

//   return isAuthenticated ? (
//     <div className="rounded-circle border d-flex justify-content-center align-items-center">
//       <img
//         src={picture}
//         alt="Profile"
//         className="rounded-circle img-fluid profile-picture mb-3 mb-md-0"
//       />
//     </div>
//   ) : (
//     <div className="rounded-circle border d-flex justify-content-center align-items-center">
//       Not logged in
//     </div>
//   );
// };

// export default ProfileIcon;

const ProfileIcon = () => {
  const { user, isAuthenticated } = useAuth0();
  {
    if (isAuthenticated) {
      const { picture } = user;
    }
  }

  console.log(user);

  return isAuthenticated ? (
    <div>
      <Avatar
        src={user["picture"]}
        size={50}
        icon={<UserOutlined />}
        gap={4}
        style={{ verticalAlign: "middle" }}
      />
    </div>
  ) : (
    <div>
      <Avatar
        size={50}
        icon={<UserOutlined />}
        gap={4}
        style={{ verticalAlign: "middle" }}
      />
    </div>
  );
};

export default ProfileIcon;
