import React from "react";

const Button = props => {
  const {
    label,
    handleClick,
    className = "button",
    name = "button",
    ...rest
  } = props;
  return (
    <button
      type="button"
      className={className}
      onClick={handleClick}
      name={name}
      {...rest}
    >
      {label}
    </button>
  );
};

export default Button;
