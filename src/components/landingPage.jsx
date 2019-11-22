import React, { Component } from "react";
import Beertime from "./beertime";
import BeertimeAndroid from "./beertimeAndroid";
import Loader from "./loader";

class LandingPage extends Component {
  render() {
    return (
      <div className="container">
        <Beertime />
        <Loader />
        <BeertimeAndroid />
      </div>
    );
  }
}

export default LandingPage;
