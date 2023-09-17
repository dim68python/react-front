import React, { useState, useContext, useEffect } from "react";
import {
  Button,
  Grid,
  Paper,
  Typography,
  CircularProgress,
} from "@mui/material";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import { useParams, useNavigate } from "react-router-dom";
import reactImg from "../assets/images/rect_image.jpg";
import axios from "axios";
import { useImmerReducer } from "use-immer";
import StateContext from "../context/StateContext";
import { locations } from "../data/location";

const baseUrl = "https://8000-dee68-ilx-m1qv6b8vv9s.ws-eu104.gitpod.io/api";
//const baseUrl = "https://ilx-3022db9b1ed6.herokuapp.com/api";

const Listing = () => {
  const params = useParams();
  const initialState = {
    loading: true,
    sellerInfo: "",
    // openSnack: false,
    //sendRequest: 0,
    // latitude: 53.35,
    // longitude: -6.266,
  };

  function ReducerFunction(draft, action) {
    switch (action.type) {
      case "catchSellerInfo":
        draft.sellerInfo = action.profileObj;
        break;
      case "loadingDone":
        draft.loading = false;
        break;

      default:
        return;
    }
  }

  const [state, dispatch] = useImmerReducer(ReducerFunction, initialState);

  useEffect(() => {
    async function GetUserProfile() {
      try {
        const response = await axios.get(`${baseUrl}/profiles/${params.id}/`);
        console.log(response.data);
        dispatch({ type: "catchSellerInfo", profileObj: response.data });
        dispatch({ type: "loadingDone" });
      } catch (error) {
        console.log(error.response);
      }
    }
    GetUserProfile();
  }, []);

  //get seller location;
  const location = locations.filter(
    (loc) => loc.city === state.sellerInfo.city
  );

  const paperType = {
    margin: "15px auto",
    width: "100%",
    padding: "30px",
    border: "2px solid #feb55f",
    backgroundColor: "#f2f4f5",
    height: "75vh",
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
  return (
    <div style={{ height: "100%", width: "100%" }}>
      <Grid container display={"flex"} direction={"row"} spacing={2}>
        {/* <Grid item xs={5} sx={{ height: "100%", marginTop: "50px" }}>
          <Paper style={paperType} elevation={20}>
            <h4>Images of products goes here.</h4>
          </Paper>
        </Grid> */}
        <Grid item xs={1}></Grid>
        <Grid
          item
          xs={10}
          sx={{
            height: "100%",
            marginTop: "40px",
            marginBottom: "5rem",
            marginLeft: "auto",
            marginRight: "auto",
          }}
        >
          <Paper style={paperType} elevation={20}>
            <MapContainer
              center={[location[0].lat, location[0].lng]}
              zoom={14}
              scrollWheelZoom={true}
            >
              <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              />
              <Marker position={[location[0].lat, location[0].lng]}>
                <Popup>
                  <Typography variant="h4">This is the title</Typography>
                  <img
                    src={reactImg}
                    style={{ height: "14rem", width: "20rem" }}
                    alt={`${state.sellerInfo.city} map`}
                  />
                  <Typography variant="body1">This is a description</Typography>
                  <Button variant="contained" fullWidth>
                    Link
                  </Button>
                </Popup>
              </Marker>
            </MapContainer>
          </Paper>
        </Grid>
        <Grid item xs={1}></Grid>
      </Grid>
    </div>
  );
};

export default Listing;
