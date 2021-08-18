import React from "react";
import {
  CommentModalDesign,
  MainModal,
  PostImage,
  RightSide,
  CommentInput,
  FormContainer,
  SubMit,
  PostVideo
} from "./styles";
import { AuthContext } from "../../contexts/AuthContextProvider";
import { PostContext } from "../../contexts/PostContextProvider";
import { ModalContext } from "../../contexts/ModalContextProvider";
import * as Icon from "react-feather";
import CommentCard from "../CommentCard/CommentCard";
import ReactPlayer from "react-player";

//This modal is for Desktop Devices
const CommentModal = props => {
  const { post_state } = React.useContext(PostContext);
  const { auth_state } = React.useContext(AuthContext);
  const { modal_state } = React.useContext(ModalContext);
  let url = auth_state.url;
  const [comments, setComments] = React.useState([]);
  const [comment_text, setComment] = React.useState("");

  //For fetching user_img in context to use it offline
  const user_img = post_state.user.map(user => {
    return user.user_img;
  });
  const fetch_comments = () => {
    let myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    fetch(`${url}/fetch_comments/${props.post_id}`, {
      method: "GET",
      headers: myHeaders
    })
      .then(res => res.json())
      .then(data => {
        setComments(data.comments);
      })
      .catch(err => console.log(err));
  };
  const handle_comment_change = e => {
    setComment(e.target.value);
  };

  const offline_comment = {
    text: comment_text,
    user_img: user_img,
    full_name: props.full_name
  };

  const create_comment = e => {
    e.preventDefault();
    if (comment_text == "") {
      return;
    } else {
      setComments([...comments, offline_comment]);
      setComment("");
      //Sending comment to the server
      let myHeaders = new Headers();
      myHeaders.append(
        "x-access-token",
        auth_state.token || localStorage.getItem("token")
      );
      myHeaders.append("Content-Type", "application/json");
      const data = { comment_text: comment_text };
      fetch(`${url}/create_comment/${props.post_id}`, {
        method: "POST",
        headers: myHeaders,
        body: JSON.stringify(data)
      })
        .then(res => res.json())
        .then(data => {
          console.log(data.comments);
        })
        .catch(err => console.log(err));
    }
  };

  React.useEffect(() => {
    fetch_comments();
  }, []);
  return (
    <div>
      <CommentModalDesign onClick={props.close_modal}>
        <MainModal onClick={e => e.stopPropagation()}>
          {props.is_video == "false" ? (
            <PostImage src={`${url}/${props.post_media}`} />
          ) : (
            <PostVideo controls style={{ height: "100%" }}>
              <source src={`${url}/${props.post_media}`}></source>
            </PostVideo>
          )}
          <RightSide>
            {comments.map(comment => (
              <CommentCard comment={comment} />
            ))}

            <FormContainer onSubmit={create_comment}>
              <CommentInput
                placeholder="Write Commment"
                value={comment_text}
                onChange={handle_comment_change}
              />
              <SubMit type="submit" />
            </FormContainer>
          </RightSide>
        </MainModal>
      </CommentModalDesign>
    </div>
  );
};
export default CommentModal;
