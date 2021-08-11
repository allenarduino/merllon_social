import React from "react";
import { useLocation, Link, useHistory } from "react-router-dom";
import { BottomNav, BnTab } from "./styles";
import * as Icon from "react-feather";

const BottomTab = props => {
  const location = useLocation();
  const history = useHistory();

  return (
    <div style={{ justifyContent: "center", display: "flex" }}>
      <BottomNav>
        <BnTab>
          {location.pathname === "/" ? (
            <Icon.Home
              onClick={() => history.push("/")}
              name="home-outline"
              className="mr-2 feedIcons"
              color="black"
              size={24}
            />
          ) : (
            <Icon.Home
              className="mr-2 feedIcons"
              size={20}
              onClick={() => history.push("/")}
            />
          )}
        </BnTab>
        <BnTab>
          {location.pathname === "/create_post" ? (
            <Icon.PlusCircle
              className="mr-2 feedIcons"
              color="black"
              size={24}
              onClick={() => history.push("/create_post")}
            />
          ) : (
            <Icon.PlusCircle
              className="mr-2 feedIcons"
              size={20}
              onClick={() => history.push("/create_post")}
            />
          )}
        </BnTab>
        <BnTab>
          {location.pathname === "/profile" ? (
            <Icon.User
              className="mr-2 feedIcons"
              color="black"
              size={24}
              onClick={() => history.push("/profile")}
            />
          ) : (
            <Icon.User
              className="mr-2 feedIcons"
              size={20}
              onClick={() => history.push("/profile")}
            />
          )}
        </BnTab>
      </BottomNav>
    </div>
  );
};

export default BottomTab;
