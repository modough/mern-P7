import React, { useState, Fragment } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateBio } from "../actions/user.actions.js";
import { dateParser } from "./Utils.js";

const UpdateProfil = () => {
  const [bio, setBio] = useState("");
  const [updateForm, setUpdateForm] = useState(false);
  const userData = useSelector((state) => state.userReducer);
  const dispatch = useDispatch();
  const handleUpdate = () => {
    dispatch(updateBio(userData._id, bio));
    setUpdateForm(false);
  };
  return (
    <div className="profil-container">
      
      
      <div className="update-container">
        <div className="left-part">
          <h3 style = {{color: "#FD2D01"}}>Application intranet
          </h3>
          <img src="./img/icon.png" alt="" />
        </div>
        <div className="right-part">
        <div className="bio-update">
          <h3>Mon profil</h3>
          {updateForm === false && (
            <Fragment>
              <p onClick={() => setUpdateForm(!updateForm)}>{userData.bio}</p>
              <button onClick={() => setUpdateForm(!updateForm)}>
                Modifier profil
              </button>
            </Fragment>
          )}
          {updateForm === true && (
            <Fragment>
              <textarea
                type="text"
                defaultValue={userData.bio}
                onChange={(e) => setBio(e.target.value)}
              ></textarea>
              <button onClick={handleUpdate}>Valider modification</button>
            </Fragment>
          )}
        </div>
        <h4>Membre depuis le:  {dateParser(userData.createdAt)}</h4>
      </div>
      </div>
      
    </div>
  );
};

export default UpdateProfil;
