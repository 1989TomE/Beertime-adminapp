import React, { Component } from "react";
import SearchBox from "./searchBox";

class UsersHead extends Component {
  render() {
    return (
      <div className="users_head">
        <SearchBox type="text" />
      </div>
    );
  }
}

export default UsersHead;
