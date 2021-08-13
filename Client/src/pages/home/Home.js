import React from "react";
import { PostContext } from "../../contexts/PostContextProvider";
import { AuthContext } from "../../contexts/AuthContextProvider";

import { Fade } from "react-reveal";
import Loader from "../../components/Loader/Loader";
import PostCard from "../../components/PostCard/PostCard";
import jwt_decode from "jwt-decode";
import {
  MainContainer,
  ContentConatainer,
  PostsContainer,
  SideNav
} from "./styles";

const Home = () => {
  const { post_state, post_dispatch } = React.useContext(PostContext);
  const { auth_state, auth_dispatch } = React.useContext(AuthContext);
  let url = auth_state.url;

  const user_id =
    localStorage.getItem("token") && jwt_decode(localStorage.getItem("token"));

  const fetch_posts = () => {
    let myHeaders = new Headers();
    myHeaders.append(
      "x-access-token",
      auth_state.token || localStorage.getItem("token")
    );
    fetch(`${url}/posts`, {
      method: "GET",
      headers: myHeaders
    })
      .then(res => res.json())
      .then(data => {
        post_dispatch({ type: "FETCH_POSTS", payload: data.posts });
      })
      .catch(err => console.log(err));
  };

  React.useEffect(() => {
    fetch_posts();
  }, [auth_state.token, post_state.token]);
  return (
    <MainContainer>
      <ContentConatainer>
        {post_state.posts.length == 0 ? (
          <Loader />
        ) : (
          post_state.posts.map(post => (
            <PostsContainer>
              <PostCard post={post} />
            </PostsContainer>
          ))
        )}
        <SideNav>Hello</SideNav>
      </ContentConatainer>
    </MainContainer>
  );
};

export default Home;
