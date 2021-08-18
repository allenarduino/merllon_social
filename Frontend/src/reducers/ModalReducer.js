export const modalReducer = (state, action) => {
  switch (action.type) {
    case "OPEN_MODAL":
      return {
        modal_open: true,
        post_id: action.payload1,
        post_media: action.payload2,
        owner_id: action.payload3,
        full_name: action.payload4,
        is_video: action.payload5
      };
    case "CLOSE_MODAL":
      return {
        modal_open: false
      };
    default:
      return state;
  }
};
