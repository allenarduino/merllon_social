import React from "react";
import { Header, HeaderRight, Spacer } from "./styles";
import * as Icon from "react-feather";

const CreatePostHeader = props => {
  return (
    <Header>
      <Icon.Delete />
      <Spacer></Spacer>
      <HeaderRight>
        <Icon.CheckCircle onClick={props.create_post} />
      </HeaderRight>
    </Header>
  );
};
export default CreatePostHeader;
