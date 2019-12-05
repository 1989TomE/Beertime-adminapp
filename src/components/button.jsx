import React from "react";
import { connect } from "react-redux";
import { save_changes } from "../store/actions/usersDataActions";
import { handle_login } from "../utils/auth";

const Button = props => {
  const getDisabled = () => {
    const { errors } = props;
    return Object.keys(errors).length > 0 ? true : false;
  };

  const getOnCLickMethod = e => {
    const name = e.target.name;
    if (name === "save_changes_button") props.handleSaveChanges();
    if (name === "login_button") props.handle_login();
    if (name === "webDataToggle") props.handleEvent();
  };

  const { label, className = "button", name = "button" } = props;
  return (
    <button
      type="button"
      className={className}
      onClick={e => {
        getOnCLickMethod(e);
      }}
      name={name}
      disabled={getDisabled()}
    >
      {label}
    </button>
  );
};

const mapStateToProps = state => {
  return {
    errors: state.usersDataInputErrors,
    inputs: state.inputs
  };
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    handleSaveChanges: () => dispatch(save_changes(ownProps.user)),
    handle_login: () => {
      dispatch(handle_login);
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Button);
