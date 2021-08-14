import React from "react";
import { useLocation, Link, useHistory } from "react-router-dom";
import { BottomNav, BnTab, OptionsContainer, FileInput } from "./styles";
import * as Icon from "react-feather";
import Sheet from "react-modal-sheet";

const BottomTab = props => {
  const location = useLocation();
  const history = useHistory();
  const [isOpen, setOpen] = React.useState(true);
  const [post_media, setPostMedia] = React.useState(null);
  const [imgPreview, setImgPreview] = React.useState(null);
  const [videoPreview, setVideoPreview] = React.useState(null);

  const handle_image_change = e => {
    setImgPreview(URL.createObjectURL(e.target.files[0]));
    setPostMedia(e.target.files[0]);
    history.push("/create_post", {
      post_media: post_media,
      imgPreview: imgPreview
    });
    setOpen(false);
  };

  const handle_video_change = e => {
    setVideoPreview(URL.createObjectURL(e.target.files[0]));
    setPostMedia(e.target.files[0]);
    history.push("/create_post", {
      post_media: post_media,
      videoPreview: videoPreview
    });
    setOpen(false);
  };

  return (
    <div style={{ justifyContent: "center", display: "flex" }}>
      <BottomNav>
        <BnTab>
          {location.pathname === "/" ? (
            <Icon.Home
              onClick={() => history.push("/")}
              name="home-outline"
              className="mr-2 feedIcons"
              color="black"
              size={24}
            />
          ) : (
            <Icon.Home
              className="mr-2 feedIcons"
              size={20}
              onClick={() => history.push("/")}
            />
          )}
        </BnTab>
        <BnTab>
          {location.pathname === "/create_post" ? (
            <Icon.PlusCircle
              className="mr-2 feedIcons"
              color="black"
              size={24}
              onClick={() => history.push("/create_post")}
            />
          ) : (
            <Icon.PlusCircle
              className="mr-2 feedIcons"
              size={20}
              onClick={() => setOpen(true)}
            />
          )}
        </BnTab>
        <BnTab>
          {location.pathname === "/profile" ? (
            <Icon.User
              className="mr-2 feedIcons"
              color="black"
              size={24}
              onClick={() => history.push("/profile")}
            />
          ) : (
            <Icon.User
              className="mr-2 feedIcons"
              size={20}
              onClick={() => history.push("/profile")}
            />
          )}
        </BnTab>
        {/*****************Modal*************** */}
        <Sheet isOpen={isOpen} onClose={() => setOpen(false)}>
          <Sheet.Container style={{ height: 200, paddingLeft: 20 }}>
            <Sheet.Header />
            <Sheet.Content>
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
            </Sheet.Content>
          </Sheet.Container>

          <Sheet.Backdrop onClick={() => setOpen(false)} onDrag />
        </Sheet>
      </BottomNav>
    </div>
  );
};

export default BottomTab;
