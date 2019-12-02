import React from "react";
import { connect } from "react-redux";
import Loader from "./loader";

const Beertime = props => {
  const loader = props.loader;
  const renderLogoOrLoader = loader ? (
    <Loader className="loader_wrapper_white" />
  ) : (
    <img
      src={require("../icons/text_logo2.png")}
      alt=""
      className="beertime_logo"
    />
  );

  return (
    <div className="beertime">
      <div className="beertime_text_grey">Nepromarni příležitost</div>
      <div className="beertime_text_white">potkat se s kamrády a přáteli!</div>
      <div className="logo_wrapper">{renderLogoOrLoader}</div>
    </div>
  );
};

const mapStateToProps = state => {
  return {
    loader: state.loader
  };
};

export default connect(mapStateToProps, null)(Beertime);
