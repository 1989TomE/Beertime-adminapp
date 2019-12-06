import React, { useState } from "react";
import UserList from "./userList";
import NavBar from "./navBar";
import SearchBox from "./searchBox";
import { validate } from "../utils/functions";
import { toast } from "react-toastify";

const Users = () => {
  const [inputs, setSearchInput] = useState({ searchInput: "", errors: {} });

  const handleChange = e => {
    const name = e.target.name;
    const value = e.target.value;
    const errors = { ...inputs.errors };

    const error = validate(value, name);
    if (error !== null) {
      // show toast alert message if taht error is not already present
      if (!errors.hasOwnProperty(name)) toast.error(error);

      errors[name] = error;
    } else {
      delete errors[name];
    }

    setSearchInput({ ...inputs, errors, [name]: value });
  };

  return (
    <div className="main">
      <NavBar />
      <div className="users">
        <div className="users_head">
          <SearchBox
            type="text"
            handleChange={handleChange}
            inputs={inputs}
            name="searchInput"
            schemaname="searchInput"
          />
        </div>

        <UserList searchInput={inputs.searchInput} errors={inputs.errors} />
      </div>
    </div>
  );
};

export default Users;
