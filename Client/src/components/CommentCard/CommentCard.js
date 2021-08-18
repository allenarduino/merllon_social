import React from "react";
import moment from "moment-twitter";
import Linkify from "react-linkify";
import { Link, useHistory } from "react-router-dom";
import {
  CommentCardDesign,
  UserImage,
  Content,
  Line1,
  Line1Box,
  UserName,
  Line2,
  Line2Box,
  Line2Text,
  Line2AuthorName,
  Line2Content
} from "./styles";

import { ThemeContext } from "../../contexts/ThemeContextProvider";
import { AuthContext } from "../../contexts/AuthContextProvider";
import { ModalContext } from "../../contexts/ModalContextProvider";

const CommentCard = ({ comment }) => {
  const history = useHistory();
  const { theme_state } = React.useContext(ThemeContext);
  const { auth_state } = React.useContext(AuthContext);
  const { modal_state, modal_dispatch } = React.useContext(ModalContext);

  let url = auth_state.url;
  return (
    <CommentCardDesign
      style={{
        borderBottom: `1px solid ${theme_state.border}`
      }}
    >
      <UserImage
        src={`${url}/${comment.user_img}`}
        onClick={() => {
          history.push("/singleprofile", {
            user_id: comment.user_id
          });
          modal_dispatch({ type: "CLOSE_MODAL" });
        }}
      />
      <Content>
        <Line1>
          <Line1Box>
            <UserName
              /*style={{
                color: theme_state.typoMain
              }}*/
              style={{ color: "black" }}
            >
              {comment.full_name}
            </UserName>
          </Line1Box>
        </Line1>
        <Line2>
          <Line2Box
            style={{
              color: theme_state.typoSecondary
            }}
          >
            <Line2Text>
              Replying to
              <span
                onClick={() => {
                  history.push("/singleprofile", {
                    user_id: modal_state.owner_id
                  });
                  modal_dispatch({ type: "CLOSE_MODAL" });
                }}
                style={{
                  color: theme_state.mainColor
                }}
              >
                <Line2AuthorName>
                  {"@"}
                  {comment.full_name}
                </Line2AuthorName>
              </span>
            </Line2Text>
          </Line2Box>
          <Line2Content
            style={{
              color: "black"
            }}
          >
            <Linkify>{comment.text}</Linkify>
          </Line2Content>
        </Line2>
      </Content>
    </CommentCardDesign>
  );
};

export default CommentCard;
