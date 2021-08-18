import styled from "styled-components";

export const RightSideDesign = styled.div`
  width: 500px;
  flex: 4;
  background-color: blue;
  @media (max-width: ${500}px) {
    display: none;
  }

  position: relative;
`;

export const Box = styled.div`
  height: 100vh;
  width: 30%;
  position: fixed;
`;
