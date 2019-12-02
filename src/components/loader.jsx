import React, { Component } from "react";

class Loader extends Component {
  render() {
    const { className } = this.props;
    return <div id="loader_wrapper" className={className}></div>;
  }
}

export default Loader;
