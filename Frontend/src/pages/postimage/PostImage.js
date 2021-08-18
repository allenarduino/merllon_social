import React from "react";
import CreatePostHeader from "../../components/CreatePostHeader/CreatePostHeader";
import { MyImage, CenterInput, InputField, SubmitButton } from "./styles";
import { useHistory } from "react-router-dom";
import { SelectMediaContext } from "../../contexts/SelectMediaContextProvider";
import { AuthContext } from "../../contexts/AuthContextProvider";

const PostImage = () => {
  const history = useHistory();
  const { media_state } = React.useContext(SelectMediaContext);
  const { auth_state } = React.useContext(AuthContext);
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
    <div style={{ display: "flex", justifyContent: "center" }}>
      <CreatePostHeader create_post={create_post} />
      <CenterInput>
        <InputField
          placeholder="Add Caption"
          onChange={handle_post_caption_change}
          type="text"
          value={post_caption}
          name="post_caption"
        />
        <MyImage src={media_state.mediaPreview} />
        {loading ? (
          <SubmitButton>Loading...</SubmitButton>
        ) : (
          <SubmitButton onClick={() => create_post()}>Submit</SubmitButton>
        )}
      </CenterInput>
    </div>
  );
};

export default PostImage;