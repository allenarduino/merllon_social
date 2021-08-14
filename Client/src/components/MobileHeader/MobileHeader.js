import React from "react";
import { HeaderDesign, HeaderRight, Spacer } from "./styles";
import * as Icon from "react-feather";

const MobileHeader = () => {
  return (
    <HeaderDesign>
      <b style={{ display: "flex", alignSelf: "center" }}>Merllon</b>
      <Spacer></Spacer>
    </HeaderDesign>
  );
};

export default MobileHeader;
