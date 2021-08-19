import React from "react";
import { AuthContext } from "../../contexts/AuthContextProvider";
import { ProfileContext } from "../../contexts/ProfileContextProvider";
import { ThemeContext } from "../../contexts/ThemeContextProvider";
import { useHistory, useLocation } from "react-router-dom";

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

const SingleProfile = () => {
  const history = useHistory();
  const location = useLocation();
  const { auth_state } = React.useContext(AuthContext);
  const { profile_state, profile_dispatch } = React.useContext(ProfileContext);
  const { theme_state } = React.useContext(ThemeContext);

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

  return (
    <MainContainer style={{ backgroundColor: theme_state.background }}>
      {profile_state.profile.length == 0 ? (
        <Loader />
      ) : (
        <Fade bottom duration={900} distance="40px">
          <ContentConatainer>
            {profile_state.profile.map(profile => (
              <ProfileContainer>
                <CoverPhoto
                  src={profile.coverphoto}
                  onClick={() =>
                    history.push("/view_image", { image: profile.coverphoto })
                  }
                />
                <UserImg
                  src={profile.user_img}
                  onClick={() =>
                    history.push("/view_image", { image: profile.user_img })
                  }
                />
                <FullName style={{ color: theme_state.color }}>
                  {profile.full_name}
                </FullName>
                <Bio style={{ color: theme_state.color }}>{profile.bio}</Bio>
                {user_id == profile.user_id ? (
                  <EditProfileButton
                    onClick={() => history.push("/editprofile")}
                  >
                    Edit Profile
                  </EditProfileButton>
                ) : (
                  <EditProfileButton
                    onClick={() => window.open(`mailto:${profile.email}`)}
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
          </ContentConatainer>
        </Fade>
      )}
    </MainContainer>
  );
};
export default SingleProfile;
