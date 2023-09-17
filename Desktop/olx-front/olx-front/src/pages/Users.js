import React, { useContext, useEffect } from "react";
import axios from "axios";
import { useImmerReducer } from "use-immer";
import StateContext from "../context/StateContext";
import {
  Grid,
  Button,
  Card,
  CardActions,
  CardMedia,
  CardContent,
  Typography,
  CircularProgress,
} from "@mui/material";
import userImage from "../assets/images/userimage.png";
import { useNavigate } from "react-router-dom";

const baseUrl = "https://8000-dee68-ilx-m1qv6b8vv9s.ws-eu104.gitpod.io/api";
//const baseUrl = "https://ilx-3022db9b1ed6.herokuapp.com/api";

const Users = () => {
  const initialState = {
    loading: true,
    usersArray: [],
  };
  function ReducerFunction(draft, action) {
    switch (action.type) {
      case "catchUsers":
        draft.usersArray = action.usersObj;
        break;
      case "loadingDone":
        draft.loading = false;
        break;

      default:
        return;
    }
  }

  const [state, dispatch] = useImmerReducer(ReducerFunction, initialState);
  const GlobalState = useContext(StateContext);
  const navigate = useNavigate();

  //Get all users profiles
  useEffect(() => {
    async function GetUsers() {
      try {
        const response = await axios.get(`${baseUrl}/profiles/`);
        console.log(response.data);
        dispatch({ type: "catchUsers", usersObj: response.data });
        dispatch({ type: "loadingDone" });
      } catch (error) {
        console.log(error.response);
      }
    }
    GetUsers();
  }, []);

  if (state.loading === true) {
    return (
      <Grid
        container
        justifyContent={"center"}
        alignItems={"center"}
        marginTop={"50px"}
      >
        <CircularProgress sx={{ color: "#feb55f" }} />
      </Grid>
    );
  }

  return (
    <Grid container justifyContent={"flex-start"} spacing={2} padding={"10px"}>
      {state.usersArray.map((user) => {
        const applicationsDisplay = () => {
          if (user.user_applications.length === 0) {
            return (
              <Button size="small" disabled>
                No APPLICATION LISTED
              </Button>
            );
          } else if (user.user_applications.length === 1) {
            return (
              <Button
                size="small"
                onClick={() => navigate(`/users/${user.user}/`)}
              >
                One APPLICATION LISTED
              </Button>
            );
          } else {
            return (
              <Button
                size="small"
                onClick={() => navigate(`/users/${user.user}/`)}
              >
                {user.user_applications.length} APPLICATIONS LISTED
              </Button>
            );
          }
        };
        return (
          <Grid item key={user.id}>
            <Card sx={{ marginTop: "3rem", maxWidth: "20rem" }}>
              <CardMedia
                sx={{ height: 140 }}
                image={user.avatar ? user.avatar : userImage}
                title={user.user_username}
              />
              <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                  {user.user_username}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Lizards are a widespread group of squamate reptiles, with over
                  6,000 species, ranging across all continents except Antarctica
                </Typography>
              </CardContent>
              <CardActions>{applicationsDisplay()}</CardActions>
            </Card>
          </Grid>
        );
      })}
    </Grid>
  );
};

export default Users;
