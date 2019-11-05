import React, { Component } from "react";
import { NavLink } from "react-router-dom";
import { Auth } from "../utils/auth";

class NavBar extends Component {
  handleClick = e => {
    e.preventDefault();
    localStorage.clear();
    window.location.href = "/login";
  };

  render() {
    return (
      <div className="navbar">
        <div className="icon_image_holder">
          <img
            src={require("../icons/text_logo.png")}
            alt=""
            className="navbar_logo_image"
          />
        </div>
        <div className="navbar_links_a">
          <NavLink to="/webdata" className="navbar_link_a">
            Data
          </NavLink>
          <NavLink to="/users" className="navbar_link_a">
            Uživatelé
          </NavLink>
        </div>
        <div className="navbar_links_empty"></div>
        <div className="navbar_links_b">
          {" "}
          <a href="/login" className="navbar_link" onClick={this.handleClick}>
            <img
              src={require("../icons/BT-35.png")}
              alt=""
              className="logout_icon"
            />
          </a>
        </div>
      </div>
    );
  }
}

export default NavBar;
