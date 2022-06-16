import React, {useContext} from "react";
import { UidContext } from "../components/AppContext.js";
import Log from "../components/log.js";

const Profil = () => {
  const uid =  useContext (UidContext);
  return (
    <div className="profil-page">
    {uid ?  (
      <h1>UPDATE PAGE</h1>
    ) : (
      <div className="log-container">
      <Log signin={true} signup={false} />
        <div className="img-container">
          <img
            src="./img/icon.png"
            className="App-logo"
            alt="logo"
          />
          
        </div>
      </div>
    )}
     
    </div>
  );
};

export default Profil;
