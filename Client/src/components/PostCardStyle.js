import styled from "styled-components";

export const PostCard = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  padding: 10px 10px 0;
  cursor: pointer;
`;

export const AvatarWrapper = styled.div`
  width: 50px;
  height: 50px;
  overflow: hidden;
  border-radius: 50%;
`;

export const Avatar = styled.div`
  width: 100%;
  height: 100%;
  border-radius: 50%;
  object-fit: cover;
`;
