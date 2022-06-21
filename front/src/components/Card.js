import React, { useEffect, useState, Fragment } from "react";
import { useSelector } from "react-redux";
import { dateParser } from "./Utils";
import LikeButton from "./LikeButton";

const Card = ({ post }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [isUpdated, setIsUpdated] = useState(true);
  const [textUpdate, setTextUpdate] = useState(null);
  const usersData = useSelector((state) => state.usersReducer);
  const userData = useSelector((state) => state.usersReducer);

  const updateItem = () => {};

  useEffect(() => {
    usersData !== [0] && setIsLoading(false);
  }, [usersData]);

  return (
    <li className="card-container" key={post._id}>
      {isLoading ? (
        <i className="fas fa-spinner fa-spin"></i>
      ) : (
        <Fragment>
          <div className="card-left"></div>
          <div className="card-right">
            <div className="card-header">
              <div className="pseudo">
                <h3>{post.userPseudo}</h3>
              </div>
              <span>{dateParser(post.createdAt)}</span>
            </div>
            {isUpdated === false && <p>{post.message}</p>}
            {isUpdated && (
              <div className="update-post">
                <textarea
                  defaultValue={post.message}
                  onchange={(e) => setTextUpdate(e.target.value)}
                />
                <button className="btn" onClick={updateItem}>
                  Valider modification
                </button>
              </div>
            )}
            ;
            {post.picture && (
              <img src={post.picture} alt="card-pic" className="card-pic" />
            )}
            ;
            {userData._id === post.posterId && (
              <div className="button-container">
                <div onClick={() => setIsUpdated(!isUpdated)}>
                  <img src="./img/icons/edit.svg" alt="edit" />
                </div>
              </div>
            )}
            <div className="card-footer">
              <div className="comment"></div>
              <LikeButton post={post} />
              <img src="./img/icons/share.svg" alt="share" />
            </div>
          </div>
        </Fragment>
      )}
    </li>
  );
};

export default Card;
