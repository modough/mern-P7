import React from "react";
import { useDispatch } from "react-redux";
import {deletePost} from "../actions/post.actions";

const DeleteCard = (props) => {
  const dispatch = useDispatch();
  const deleteQuote = () => dispatch(deletePost(props.id));
  const deleteByAdmin = () => dispatch( deletePost({isAdmin: true}) );
  return (
    <div
      onClick={() => {
        if (window.confirm("Are you sure you want to delete this card?")) {
          deleteQuote();
          deleteByAdmin();
        }
      }}
    >
      <img src="./img/icons/trash.svg" alt="trash" />
    </div>
  );
};

export default DeleteCard;
