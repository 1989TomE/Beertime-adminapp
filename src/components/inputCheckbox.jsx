import React from "react";

const Checkbox = ({
  checked,
  handleChangeForCheckbox,
  name,
  label,
  checkmark,
  className
}) => {
  return (
    <label className={className}>
      {label}
      <input
        type="checkbox"
        checked={checked}
        onChange={handleChangeForCheckbox}
        name={name}
        value={checked}
      />
      <span className={checkmark}></span>
    </label>
  );
};

export default Checkbox;
