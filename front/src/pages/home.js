import React from "react";
import LeftNavbar from "../components/LeftNavbar";
import Thread from "../components/Thread";

const home = () => {
  return (
    <div className="home">
      <LeftNavbar />
      <div className="main">
        <Thread />
      </div>
    </div>
  );
};

export default home;
