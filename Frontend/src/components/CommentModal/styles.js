import styled from "styled-components";

export const CommentModalDesign = styled.div`
  @media (max-width: ${769}px) {
  }
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.3);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 11;
`;

export const MainModal = styled.div`
  @media (max-width: ${769}px) {
    width: 100%;
    height: 70%;
    border-top-left-radius: 10px;
    border-top-right-radius: 10px;
    z-index: 77;
  }
  background: #fff;
  width: 60%;
  height: 70%;
  display: flex;
  justify-content: center;
  border-radius: 10px;
  overflow: auto;

  /******transform: translate(-50%, -50%);*******/
`;

export const PostImage = styled.img`
  @media (max-width: ${769}px) {
    display: none;
  }
  width: 40%;
  height: 100%;
  display: flex;
  align-self: flex-start;
  border-top-left-radius: 10px;
  border-bottom-left-radius: 10px;
`;
export const PostVideo = styled.video`
  @media (max-width: ${769}px) {
    display: none;
  }
  width: 40%;
  height: 100%;
  display: flex;
  align-self: flex-start;
  border-top-left-radius: 10px;
  border-bottom-left-radius: 10px;
`;

export const RightSide = styled.div`
  @media (max-width: ${769}px) {
    width: 100%;
    align-self: center;
  }
  width: 60%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-self: flex-end;
  overflow-y: scroll;
`;
export const FormContainer = styled.form`
  @media (max-width: ${769}px) {
    width: 100%;
    height: 30px;
  }
  width: 100%;
  display: flex;
  flex-direction: row;
  height: 50px;
  bottom: 0;
  margin-top: auto;
  position: sticky;
`;

export const CommentInput = styled.textarea`
  @media (max-width: ${769}px) {
    width: 70%;
  }
  width: 90%;
  padding-top: 10px;
  padding-bottom: 10px;
  padding-left: 10px;
`;

export const SubMit = styled.input`
  @media (max-width: ${769}px) {
    width: 30%;
  }
  width: 20%;
  padding-left: 20px;
  font-size: 15px;
  font-weight: bold;
  color: #fff;
  border: 2px solid #e3405f;
  background-color: #e3405f;
`;
