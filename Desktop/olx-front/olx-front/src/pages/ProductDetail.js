import React, { useState, useContext, useEffect } from "react";
import {
  Grid,
  Typography,
  CircularProgress,
  TextField,
  InputAdornment,
  Button,
  Paper,
  Link,
  Breadcrumbs,
  Divider,
  Snackbar,
  Alert,
  Container,
  useTheme,
  useMediaQuery,
  Box,
  Dialog,
} from "@mui/material";
import searchBtn from "../assets/images/search.svg";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import CircleIcon from "@mui/icons-material/Circle";
import map from "../assets/images/map.png";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { useImmerReducer } from "use-immer";
import StateContext from "../context/StateContext";
import ImageSlider from "./ImageSlider";
import Swal from "sweetalert2";
import ProductUpdate from "./ProductUpdate";
//import { locations } from "../data/location";

const baseUrl = "https://8000-dee68-ilx-m1qv6b8vv9s.ws-eu104.gitpod.io/api";
//const baseUrl = "https://ilx-3022db9b1ed6.herokuapp.com/api";

const ProductDetail = () => {
  const counties = [
    { name: "CORK" },
    { name: "GALWAY" },
    { name: "DONEGAL" },
    { name: "MAYO" },
    { name: "KERRY" },
    { name: "TIPPERARY" },
    { name: "CLARE" },
    { name: "TYRONE" },
    { name: "ANTRIM" },
    { name: "LIMERICK" },
    { name: "ROSCOMMON" },
    { name: "DOWN" },
    { name: "WEXFORD" },
    { name: "MEATH" },
    { name: "LONDONDERRY" },
    { name: "KILKENNY" },
    { name: "WICKLOW" },
    { name: "OFFALY" },
    { name: "CAVAN" },
    { name: "WATERFORD" },
    { name: "WESTMEATH" },
    { name: "SLIGO" },
    { name: "LAOIS" },
    { name: "KILDARE" },
    { name: "FERMANAGH" },
    { name: "LEITRIM" },
    { name: "ARMAGH" },
    { name: "MONOGHAN" },
    { name: "LONGFORD" },
    { name: "DUBLIN" },
    { name: "CARLOW" },
    { name: "LOUTH" },
  ];
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [county, setCounty] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [show, setShow] = useState(false);

  const navigate = useNavigate();
  const params = useParams();
  console.log(params);
  const initialState = {
    productInfo: "",
    loading: true,
    sellerInfo: "",
    userInfo: "",
    openSnack: false,
    disabledBtn: false,
    sendRequest: 0,
  };

  function ReducerFunction(draft, action) {
    switch (action.type) {
      case "catchProductInfo":
        draft.productInfo = action.productObj;
        break;
      case "catchSellerInfo":
        draft.sellerInfo = action.profileObj;
        break;
      case "catchUserInfo":
        draft.userInfo = action.profileObj;
        break;
      case "catchSendRequestChange":
        draft.sendRequest = draft.sendRequest + 1;
        break;
      case "openTheSnack":
        draft.openSnack = true;
        break;
      case "disableTheBtn":
        draft.disabledBtn = true;
        break;
      case "loadingDone":
        draft.loading = false;
        break;

      default:
        return;
    }
  }

  const containerStyles = {
    width: "100%",
    height: "100%",
    margin: "0 auto",
  };
  const [state, dispatch] = useImmerReducer(ReducerFunction, initialState);
  const GlobalState = useContext(StateContext);
  const [buttonText, setButtonText] = useState("Show Phone");

  const [open, setOpen] = useState(false);
  const [wishItems, setWishItems] = useState([]);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleChange = (e) => {
    setCounty(e.target.firstChild);
  };
  const handleClick = (e) => {
    setIsOpen(!isOpen);
  };

  const updateBtn = {
    backgroundColor: "green",
  };
  const deleteBtn = {
    backgroundColor: "red",
  };
  //Get product info
  useEffect(() => {
    async function GetProductInfo() {
      try {
        const response = await axios.get(`${baseUrl}/products/${params.id}/`);
        console.log(response.data);
        dispatch({ type: "catchProductInfo", productObj: response.data });
        //dispatch({ type: "loadingDone" });
      } catch (error) {
        console.log(error.response);
      }
    }
    GetProductInfo();
  }, []);

  //get logged in user info
  useEffect(() => {
    async function GetUser() {
      try {
        const response = await axios.get(
          `${baseUrl}/profiles/${GlobalState.userId}/`
        );
        console.log(response.data);
        dispatch({ type: "catchUserInfo", profileObj: response.data });
        //dispatch({ type: "loadingDone" });
      } catch (error) {
        console.log(error.response);
      }
    }
    GetUser();
  }, [state.productInfo]);

  //Get seller profile
  useEffect(() => {
    async function GetUserProfile() {
      try {
        const response = await axios.get(
          `${baseUrl}/profiles/${state.productInfo.seller}/`
        );
        console.log(response.data);
        dispatch({ type: "catchSellerInfo", profileObj: response.data });
        dispatch({ type: "loadingDone" });
      } catch (error) {
        console.log(error.response);
      }
    }
    GetUserProfile();
  }, [state.productInfo]);

  //get data from db
  useEffect(() => {
    const source = axios.CancelToken.source();
    async function GetWishList() {
      try {
        await axios
          .get(
            `${baseUrl}/user/${GlobalState.userId}/wishlist-items/`,
            {
              cancelToken: source.token,
            },
            {
              headers: {
                "Content-Type": "application/json",
              },
            }
          )
          .then((response) => {
            console.log(response.data);
            setWishItems(response.data);
            //setLoading(false);
          });
      } catch (error) {
        console.log("Response data:", error.response);
      }
    }
    GetWishList();
    return () => {
      source.cancel();
    };
  }, []);

  // function to check wish list
  const checkWishList = () => {
    const result = wishItems.some(
      (wishItem) => wishItem.product === parseInt(params.id)
    );

    return result;
  };

  const result = checkWishList();
  console.log(wishItems.map((item) => item.product));
  console.log(
    wishItems.some((item) => item.user === parseInt(GlobalState.userId))
  );
  console.log(GlobalState.userId);
  console.log(result);

  // add to wishlist
  useEffect(() => {
    if (state.sendRequest && result === false) {
      async function addToWishList() {
        const formData = new FormData();
        formData.append("user", GlobalState.userId);
        formData.append("product", params.id);

        try {
          const response = await axios.post(`${baseUrl}/wishlist/`, formData, {
            headers: {
              "Content-Type": "application/json",
            },
          });
          //check for result of response
          console.log(response.data);
          console.log(response);
        } catch (error) {
          console.log(error.response);
        }
      }
      addToWishList();
    } else {
    }
  }, [state.sendRequest]);

  //console.log(location);
  const productPictures = [
    state.productInfo.photo1,
    state.productInfo.photo2,
    state.productInfo.photo3,
    state.productInfo.photo4,
    state.productInfo.photo5,
  ];

  //get numbers of product pictures
  const getProductPhotos = () => {
    let photos = [];
    productPictures.forEach((picture) => {
      if (picture !== null && picture !== "") {
        photos.push({ url: picture });
      }
    });
    return photos;
  };
  //console.log(getProductPhotos());
  let productPhotos = getProductPhotos();

  const handleWish = () => {
    //navigate("/wishlist/");
    dispatch({ type: "catchSendRequestChange" });
    setTimeout(() => {
      dispatch({ type: "openTheSnack" });
      setTimeout(() => {
        navigate(0);
      }, 2500);
    }, 2500);
    //dispatch({ type: "openTheSnack" });
  };

  //delete product
  async function deleteHandler() {
    //add confirmation before delete action
    Swal.fire({
      title: "Are you sure yoy want to delete this product?",
      showDenyButton: true,
      //showCancelButton: true,
      confirmButtonText: "Yes",
      denyButtonText: `No`,
    }).then((result) => {
      if (result.isConfirmed) {
        try {
          const response = axios.delete(
            `${baseUrl}/products/${params.id}/delete/`
          );
          console.log(response.data);
          navigate("/");
        } catch (error) {
          console.log(error.response);
        }
      } else if (result.isDenied) {
      }
    });
  }

  //console.log(state.productInfo.seller_phone_number);
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
    <>
      <Grid container justifyContent={"center"} sx={{ marginTop: "2rem" }}>
        <Grid item xs={12}>
          <Breadcrumbs aria-label="breadcrumb">
            <Link
              color="#feb55f"
              onClick={() => navigate("/")}
              sx={{ cursor: "pointer" }}
            >
              Products
            </Link>

            <Typography color="text.primary">
              {state.productInfo.name}
            </Typography>
          </Breadcrumbs>
        </Grid>
      </Grid>
      <Grid
        container
        direction={"row"}
        justifyContent={"center"}
        spacing={1}
        sx={{ marginTop: "5rem" }}
      >
        <Grid item xs={6}>
          <TextField
            fullWidth
            variant="filled"
            placeholder="13576 applications"
            sx={{ backgroundColor: "#fff" }}
            InputProps={{
              startAdornment: (
                <InputAdornment position="end">
                  <Button variant="text">
                    <img
                      src={searchBtn}
                      alt="search button"
                      style={{
                        width: 40,
                        height: 40,
                        backgroundColor: "transparent",
                      }}
                    />
                  </Button>
                </InputAdornment>
              ),
            }}
          />
        </Grid>
        <Grid item xs={6}>
          <TextField
            fullWidth
            variant="filled"
            placeholder="All of Ireland"
            name="county"
            value={county}
            onChange={handleChange}
            onClick={handleClick}
            sx={{ backgroundColor: "#fff" }}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <img
                    src={map}
                    alt="map icon"
                    style={{ width: 40, height: 40 }}
                  />
                </InputAdornment>
              ),
              endAdornment: (
                <InputAdornment position="end">
                  <Button variant="text">
                    <img
                      src={searchBtn}
                      alt="search button"
                      style={{ width: 40, height: 40 }}
                    />
                  </Button>
                </InputAdornment>
              ),
            }}
          ></TextField>
        </Grid>
      </Grid>
      <Grid
        container
        direction={"row"}
        justifyContent={"center"}
        sx={{ marginTop: "2rem" }}
      >
        <Grid item xs={12} sm={9} md={9} container>
          <Paper
            style={{
              margin: "1rem auto",
              width: "98%",
              height: "40vh",
              padding: "10px",
              border: "2px solid #feb55f",
            }}
          >
            <div style={containerStyles}>
              <ImageSlider
                slides={
                  productPhotos.length === 0
                    ? [
                        {
                          url: "https://res.cloudinary.com/dyrp3aqdq/image/upload/v1635353844/agropoultry/no-image_lcs5cq.png",
                        },
                      ]
                    : productPhotos
                }
              />
            </div>
          </Paper>
        </Grid>
        <Grid item xs={12} sm={3} md={3} container>
          <Paper
            elevation={20}
            sx={{
              margin: "1rem auto",
              width: "98%",
              maxHeight: "40vh",
              padding: "30px",
              border: "2px solid #feb55f",
            }}
          >
            <Grid container justifyContent={"center"}>
              <Grid item xs={6} justifyContent={"flex-start"}>
                <Typography variant="body2">
                  Published:{" "}
                  {new Date(state.productInfo.created_at).toDateString()}
                </Typography>
              </Grid>
              <Grid
                item
                xs={6}
                sx={{ marginRight: "-7rem", justifyContent: "flex-end" }}
              >
                {GlobalState.userIsLoggedIn && result && (
                  <Button
                    variant="outlined"
                    sx={{
                      backgroundColor: "transparent",
                      color: "#feb55f",
                      cursor: "pointer",
                      border: "none",
                      "&:hover": { border: "none" },
                    }}
                    disabled
                  >
                    <FavoriteBorderIcon
                      sx={{
                        fontSize: 34,
                        marginLeft: "2rem",
                      }}
                    />
                  </Button>
                )}
                {!GlobalState.userIsLoggedIn && (
                  <Button
                    variant="outlined"
                    sx={{
                      backgroundColor: "transparent",
                      color: "#feb55f",
                      cursor: "pointer",
                      border: "none",
                      "&:hover": { border: "none" },
                    }}
                    disabled
                  >
                    <FavoriteBorderIcon
                      sx={{
                        fontSize: 34,
                        marginLeft: "2rem",
                      }}
                    />
                  </Button>
                )}
                {GlobalState.userIsLoggedIn && !result && (
                  <Button
                    variant="outlined"
                    sx={{
                      backgroundColor: "transparent",
                      color: "#feb55f",
                      cursor: "pointer",
                      border: "none",
                      "&:hover": { border: "none" },
                    }}
                    onClick={handleWish}
                    // disabled={inWishlist}
                  >
                    <FavoriteBorderIcon
                      sx={{
                        fontSize: 34,
                        marginLeft: "2rem",
                      }}
                    />
                  </Button>
                )}
              </Grid>
            </Grid>
            <Grid container>
              <Grid item xs={6}>
                <Typography variant="h5">${state.productInfo.price}</Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography variant="h5">{state.productInfo.name}</Typography>
              </Grid>
            </Grid>
            <Grid container>
              <Button
                fullWidth
                sx={{
                  backgroundColor: "#feb55f",
                  color: "white",
                  "&:hover": { backgroundColor: "black", color: "#feb55f" },
                  marginTop: "20px",
                  marginBottom: "20px",
                  border: "1px solid #000",
                }}
                onClick={() => {
                  setButtonText(state.productInfo.seller_phone_number);
                }}
              >
                {buttonText}
              </Button>
            </Grid>
            {GlobalState.userId === state.productInfo.seller ? (
              <Grid container justifyContent={"space-around"}>
                <Button
                  variant="contained"
                  style={updateBtn}
                  onClick={handleClickOpen}
                >
                  Update
                </Button>
                <Button
                  variant="contained"
                  style={deleteBtn}
                  onClick={deleteHandler}
                >
                  Delete
                </Button>
                <Dialog
                  open={open}
                  onClose={handleClose}
                  aria-labelledby="alert-dialog-title"
                  aria-describedby="alert-dialog-description"
                  fullScreen
                >
                  <ProductUpdate
                    productData={state.productInfo}
                    closeDialog={handleClose}
                  />
                </Dialog>
              </Grid>
            ) : (
              ""
            )}
          </Paper>
        </Grid>
      </Grid>
      <Grid
        container
        direction={"row"}
        justifyContent={"center"}
        sx={{ marginTop: "2rem" }}
      >
        <Grid item xs={12} sm={8} md={8}>
          <Paper
            elevation={20}
            sx={{
              margin: "1rem auto",
              width: "98%",
              maxHeight: "40vh",
              padding: "30px",
              border: "2px solid #feb55f",
            }}
          >
            <Typography variant="h5">Detail Description of product:</Typography>
            <Divider style={{ width: "100%", backgroundColor: "#feb55f" }} />
            <div style={{ marginTop: "2rem", marginBottom: "2rem" }}>
              <textarea
                rows={5}
                style={{
                  width: "100%",
                  padding: ".4rem",
                  border: "1px solid #feb55f",
                  marginTop: 0,
                }}
              >
                {state.productInfo.description}
              </textarea>
            </div>
            <div style={{ marginTop: "2rem", marginBottom: "2rem" }}>
              {state.productInfo.price}
            </div>
            <div style={{ marginTop: "2rem", marginBottom: "2rem" }}>
              {state.productInfo.quantity}
            </div>
          </Paper>
        </Grid>
        <Grid item xs={12} sm={4} md={4} container>
          <Paper
            elevation={20}
            sx={{
              margin: "1rem auto",
              width: "98%",
              maxHeight: "40vh",
              padding: "30px",
              border: "2px solid #feb55f",
            }}
          >
            <Grid container>
              <Grid
                item
                xs={6}
                sx={{
                  justifyContent: "center",
                  alignItems: "center",
                  paddingLeft: "3rem",
                }}
              >
                <Typography variant="h5" style={{ marginBottom: "1rem" }}>
                  User
                </Typography>
                <img
                  src={
                    state.sellerInfo.avatar
                      ? state.sellerInfo.avatar
                      : "https://res.cloudinary.com/dyrp3aqdq/image/upload/v1688120429/userimage_mpve89.png"
                  }
                  width={"30rem"}
                  height={"30rem"}
                  style={{ borderRadius: "100%" }}
                  alt={state.sellerInfo.user_username}
                />
              </Grid>
              <Grid item xs={6}>
                <Typography variant="h6">
                  {state.sellerInfo.user_username}
                </Typography>
                <Typography variant="caption">
                  Member since:{" "}
                  {new Date(state.sellerInfo.user_date).toDateString()}
                </Typography>
              </Grid>
              <Grid item container>
                <Button
                  fullWidth
                  variant="outlined"
                  sx={{
                    color: "#feb55f",
                    "&:hover": { backgroundColor: "#000" },
                    marginTop: "20px",
                    marginBottom: "20px",
                    border: "2px solid #feb55f",
                  }}
                  onClick={() =>
                    navigate(`/users/${state.productInfo.seller}/`)
                  }
                >
                  All applications of user
                </Button>
              </Grid>
            </Grid>
          </Paper>
        </Grid>
      </Grid>
      <Grid
        container
        direction={"row"}
        justifyContent={"center"}
        sx={{ marginTop: "2rem" }}
      >
        <Grid item xs={12} sm={8} md={8}>
          <Paper
            elevation={20}
            sx={{
              margin: "1rem auto",
              width: "98%",
              maxHeight: "40vh",
              padding: "30px",
              border: "2px solid #feb55f",
            }}
          >
            All applications of the user goes here.
          </Paper>
        </Grid>
        <Grid item xs={12} sm={4} md={4}>
          <Paper
            elevation={20}
            sx={{
              margin: "1rem auto",
              width: "98%",
              maxHeight: "40vh",
              padding: "30px",
              border: "2px solid #feb55f",
            }}
          >
            {/* user's location i.e city and county goes here. */}
            <Grid container justifyContent={"space-between"}>
              <Grid item xs={6}>
                <Typography
                  variant="h5"
                  style={{ marginTop: "1rem", marginBottom: "1rem" }}
                >
                  Location
                </Typography>

                <Typography variant="caption">
                  <img
                    src={map}
                    alt="map icon"
                    style={{ width: 20, height: 20 }}
                  />
                  <span
                    style={{ fontSize: 14, fontWeight: "bold" }}
                  >{` ${state.sellerInfo.county}`}</span>
                  ,{` ${state.sellerInfo.city}`}
                </Typography>
              </Grid>
              <Grid item xs={6}>
                <div
                  style={{
                    width: "5rem",
                    height: "5rem",
                    borderRadius: "1px solid #000",
                  }}
                  key={`${state.sellerInfo.user}`}
                >
                  <Button
                    sx={{ width: "100%", height: "100%" }}
                    variant="outlined"
                    onClick={() =>
                      navigate(`/listing/${state.sellerInfo.user}`)
                    }
                  >
                    <CircleIcon style={{ color: "#feb55f" }} />
                  </Button>
                </div>
              </Grid>
            </Grid>
          </Paper>
        </Grid>
      </Grid>
      <Snackbar
        open={state.openSnack}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert severity="success">
          product added to wish list successfully!
        </Alert>
      </Snackbar>
    </>
  );
};

export default ProductDetail;
