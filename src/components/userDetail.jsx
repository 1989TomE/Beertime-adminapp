import React, { Component } from "react";
import NavBar from "./navBar";
import User from "./user";
import Info from "./info";
import Button from "./button";

class UserDetail extends Component {
  render() {
    // prevent render on page refresh when usersData are empty and ajax is on the way

    const {
      match,
      usersData,
      usersDataBackup,
      errors,
      handleChangeForInput,
      handleSaveChanges
    } = this.props;

    if (usersDataBackup.length !== 0) {
      const userFixed = usersDataBackup.find(
        user => user.facebook_id === match.params.id
      );
      const user = usersData.find(user => user.facebook_id === match.params.id);

      return (
        <div className="main">
          <NavBar />
          <div className="user_detail">
            <User user={userFixed} clickable={false} />
            <Info
              user={user}
              errors={errors}
              handleChangeForInput={handleChangeForInput}
            />
            <div className="user_detail_bottom">
              <Button
                handleEvent={() => handleSaveChanges(user.facebook_id)}
                label="Uložit změny"
              />
            </div>
          </div>
        </div>
      );
    }
    return null;
  }
}

export default UserDetail;
