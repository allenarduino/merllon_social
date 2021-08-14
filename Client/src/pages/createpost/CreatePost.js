import React from "react";
import { useLocation } from "react-router-dom";
import ReactPlayer from "react-player";
const CreatePost = () => {
  const location = useLocation();
  return (
    <div>
      CreatePost
      <img src={location.state.imgPreview} />
    </div>
  );
};
export default CreatePost;
