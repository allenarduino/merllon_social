import React from "react";
import { useLocation, Link } from "react-router-dom";
import { HeaderDesign, HeaderRight, Spacer } from "./styles";
import * as Icon from "react-feather";

//General Header for Desktop
const DeskTopHeader = () => {
  const location = useLocation();

  return (
    <HeaderDesign>
      <b style={{ display: "flex", alignSelf: "center" }}>Merllon</b>
      <Spacer></Spacer>
      <HeaderRight>
        <Link to="/" style={{ color: "black" }}>
          <Icon.Home />
        </Link>
        <Link to="/create_post" style={{ color: "black" }}>
          <Icon.PlusCircle />
        </Link>
        <Link to="/profile" style={{ color: "black" }}>
          <Icon.User />
        </Link>
      </HeaderRight>
    </HeaderDesign>
  );
};

export default DeskTopHeader;
