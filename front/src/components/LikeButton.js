import React, { useContext, useEffect, useState } from "react";
import { UidContext } from "./AppContext";
import Popup from "reactjs-popup";
import "reactjs-popup/dist/index.css";
import { useDispatch } from "react-redux";
import { likePost, unlikePost } from "../actions/post.actions";

const LikeButton = ({ post }) => {
  const [liked, setLiked] = useState(false);
  // on recupere uid
  const uid = useContext(UidContext);
  const dispatch = useDispatch();

  const like = () => {
    dispatch(likePost(post._id, uid));
    setLiked(true);
  };

  const unlike = () => {
    dispatch(unlikePost(post._id, uid));
    setLiked(false);
  };
  // effet du coeur like 
  useEffect(() => {
      if (post.likers.includes(uid)) setLiked(true)
      else setLiked(false);
    }, // relance la fonction useEffect dés qu'on a un de ces 3
    [post.likers, uid, liked]
  );
  return (
    <div className="like-container">
      {uid && liked === false && (
        <img src="./img/icons/heart.svg" onClick={like} alt="like" />
      )}
      {uid && liked === true && (
        <img src="./img/icons/heart-filled.svg" onClick={unlike} alt="like" />
      )}
      <span>{post.likers.length}</span>
    </div>
  );
};

export default LikeButton;
