import React, { Component } from "react";

const Loader = props => {
  const { className } = props;
  return <div id="loader_wrapper" className={className}></div>;
};

export default Loader;
