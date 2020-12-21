import { Dispatch } from "redux";
import { Comment } from "../../database/Comment";

export enum CommentsActions {
  SET_COMMENTS = "SET_COMMENTS",
}

export const setComments = (comments: Array<Comment>) => (dispatch: Dispatch) => {
  dispatch({
    type: CommentsActions.SET_COMMENTS,
    payload: comments,
  });
};
