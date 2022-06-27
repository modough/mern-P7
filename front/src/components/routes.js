import React from "react";
import home from "../pages/Home";
import profil from "../pages/Profil";

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import Navbar from "./Navbar";

const routes = () => {
  return (
    <Router>
      <Navbar />
      <Switch>
        <Route path="/" exact component={home} />
        <Route path="/profil" exact component={profil} />
        <Redirect to="/" />
      </Switch>
    </Router>
  );
};

export default routes;
