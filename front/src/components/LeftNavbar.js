import React from "react";
import { NavLink } from "react-router-dom";

const LeftNavbar = () => {
  return (
    <div className="left-nav-container">
      <div className="icons">
        <div className="icons-bis">
          <NavLink to="/" exact activeClassName="active-left-nav">
            <img src="./img/icons/home.svg" alt="Home" />
          </NavLink>
          <NavLink to="/trending" exact activeClassName="active-left-nav">
            <img src="./img/icons/rocket.svg" alt="Home" />
          </NavLink>
          <NavLink to="/profil" exact activeClassName="active-left-nav">
            <img src="./img/icons/user.svg" alt="Home" />
          </NavLink>
        </div>
      </div>
    </div>
  );
};

export default LeftNavbar;