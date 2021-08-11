import React from "react";
import { PostContext } from "../contexts/PostContextProvider";
import { AuthContext } from "../contexts/AuthContextProvider";

import { Fade } from "react-reveal";
import { TopNav, HeaderText } from "../components/HomeStyle";
import Loader from "../components/Loader/Loader";
import * as Icon from "react-feather";
import jwt_decode from "jwt-decode";

const Home = () => {
  const { post_state, post_dispatch } = React.useContext(PostContext);
  const { auth_state, auth_dispatch } = React.useContext(AuthContext);
  let url = auth_state.url;

  const user_id =
    localStorage.getItem("token") && jwt_decode(localStorage.getItem("token"));

  const fetch_posts = () => {
    let myHeaders = new Headers();
    myHeaders.append(
      "x-access-token",
      auth_state.token || localStorage.getItem("token")
    );
    fetch(`${url}/posts`, {
      method: "GET",
      headers: myHeaders
    })
      .then(res => res.json())
      .then(data => {
        post_dispatch({ type: "FETCH_POSTS", payload: data.posts });
      })
      .catch(err => console.log(err));
  };

  React.useEffect(() => {
    fetch_posts();
  }, [auth_state.token, post_state.token]);
  return (
    <div>
      {!post_state.posts.length == 0 ? (
        post_state.posts.map((post, index) => (
          <Container key={index}>
            <h1>KK</h1>
          </Container>
        ))
      ) : (
        <Loader />
      )}
    </div>
  );
};

export default Home;
