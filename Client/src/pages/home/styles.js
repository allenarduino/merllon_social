import styled from "styled-components";

//container for the sapce except Top nav
export const MainContainer = styled.main`
  display: flex;
  flex: 1;
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
@media only and(max-width:${500}px){
    display:none;
}
  max-width: 290px;
  position:fixed;
  left:60%;
  top: 84px;
  transform: translateX(calc(-50% + 322px));
  flex-direction: column;
`;
