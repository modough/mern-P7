import React, { useContext } from "react";
import { UidContext } from "../components/AppContext.js";
import Log from "../components/log.js";
import UpdateProfil from "../components/UpdateProfil.js";

const Profil = () => {
  const uid = useContext(UidContext);
  return (
    <div className="profil-page">
      {uid ? (
        <UpdateProfil />
      ) : (
        <div className="login">
          <div className="title-container">
            <img src="./img/icon.png" alt="" />
          </div>
          <div className="log-container">
            <Log signin={true} signup={false} />
          </div>
        </div>
      )}
    </div>
  );
};

export default Profil;
