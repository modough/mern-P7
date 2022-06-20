import React, { useEffect, useState } from "react";
import { getPosts } from "../actions/post.actions";
import { useDispatch, useSelector } from "react-redux";
import Card from "./Card"

const Thread = () => {
  const [loadPost, setLoadPost] = useState(true);
  const dispatch = useDispatch();
  // recuperer les posts
  const posts = useSelector((state) => state.postReducer);

  useEffect(() => {
    if (loadPost) {
      dispatch(getPosts());
      setLoadPost(false);
    }
  }, [loadPost, dispatch]);

  return (
    <div className="thread-container">
      <ul>
        {posts !== [] && posts.map &&
          posts.map((post) => {
            return <Card post= {post} key= {post._id} />;
          })
        }
      </ul>
    </div>
  );
};

export default Thread;
