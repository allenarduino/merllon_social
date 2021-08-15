import styled from "styled-components";

export const CenterInput = styled.div`
  max-width: 300px;
  display: flex;
  flex-direction: column;
  margin-top: 100px;
`;

export const MyImage = styled.img`
  height: 250px;
  width: 100%;
  border-bottom-left-radius: 10px;
  border-bottom-right-radius: 10px;
  margin: 0;
`;

export const InputField = styled.textarea`
  padding-top: 20px;
  font-size: 20px;
  padding-left: 10px;
  border: 2px solid transparent;
`;

export const SubmitButton = styled.button`
  width: 320px;
  padding-left: 20px;
  font-size: 15px;
  font-weight: bold;
  height: 40px;
  margin-top: 20px;
  border-radius: 20px;
  color: #fff;
  border: 2px solid #e3405f;
  background-color: #e3405f;
`;
