import React, { useContext, useEffect, useState } from "react";
import { UidContext } from "./AppContext";
import Popup from "reactjs-popup";
import "reactjs-popup/dist/index.css";
import {useDispatch} from "react-redux";
import { likePost } from "../actions/post.actions";

const LikeButton = ({ post }) => {
  const [liked, setLiked] = useState(false);
  // on recupere uid
  const uid = useContext(UidContext);
  const dispatch = useDispatch();

  const like = () => {
    dispatch(likePost(post._id, uid))
    setLiked(true)
  };

  const unlike = () => {


  };

  useEffect(
    () => {
      if (post.likers.includes(uid)) setLiked(true);
    }, // relance la fonction useEffect dés qu'on a un de ces 3
    [post.likers, uid, liked]
  );
  return (
    <div className="like-container">
      {uid === null && (
        <Popup
          trigger={<img src="./img/icons/heart.svg" alt="like" />}
          position={("bottom center", "bottom right", "bottom left")}
          closeOnDocumentClick
        >
          <div>Connectez-vous pour liker un post !</div>
        </Popup>
      )}
      {uid && liked === false && (<img src="./img/icons/heart.svg" onClick={like} alt="like"/>)}
      {uid && liked && (<img src="./img/icons/heart.filled.svg" onClick={unlike} alt="like"/>)}
    </div>
  );
};

export default LikeButton; 
