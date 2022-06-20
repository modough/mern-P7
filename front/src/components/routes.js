import React from "react";
import home from "../pages/home";
import profil from "../pages/profil";
import Trending from "../pages/Trending";
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
        <Route path="/trending" exact component={Trending} />
        <Redirect to="/" />
      </Switch>
    </Router>
  );
};

export default routes;
