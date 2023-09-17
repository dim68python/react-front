import {
  Paper,
  Grid,
  Avatar,
  Typography,
  TextField,
  Button,
  Box,
  Snackbar,
  Alert,
} from "@mui/material";
import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { useImmerReducer } from "use-immer";

const baseUrl = "https://8000-dee68-ilx-m1qv6b8vv9s.ws-eu104.gitpod.io";
//const baseUrl = "https://ilx-3022db9b1ed6.herokuapp.com";

const Register = () => {
  const paperType = {
    margin: "80px auto",
    padding: "5px",
    border: "2px solid #feb55f",
  };
  const avatarType = { backgroundColor: "#feb55f", color: "white" };
  const textFieldType = { marginBottom: "10px" };
  const anchor = { color: "#feb55f" };
  const navigate = useNavigate();

  const initialState = {
    emailValue: "",
    usernameValue: "",
    passwordValue: "",
    re_passwordValue: "",
    sendRequest: 0,
    openSnack: false,
    disabledBtn: false,
    usernameErrors: {
      hasErrors: false,
      errorMessage: "",
    },
    emailErrors: {
      hasErrors: false,
      errorMessage: "",
    },
    passwordErrors: {
      hasErrors: false,
      errorMessage: "",
    },
    re_passwordText: "",
    serverMessageUsername: "",
    serverMessageEmail: "",
    serverMessageSimilarPassword: "",
    serverMessageCommonPassword: "",
    serverMessageNumericPassword: "",
  };
  function ReducerFunction(draft, action) {
    switch (action.type) {
      case "catchEmailChange":
        draft.emailValue = action.emailChosen;
        draft.emailErrors.hasErrors = false;
        draft.emailErrors.errorMessage = "";
        draft.serverMessageEmail = "";
        break;
      case "catchUsernameChange":
        draft.usernameValue = action.usernameChosen;
        draft.usernameErrors.hasErrors = false;
        draft.usernameErrors.errorMessage = "";
        draft.serverMessageUsername = "";
        break;
      case "catchPasswordChange":
        draft.passwordValue = action.passwordChosen;
        draft.passwordErrors.hasErrors = false;
        draft.passwordErrors.errorMessage = "";
        draft.serverMessageSimilarPassword = "";
        draft.serverMessageCommonPassword = "";
        draft.serverMessageNumericPassword = "";
        break;
      case "catchPassword1Change":
        draft.re_passwordValue = action.re_passwordChosen;
        if (action.re_passwordChosen !== draft.passwordValue) {
          draft.re_passwordText = "Passwords must match!";
        } else if (action.re_passwordChosen === draft.passwordValue) {
          draft.re_passwordText = "";
        }
        break;
      case "disableTheBtn":
        draft.disabledBtn = true;
        break;
      case "allowTheBtn":
        draft.disabledBtn = false;
        break;
      case "catchUsernameError":
        if (action.usernameChosen.length === 0) {
          draft.usernameErrors.hasErrors = true;
          draft.usernameErrors.errorMessage = "This field must not be empty!";
        } else if (
          action.usernameChosen.length < 2 ||
          action.usernameChosen.length > 20
        ) {
          draft.usernameErrors.hasErrors = true;
          draft.usernameErrors.errorMessage =
            "The username must be at least 2 characters!";
        } else if (!/^([a-zA-Z0-9]+)$/.test(action.usernameChosen)) {
          draft.usernameErrors.hasErrors = true;
          draft.usernameErrors.errorMessage =
            "The username must contain only alphanumeric characters.";
        }
        break;
      case "catchEmailError":
        if (
          !/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
            action.emailChosen
          )
        ) {
          draft.emailErrors.hasErrors = true;
          draft.emailErrors.errorMessage =
            "Please enter a valid email address.";
        }
        break;
      case "catchPasswordError":
        if (action.passwordChosen.length < 8) {
          draft.passwordErrors.hasErrors = true;
          draft.passwordErrors.errorMessage =
            "The password must have at least 8 characters.";
        }

        break;
      case "userExists":
        draft.serverMessageUsername = "User with this username already exists";
        break;
      case "emailExists":
        draft.serverMessageEmail = "User with this email already exists";
        break;
      case "similarPassword":
        draft.serverMessageSimilarPassword =
          "The password is too similar to the username!";
        break;
      case "commonPassword":
        draft.serverMessageCommonPassword = "The password is too common!";
        break;
      case "numericPassword":
        draft.serverMessageNumericPassword =
          "The password field can't be only numeric!";
        break;
      case "changeSendRequest":
        draft.sendRequest = draft.sendRequest + 1;
        break;
      case "openTheSnack":
        draft.openSnack = true;
        break;
      default:
        return;
    }
  }

  const [state, dispatch] = useImmerReducer(ReducerFunction, initialState);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("form submitted");
    if (
      !state.usernameErrors.hasErrors &&
      !state.emailErrors.hasErrors &&
      !state.passwordErrors.hasErrors &&
      state.re_passwordText === ""
    ) {
      dispatch({ type: "changeSendRequest" });
      dispatch({ type: "disableTheBtn" });
    }
  };

  //Register user
  useEffect(() => {
    if (state.sendRequest) {
      const source = axios.CancelToken.source();
      async function Signup() {
        try {
          await axios
            .post(
              //"https://ilx-3022db9b1ed6.herokuapp.com/auth/users/",
              `${baseUrl}/auth/users/`,
              {
                email: state.emailValue,
                username: state.usernameValue,
                password: state.passwordValue,
                re_password: state.re_passwordValue,
              },
              {
                headers: {
                  "Content-Type": "application/json",
                },
              },
              { cancelToken: source.token }
            )
            .then((response) => {
              console.log(response);
              dispatch({ type: "openTheSnack" });
            });
        } catch (error) {
          console.log("Response data:", error.response);
          dispatch({ type: "allowTheBtn" });
          if (error.response.data.username) {
            dispatch({ type: "userExists" });
          } else if (error.response.data.email) {
            dispatch({ type: "emailExists" });
          } else if (
            error.response.data.password[0] ===
            "The password is too similar to the username."
          ) {
            dispatch({ type: "similarPassword" });
          } else if (
            error.response.data.password[0] === "This password is too common."
          ) {
            dispatch({ type: "commonPassword" });
          } else if (
            error.response.data.password[0] ===
            "This password is entirely numeric."
          ) {
            dispatch({ type: "numericPassword" });
          }
        }
      }
      Signup();
      return () => {
        source.cancel();
      };
    }
  }, [state.sendRequest]);

  //success message before redirect
  useEffect(() => {
    if (state.openSnack) {
      setTimeout(() => {
        navigate("/created");
      }, 2500);
    }
  }, [state.openSnack]);

  return (
    <div>
      <Grid container>
        <Paper
          style={paperType}
          elevation={20}
          sx={{ width: { xs: "90%", sm: "80%", md: "40%" } }}
        >
          <Grid align="center" sx={{ marginBottom: "10px" }} xs={12}>
            <Avatar style={avatarType}>{/* <AddCircleOutlineIcon /> */}</Avatar>
            <h2>SignUp</h2>
            <Typography variant="caption">
              Please fill in the fields below to create an account.
            </Typography>
            {state.serverMessageEmail ? (
              <Alert severity="error">{state.serverMessageEmail}</Alert>
            ) : (
              ""
            )}
            {state.serverMessageUsername ? (
              <Alert severity="error">{state.serverMessageUsername}</Alert>
            ) : (
              ""
            )}
            {state.serverMessageSimilarPassword ? (
              <Alert severity="error">
                {state.serverMessageSimilarPassword}
              </Alert>
            ) : (
              ""
            )}
            {state.serverMessageCommonPassword ? (
              <Alert severity="error">
                {state.serverMessageCommonPassword}
              </Alert>
            ) : (
              ""
            )}
            {state.serverMessageNumericPassword ? (
              <Alert severity="error">
                {state.serverMessageNumericPassword}
              </Alert>
            ) : (
              ""
            )}
          </Grid>
          <Grid item xs={2}></Grid>
          <Grid item xs={8} sx={{ marginRight: "auto", marginLeft: "auto" }}>
            <form onSubmit={handleSubmit}>
              <TextField
                fullWidth
                label="Email"
                type="email"
                name="email"
                value={state.emailValue}
                variant="filled"
                onChange={(e) =>
                  dispatch({
                    type: "catchEmailChange",
                    emailChosen: e.target.value.trim(),
                  })
                }
                placeholder="Enter a valid email"
                style={textFieldType}
                onBlur={(e) =>
                  dispatch({
                    type: "catchEmailError",
                    emailChosen: e.target.value.trim(),
                  })
                }
                error={state.emailErrors.hasErrors ? true : false}
                helperText={state.emailErrors.errorMessage}
              />
              <TextField
                fullWidth
                label="Username"
                variant="filled"
                name="username"
                value={state.usernameValue}
                placeholder="Enter username"
                onChange={(e) =>
                  dispatch({
                    type: "catchUsernameChange",
                    usernameChosen: e.target.value.trim(),
                  })
                }
                style={textFieldType}
                onBlur={(e) =>
                  dispatch({
                    type: "catchUsernameError",
                    usernameChosen: e.target.value.trim(),
                  })
                }
                error={state.usernameErrors.hasErrors ? true : false}
                helperText={state.usernameErrors.errorMessage}
              />

              <TextField
                fullWidth
                label="Password"
                type="password"
                variant="filled"
                name="password"
                value={state.passwordValue}
                onChange={(e) =>
                  dispatch({
                    type: "catchPasswordChange",
                    passwordChosen: e.target.value.trim(),
                  })
                }
                placeholder="Enter password"
                style={textFieldType}
                onBlur={(e) =>
                  dispatch({
                    type: "catchPasswordError",
                    passwordChosen: e.target.value.trim(),
                  })
                }
                error={state.passwordErrors.hasErrors ? true : false}
                helperText={state.passwordErrors.errorMessage}
              />
              <TextField
                fullWidth
                label="Confirm Password"
                type="password"
                variant="filled"
                name="re_password"
                value={state.re_passwordValue}
                onChange={(e) =>
                  dispatch({
                    type: "catchPassword1Change",
                    re_passwordChosen: e.target.value.trim(),
                  })
                }
                placeholder="Confirm password"
                style={textFieldType}
                helperText={state.re_passwordText}
              />
              <Button
                variant="contained"
                type="submit"
                //onClick={handleSubmit}
                sx={{
                  backgroundColor: "#feb55f",
                  color: "white",
                  "&:hover": { backgroundColor: "black", color: "#feb55f" },
                }}
                style={textFieldType}
                fullWidth
                disabled={state.disabledBtn}
              >
                SignUp
              </Button>
              <Box display="flex">
                <Typography variant="p">
                  <span style={{ cursor: "pointer" }}>
                    Already have an account?{" "}
                    <Link to="/login" style={anchor}>
                      SignIn
                    </Link>
                  </span>
                </Typography>
              </Box>
            </form>
          </Grid>
          <Grid item xs={2}></Grid>
        </Paper>
      </Grid>
      <Snackbar
        open={state.openSnack}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert severity="success">
          You have successfully created an account!
        </Alert>
      </Snackbar>
    </div>
  );
};

export default Register;
