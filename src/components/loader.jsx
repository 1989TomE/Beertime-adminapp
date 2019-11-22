import React, { Component } from "react";

class Loader extends Component {
  render() {
    return (
      <div id="loader_wrapper" className="loader_wrapper">
        <div id="loader" className="loader">
          <div className="bounce_container">
            <div className="bounce bounce1"></div>
          </div>
          <div className="bounce_container">
            <div className="bounce bounce2"></div>
          </div>
          <div className="bounce_container">
            <div className="bounce bounce3"></div>
          </div>
          <div className="bounce_container">
            <div className="bounce bounce4"></div>
          </div>
          <div className="bounce_container">
            <div className="bounce bounce5"></div>
          </div>
        </div>
      </div>
    );
  }
}

export default Loader;
