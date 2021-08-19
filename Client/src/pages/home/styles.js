import styled from "styled-components";

//container for the sapce except Top nav
export const MainContainer = styled.main`
  display: flex;
  flex: 1;
  margin-top: 50px;
  padding-bottom: 80px;
`;

//Container for posts and side nav
export const ContentConatainer = styled.section`
  width: 100%;
  max-width: 934px;
  padding: 0 0 8px;
  margin: 0 auto;
`;

//conatainer for posts except side nav
export const PostsContainer = styled.div`
  width: 100%;
  max-width: 614px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
`;

//container for side nav
export const SideNav = styled.section`
  @media (max-width: ${1000}px) {
    display: none;
  }
  max-width: 250px;
  position: fixed;
  left: 60%;
  top: 84px;
  transform: translateX(calc(-50% + 322px));
  flex-direction: column;
  width: 30vw;
  height: 40vh;
  display: flex;
  align-items: center;
  align-self: flex-end;
  border-radius: 20px;
  box-shadow: 0px 0px 2px;
`;

export const Avatar = styled.img`
  height: 80px;
  width: 80px;
  border-radius: 80px;
  align-self: center;
  margin-top: 20px;
  border: 2px solid white;
`;
