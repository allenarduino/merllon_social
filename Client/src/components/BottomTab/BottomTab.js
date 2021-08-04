import React from "react";
import { useHistory } from "react-router-dom";
import { BottomNav, BnTab } from "./styles";

import {
  HomeOutlined,
  SearchOutlined,
  BellOutlined,
  MenuOutlined
} from "@ant-design/icons";

const BottomTab = props => {
  const history = useHistory();
  const [active, setActive] = React.useState(props.name);
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
    <BottomNav>
      <BnTab>
        {activeTabs == "home" ? <BellOutlined /> : <SearchOutlined />}
      </BnTab>
      <BnTab>
        {activeTabs == "home" ? <BellOutlined /> : <SearchOutlined />}
      </BnTab>
      <BnTab>
        {activeTabs == "home" ? <BellOutlined /> : <SearchOutlined />}
      </BnTab>
    </BottomNav>
  );
};

export default BottomTab;
