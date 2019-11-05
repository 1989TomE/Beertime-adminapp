import React, { Component } from "react";

class SearchBox extends Component {
  getClassName = errors => {
    if (errors.searchInput) return "searchBoxContainer error";
    else return "searchBoxContainer";
  };

  render() {
    const {
      searchInput,
      handleChangeForInput,
      errors,
      schemaname
    } = this.props;
    return (
      <div className={this.getClassName(errors)}>
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
          onChange={handleChangeForInput}
          name="searchInput"
          schemaname={schemaname}
        ></input>
      </div>
    );
  }
}

export default SearchBox;
