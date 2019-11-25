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
      handleChangeForUserInputFields,
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
              handleChangeForUserInputFields={handleChangeForUserInputFields}
            />
            <div className="user_detail_bottom">
              <Button
                user={user}
                label="Uložit změny"
                name="save_changes_button"
              />
            </div>
          </div>
        </div>
      );
    }
    return null;
  }
}


export default (UserDetail);
