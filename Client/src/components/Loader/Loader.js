import React from "react";
import { FadeLoader } from "react-spinners";
import styled from "styled-components";
import { ThemeContext } from "../../contexts/ThemeContextProvider";

const Center = styled.div`
  display: flex;
  flex: 1;
  overflow: auto;
  justify-content: center;
  margin-top: 200px;
  height: 100vh;
  font-size: 100px;
  margin-left: 20px;
  flex: 1;
`;

const Loader = () => {
  const { theme_state } = React.useContext(ThemeContext);
  return (
    <Center>
      <FadeLoader color={theme_state.color} style={{ alignSelf: "center" }} />
    </Center>
  );
};

export default Loader;
