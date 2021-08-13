export const profileReducer = (state, action) => {
  switch (action.type) {
    case "FETCH_PROFILE":
      return {
        ...state,
        profile: action.payload
      };
    case "FETCH_USER_POSTS":
      return {
        ...state,
        user_posts: action.payload
      };

    default:
      return state;
  }
};
