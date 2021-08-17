import React from "react";
import { PostContext } from "../../contexts/PostContextProvider";
import { AuthContext } from "../../contexts/AuthContextProvider";
import { ModalContext } from "../../contexts/ModalContextProvider";

import { Fade } from "react-reveal";
import Loader from "../../components/Loader/Loader";
import PostCard from "../../components/PostCard/PostCard";
import HomeHeader from "../../components/HomeHeader/HomeHeader";
import jwt_decode from "jwt-decode";
import Sheet from "react-modal-sheet";

import {
  MainContainer,
  ContentConatainer,
  PostsContainer,
  SideNav,
  Avatar
} from "./styles";
import CommentModal from "../../components/CommentModal/CommentModal";
import { width } from "@material-ui/system";

const Home = () => {
  const [isOpen, setOpen] = React.useState(true);
  const { post_state, post_dispatch } = React.useContext(PostContext);
  const { auth_state } = React.useContext(AuthContext);
  const { modal_state, modal_dispatch } = React.useContext(ModalContext);

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

  const close_modal = e => {
    modal_dispatch({ type: "CLOSE_MODAL" });
  };
  React.useEffect(() => {
    fetch_posts();
  }, []);
  return (
    <div>
      <HomeHeader />
      <MainContainer>
        <ContentConatainer>
          {post_state.posts.length == 0 ? (
            <Loader />
          ) : (
            post_state.posts.map(post => (
              <Fade bottom duration={900} distance="40px">
                <PostsContainer>
                  <PostCard post={post} onClick={() => setOpen(true)} />
                </PostsContainer>
              </Fade>
            ))
          )}

          {post_state.user.map(user => (
            <SideNav style={{ backgroundColor: "#ff" }}>
              <Avatar src={`${url}/${user.user_img}`} />
              <b>{user.full_name}</b>
            </SideNav>
          ))}
        </ContentConatainer>
        {modal_state.modal_open ? (
          <CommentModal
            close_modal={close_modal}
            post_id={modal_state.post_id}
            post_media={modal_state.post_media}
          />
        ) : null}
      </MainContainer>
    </div>
  );
};

export default Home;
