import React, { ReactElement, useState, useEffect } from "react";
import { connect } from "react-redux";
import { useRouteMatch } from "react-router-dom";
import { products } from "../database/products";
import { setComments } from "../store/actions/comments.actions";
import Input from "../shared/Input/Input";
import { Comment } from "../database/Comment";
import { User } from "../database/User";
import './ItemComments.css'

interface Props {
  comments: Comment[];
  setComments: (comments: Comment[]) => void;
  curUser: User | null;
  // addComment: (comment: Comment) => void;
  // comments: Comment[];
}

function ItemComments({ comments, setComments, curUser, /*addComment, comments*/}: Props): ReactElement {
  const match = useRouteMatch<{ id: string }>();
  const [text, setText] = useState("");
  const [num, setNum] =useState(0);
  const product =
    products.find((product) => product.id === Number(match.params.id)) ||
    products[0];
  const imgs = ["https://avatars3.githubusercontent.com/u/35288796?s=400&u=32baa94d01660361fb3f8ff2dc1da9114d963582&v=4",
      "https://avatars0.githubusercontent.com/u/47058400?s=460&u=8716c776c819da7e76734bfa2e1f3c841dd7c050&v=4",
  "https://avatars2.githubusercontent.com/u/44726103?s=460&u=37b65ae12338b601f902b7a3608c5952b7cfda7f&v=4",
  "https://avatars2.githubusercontent.com/u/46562198?s=460&u=907a228fb8f8c1495a221b5d7aaed55daedb5043&v=4",
    "https://www.kindpng.com/picc/m/48-480861_react-js-icon-png-transparent-png.png"
  ]

  const choosePic = (id: number) => {
    // const random = Math.floor(Math.random() * imgs.length);
    // setNum((prevState => prevState + random))
    let ans = 0;
    if (id > imgs.length) ans = imgs.length -1
    else ans = id - 1
    return ans
  }

  const handleOnClick = () => {
    if (text.length && curUser) {
      const newComment: Comment = {
        text,
        author: curUser,
        productId: product.id,
      };
      setComments([...comments, newComment]);
      // addComment(newComment);
      setText("");
    }
  };

  const showInput = (user: User | null) => {
    if (user) {
      return (
        <div className="comments__top">
          <Input
            type="text"
            className="inpt"
            onChange={(e) => {
              setText(e.target.value);
            }}
            label="Leave new comment"
            value={text}
          />
          <div className="col-md-3 col-sm-3 col-xs-6">
            <button className="btn btn-sm animated-button victoria-two" onClick={handleOnClick}>Post</button>
          </div>
        </div>
      );
    } else {
      return <></>;
    }
  };

  return (
    <div>
      {showInput(curUser)}
      {comments
        .filter((comment) => comment.productId === product.id)
        .map((comment, index) => (
        <span key={index} className="commentCl">
          {/*{choosePic}*/}
            <span><img id="imag" src={imgs[choosePic(comment.author.id)]} /></span>
            <span className="textt">
              <span id="a">{comment.author.name} ✍: {comment.text}</span>
              {/*<span id="c">{comment.text}</span>*/}
            </span>
          </span>
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

// export default ItemComments;
