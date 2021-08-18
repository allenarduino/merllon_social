import React from "react";
import { HeaderDesign, HeaderRight, Spacer } from "./styles";
import * as Icon from "react-feather";
import SettingsPopOver from "../SettingsPopOver/SettingsPopOver";

//Header for home on phone screen sizes
const HomeHeader = () => {
  const [settingsVisible, setSettingsVisible] = React.useState(false);
  return (
    <div>
      <HeaderDesign>
        <b style={{ display: "flex", alignSelf: "center" }}>Merllon</b>
        <Spacer></Spacer>
        <Icon.Settings
          onClick={() => setSettingsVisible(!settingsVisible)}
          style={{ marginRight: 50 }}
        />
        {settingsVisible ? <SettingsPopOver /> : null}
      </HeaderDesign>
    </div>
  );
};

export default HomeHeader;
