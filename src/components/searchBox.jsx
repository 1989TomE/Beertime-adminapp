import React from "react";

const SearchBox = props => {
  const getClassName = () => {
    const { inputs, name, errors } = props;
    if (inputs.errors[name]) return "searchBoxContainer error";
    else return "searchBoxContainer";
  };

  const { inputs, schemaname, handleChange } = props;

  return (
    <div className={getClassName()}>
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
        value={inputs.searchInput.value}
        onChange={e => handleChange(e)}
        name="searchInput"
        schemaname={schemaname}
      ></input>
    </div>
  );
};

export default SearchBox;
