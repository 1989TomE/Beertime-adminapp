import React, { Component } from "react";
import InfoLine from "./infoLine";

class Info extends Component {
  render() {
    const { user, errors, handleChangeForInput } = this.props;
    return (
      <div className="user_info_field">
        <ul>
          {Object.keys(user).map(key => (
            <li key={key}>
              <InfoLine
                property={key}
                value={user[key]}
                facebook_id={user.facebook_id}
                errors={errors}
                handleChangeForInput={handleChangeForInput}
              />
            </li>
          ))}
        </ul>
      </div>
    );
  }
}

export default Info;
