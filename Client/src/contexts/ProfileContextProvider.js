import React from "react";
import { profileReducer } from "../reducers/ProfileReducer";

export const PostContext = React.createContext();
const initialState = {
  profile: []
};

const PostContextProvider = props => {
  const [profile_state, profile_dispatch] = React.useReducer(
    profileReducer,
    initialState
  );

  return (
    <PostContext.Provider value={{ profile_state, profile_dispatch }}>
      {props.children}
    </PostContext.Provider>
  );
};
export default PostContextProvider;
