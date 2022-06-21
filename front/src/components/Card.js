import React, { useEffect, useState, Fragment } from "react";
import { useSelector } from "react-redux";
import { dateParser } from "./Utils";
import LikeButton from "./LikeButton";

const Card = ({ post }) => {
  const [isLoading, setIsLoading] = useState(true);
  const usersData = useSelector((state) => state.usersReducer);
 

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
            <p>{post.message}</p>
            {post.picture && (
              <img src={post.picture} alt="card-pic" className="card-pic" />
            )}
            <div className="card-footer">
              <div className="comment"></div>
              <LikeButton post={post}/>
              <img src="./img/icons/share.svg" alt="share" />
            </div>
          </div>
        </Fragment>
      )}
    </li>
  );
};

export default Card;
