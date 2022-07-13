import React, { useContext } from "react";
import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { UidContext } from "./AppContext";
import Logout from "./Logout";

const Navbar = () => {
  const uid = useContext(UidContext);
  const userData = useSelector((state) => state.userReducer);

  return (
    <div>
      {uid ? (
        <nav>
          <div className="nav-container">
            <div className="logo">
              <NavLink exact to="/">
                <div className="logo">
                  <img src="./img/icon-left-font.png" alt="icon" />
                </div>
              </NavLink>
            </div>
            <ul>
              <li className="pages">
                <NavLink exact to="/home">
                  <p>Accueil </p>
                </NavLink>
                <NavLink exact to="/profil">
                  <p>Profil</p>
                </NavLink>
              </li>
              <li className="welcome">
                <NavLink exact to="/">
                  <h5>Bienvenue {userData.pseudo}</h5>
                </NavLink>
              </li>
              <Logout />
            </ul>
          </div>
        </nav>
      ) : (
        <ul>
          <li></li>
          <li></li>
        </ul>
      )}
    </div>
  );
};

export default Navbar;
