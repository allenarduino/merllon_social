import React from "react";
import { useHistory } from "react-router-dom";
import { BottomNav, BnTab } from "./styles";

import {
  HomeOutlined,
  SearchOutlined,
  BellOutlined,
  MenuOutlined,
  ProfileOutlined
} from "@ant-design/icons";

const BottomTab = props => {
  const history = useHistory();
  const [activeTabs, setActive] = React.useState(props.name);
  React.useEffect(() => {
    switch (activeTabs) {
      case "home":
        history.push("/");
        break;
      case "search":
        history.push("/search");
        break;
      default:
        history.push("/");
        break;
    }
  }, [activeTabs, history]);

  return (
    <div style={{ justifyContent: "center", display: "flex" }}>
      <BottomNav>
        <BnTab>
          {activeTabs == "home" ? <HomeOutlined /> : <HomeOutlined />}
        </BnTab>
        <BnTab>
          {activeTabs == "home" ? <SearchOutlined /> : <SearchOutlined />}
        </BnTab>
        <BnTab>
          {activeTabs == "home" ? <ProfileOutlined /> : <ProfileOutlined />}
        </BnTab>
      </BottomNav>
    </div>
  );
};

export default BottomTab;
