import React, { Component } from "react";

class Button extends Component {
  render() {
    const { handleEvent, label, className = "button" } = this.props;
    return (
      <button className={className} onClick={handleEvent}>
        {label}
      </button>
    );
  }
}

export default Button;
