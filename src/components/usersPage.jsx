import React, { Component } from "react";
import UserList from "./userList";
import NavBar from "./navBar";
import UsersHead from "./usersHead";

class Users extends Component {
  render() {
    return (
      <div className="main">
        <NavBar />
        <div className="users">
          <UsersHead />
          <UserList />
        </div>
      </div>
    );
  }
}

export default Users;
