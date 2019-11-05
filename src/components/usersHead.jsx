import React, { Component } from "react";
import SearchBox from "./searchBox";

class UsersHead extends Component {
  render() {
    const { searchInput, handleChangeForInput, errors } = this.props;
    return (
      <div className="users_head">
        <SearchBox
          searchInput={searchInput}
          handleChangeForInput={handleChangeForInput}
          errors={errors}
          type="text"
        />
      </div>
    );
  }
}

export default UsersHead;
