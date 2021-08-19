import React from "react";
import { PostContext } from "../../contexts/PostContextProvider";
import { AuthContext } from "../../contexts/AuthContextProvider";
import { ThemeContext } from "../../contexts/ThemeContextProvider";

import { Fade } from "react-reveal";
import Loader from "../../components/Loader/Loader";
import PostCard from "../../components/PostCard/PostCard";
import HomeHeader from "../../components/HomeHeader/HomeHeader";
import jwt_decode from "jwt-decode";

import {
  MainContainer,
  ContentConatainer,
  PostsContainer,
  SideNav,
  Avatar
} from "./styles";

const Home = () => {
  const { post_state, post_dispatch } = React.useContext(PostContext);
  const { auth_state } = React.useContext(AuthContext);
  const { theme_state } = React.useContext(ThemeContext);

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
        post_dispatch({ type: "FETCH_USER", payload: data.user });
      })
      .catch(err => console.log(err));
  };

  React.useEffect(() => {
    fetch_posts();
  }, []);
  return (
    <div>
      <HomeHeader />
      <MainContainer style={{ backgroundColor: theme_state.background }}>
        <ContentConatainer style={{ backgroundColor: theme_state.background }}>
          {post_state.posts.length == 0 ? (
            <Loader />
          ) : (
            post_state.posts.map(post => (
              <Fade bottom duration={900} distance="40px">
                <PostsContainer>
                  <PostCard post={post} />
                </PostsContainer>
              </Fade>
            ))
          )}

          {post_state.user.map(user => (
            <SideNav style={{ backgroundColor: theme_state.background }}>
              <Avatar src={user.user_img} />
              <b style={{ color: theme_state.color }}>{user.full_name}</b>
            </SideNav>
          ))}
        </ContentConatainer>
      </MainContainer>
    </div>
  );
};

export default Home;
