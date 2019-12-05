import React, { Component } from "react";
import { connect } from "react-redux";
import { handle_input } from "../store/actions/inputsActions";

const SearchBox = props => {
  const getClassName = errors => {
    if (errors.searchInput) return "searchBoxContainer error";
    else return "searchBoxContainer";
  };

  const { searchInput, errors, schemaname } = props;
  return (
    <div className={getClassName(errors)}>
      <img
        src={require("../icons/search_orange.png")}
        alt=""
        className="searchBoxIcon"
      ></img>
      <input
        type="text"
        placeholder="Vyhledej uživatele"
        className="searchBoxInput"
        id="searchBoxInput"
        value={searchInput}
        onChange={e => props.handle_change(e)}
        name="searchInput"
        schemaname={schemaname}
      ></input>
    </div>
  );
};

const mapStateToProps = state => {
  return {
    searchInput: state.inputs.searchInput,
    errors: state.inputsErrors
  };
};

const mapDispatchToProps = dispatch => {
  return {
    handle_change: e => {
      dispatch(handle_input(e));
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SearchBox);
