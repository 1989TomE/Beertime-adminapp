import React, { Component } from "react";
import { Link } from "react-router-dom";
import User from "./user";
import { searchForName } from "../utils/functions";
import { connect } from "react-redux";

class UserTable extends Component {
  filterUsers = () => {
    // by name
    const { usersData, searchInput } = this.props;

    const filteredUsers = usersData.filter(user => {
      return searchForName(user, searchInput);
    });
    return filteredUsers.sort(a => (a.status === "sobering" ? 1 : -1));
  };

  // no refresh when invalid search input
  shouldComponentUpdate(nextProps) {
    return !nextProps.errors.hasOwnProperty("searchInput");
  }

  render() {
    // get users with active status to top
    const usersDataFiltered = this.filterUsers();
    const { loader } = this.props;

    return (
      <div className="users_body">
        {Object.keys(usersDataFiltered).length === 0 && loader === false && (
          <div className="noUsers">
            Vyhledávání neodpovídají žádní uživatelé
          </div>
        )}
        <ul>
          {usersDataFiltered.map(user => (
            <li key={user.facebook_id}>
              <Link to={`/userdetail/${user.facebook_id}`}>
                <User user={user} clickable={true} />
              </Link>
            </li>
          ))}
        </ul>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    usersData: state.usersDataHolder.usersData,
    loader: state.loader
  };
};

export default connect(mapStateToProps, null)(UserTable);
