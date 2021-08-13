import styled from "styled-components";

export const BottomNav = styled.div`
  @media (min-width: ${769}px) {
    display: none;
  }
  width: 80%;
  max-width: 400px;
  z-index: 2;
  height: 40px;
  display: flex;
  justify-content: center;
  background-color: #fff;
  align-items: center;
  position: fixed;
  bottom: 0;
  margin-bottom: 30px;
  border: 1px solid rgb(230, 230, 230);
  border-radius: 30px;
`;

export const BnTab = styled.div`
  width: 25%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;
