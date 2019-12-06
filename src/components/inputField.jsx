import React from "react";

const InputField = props => {
  const displayClassName = (errors, name) => {
    let className = "input";
    if (name === "email" || name === "password") className = "input_login";
    else if (name === "rowsToDisplay") className = "input_small";
    else className = "input_text_align_left";
    if (errors[name]) return (className += " error");
    else return className;
  };

  const getDisabled = (name, value) => {
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

  const getPlaceholder = name => {
    if (name === "email") return "Email";
    if (name === "password") return "Heslo";
  };

  const { name, errors, value, type, handleChange } = props;

  return (
    <input
      id={name}
      type={type}
      className={displayClassName(errors, name)}
      value={value}
      onChange={e => handleChange(e)}
      name={name}
      disabled={getDisabled(name, value)}
      placeholder={getPlaceholder(name)}
    />
  );
};

export default InputField;
