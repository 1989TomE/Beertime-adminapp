import React from "react";
import NavBar from "./navBar";
import User from "./user";
import Info from "./info";
import Button from "./button";
import { connect } from "react-redux";
import { save_changes } from "../store/actions/usersDataActions";

const UserDetail = props => {
  const { match, usersData, usersDataBackup, errors } = props;

  if (usersDataBackup.length !== 0) {
    const userFixed = usersDataBackup.find(
      user => user.facebook_id === match.params.id
    );
    const user = usersData.find(user => user.facebook_id === match.params.id);

    const getDisabled = () => {
      const { errors } = props;
      return Object.keys(errors).length > 0 ? true : false;
    };

    return (
      <div className="main">
        <NavBar />
        <div className="user_detail">
          <User user={userFixed} clickable={false} />
          <Info user={user} errors={errors} />
          <div className="user_detail_bottom">
            <Button
              label="Uložit změny"
              name="save_changes_button"
              handleClick={() => props.save_changes(user)}
              errors={errors}
              disabled={getDisabled()}
            />
          </div>
        </div>
      </div>
    );
  }
  return null;
};

const mapStateToProps = state => {
  return {
    usersData: state.usersDataHolder.usersData,
    usersDataBackup: state.usersDataHolder.usersDataBackup,
    errors: state.usersDataInputErrors
  };
};

const mapDispatchToProps = dispatch => {
  return {
    save_changes: user => {
      dispatch(save_changes(user));
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(UserDetail);
