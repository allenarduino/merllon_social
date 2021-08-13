import React from "react";
import { Link } from "react-router-dom";
import moment from "moment-twitter";
import Linkify from "react-linkify";
import jwt_decode from "jwt-decode";

import { ThemeContext } from "../../contexts/ThemeContextProvider";
import { AuthContext } from "../../contexts/AuthContextProvider";
import {
  UserImageWrapper,
  UserImage,
  PostCardContent,
  Line1,
  Line2,
  UserName,
  Date,
  LineBox,
  PostCardDesign,
  Line3,
  Line4,
  Delete
} from "./styles";
import ImageModal from "../ImageModal/ImageModal";

const PostCard = ({ post }) => {
  const { theme_state } = React.useContext(ThemeContext);
  const { auth_state } = React.useContext(AuthContext);
  let url = auth_state.url;
  return (
    <PostCardDesign>
      <UserImage src={`${url}/${post.user_img}`} />
      <PostCardContent>
        <Line1>
          <LineBox>
            <UserName
              style={{
                color: theme_state.mobileNavIcon
              }}
            >
              {post.full_name}
            </UserName>
            <Date
              style={{
                color: theme_state.typoMain
              }}
            >
              {moment(post.created_at).twitterShort()}
            </Date>
          </LineBox>
          <Delete>Delete</Delete>
        </Line1>
        <Line2
          style={{
            color: theme_state.mobileNavIcon
          }}
        >
          <Linkify>{post.post_caption}</Linkify>
        </Line2>

        <Line3 style={{ marginTop: 15 }}>
          <ImageModal imageUrl={`${url}/${post.post_media}`} />
        </Line3>
        <Line4
          style={{
            color: theme_state.mobileNavIcon
          }}
        >
          <div>Comment</div>
          <div>Like </div>
        </Line4>
      </PostCardContent>
    </PostCardDesign>
  );
};

export default PostCard;
