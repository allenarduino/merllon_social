import styled from "styled-components";

export const CommentBackground = styled.div`
  @media (min-width: ${769}px) {
    display: flex;
    background: rgba(0, 0, 0, 0.9);
  }
  flex: 1;
  height: 100vh;
  width: 100%;
  display: flex;
  justify-content: flex-end;
  flex-direction: column;
  background: rgba(0, 0, 0, 0.8);
  z-index: 9999;
  position: fixed;
`;

export const BackArrowContainer = styled.div`
  width: 100%;
  padding-top: 15px;
  padding-bottom: 15px;
  height: 20px;
  display: flex;
  flex-direction: column;
  padding-left: 10px;
`;

export const CommentContainer = styled.div`
  @media (min-width: ${769}px) {
    align-self: center;
    max-width: 500px;
  }
  height: 90vh;
  width: 100%;
  display: flex;
  flex-direction: column;
  overflow: auto;
`;

export const CommentInputContainer = styled.div`
  margin-top: auto;
  width: 100%;
  padding-left: 10px;
  display: flex;
  flex-direction: row;
  height: 50px;
  position: sticky;
  bottom: 0;
`;

export const CommentInput = styled.textarea`
  width: 80%;
  padding-top: 10px;
  padding-bottom: 10px;
  height: 20px;
  padding-left: 10px;
  border-radius: 20px;
`;

export const EmptyCommentFeedBack = styled.div`
  text-align: center;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  line-height: 250px;
  position: sticky;
`;
