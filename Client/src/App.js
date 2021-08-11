import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { Switch } from "react-router-dom/cjs/react-router-dom.min";
import Home from "./pages/Home";
import Search from "./pages/Search";
import Profile from "./pages/Profile";
import { AuthContext } from "./contexts/AuthContextProvider";
import BottomTab from "./components/BottomTab/BottomTab";
import TopNav from "./components/TopNav";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
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
    <div style={{ flex: 1 }}>
      <Router>
        <main style={{ flex: 1, height: "100%" }}>
          {auth_state.isLoggedIn ? <BottomTab /> : <Login />}

          <Switch>
            <Route exact path="/" component={Home} />
            <Route path="/create_post" component={CreatePost} />
            <Route path="/profile" component={Profile} />
            <Route path="/register" component={Signup} />
            <Route path="/login" component={Login} />
          </Switch>
        </main>
      </Router>
    </div>
  );
};
export default App;
