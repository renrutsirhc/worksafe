import React from "react";
import { useAuth0 } from "@auth0/auth0-react";

const ProfileIcon = () => {
  const { user, isAuthenticated } = useAuth0();
  // const { name, picture, email } = user;
  // return isAuthenticated ? (
  //   <div
  //     class="rounded-circle border d-flex justify-content-center align-items-center"
  //     style="width:100px;height:100px"
  //     alt="Avatar"
  //   >
  //     <img src={picture}></img>
  //   </div>
  // ) : (
  //   <div
  //     class="rounded-circle border d-flex justify-content-center align-items-center"
  //     style="width:100px;height:100px"
  //     alt="Avatar"
  //   >
  //     <i class="fas fa-user-alt fa-3x text-info"></i>
  //   </div>
  // );
  return <div>haha</div>;
  //   <div className="rounded-circle border d-flex justify-content-center align-items-center">
  //     <svg
  //       xmlns="http://www.w3.org/2000/svg"
  //       width="16"
  //       height="16"
  //       fill="currentColor"
  //       class="bi bi-person-circle"
  //       viewBox="0 0 16 16"
  //     >
  //       <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0z" />
  //       <path
  //         fill-rule="evenodd"
  //         d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8zm8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1z"
  //       />
  //     </svg>
  //   </div>
  // );
};

export default ProfileIcon;
