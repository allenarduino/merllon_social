import React from "react";
import CreatePostHeader from "../../components/CreatePostHeader/CreatePostHeader";
import { MyImage, MyImageContainer } from "./styles";
import { useLocation } from "react-router-dom";
import { SelectMediaContext } from "../../contexts/SelectMediaContextProvider";

const PostImage = () => {
  const location = useLocation();
  const { media_state } = React.useContext(SelectMediaContext);
  return (
    <div>
      <CreatePostHeader />
      <MyImageContainer>
        <MyImage src={media_state.mediaPreview} />
      </MyImageContainer>
    </div>
  );
};

export default PostImage;
