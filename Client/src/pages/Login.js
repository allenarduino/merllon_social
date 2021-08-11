import React from "react";
import { useHistory, Link } from "react-router-dom";
import { AuthContext } from "../contexts/AuthContextProvider";
import Fade from "react-reveal";

import {
  FormContainer,
  LoginInput,
  LoginBackground,
  Button,
  CenterInput,
  HeaderText,
  Form,
  ErrorMessage,
  LoadingButton,
  LinkText,
  LoginFooter
} from "../components/LoginStyle";

const Login = () => {
  const history = useHistory();
  const { auth_state, auth_dispatch } = React.useContext(AuthContext);
  let url = auth_state.url;

  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [error, setError] = React.useState("");
  const [loading, controlLoading] = React.useState(false);

  const handle_email_change = e => {
    setEmail(e.target.value);
  };

  const handle_password_change = e => {
    setPassword(e.target.value);
  };

  const login = e => {
    e.preventDefault();
    controlLoading(true);
    const data = {
      email: email,
      password: password
    };

    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    fetch(`${url}/login`, {
      method: "POST",
      body: JSON.stringify(data),
      headers: myHeaders
    })
      .then(res => res.json())
      .then(data => {
        if (data.error == null) {
          auth_dispatch({ type: "LOGIN", payload: data });
          //history.push("/add_category");
        } else {
          setError(data.error);
          controlLoading(false);
        }
      })
      .catch(err => {
        alert(err);
        controlLoading(false);
      });
  };

  return (
    <LoginBackground>
      <Fade bottom duration={2000} distance="40px">
        <FormContainer>
          <HeaderText>Login to Merllon</HeaderText>
          <Form onSubmit={login}>
            <CenterInput>
              <LoginInput
                onChange={handle_email_change}
                required
                type="email"
                placeholder="Email Address"
                value={email}
                name="email"
              />
            </CenterInput>
            <CenterInput>
              <LoginInput
                onChange={handle_password_change}
                required
                type="password"
                placeholder="Password"
                value={password}
                name="password"
              />
            </CenterInput>
            <CenterInput>
              <ErrorMessage>{error}</ErrorMessage>
            </CenterInput>
            <CenterInput>
              {loading ? (
                <LoadingButton>Loading...</LoadingButton>
              ) : (
                <Button value="Login" type="submit" />
              )}
            </CenterInput>
          </Form>
          <CenterInput>
            <LoginFooter>
              Don't have an account?{" "}
              <LinkText>
                <Link to="/register">Register</Link>
              </LinkText>
            </LoginFooter>
          </CenterInput>
        </FormContainer>
      </Fade>
    </LoginBackground>
  );
};

export default Login;
