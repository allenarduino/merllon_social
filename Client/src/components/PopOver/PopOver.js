import React from "react";
import { useHistory } from "react-router-dom";
import { PopOverContainer, OptionsContainer, FileInput } from "./styles";
import * as Icon from "react-feather";
import { SelectMediaContext } from "../../contexts/SelectMediaContextProvider";

const PopOver = () => {
  const history = useHistory();
  const { media_dispatch } = React.useContext(SelectMediaContext);

  const handle_image_change = e => {
    media_dispatch({
      type: "SELECTED",
      payload1: URL.createObjectURL(e.target.files[0]),
      payload2: e.target.files[0]
    });
    history.push("/post_image");
  };

  const handle_video_change = e => {
    history.push("/post_video");
    media_dispatch({
      type: "SELECTED",
      payload1: URL.createObjectURL(e.target.files[0]),
      payload2: e.target.files[0]
    });
  };
  return (
    <PopOverContainer>
      <label>
        <OptionsContainer>
          <FileInput
            type="file"
            required
            onChange={handle_image_change}
            accept="image/x-png,image/jpeg,image/jpg"
          />
          Add Photo <Icon.Image style={{ marginLeft: 10 }} />
        </OptionsContainer>
      </label>
      <label>
        <OptionsContainer>
          <FileInput
            type="file"
            required
            onChange={handle_video_change}
            accept="video/mp4,video/x-m4v,video/mp3,video/*"
          />
          Add Video <Icon.Video style={{ marginLeft: 10 }} />
        </OptionsContainer>
      </label>
    </PopOverContainer>
  );
};

export default PopOver;
