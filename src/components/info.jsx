import React, { Component } from "react";
import InfoLine from "./infoLine";

const Info = props => {
  const { user, errors } = props;
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
            />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Info;
