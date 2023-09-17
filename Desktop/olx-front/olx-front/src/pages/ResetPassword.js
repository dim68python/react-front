import React, { useEffect } from "react";
import { Grid, Paper, Button, TextField, Typography } from "@mui/material";
import axios from "axios";
import { useImmerReducer } from "use-immer";

const baseUrl = "https://8000-dee68-ilx-m1qv6b8vv9s.ws-eu104.gitpod.io";
//const baseUrl = "https://ilx-3022db9b1ed6.herokuapp.com";

const ResetPassword = () => {
  const paperType = { width: 400, margin: "20px auto", padding: "30px 20px" };
  const textFieldType = { marginBottom: "10px" };
  const initialState = {
    emailValue: "",
    sendRequest: 0,
  };

  function ReducerFunction(draft, action) {
    switch (action.type) {
      case "catchEmailChange":
        draft.emailValue = action.emailChosen;
        break;
      case "changeSendRequest":
        draft.sendRequest = draft.sendRequest + 1;
        break;
      default:
        break;
    }
  }

  const [state, dispatch] = useImmerReducer(ReducerFunction, initialState);
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("form submitted");
    dispatch({ type: "changeSendRequest" });
  };
  useEffect(() => {
    if (state.sendRequest) {
      axios
        .post(
          // 'https://8000-dee68-ilx-m1qv6b8vv9s.ws-eu102.gitpod.io/auth/users/reset_password/',
          `${baseUrl}/auth/users/reset_password/`,
          {
            email: state.emailValue,
          }
        )
        .then((response) => {
          console.log(response);
        })
        .catch((error) => {
          console.log(error.response);
        });
    }
  }, [state.sendRequest]);

  return (
    <div>
      <Grid>
        <Paper style={paperType} elevation={20}>
          <Grid align="center" sx={{ marginBottom: "10px" }}>
            <h2>Password Reset</h2>
            <Typography variant="caption">
              Forgotten your password? Enter your email address below, and we
              will send you instructions for setting a new one.
            </Typography>
          </Grid>
          <form onSubmit={handleSubmit}>
            <TextField
              fullWidth
              label="Email"
              name="email"
              type="email"
              variant="filled"
              value={state.emailValue}
              placeholder="Enter a valid email"
              style={textFieldType}
              required
              onChange={(e) =>
                dispatch({
                  type: "catchEmailChange",
                  emailChosen: e.target.value.trim(),
                })
              }
            />

            <Button
              variant="contained"
              fullWidth
              style={textFieldType}
              type="submit"
              sx={{
                backgroundColor: "#feb55f",
                color: "white",
                "&:hover": { backgroundColor: "black", color: "#feb55f" },
              }}
            >
              Submit
            </Button>
          </form>
        </Paper>
      </Grid>
    </div>
  );
};

export default ResetPassword;
