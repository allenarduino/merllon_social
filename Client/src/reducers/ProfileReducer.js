export const profileReducer = (state, action) => {
  switch (action.type) {
    case "FETCH_PROFILE":
      return {
        ...state,
        profile: action.payload
      };

    default:
      return state;
  }
};
