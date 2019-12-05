import React from "react";
import UserList from "./userList";
import NavBar from "./navBar";
import UsersHead from "./usersHead";

const Users = () => {
  return (
    <div className="main">
      <NavBar />
      <div className="users">
        <UsersHead />
        <UserList />
      </div>
    </div>
  );
};

export default Users;
