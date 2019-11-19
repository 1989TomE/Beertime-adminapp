import React, { Component } from "react";

class InputField extends Component {
  getRowsToDisplayClassName = (errors, name) => {
    let className = "input";
    if (name === "email" || name === "password") className = "input_login";
    else if (name === "rowsToDisplay") className = "input_small";
    else className = "input_text_align_left";
    if (errors[name]) return (className += " error");
    else return className;
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
    const {
      name,
      errors,
      value,
      handleChangeEvent,
      type,
      ...rest
    } = this.props;

    return (
      <input
        id={name}
        type={type}
        className={this.getRowsToDisplayClassName(errors, name)}
        value={value}
        onChange={handleChangeEvent}
        name={name}
        disabled={this.getDisabled(name, value)}
        placeholder={this.getPlaceholder(name)}
        {...rest}
      />
    );
  }
}

export default InputField;
