import React, { useEffect, useState, Fragment } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { addPost, getPosts } from "../actions/post.actions";
import {timestampParser} from "./Utils"


const NewPostForm = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [message, setMessage] = useState("");
  const [postPicture, setPostPicture] = useState(null);
  const [file, setFile] = useState();
  const userData = useSelector((state) => state.userReducer);
  const dispatch = useDispatch();

  const handlePicture = (e) => {
    //on affiche l'image en front
    setPostPicture(URL.createObjectURL(e.target.files[0]));
    // puis l'enregistrer dans la bd
    setFile(e.target.files[0]);
  };
  const handlePost = async () => {
    if (message || postPicture){
      const data = new FormData();
      data.append('userId', userData._id);
      data.append('message', message);
      data.append('picture', postPicture);
      if (file) data.append('file', file);
      //on envoie le post a la bd car c'est la bd qui cree l'id
      await dispatch(addPost(data));
      // puis nous recuperons la liste des posts
      dispatch(getPosts());

      cancelPost(); 
    }else{
      alert('Veuillez entrer un message');
    }
  };
  const cancelPost = () => {
    setMessage("");
    setPostPicture("");
  };

  useEffect(() => {
    if (userData !== [0]) setIsLoading(false);
  }, [userData]);

  return (
    <Fragment>
      
      <div className="post-container">
        {isLoading ? (
          <i className="fas fa-spinner fa-pulse"></i>
        ) : (
          <Fragment>
            <div className="data"></div>
            <NavLink exact to="/profil">
              <div className="user-info"></div>
            </NavLink>
            <div className="post-form">
              <textarea
                name="message"
                id="message"
                placeholder="Quoi de neuf ?"
                onChange={(e) => setMessage(e.target.value)}
                value={message}
              />
              {message || postPicture ? (
                <li className="card-container">
                  <div className="card-left"></div>
                  <div className="card-right">
                    <div className="card-header">
                      <div className="pseudo">
      
                      </div>
                      <span>{timestampParser(Date.now())}</span>
                    </div>
                    <div className="content">
                      <p>{message}</p>
                      <img src={postPicture} alt="" />
                    </div>
                  </div>
                </li>
              ) : null}
              <div className="footer-form">
                <div className="icon">
                  <img src="./img/icons/picture.svg" alt="img" />
                  <input
                    type="file"
                    id="file-upload"
                    name="file"
                    accept=".jpg, .jpeg, .png"
                    onChange={(e) => handlePicture(e)}
                  />
                </div>
                <div className="btn-send">
                  {message || postPicture ? (
                    <button className="cancel" onClick={cancelPost}>
                      Annuler
                    </button>
                  ) : null}
                  <button className="send" onClick={handlePost}>
                    Envoyer
                  </button>
                </div>
              </div>
            </div>
          </Fragment>
        )}
      </div>
    </Fragment>
  );
};

export default NewPostForm;
