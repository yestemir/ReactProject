import { CommentsActions } from "../actions/comments.actions";
import { Comment, comments } from '../../database/Comment';

interface CommentsState {
  comments: Array<Comment>;
}

const initialState: CommentsState = {
  comments: comments,
};

const commentsReducer = (state: CommentsState = initialState, action: any) => {
  switch (action.type) {
    case CommentsActions.SET_COMMENTS:
      return {
        ...state,
        comments: action.payload,
      };
    default:
      return state;
  }
};

export default commentsReducer;
