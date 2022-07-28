import React, { useEffect, useState, Fragment } from "react";
import { useDispatch, useSelector } from "react-redux";
import { dateParser } from "./Utils";
import LikeButton from "./LikeButton";
import { getPosts, updatePost } from "../actions/post.actions";
import DeleteCard from "./DeleteCard.js";

const Card = ({ post }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [isUpdated, setIsUpdated] = useState(false);
  const [textUpdate, setTextUpdate] = useState(post.message);
  const [postPicture, setPostPicture] = useState(post.picture);

  const [file, setFile] = useState("file");
  const userData = useSelector((state) => state.userReducer);
  const dispatch = useDispatch();

  const onPostChange = async () => {
    
    if (post._id || textUpdate || postPicture ) {
      new FormData().append("file", file)
      await dispatch(updatePost(post._id, textUpdate, postPicture, file));
      dispatch(getPosts());
    } 
    setIsUpdated(false);
  };

  const updateImage = (e) => {
    setPostPicture(window.URL.createObjectURL(e.target.files[0]));
    
    setFile(e.target.files[0]);
  };

  useEffect(() => {
    userData !== [0] && setIsLoading(false);
  }, [userData]);

  return (
    <li className="card-container" key={post._id}>
      {isLoading ? (
        <i className="fas fa-spinner fa-spin"></i>
      ) : (
        <Fragment>
          <div className="card-right">
            <div className="card-header">
              <span>{dateParser(post.createdAt)}</span>
            </div>

            {!isUpdated && post.message && post.picture && (
              <div className="update-post">
                <p>{post.message}</p>
                <img src={post.picture} alt="card-pic" className="card-pic" />
              </div>
            )}

            {isUpdated && (
              <div className="update-post">
                <textarea
                  defaultValue={post.message}
                  onChange={(e) => setTextUpdate(e.target.value)}
                />
                <img
                  src={postPicture || post.picture}
                  alt="card-pic"
                  className="card-pic"
                />

                <div className="button-container">
                  <button className="btn">Changer Image</button>
                  <input
                    type="file"
                    id="file-upload"
                    name="file"
                    accept=".jpg, .jpeg, .png"
                    onChange={(e) => updateImage(e)}
                  />
                  <button className="btn" onClick={onPostChange}>
                    Valider !
                  </button>
                </div>
              </div>
            )}

            {(userData._id === post.userId || userData.isAdmin === true) && (
              <div className="button-container">
                <div onClick={() => setIsUpdated(true)}>
                  <img src="./img/icons/edit.svg" alt="edit" />
                </div>
                <DeleteCard id={post._id} />
              </div>
            )}

            <div className="card-footer">
              <LikeButton post={post} />
            </div>
          </div>
        </Fragment>
      )}
    </li>
  );
};

export default Card;
