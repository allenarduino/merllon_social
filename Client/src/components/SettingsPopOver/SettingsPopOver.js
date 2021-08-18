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
    theme_dispatch({ type: "LIGHT_THEME" });
  };
  const set_dark_theme = () => {
    theme_dispatch({ type: "DARK_THEME" });
  };
  return (
    <SettingsMain>
      <SettingsHeader>
        <SettingsTitle>Settings</SettingsTitle>
      </SettingsHeader>
      <Choices>
        <ThemeText>Theme</ThemeText>
        <Spacer>
          <Img src={Dark} onClick={() => set_dark_theme()} />
          <Img src={Light} onClick={() => set_dark_theme()} />
        </Spacer>
      </Choices>
      <LogoutButton>Logout</LogoutButton>
    </SettingsMain>
  );
};

export default SettingsPopOver;
