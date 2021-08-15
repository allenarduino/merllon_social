import React from "react";
import { AuthContext } from "../../contexts/AuthContextProvider";
import { ProfileContext } from "../../contexts/ProfileContextProvider";
import jwt_decode from "jwt-decode";
import { Fade } from "react-reveal";
import * as Icon from "react-feather";
import {
  MainContainer,
  ContentConatainer,
  ProfileContainer,
  CoverPhoto,
  UserImg,
  NameInput,
  BioInput,
  SaveButton,
  FileInput
} from "./styles";

const EditProfile = () => {
  const [user_img, setUser_img] = React.useState(null);
  const [coverphoto, setCoverphoto] = React.useState(null);
  const [user_imgPreview, setUser_imgPreview] = React.useState(null);
  const [coverphotoPreview, setCoverphotoPreview] = React.useState(null);
  const [coverphoto_selected, setCoverphotoSelected] = React.useState(false);
  const [user_img_selected, setUserImgSelected] = React.useState(false);
  const [name, setName] = React.useState("");
  const [bio, setBio] = React.useState("");
  const { auth_state, auth_dispatch } = React.useContext(AuthContext);
  const { profile_state, profile_dispatch } = React.useContext(ProfileContext);
  let url = auth_state.url;

  const user_id =
    localStorage.getItem("token") && jwt_decode(localStorage.getItem("token"));

  const handle_name_change = e => {
    setName(e.target.value);
  };

  const handle_bio_change = e => {
    setBio(e.target.value);
  };

  const handle_coverphoto_change = e => {
    setCoverphotoPreview(URL.createObjectURL(e.target.files[0]));
    setCoverphoto(e.target.files[0]);
    setCoverphotoSelected(true);
  };
  const handle_user_img_change = e => {
    setUser_imgPreview(URL.createObjectURL(e.target.files[0]));
    setUser_img(e.target.files[0]);
    setUserImgSelected(true);
  };

  return (
    <MainContainer>
      <Fade bottom duration={900} distance="40px">
        <ContentConatainer>
          {profile_state.profile.map(profile => (
            <ProfileContainer>
              <CoverPhoto
                src={
                  coverphoto_selected
                    ? coverphotoPreview
                    : `${url}/${profile.coverphoto}`
                }
              />
              <label style={{ alignSelf: "flex-end", marginRight: 10 }}>
                <FileInput
                  type="file"
                  required
                  onChange={handle_coverphoto_change}
                  accept="image/x-png,image/jpeg,image/jpg"
                />
                <Icon.Camera />
              </label>
              <UserImg
                src={
                  user_img_selected
                    ? user_imgPreview
                    : `${url}/${profile.user_img}`
                }
              />
              <label style={{ alignSelf: "center", marginTop: -10 }}>
                <FileInput
                  type="file"
                  required
                  onChange={handle_user_img_change}
                  accept="image/x-png,image/jpeg,image/jpg"
                />
                <Icon.Camera />
              </label>

              <NameInput
                placeholder={profile.full_name}
                className="form-control"
                onChange={handle_name_change}
                value={name}
              />
              <BioInput
                placeholder={profile.bio}
                className="form-control"
                onChange={handle_bio_change}
                value={bio}
              />
              <SaveButton>Save</SaveButton>
            </ProfileContainer>
          ))}
        </ContentConatainer>
      </Fade>
    </MainContainer>
  );
};

export default EditProfile;
