import React, { useState, ChangeEvent } from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";
import { useApolloClient, useMutation } from "@apollo/react-hooks";
import { LOGIN_USER } from "../shared/graphql/mutations";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      width: "33%",
      height: "50%",
      backgroundColor: "white",
      padding: 20,
      color: "#7986cb",
      WebkitBoxShadow: "-22px 0px 48px 0px rgba(0, 0, 0, 0.75)",
      MozBoxShadow: "-22px 0px 48px 0px rgba(0, 0, 0, 0.75)",
      boxShadow: "-22px 0px 48px 0px rgba(0, 0, 0, 0.75)",
      display: "block",
      margin: "auto",
    },
  })
);

const Login = () => {
  const classes = useStyles();

  const client = useApolloClient();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loginUser] = useMutation(LOGIN_USER, {
    onCompleted({ loginUser }) {
      if (loginUser.accessToken) {
        localStorage.setItem("token", loginUser.accessToken);
        client.writeData({ data: { isLoggedIn: true } });
      }
    },
  });

  const handleUsernameChange = (event: ChangeEvent<HTMLInputElement>) => {
    setError("");
    setUsername(event.target.value);
  };

  const handlePasswordChange = (event: ChangeEvent<HTMLInputElement>) => {
    setError("");
    setPassword(event.target.value);
  };

  return (
    <div className={classes.root}>
      <p>Login</p>
      <TextField
        error={!!error}
        label="Username"
        variant="outlined"
        fullWidth
        margin="normal"
        value={username}
        onChange={handleUsernameChange}
        helperText={error}
      />
      <TextField
        error={!!error}
        label="Password"
        type="password"
        variant="outlined"
        fullWidth
        margin="normal"
        value={password}
        onChange={handlePasswordChange}
        helperText={error}
      />
      <Button
        variant="contained"
        color="primary"
        onClick={() => {
          setError("");
          loginUser({ variables: { loginInput: { username, password } } }).then(
            (result) => {},
            (error) => setError(error.message)
          );
        }}
      >
        Login
      </Button>
    </div>
  );
};

export default Login;
