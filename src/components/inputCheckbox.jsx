import React from "react";

const Checkbox = ({
  name,
  label,
  checkmark,
  className,
  checkboxes,
  handleCheckbox
}) => {
  return (
    <label className={className}>
      {label}
      <input
        type="checkbox"
        checked={checkboxes[name]}
        onChange={e => handleCheckbox(e)}
        name={name}
      />
      <span className={checkmark}></span>
    </label>
  );
};

export default Checkbox;
