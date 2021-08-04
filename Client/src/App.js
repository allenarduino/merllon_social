import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { Switch } from "react-router-dom/cjs/react-router-dom.min";
import BottomTab from "./components/BottomTab/BottomTab";

function App() {
  return (
    <div style={{ backgroundColor: "blue", flex: 1 }}>
      <Router>
        <main style={{ backgroundColor: "blue", flex: 1, height: "100%" }}>
          <Switch>
            {/* <Route path="/" Component={Home} />
        <Route path="/signup" Component={Signup} />
        <Route path="/login" Component={Login} />
        <Route path="/profile" Component={Profile} />
        <Route path="/singlepost/:id" Component={SinglePost} />
*/}
          </Switch>
          <BottomTab />
        </main>
      </Router>
    </div>
  );
}
export default App;
