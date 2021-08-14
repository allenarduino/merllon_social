import React from "react";
import { Header, HeaderRight, Spacer } from "./styles";
import * as Icon from "react-feather";

const CreatePostHeader = () => {
  return (
    <Header>
      <Icon.Delete />
      <Spacer></Spacer>
      <HeaderRight>
        <Icon.CheckCircle />
      </HeaderRight>
    </Header>
  );
};
export default CreatePostHeader;
