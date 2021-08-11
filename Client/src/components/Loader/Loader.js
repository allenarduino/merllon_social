import React from "react";
import { FadeLoader } from "react-spinners";
import styled from "styled-components";

const Center = styled.div`
  display: flex;
  border-color: red;
  justify-content: center;
  margin-top: 200px;
  font-size: 100px;
  margin-left: 20px;
`;

const Loader = () => {
  return (
    <Center>
      <FadeLoader color={"rgb(73, 8, 73)"} style={{ alignSelf: "center" }} />
    </Center>
  );
};

export default Loader;
