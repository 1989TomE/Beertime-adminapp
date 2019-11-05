import React, { Component } from "react";
import UserList from "./userList";
import NavBar from "./navBar";
import UsersHead from "./usersHead";

class Users extends Component {
  render() {
    const {
      searchInput,
      handleChangeForInput,
      errors,
      usersData,
      handleClickOnUser
    } = this.props;

    return (
      <div className="main">
        <NavBar />
        <div className="users">
          <UsersHead
            searchInput={searchInput}
            handleChangeForInput={handleChangeForInput}
            errors={errors}
          />
          <UserList
            usersData={usersData}
            errors={errors}
            searchInput={searchInput}
            handleClickOnUser={handleClickOnUser}
          />
        </div>
      </div>
    );
  }
}

export default Users;
