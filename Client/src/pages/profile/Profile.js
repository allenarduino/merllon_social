import React from "react";
import { AuthContext } from "../../contexts/AuthContextProvider";
import { ProfileContext } from "../../contexts/ProfileContextProvider";
import { useHistory } from "react-router-dom";

import Loader from "../../components/Loader/Loader";
import PostCard from "../../components/PostCard/PostCard";
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

const Profile = () => {
  const history = useHistory();
  const { auth_state, auth_dispatch } = React.useContext(AuthContext);
  const { profile_state, profile_dispatch } = React.useContext(ProfileContext);
  let url = auth_state.url;

  const user_id =
    localStorage.getItem("token") && jwt_decode(localStorage.getItem("token"));

  const fetch_user = () => {
    let myHeaders = new Headers();
    myHeaders.append("x-access-token", localStorage.getItem("token"));
    fetch(`${url}/user_profile/${user_id}`, {
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
                <EditProfileButton onClick={() => history.push("/editprofile")}>
                  Edit Profile
                </EditProfileButton>
              </ProfileContainer>
            ))}
            {profile_state.user_posts.map(post => (
              <PostsContainer>
                <PostCard post={post} />
              </PostsContainer>
            ))}
          </ContentConatainer>
        </Fade>
      )}
    </MainContainer>
  );
};
export default Profile;
