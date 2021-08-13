import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { AuthContext } from "./contexts/AuthContextProvider";
import BottomTab from "./components/BottomTab/BottomTab";
import Login from "./pages/login/Login";
import Register from "./pages/register/Register";
import Home from "./pages/home/Home";
import Header from "./components/Header/Header";
import CreatePost from "./pages/CreatePost";

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
          <BottomTab />
        </React.Fragment>
      ) : null}
      {auth_state.isLoggedIn ? (
        <Switch>
          <Route exact path="/" component={Home} />
          <Route path="/create_post" component={CreatePost} />
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
