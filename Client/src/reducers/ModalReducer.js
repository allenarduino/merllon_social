export const modalReducer = (state, action) => {
  switch (action.type) {
    case "OPEN_MODAL":
      return {
        modal_open: true,
        post_id: action.payload1,
        post_media: action.payload2
      };
    case "CLOSE_MODAL":
      return {
        modal_open: false
      };
    default:
      return state;
  }
};
