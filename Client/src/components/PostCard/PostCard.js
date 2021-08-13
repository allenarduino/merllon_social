import React from "react";
import { Link } from "react-router-dom";
import moment from "moment-twitter";
import Linkify from "react-linkify";
import jwt_decode from "jwt-decode";
import * as Icon from "react-feather";
import ReactPlayer from "react-player";

import { ThemeContext } from "../../contexts/ThemeContextProvider";
import { AuthContext } from "../../contexts/AuthContextProvider";
import { PostContext } from "../../contexts/PostContextProvider";
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

const my_url = "http://localhost:4000/uploads/my_video2.mp4";

const PostCard = ({ post }) => {
  const { theme_state } = React.useContext(ThemeContext);
  const { auth_state } = React.useContext(AuthContext);
  const { post_state, post_dispatch } = React.useContext(PostContext);
  let url = auth_state.url;

  const user_id =
    localStorage.getItem("token") && jwt_decode(localStorage.getItem("token"));

  const like = id => {
    const newPost = post_state.posts.map(p =>
      p.p_id === id
        ? { ...p, post_liker: user_id, total_likes: p.total_likes + 1 }
        : p
    );

    post_dispatch({ type: "FETCH_POSTS", payload: newPost });

    //Sending like details to server
    let myHeaders = new Headers();
    myHeaders.append("x-access-token", localStorage.getItem("token"));
    myHeaders.append("Content-Type", "application/json");
    const data = { post_id: id };
    fetch(`${url}/like_post`, {
      method: "POST",
      body: JSON.stringify(data),
      headers: myHeaders
    })
      .then(res => res.json())
      .then(data => console.log(data.message))
      .catch(err => console.log(err));
  };

  const unlike = id => {
    const newPost = post_state.posts.map(p =>
      p.p_id === id
        ? { ...p, post_liker: null, total_likes: p.total_likes - 1 }
        : p
    );

    post_dispatch({ type: "FETCH_POSTS", payload: newPost });

    //Sending like details to server
    let myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    const data = { post_id: id };
    fetch(`${url}/unlike_post`, {
      method: "DELETE",
      body: JSON.stringify(data),
      headers: myHeaders
    }).then(res => res.json());
    // .then(data => alert(data.message));
    // .catch(err=>alert(err))
  };

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
          <Icon.Trash />
        </Line1>
        <Line2
          style={{
            color: theme_state.mobileNavIcon
          }}
        >
          <Linkify>{post.post_caption}</Linkify>
        </Line2>

        <Line3 style={{ marginTop: 15 }}>
          {post.is_video == "false" ? (
            <ImageModal imageUrl={`${url}/${post.post_media}`} />
          ) : (
            <ReactPlayer
              url={`${url}/${post.post_media}`}
              width="100%"
              height="100%"
              controls={true}
            />
          )}
        </Line3>
        <Line4
          style={{
            color: theme_state.mobileNavIcon
          }}
        >
          {post.post_liker == null ? (
            <Icon.Heart
              size={25}
              color="black"
              onClick={() => like(post.p_id)}
            />
          ) : (
            <Icon.Heart
              size={25}
              color="red"
              fill="red"
              onClick={() => unlike(post.p_id)}
            />
          )}
          <b style={{ fontSize: 18, marginLeft: -10 }}>{post.total_likes}</b>
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fill-rule="evenodd"
              clip-rule="evenodd"
              d="M21.2959 20.8165L20.2351 16.8602C20.1743 16.6385 20.2047 16.3994 20.309 16.1907C21.2351 14.3342 21.5438 12.117 20.9742 9.80402C20.2003 6.67374 17.757 4.16081 14.6354 3.33042C13.7833 3.10869 12.9442 3 12.1312 3C6.29665 3 1.74035 8.47365 3.31418 14.5647C4.04458 17.3819 7.05314 20.2992 9.88344 20.9861C10.6486 21.173 11.4008 21.26 12.1312 21.26C13.7006 21.26 15.1701 20.8557 16.4614 20.1601C16.6049 20.0818 16.7657 20.0383 16.9222 20.0383C17.0005 20.0383 17.0787 20.047 17.157 20.0688L21.009 21.0991C21.0307 21.1035 21.0525 21.1078 21.0699 21.1078C21.2177 21.1078 21.3351 20.9687 21.2959 20.8165ZM19.0178 17.1863L19.6178 19.4253L17.4831 18.8558C17.3005 18.8079 17.1135 18.7819 16.9222 18.7819C16.557 18.7819 16.1875 18.8775 15.8571 19.0558C14.6963 19.6818 13.4441 19.9992 12.1312 19.9992C11.4834 19.9992 10.8269 19.9166 10.1791 19.7601C7.78354 19.1775 5.14453 16.6037 4.53586 14.2473C3.90111 11.7865 4.40109 9.26057 5.90536 7.31719C7.40964 5.3738 9.6791 4.26081 12.1312 4.26081C12.8529 4.26081 13.5876 4.35646 14.3137 4.5521C16.9961 5.26511 19.0786 7.39544 19.7525 10.1084C20.2264 12.0213 20.0308 13.9299 19.183 15.6298C18.9395 16.1168 18.8787 16.6689 19.0178 17.1863Z"
              fill="black"
              stroke="black"
              stroke-width="0.7"
            />
          </svg>
        </Line4>
      </PostCardContent>
    </PostCardDesign>
  );
};

export default PostCard;
