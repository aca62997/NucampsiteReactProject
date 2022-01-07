import * as ActionTypes from "./ActionTypes";

export const Comments = (state = { errMess: null, comments: [] }, action) => {
  switch (action.type) {
    case ActionTypes.ADD_COMMENTS:
      return { ...state, errMess: null, comments: action.payload };
    case ActionTypes.CAMPSITES_FAILED:
      return { ...state, errMess: action.payload };
    case ActionTypes.ADD_COMMENT:
      const comment = action.payload;
      return { ...state, comments: state.comments.concat(comment)};
    default:
      return state;
  }
};
