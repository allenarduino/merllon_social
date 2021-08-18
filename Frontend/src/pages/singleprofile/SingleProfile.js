import React from "react";
import { AuthContext } from "../../contexts/AuthContextProvider";
import { ProfileContext } from "../../contexts/ProfileContextProvider";
import { ModalContext } from "../../contexts/ModalContextProvider";
import { useHistory, useLocation } from "react-router-dom";

import Loader from "../../components/Loader/Loader";
import PostCard from "../../components/PostCard/PostCard";
import CommentModal from "../../components/CommentModal/CommentModal";
import { Fade } from "react-reveal";
import jwt_decode from "jwt-decode";
import {
  MainContainer,
  ContentConatainer,
  ProfileContainer,
  CoverPhoto,
  UserImg,
  FullName,
  Bio,
  PostsContainer,
  EditProfileButton
} from "./styles";

const SingleProfile = () => {
  const history = useHistory();
  const location = useLocation();
  const { auth_state } = React.useContext(AuthContext);
  const { profile_state, profile_dispatch } = React.useContext(ProfileContext);
  const { modal_state, modal_dispatch } = React.useContext(ModalContext);

  let url = auth_state.url;

  const user_id =
    localStorage.getItem("token") && jwt_decode(localStorage.getItem("token"));

  const fetch_user = () => {
    let myHeaders = new Headers();
    myHeaders.append("x-access-token", localStorage.getItem("token"));
    fetch(`${url}/user_profile/${location.state.user_id}`, {
      method: "GET",
      headers: myHeaders
    })
      .then(res => res.json())
      .then(data => {
        profile_dispatch({ type: "FETCH_PROFILE", payload: data.user_profile });
        profile_dispatch({
          type: "FETCH_USER_POSTS",
          payload: data.user_posts
        });
      })
      .catch(err => console.log(err));
  };
  React.useEffect(() => {
    fetch_user();
  }, []);
  const close_modal = () => {
    modal_dispatch({ type: "CLOSE_MODAL" });
  };
  return (
    <MainContainer>
      {profile_state.profile.length == 0 ? (
        <Loader />
      ) : (
        <Fade bottom duration={900} distance="40px">
          <ContentConatainer>
            {profile_state.profile.map(profile => (
              <ProfileContainer>
                <CoverPhoto src={`${url}/${profile.coverphoto}`} />
                <UserImg src={`${url}/${profile.user_img}`} />
                <FullName>{profile.full_name}</FullName>
                <Bio>{profile.bio}</Bio>
                {user_id == profile.user_id ? (
                  <EditProfileButton
                    onClick={() => history.push("/editprofile")}
                  >
                    Edit Profile
                  </EditProfileButton>
                ) : (
                  <EditProfileButton
                    onClick={() => window.open(profile.email, "_blank")}
                  >
                    Send Email
                  </EditProfileButton>
                )}
              </ProfileContainer>
            ))}
            {profile_state.user_posts.map(post => (
              <PostsContainer>
                <PostCard post={post} />
              </PostsContainer>
            ))}
            {modal_state.modal_open ? (
              <CommentModal
                close_modal={close_modal}
                post_id={modal_state.post_id}
                post_media={modal_state.post_media}
                is_video={modal_state.is_video}
                full_name={modal_state.full_name}
              />
            ) : null}
          </ContentConatainer>
        </Fade>
      )}
    </MainContainer>
  );
};
export default SingleProfile;