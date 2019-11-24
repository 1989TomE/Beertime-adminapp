import React, { Component } from "react";
import {connect} from "react-redux";
import { update_user_data } from "../store/actions/usersDataActions";

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
      this.props.handleChangeForUserInputFields(e);
    } else {
      this.props.handleChangeEvent(e);
    }
  }

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
    const { name, errors, value, handleChangeEvent, handleChangeForUserInputFields, type , ...rest} = this.props;

    return (
      <input
        id={name}
        type={type}
        className={this.displayClassName(errors, name)}
        value={value}
        onChange={(e) => {this.getOnChangeHanlder(e, name)}}
        name={name}
        disabled={this.getDisabled(name, value)}
        placeholder={this.getPlaceholder(name)}
        {...rest}
      />
    );
  }
}

// const mapStateToProps = (state) => {
//   return {
//     usersData: state.usersData
//   }
// }

const mapDispatchToProps = (dispatch) => {
  return {
    handleChangeForUserInputFields: e => {dispatch(update_user_data(e))}
  }
}

export default connect (null, mapDispatchToProps) (InputField);
