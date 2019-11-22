import React, { Component } from "react";
import InputField from "./inputField";

class infoLine extends Component {
  filterUserProperties = () => {
    const { property } = this.props;
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

  render() {
    const {
      property,
      value,
      facebook_id,
      errors,
      handleChangeForUserInputFields
    } = this.props;

    if (this.filterUserProperties()) {
      return (
        <div className="info_line_field">
          <div className="info_line_field_property">{property}:</div>
          <InputField
            name={property}
            value={value}
            handleChangeEvent={e =>
              handleChangeForUserInputFields(e, facebook_id)
            }
            errors={errors}
            facebook_id={facebook_id}
            type="text"
          />
        </div>
      );
    } else {
      return null;
    }
  }
}

export default infoLine;
