import React, { Component } from "react";
import InputField from "./inputField";

const infoLine = props => {
  const filterUserProperties = () => {
    const renderTheseKeys = [
      "facebook_id",
      "Fname",
      "Lname",
      "app_version",
      "status",
      "loged_in",
      "number_of_friends"
    ];
    return renderTheseKeys.indexOf(property) >= 0;
  };

  const { property, value, facebook_id, errors } = props;

  if (filterUserProperties()) {
    return (
      <div className="info_line_field">
        <div className="info_line_field_property">{property}:</div>
        <InputField
          name={property}
          value={value}
          errors={errors}
          facebook_id={facebook_id}
          type="text"
        />
      </div>
    );
  } else {
    return null;
  }
};

export default infoLine;
