export const commentReducer = (state, action) => {
  switch (action.type) {
    case "ADD_COMMENT":
      return {
        ...state,
        comments: [action.payload, ...state.comments]
      };
    case "FETCH_COMMENTS":
      return {
        ...state,
        comments: action.payload
      };

    case "DELETE_COMMENT":
      return {
        ...state,
        comments: state.comments.filter(
          comment => comment.id !== action.payload
        )
      };

    default:
      return state;
  }
};
