import React, { Component } from "react";
import { connect } from "react-redux";
import { save_changes } from "../store/actions/usersDataActions";
import { handle_login } from "../utils/auth";

class Button extends Component {
  getDisabled = () => {
    const { errors } = this.props;
    return Object.keys(errors).length > 0 ? true : false;
  };

  getOnCLickMethod = e => {
    const name = e.target.name;
    if (name === "save_changes_button") this.props.handleSaveChanges();
    if (name === "login_button") this.props.handle_login();
    if (name === "webDataToggle") this.props.handleEvent();
  };

  render() {
    const { label, className = "button", name = "button" } = this.props;
    return (
      <button
        type="button"
        className={className}
        onClick={e => {
          this.getOnCLickMethod(e);
        }}
        name={name}
        disabled={this.getDisabled()}
      >
        {label}
      </button>
    );
  }
}

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
