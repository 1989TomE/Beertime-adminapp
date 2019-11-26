import React from "react";
import { toggle_checkboxes } from "../store/actions/checkboxActions";
import { connect } from "react-redux";

const Checkbox = ({
  checked,
  toggle_checkboxes,
  name,
  label,
  checkmark,
  className,
  checkboxes
}) => {
  return (
    <label className={className}>
      {label}
      <input
        type="checkbox"
        checked={checkboxes[name]}
        onChange={() => toggle_checkboxes(name)}
        name={name}
        value={checked}
      />
      <span className={checkmark}></span>
    </label>
  );
};

const mapStateToProps = state => {
  return {
    checkboxes: state.checkboxes
  };
};

const mapDispatchToProps = dispatch => {
  return {
    toggle_checkboxes: name => {
      dispatch(toggle_checkboxes(name));
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Checkbox);
