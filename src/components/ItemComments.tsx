import React, { ReactElement, useState, useEffect } from "react";
import { connect } from "react-redux";
import { useRouteMatch } from "react-router-dom";
import { products } from "../database/products";
import { setComments } from "../store/actions/comments.actions";
import Input from "../shared/Input/Input";
import { Comment } from "../database/Comment";
import { User } from "../database/User";

interface Props {
  comments: Comment[];
  setComments: (comments: Comment[]) => void;
  curUser: User | null;
}

function ItemComments({ comments, setComments, curUser }: Props): ReactElement {
  const match = useRouteMatch<{ id: string }>();
  const [text, setText] = useState("");
  const product =
      products.find((product) => product.id === Number(match.params.id)) ||
      products[0];

  const handleOnClick = () => {
    if (text.length && curUser) {
      const newComment: Comment = { text, author: curUser, productId: product.id };
      setComments([...comments, newComment]);
      setText("");
    }
  };

  return (
    <div style={{ padding: "200px 0" }}>
      <div className="comments__top">
        <Input
          type="text"
          onChange={(e) => {
            setText(e.target.value);
          }}
          label="Leave new comment"
          value={text}
        />
        <button onClick={handleOnClick}>Post</button>
      </div>
      {comments.filter((comment) => comment.productId === product.id).map((comment, index) => (
        <div key={index}>
          <div>Author: {comment.author.name}</div>
          <div>{comment.text}</div>
        </div>
      ))}
    </div>
  );
}

function mapStateToProps(state: any) {
  return {
    comments: state.comments.comments,
  };
}

export default connect(mapStateToProps, { setComments })(ItemComments);
