export const themeReducer = (state, action) => {
  switch (action.type) {
    case "DARKMODE":
      return {
        ...state,
        mainColor: "#1DA1F2",
        secondaryColor: "#E3405F",
        background: "#15202B",
        error: "#E0245E",
        foreground: "#192734",
        typoMain: "#ffffff",
        typoSecondary: "#8899A6"
      };
    case "LIGHTMODE":
      return {
        ...state,
        mainColor: "#1DA1F2",
        secondaryColor: "#E3405F",
        background: "#ffffff",
        error: "#E0245E",
        foreground: "#F5F8FA",
        typoMain: "#14171A",
        typoSecondary: "#657786"
      };
    default:
      return state;
  }
};
