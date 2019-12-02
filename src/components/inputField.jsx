import React, { Component } from "react";
import { connect } from "react-redux";
import { handle_user_data_update } from "../store/actions/usersDataActions";
import { handle_input } from "../store/actions/inputsActions";
import PropTypes from "prop-types";

class InputField extends Component {
  displayClassName = (errors, name) => {
    let className = "input";
    if (name === "email" || name === "password") className = "input_login";
    else if (name === "rowsToDisplay") className = "input_small";
    else className = "input_text_align_left";
    if (errors[name]) return (className += " error");
    else return className;
  };

  getOnChangeHanlder = (e, name) => {
    if (name === "Fname" || name === "Lname") {
      this.props.handle_user_data_update(e);
    } else {
      this.props.handle_inputs(e);
    }
  };

  getDisabled = (name, value) => {
    if (name === "Fname") return "";
    if (name === "Lname") return "";
    if (name === "password") return "";
    if (name === "email") return "";
    if (name === "rowsToDisplay") return "";
    if (name === "searchInput") return "";

    if (name === "beer_count" && value >= 0) return "";
    if (name === "vine_count" && value >= 0) return "";
    if (name === "drink_count" && value >= 0) return "";
    if (name === "tea_count" && value >= 0) return "";
    if (name === "non_alcohol_count" && value >= 0) return "";

    return "disabled";
  };

  getPlaceholder = name => {
    if (name === "email") return "Email";
    if (name === "password") return "Heslo";
  };

  render() {
    const { name, errors, value, type } = this.props;

    return (
      <input
        id={name}
        type={type}
        className={this.displayClassName(errors, name)}
        value={value}
        onChange={e => {
          this.getOnChangeHanlder(e, name);
        }}
        name={name}
        disabled={this.getDisabled(name, value)}
        placeholder={this.getPlaceholder(name)}
      />
    );
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  const facebook_id = ownProps.facebook_id;
  return {
    handle_user_data_update: e => {
      dispatch(handle_user_data_update(e, facebook_id));
    },
    handle_inputs: e => {
      dispatch(handle_input(e));
    }
  };
};

InputField.propTypes = {
  handle_change_user_inputs: PropTypes.func,
  handle_inputs: PropTypes.func
};

export default connect(null, mapDispatchToProps)(InputField);
