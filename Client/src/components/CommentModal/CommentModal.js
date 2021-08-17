import React from "react";
import {
  CommentModalDesign,
  MainModal,
  PostImage,
  RightSide,
  CommentInput,
  FormContainer,
  SubMit
} from "./styles";
import { AuthContext } from "../../contexts/AuthContextProvider";
import * as Icon from "react-feather";
import CommentCard from "../CommentCard/CommentCard";

const CommentModal = props => {
  const { auth_state } = React.useContext(AuthContext);
  let url = auth_state.url;
  const [comments, setComments] = React.useState([]);
  const [comment, setComment] = React.useState("");
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

  const create_comment = e => {
    e.preventDefault();
    if (comment == "") {
      return;
    } else {
      setComments([...comments, comment]);
      setComment("");
    }
  };
  return (
    <div>
      <CommentModalDesign onClick={props.close_modal}>
        <MainModal onClick={e => e.stopPropagation()}>
          <PostImage src={`${url}/${props.post_media}`} />
          <RightSide>
            {comments.map(comment => (
              <CommentCard comment={comment} />
            ))}

            <FormContainer onSubmit={create_comment}>
              <CommentInput
                placeholder="Write Commment"
                value={comment}
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
