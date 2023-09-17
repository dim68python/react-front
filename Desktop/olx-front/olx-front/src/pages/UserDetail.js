import React, { useEffect, useContext } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { useImmerReducer } from "use-immer";
import StateContext from "../context/StateContext";
import {
  Grid,
  Paper,
  Typography,
  CircularProgress,
  IconButton,
  Card,
  CardMedia,
  CardContent,
  CardActions,
} from "@mui/material";
import userImage from "../assets/images/userimage.png";
import LocalPhoneIcon from "@mui/icons-material/LocalPhone";

const baseUrl = "https://8000-dee68-ilx-m1qv6b8vv9s.ws-eu104.gitpod.io/api";
//const baseUrl = "https://ilx-3022db9b1ed6.herokuapp.com/api";

const UserDetail = () => {
  const initialState = {
    userProfile: {
      phoneNumber: "",
      county: "",
      city: "",
      avatar: "",
      firstName: "",
      lastName: "",
      address: "",
      postcode: "",
      applications: [],
    },
    loading: true,
    // userInfo: {
    //   username: ""
    // },
  };

  function ReducerFunction(draft, action) {
    switch (action.type) {
      case "catchUserProfileInfo":
        draft.userProfile.phoneNumber = action.profileObj.phone_number;
        draft.userProfile.county = action.profileObj.county;
        draft.userProfile.city = action.profileObj.city;
        draft.userProfile.avatar = action.profileObj.avatar;
        draft.userProfile.firstName = action.profileObj.first_name;
        draft.userProfile.lastName = action.profileObj.last_name;
        draft.userProfile.address = action.profileObj.street_address1;
        draft.userProfile.postcode = action.profileObj.postcode;
        draft.userProfile.applications = action.profileObj.user_applications;
        break;
      // case "catchUserInfo":
      //   draft.userInfo.username = action.userObj.username;
      //   break;
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
  const params = useParams();
  console.log(params);

  //Get user profile
  useEffect(() => {
    async function GetUserProfile() {
      try {
        const response = await axios.get(`${baseUrl}/profiles/${params.id}/`);
        console.log(response.data);
        dispatch({ type: "catchUserProfileInfo", profileObj: response.data });
        dispatch({ type: "loadingDone" });
      } catch (error) {
        console.log(error.response);
      }
    }
    GetUserProfile();
  }, []);

  //  //Get user profile
  //  useEffect(() => {
  //   async function GetUser() {
  //     try {
  //       const response = await axios.get(
  //         `${baseUrl}/users/${state.userObj.id}/`
  //       );
  //       console.log(response.data);
  //       dispatch({ type: "catchUserInfo", userObj: response.data });
  //       dispatch({ type: "loadingDone" });
  //     } catch (error) {
  //       console.log(error.response);
  //     }
  //   }
  //   GetUser();
  // }, [state.userInfo]);

  console.log("profile", state.userProfile);
  console.log("seller", state.userInfo);

  const GreetUser = () => {
    if (
      state.userProfile.city === null ||
      state.userProfile.city === "" ||
      state.userProfile.county === null ||
      state.userProfile.phoneNumber === null ||
      state.userProfile.phoneNumber === ""
    ) {
      return (
        <Typography
          sx={{ xs: { variant: "caption" }, md: { variant: "h5" } }}
          //variant="h5"
          style={{
            marginTop: "2rem",
            textAlign: "center",
            marginBottom: "2rem",
          }}
        >
          Welcome{" "}
          <span style={{ color: "#feb55f", fontWeight: 700 }}>
            {GlobalState.userUsername}
          </span>
          , please fill the form below to update your profile.
        </Typography>
      );
    } else {
      return (
        <>
          <Grid>
            <Paper
              elevation={20}
              sx={{
                margin: "15px auto",
                width: { xs: "100%", sm: "100%", md: "60%" },
                maxHeight: "40vh",
                padding: "30px",
                border: "2px solid #feb55f",
              }}
            >
              <Grid
                container
                justifyContent={"space-between"}
                spacing={2}
                sx={{
                  width: "100%",
                  //marginTop: "1rem",
                  marginBottom: "2rem",
                  marginLeft: "auto",
                  marginRight: "auto",
                  //border: "2px solid #feb55f",
                }}
              >
                <Grid item xs={6}>
                  {/* <Paper
                  sx={{
                    width: "80%",
                    height: "80%",
                    backgroundColor: "transparent",
                  }}
                > */}
                  <img
                    src={
                      state.userProfile.avatar
                        ? state.userProfile.avatar
                        : "https://res.cloudinary.com/dyrp3aqdq/image/upload/v1688120429/userimage_mpve89.png"
                    }
                    width={"200rem"}
                    height={"200rem"}
                    //style={{ borderRadius: "70%" }}
                    alt={state.userProfile.user}
                  />
                  {/* </Paper> */}
                </Grid>
                <Grid item xs={6}>
                  <Typography
                    variant="h5"
                    style={{
                      marginTop: "2rem",
                      textAlign: "center",
                      marginBottom: "2rem",
                    }}
                  >
                    <span style={{ color: "#feb55f", fontWeight: 700 }}>
                      {state.userProfile.applications[0]
                        ? state.userProfile.applications[0].seller_username
                        : state.userProfile.firstName}
                    </span>
                  </Typography>
                  <Typography
                    variant="h5"
                    style={{
                      marginTop: "2rem",
                      textAlign: "center",
                      marginBottom: "2rem",
                      fontSize: { xs: "50%", sm: "70%", md: "100%" },
                    }}
                  >
                    <IconButton>
                      <LocalPhoneIcon
                        sx={{
                          xs: { display: "none" },
                          md: { display: "block" },
                        }}
                      />
                      {state.userProfile.phoneNumber}
                    </IconButton>
                  </Typography>
                </Grid>
              </Grid>
            </Paper>
          </Grid>
          <Grid>
            <Paper
              elevation={20}
              sx={{
                margin: "15px auto",
                width: { xs: "100%", sm: "100%", md: "60%" },
                maxHeight: "50vh",
                padding: "30px",
                border: "2px solid #feb55f",
              }}
            >
              <Grid
                container
                justifyContent={"space-between"}
                spacing={2}
                sx={{
                  width: "100%",
                  height: "100%",
                  //marginTop: "1rem",
                  marginBottom: "2rem",
                  marginLeft: "auto",
                  marginRight: "auto",
                  //border: "2px solid #feb55f",
                }}
              >
                {state.userProfile.applications.map((application) => {
                  return (
                    <Grid item key={application.id} xs={4}>
                      <Card
                        sx={{
                          marginTop: "1rem",
                          maxWidth: "20rem",
                          maxHeight: "25rem",
                        }}
                      >
                        {application.photo1 === undefined ||
                        application.photo1 === null ? (
                          <CardMedia
                            sx={{ height: 50, cursor: "pointer" }}
                            image={
                              "https://res.cloudinary.com/dyrp3aqdq/image/upload/v1635353844/agropoultry/no-image_lcs5cq.png"
                            }
                            title={application.slug}
                            onClick={() =>
                              navigate(`/products/${application.id}`)
                            }
                          />
                        ) : (
                          <CardMedia
                            sx={{ height: 50, cursor: "pointer" }}
                            image={application.photo1}
                            title={application.slug}
                            onClick={() =>
                              navigate(`/products/${application.id}`)
                            }
                          />
                        )}
                        {/* <CardMedia
                     sx={{ height:50, cursor:'pointer' }}
                     image={application.photo1 ? application.photo1:"https://res.cloudinary.com/dyrp3aqdq/image/upload/v1635353844/agropoultry/no-image_lcs5cq.png"}
                     title={application.slug}
                     onClick={()=>navigate(`/products/${application.id}`)}
                   /> */}
                        <CardContent>
                          <Typography gutterBottom variant="h5" component="div">
                            {application.slug}
                          </Typography>
                          <Typography variant="body2" color="text.secondary">
                            {application.description}
                          </Typography>
                        </CardContent>
                        <CardActions>
                          $ {application.price} -{" "}
                          {new Date(application.created_at).toDateString()}
                        </CardActions>
                      </Card>
                    </Grid>
                  );
                })}
              </Grid>
            </Paper>
          </Grid>
          ;
        </>
      );
    }
  };

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
  return <div>{GreetUser()}</div>;
};

export default UserDetail;
