import React from "react";
import { HeaderDesign, HeaderRight, Spacer } from "./styles";
import * as Icon from "react-feather";

const Header = () => {
  return (
    <HeaderDesign>
      <b style={{ display: "flex", alignSelf: "center" }}>Merllon</b>
      <Spacer></Spacer>
      <HeaderRight>
        <Icon.Home />
        <Icon.PlusCircle />
        <Icon.User />
      </HeaderRight>
    </HeaderDesign>
  );
};

export default Header;
