import React from "react";
import { modalReducer } from "../reducers/ModalReducer";

export const ModalContext = React.createContext();
const initialState = {
  modal_open: false,
  post_id: null,
  post_media: null
};

const ModalContextProvider = props => {
  const [modal_state, modal_dispatch] = React.useReducer(
    modalReducer,
    initialState
  );

  return (
    <ModalContext.Provider value={{ modal_state, modal_dispatch }}>
      {props.children}
    </ModalContext.Provider>
  );
};
export default ModalContextProvider;
