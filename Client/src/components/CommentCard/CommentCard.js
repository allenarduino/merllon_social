import React from "react";
import moment from "moment-twitter";
import Linkify from "react-linkify";
import { Link } from "react-router-dom";
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

const CommentCard = ({ comment }) => {
  const { theme_state } = React.useContext(ThemeContext);
  const { auth_state } = React.useContext(AuthContext);
  let url = auth_state.url;
  return (
    <CommentCardDesign
      style={{
        borderBottom: `1px solid ${theme_state.border}`
      }}
    >
      <UserImage src={`${url}/${comment.user_img}`} />
      <Content>
        <Line1>
          <Line1Box>
            <UserName
              style={{
                color: theme_state.typoMain
              }}
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
              <Link
                to="/singleprofile"
                style={{
                  color: theme_state.mainColor
                }}
              >
                <Line2AuthorName>
                  {"@"}
                  {comment.full_name}
                </Line2AuthorName>
              </Link>
            </Line2Text>
          </Line2Box>
          <Line2Content
            style={{
              color: theme_state.typoMain
            }}
          >
            <Linkify>{comment.comment_text}</Linkify>
          </Line2Content>
        </Line2>
      </Content>
    </CommentCardDesign>
  );
};

export default CommentCard;
