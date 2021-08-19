import React from "react";
import { useHistory } from "react-router-dom";
import * as Icon from "react-feather";
import { Fade } from "react-reveal";
import Light from "../../assets/icons/light.svg";
import Dark from "../../assets/icons/dark.svg";
import {
  SettingsMain,
  SettingsHeader,
  SettingsBox,
  IconBox,
  SettingsBackground,
  SettingsTitle,
  SettingsBody,
  Choices,
  Img,
  LogoutButton,
  ThemeText,
  Spacer,
  IconsContainer
} from "./styles";

import { ThemeContext } from "../../contexts/ThemeContextProvider";

const SettingsPopOver = () => {
  const { theme_state, theme_dispatch } = React.useContext(ThemeContext);
  const set_light_theme = () => {
    theme_dispatch({ type: "LIGHT_MODE" });
  };
  const set_dark_theme = () => {
    theme_dispatch({ type: "DARK_MODE" });
  };
  return (
    <SettingsMain style={{ backgroundColor: theme_state.background }}>
      <SettingsHeader>
        <SettingsTitle style={{ color: theme_state.color }}>
          Settings
        </SettingsTitle>
      </SettingsHeader>
      <Choices>
        <ThemeText style={{ color: theme_state.color }}>Theme</ThemeText>
        <Spacer>
          <Img
            src={Dark}
            onClick={() => set_dark_theme()}
            style={{ border: theme_state.is_dark ? "3px solid #e3405f " : "" }}
          />
          <Img
            src={Light}
            onClick={() => set_light_theme()}
            style={{ border: theme_state.is_dark ? "" : "3px solid #e3405f " }}
          />
        </Spacer>
      </Choices>
      <LogoutButton>Logout</LogoutButton>
    </SettingsMain>
  );
};

export default SettingsPopOver;
