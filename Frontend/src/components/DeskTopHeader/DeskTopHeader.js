import React from "react";
import { useLocation, Link } from "react-router-dom";
import { HeaderDesign, HeaderRight, Spacer } from "./styles";
import * as Icon from "react-feather";
import PopOver from "../PopOver/PopOver";

//General Header for Desktop
const DeskTopHeader = () => {
  const location = useLocation();
  const [Pop_visible, setPop_visible] = React.useState(false);

  return (
    <div>
      <HeaderDesign>
        <b style={{ display: "flex", alignSelf: "center", fontSize: 25 }}>
          Merllon
        </b>
        <Spacer></Spacer>
        <HeaderRight>
          <Link to="/" style={{ color: "black" }}>
            <Icon.Home size={25} />
          </Link>
          <Icon.PlusCircle
            size={25}
            onClick={() => setPop_visible(!Pop_visible)}
          />
          <Link to="/profile" style={{ color: "black" }}>
            <Icon.User size={25} />
          </Link>
        </HeaderRight>
      </HeaderDesign>
      {Pop_visible ? <PopOver /> : null}
    </div>
  );
};

export default DeskTopHeader;
