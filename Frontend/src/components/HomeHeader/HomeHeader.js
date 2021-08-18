import React from "react";
import { HeaderDesign, HeaderRight, Spacer } from "./styles";
import * as Icon from "react-feather";

//Header for home on phone screen sizes
const HomeHeader = () => {
  return (
    <HeaderDesign>
      <b style={{ display: "flex", alignSelf: "center" }}>Merllon</b>
      <Spacer></Spacer>
    </HeaderDesign>
  );
};

export default HomeHeader;
