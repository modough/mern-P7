import React, { useContext } from "react";
import { NavLink } from "react-router-dom";
import { UidContext } from "./AppContext";
import Logout from "./Logout";

const Navbar = () => {
  const uid = useContext(UidContext);
  return (
    <nav>
      <div className="nav-container">
        <div className="logo">
          <NavLink exact to="/">
            <div className="logo">
              <img src="./img/icon-left-font-monochrome-black.png" alt="icon" />
            </div>
          </NavLink>
        </div>
        {uid ? (
          <ul>
            <li></li>
            <li className="welcome">
              <NavLink exact to="/">
                Bienvenue 'valeur dynamique'
              </NavLink>
            </li>
            <Logout />
          </ul>
        ) : (
          <ul>
            <li></li>
            <li>
              <NavLink exact to="/profil">
                <div>
                  <img src="./img/icons/login.svg" alt="login" />
                </div>
              </NavLink>
            </li>
          </ul>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
