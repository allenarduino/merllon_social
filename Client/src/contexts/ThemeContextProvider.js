import React from "react";
import { themeReducer } from "../reducers/ThemeReducer";

export const ThemeContext = React.createContext();

const ThemeContextProvider = props => {
  const initialState = {
    mainColor: "#1DA1F2",
    secondaryColor: " #E3405F",
    background: "#15202B",
    error: "#E0245E",
    foreground: "#192734",
    typoMain: "#ffffff",
    typoSecondary: "#8899A6",
    mobileNavIcon: "#8899a6",
    border: "#e6ecf0"
  };

  const [theme_state, theme_dispatch] = React.useReducer(
    themeReducer,
    initialState
  );

  return (
    <ThemeContext.Provider value={{ theme_state, theme_dispatch }}>
      {props.children}
    </ThemeContext.Provider>
  );
};

export default ThemeContextProvider;
