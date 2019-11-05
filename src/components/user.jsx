import React, { Component } from "react";
import StatusIconSobering from "./statusIconSobering";
import StatusIconArrival from "./statusIconArrival";
import StatusIcon from "./statusIcon";

class User extends Component {
  getUserClass = () => {
    const { clickable } = this.props;
    return clickable ? "user_field hover" : "user_field";
  };

  addDefaultSrc = e => {
    e.currentTarget.src = require("../icons/user_default.png");
  };

  renderStatusIcons = user => {
    if (user.status === "sobering") {
      return <StatusIconSobering />;
    } else if (user.status === "arrival") {
      return <StatusIconArrival statusTime={user.status_time_input} />;
    } else {
      return this.renderDrinkTypeIcons(user);
    }
  };

  renderDrinkTypeIcons = user => {
    const drinkTypes = ["beer", "vine", "drink", "tea", "non_alcohol"];
    const reducedArray = [];

    // check which icons are active
    for (const drinkType of drinkTypes) {
      const drinkTypeCount = `${drinkType}_count`;
      const count = user[drinkTypeCount];

      if (count > -1) {
        const temp = {
          drinkType: drinkType,
          count: count
        };

        reducedArray.push(temp);
      }
    }

    return reducedArray.map(item => (
      <StatusIcon
        key={item.drinkType}
        drinkType={item.drinkType}
        count={item.count}
      />
    ));
  };

  getFullUserName = user => {
    return `${user.Fname} ${user.Lname}`;
  };

  getStatusPlaceName = user => {
    if (user.status !== "sobering") return user.status_place_name;
  };

  render() {
    const { user } = this.props;

    return (
      <div className={this.getUserClass()}>
        <div className="user_field_left">
          <div className="user_field_picture_holder">
            <img // src={user.image_url}
              src={require("../icons/user_default.png")}
              onError={this.addDefaultSrc}
              alt=""
              className="user_field_picture"
            ></img>
          </div>
          <div className="user_field_name_and_status">
            <div className="user_field_name">{this.getFullUserName(user)}</div>
            <div className="user_field_status">
              {this.getStatusPlaceName(user)}
            </div>
          </div>
        </div>
        <div className="user_field_right">
          <div className="user_field_status_icons">
            {this.renderStatusIcons(user)}
          </div>
        </div>
      </div>
    );
  }
}

export default User;
