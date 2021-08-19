import React from "react";
import CreatePostHeader from "../../components/CreatePostHeader/CreatePostHeader";
import { CenterInput, InputField, SubmitButton } from "./styles";
import { useHistory } from "react-router-dom";
import { PostContext } from "../../contexts/PostContextProvider";
import { AuthContext } from "../../contexts/AuthContextProvider";
import { ThemeContext } from "../../contexts/ThemeContextProvider";

const WritePost = () => {
  const history = useHistory();

  const { auth_state } = React.useContext(AuthContext);
  const { theme_state } = React.useContext(ThemeContext);
  const [post_caption, setPostCaption] = React.useState("");
  const [loading, controlLoading] = React.useState(false);
  let url = auth_state.url;

  const handle_post_caption_change = e => {
    setPostCaption(e.target.value);
  };
  const create_post = () => {
    if (post_caption == "") {
      alert("Please never leave the form empty");
    } else {
      controlLoading(true);
      let myHeaders = new Headers();
      myHeaders.append(
        "x-access-token",
        auth_state.token || localStorage.getItem("token")
      );
      myHeaders.append("Content-Type", "application/json");
      const data = { post_caption: post_caption };
      fetch(`${url}/write_post`, {
        method: "POST",
        headers: myHeaders,
        body: JSON.stringify(data)
      })
        .then(res => res.json())
        .then(data => {
          controlLoading(false);
          history.push("/");
        })
        .catch(err => {
          console.log(err);
          controlLoading(false);
        });
    }
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
          placeholder="Share your thoughts and experiences with people..."
          onChange={handle_post_caption_change}
          type="text"
          autoFocus
          value={post_caption}
          name="post_caption"
          style={{
            backgroundColor: theme_state.background,
            color: theme_state.color
          }}
        />

        {loading ? (
          <SubmitButton>Loading...</SubmitButton>
        ) : (
          <SubmitButton onClick={() => create_post()}>Submit</SubmitButton>
        )}
      </CenterInput>
    </div>
  );
};

export default WritePost;
