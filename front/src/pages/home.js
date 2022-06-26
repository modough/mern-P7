import React, { useContext } from "react";
import { UidContext } from "../components/AppContext";
import LeftNavbar from "../components/LeftNavbar";
import NewPostForm from "../components/NewPostForm";
import Thread from "../components/Thread";
import Log from "../components/log";

const Home = () => {
  const uid = useContext(UidContext);
  return (
    <div className="home">
      <LeftNavbar />
      <div className="main">
        <div className="home-header">{uid ? <NewPostForm /> : <Log signin={true} signup={false} />}</div>
        <Thread />
      </div>
    </div>
  );
};

export default Home;
