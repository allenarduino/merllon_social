import React from "react";
import { useLocation, useHistory, Link } from "react-router-dom";
import { BottomNav, BnTab, OptionsContainer, FileInput } from "./styles";
import * as Icon from "react-feather";
import Sheet from "react-modal-sheet";
import { SelectMediaContext } from "../../contexts/SelectMediaContextProvider";

const BottomTab = props => {
  const location = useLocation();
  const history = useHistory();
  const [isOpen, setOpen] = React.useState(false);

  const { media_dispatch } = React.useContext(SelectMediaContext);

  const handle_image_change = e => {
    media_dispatch({
      type: "SELECTED",
      payload1: URL.createObjectURL(e.target.files[0]),
      payload2: e.target.files[0]
    });
    history.push("/post_image");
    setOpen(false);
  };

  const handle_video_change = e => {
    history.push("/post_video");
    media_dispatch({
      type: "SELECTED",
      payload1: URL.createObjectURL(e.target.files[0]),
      payload2: e.target.files[0]
    });
    setOpen(false);
  };

  return (
    <div style={{ justifyContent: "center", display: "flex" }}>
      <BottomNav>
        <BnTab>
          {location.pathname === "/" ? (
            <Link to="/" style={{ color: "black" }}>
              <Icon.Home
                name="home-outline"
                className="mr-2 feedIcons"
                color="black"
                size={24}
              />
            </Link>
          ) : (
            <Link to="/" style={{ color: "black" }}>
              <Icon.Home className="mr-2 feedIcons" size={20} />
            </Link>
          )}
        </BnTab>
        <BnTab>
          {location.pathname === "/create_post" ? (
            <Icon.PlusCircle
              className="mr-2 feedIcons"
              color="black"
              size={24}
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
            <Link to="/profile" style={{ color: "black" }}>
              <Icon.User className="mr-2 feedIcons" color="black" size={24} />
            </Link>
          ) : (
            <Link to="/profile" style={{ color: "black" }}>
              <Icon.User className="mr-2 feedIcons" size={20} />
            </Link>
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

          <Sheet.Backdrop onClick={() => setOpen(false)} />
        </Sheet>
      </BottomNav>
    </div>
  );
};

export default BottomTab;
