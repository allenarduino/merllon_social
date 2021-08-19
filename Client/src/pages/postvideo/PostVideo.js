import React from "react";
import CreatePostHeader from "../../components/CreatePostHeader/CreatePostHeader";
import { CenterInput, InputField, SubmitButton } from "./styles";
import { SelectMediaContext } from "../../contexts/SelectMediaContextProvider";
import { AuthContext } from "../../contexts/AuthContextProvider";
import { ThemeContext } from "../../contexts/ThemeContextProvider";
import { PostContext } from "../../contexts/PostContextProvider";
import ReactPlayer from "react-player";
import { useHistory } from "react-router-dom";

const PostVideo = () => {
  const history = useHistory();
  const { media_state } = React.useContext(SelectMediaContext);
  const { auth_state } = React.useContext(AuthContext);
  const { theme_state } = React.useContext(ThemeContext);
  const { post_dispatch } = React.useContext(PostContext);
  const [post_caption, setPostCaption] = React.useState("");
  const [loading, controlLoading] = React.useState(false);
  let url = auth_state.url;

  const handle_post_caption_change = e => {
    setPostCaption(e.target.value);
  };
  const create_post = () => {
    controlLoading(true);
    const data = new FormData();
    data.append("post_caption", post_caption);
    data.append("post_media", media_state.post_media);
    data.append("is_video", true);
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
        post_dispatch({ type: "POST_SENDING" });
        //alert(data.message);
        history.push("/");
      })
      .catch(err => {
        controlLoading(false);
        alert(err);
      });
  };
  return (
    <div
      style={{
        display: "flex",
        height: "100vh",
        justifyContent: "center",
        backgroundColor: theme_state.background
      }}
    >
      <CreatePostHeader create_post={create_post} />
      <CenterInput>
        <InputField
          placeholder="Add Caption"
          onChange={handle_post_caption_change}
          type="text"
          placeholder="Add Caption"
          value={post_caption}
          name="post_caption"
          style={{
            backgroundColor: theme_state.background,
            color: theme_state.color
          }}
        />
        <div style={{ height: 200 }}>
          <ReactPlayer
            url={media_state.mediaPreview}
            style={{ top: 0 }}
            controls={true}
            width="100%"
            height="100%"
          />
        </div>
        <div style={{ alignSelf: "center" }}>
          {loading ? (
            <SubmitButton>loading...</SubmitButton>
          ) : (
            <SubmitButton onClick={() => create_post()}>Submit</SubmitButton>
          )}
        </div>
      </CenterInput>
    </div>
  );
};

export default PostVideo;
