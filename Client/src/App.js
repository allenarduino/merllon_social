import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { AuthContext } from "./contexts/AuthContextProvider";
import BottomTab from "./components/BottomTab/BottomTab";
import DeskTopHeader from "./components/DeskTopHeader/DeskTopHeader";
import Login from "./pages/login/Login";
import Register from "./pages/register/Register";
import CreatePost from "./pages/createpost/CreatePost";
import Home from "./pages/home/Home";
import Profile from "./pages/profile/Profile";

const App = () => {
  const { auth_state, auth_dispatch } = React.useContext(AuthContext);
  const bootstrapAsync = async () => {
    const token = await localStorage.getItem("token");
    if (token) {
      auth_dispatch({
        type: "LOGIN",
        payload: token
      });
    } else {
      auth_dispatch({
        type: "LOGOUT"
      });
    }
  };

  React.useEffect(() => {
    bootstrapAsync();
  }, []);
  return (
    <Router>
      {auth_state.isLoggedIn ? (
        <React.Fragment>
          <DeskTopHeader />
          <BottomTab />
        </React.Fragment>
      ) : null}
      {auth_state.isLoggedIn ? (
        <Switch>
          <Route exact path="/" component={Home} />
          <Route path="/create_post" component={CreatePost} />
          <Route path="/profile" component={Profile} />
        </Switch>
      ) : (
        <Switch>
          <Route exact path="/login" component={Login} />
          <Route path="/register" component={Register} />
        </Switch>
      )}
    </Router>
  );
};
export default App;
