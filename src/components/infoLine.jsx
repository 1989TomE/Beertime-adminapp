import React from "react";
import InputField from "./inputField";
import { connect } from "react-redux";
import { handle_user_data_update } from "../store/actions/usersDataActions";

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
          type="text"
          handleChange={props.handle_user_data_update}
        />
      </div>
    );
  } else {
    return null;
  }
};

const mapDispatchToProps = (dispatch, ownProps) => {
  const facebook_id = ownProps.facebook_id;
  return {
    handle_user_data_update: e => {
      dispatch(handle_user_data_update(e, facebook_id));
    }
  };
};

export default connect(null, mapDispatchToProps)(infoLine);
