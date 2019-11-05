import React, { Component } from "react";
import { Link } from "react-router-dom";
import User from "./user";
import { searchForName } from "../utils/functions";

class UserTable extends Component {
  filterUsers = () => {
    // by ID or name
    const { usersData, searchInput } = this.props;

    const filteredUsers = usersData.filter(user => {
      return searchForName(user, searchInput);
    });
    return filteredUsers.sort(a => (a.status === "sobering" ? 1 : -1));
  };

  // no refresh when invalid search input
  shouldComponentUpdate(nextProps) {
    return nextProps.errors.searchInput == undefined ? true : false;
  }

  render() {
    // get users with active status to top
    const usersDataFiltered = this.filterUsers();

    return (
      <div className="users_body">
        {Object.keys(usersDataFiltered).length === 0 && (
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

export default UserTable;
