import React from "react";
import { useHistory, Link } from "react-router-dom";
import { AuthContext } from "../contexts/AuthContextProvider";
import {
  FormContainer,
  CreatePostBackground,
  NameInput,
  Button,
  CenterInput,
  HeaderText,
  Form,
  FileInput,
  ChooseImgBox,
  ImagePreview,
  LoadingButton
} from "../components/CreatePostStyle";
import { Fade } from "react-reveal";
const CreatePost = () => {
  const history = useHistory();
  const { auth_state, auth_dispatch } = React.useContext(AuthContext);
  let url = auth_state.url;

  const [post_caption, setPostCaption] = React.useState("");
  const [post_media, setPostMedia] = React.useState(null);
  const [imgPreview, setImgPreview] = React.useState(null);
  const [error, setError] = React.useState("");
  const [loading, controlLoading] = React.useState(false);

  const handle_post_caption_change = e => {
    setPostCaption(e.target.value);
  };

  const handle_post_media_change = e => {
    setImgPreview(URL.createObjectURL(e.target.files[0]));
    setPostMedia(e.target.files[0]);
  };

  const create_post = e => {
    e.preventDefault();
    controlLoading(true);
    const data = new FormData();
    data.append("post_caption", post_caption);
    data.append("post_media", post_media);
    data.append("is_video", false);
    let myHeaders = new Headers();
    myHeaders.append(
      "x-access-token",
      auth_state.token || localStorage.getItem("token")
    );
    fetch(`${url}/create_post`, {
      method: "POST",
      body: data,
      headers: myHeaders
    })
      .then(res => res.json())
      .then(data => {
        controlLoading(false);
        //alert(data.message);
        history.push("/");
      })
      .catch(err => {
        controlLoading(false);
        alert(err);
      });
  };
  return (
    <CreatePostBackground>
      <HeaderText>Create Post</HeaderText>
      <Fade bottom duration={900} distance="40px">
        <FormContainer>
          <Form onSubmit={create_post}>
            <CenterInput>
              <NameInput
                onChange={handle_post_caption_change}
                required
                type="text"
                placeholder="Add Caption"
                value={post_caption}
                name="post_caption"
              />
            </CenterInput>

            <label>
              <FileInput
                type="file"
                required
                onChange={handle_post_media_change}
                accept="image/x-png,image/jpeg,image/jpg"
              />
              {post_media == null ? (
                <ChooseImgBox>
                  <b>Select Image</b>
                </ChooseImgBox>
              ) : (
                <ImagePreview src={imgPreview} />
              )}
            </label>

            <CenterInput>
              {loading ? (
                <LoadingButton>Loading...</LoadingButton>
              ) : (
                <Button value="Submit" type="submit" />
              )}
            </CenterInput>
            <CenterInput></CenterInput>
          </Form>
        </FormContainer>
      </Fade>
    </CreatePostBackground>
  );
};
export default CreatePost;
