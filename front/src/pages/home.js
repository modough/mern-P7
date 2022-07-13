import React, { useContext, Fragment } from "react";
import { UidContext } from "../components/AppContext";
import NewPostForm from "../components/NewPostForm";
import Thread from "../components/Thread";
import Log from "../components/log";

const Home = () => {
  const uid = useContext(UidContext);
  return (
    <div className="home">
      <div className="main">
        <div className="home-header">
          {uid ? (
            <Fragment>
              <NewPostForm /> <Thread />
              
            </Fragment>
          ) : (
            <Log signin={true} signup={false} />
          )}
        </div>
      </div>
    </div>
  );
};

export default Home;
