import React, { useState, useContext } from "react";
import {
  AppBar,
  Box,
  Button,
  Menu,
  MenuItem,
  Toolbar,
  Typography,
  Snackbar,
  Alert,
  useTheme,
  useMediaQuery,
  Divider,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import PermIdentityIcon from "@mui/icons-material/PermIdentity";
//import SmsOutlinedIcon from "@mui/icons-material/SmsOutlined";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import styled from "@emotion/styled";
//import MenuIcon from "@mui/icons-material/Menu";
import StateContext from "../../context/StateContext";
import DispatchContext from "../../context/DispatchContext";
import axios from "axios";
import Swal from "sweetalert2";
import DrawerComp from "../DrawerComp";
import LogoutIcon from "@mui/icons-material/Logout";

const baseUrl = "https://8000-dee68-ilx-m1qv6b8vv9s.ws-eu104.gitpod.io";
//const baseUrl = "https://ilx-3022db9b1ed6.herokuapp.com";

const Navbar = () => {
  const theme = useTheme();
  const isMatch = useMediaQuery(theme.breakpoints.down("sm"));
  const StyledToolbar = styled(Toolbar)({
    display: "flex",
    justifyContent: "space-between",
    width: "100%",
  });

  const navigate = useNavigate();
  const GlobalState = useContext(StateContext);
  const GlobalDispatch = useContext(DispatchContext);

  const [anchorEl, setAnchorEl] = useState(null);
  //const [openSnack, setOpenSnack] = useState(0);
  const open1 = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
    navigate(`/user/${GlobalState.userId}/wishlist/`);
  };
  const addProduct = (e) => {
    navigate("/add-product");
  };
  //user profile
  function handleProfile() {
    setAnchorEl(null);
    navigate("/profile");
  }
  //User logout
  function handleLogout() {
    setAnchorEl(null);
    //add confirmation to logout here.
    Swal.fire({
      title: "Do you want to log out?",
      showDenyButton: true,
      //showCancelButton: true,
      confirmButtonText: "Yes",
      denyButtonText: `No`,
    }).then((result) => {
      if (result.isConfirmed) {
        const response = axios
          .post(`${baseUrl}/auth/token/logout/`, GlobalState.userToken, {
            headers: {
              Authorization: "Token ".concat(GlobalState.userToken),
            },
          })
          .then((response) => {
            console.log(response);
            GlobalDispatch({ type: "userLoggedOut" });
            navigate("/");
          })
          .catch((error) => {
            console.log(error.response);
          });
      } else if (result.isDenied) {
      }
    });
  }

  return (
    <div>
      <AppBar
        sx={{ backgroundColor: "#2a2e2f", color: "#feb55f", width: "100%" }}
        position="sticky"
        elevation={10}
      >
        <StyledToolbar>
          {isMatch ? (
            <>
              <Box flex={1}>
                <Typography
                  variant="h2"
                  component="h3"
                  sx={{ fontWeight: 400, cursor: "pointer" }}
                  onClick={() => navigate("/")}
                >
                  OLx
                </Typography>
              </Box>
              <DrawerComp />
            </>
          ) : (
            <>
              <Box flex={1}>
                <Typography
                  variant="h2"
                  component="h3"
                  sx={{ fontWeight: 700, cursor: "pointer" }}
                  onClick={() => navigate("/")}
                >
                  OLx
                </Typography>
              </Box>
              {/* <Box flex={1} sx={{ gap: 2 }}>
                <span style={{ cursor: "pointer" }}>Ukr</span> |{" "}
                <span style={{ cursor: "pointer" }}>Eng</span>
              </Box> */}
              {/* <Box
                flex={1}
                // sx={{ display: { xs: "none", sm: "none", md: "flex" } }}
              >
                <Button
                  variant="outlined"
                  sx={{
                    backgroundColor: "transparent",
                    color: "#feb55f",
                    cursor: "pointer",
                  }}
                  disabled={!GlobalState.userIsLoggedIn}
                  onClick={() =>
                    navigate(`/user/${GlobalState.userId}/wishlist/`)
                  }
                >
                  <FavoriteBorderIcon />
                </Button>
              </Box> */}
              {GlobalState.userIsLoggedIn ? (
                <Box
                  flex={1}
                  // sx={{ display: { xs: "none", sm: "none", md: "flex" } }}
                >
                  <PermIdentityIcon
                    sx={{ cursor: "pointer" }}
                    onClick={handleClick}
                  />
                  Hi, {GlobalState.userUsername}
                  <Menu
                    id="basic-menu"
                    anchorEl={anchorEl}
                    open={open1}
                    sx={{
                      position: {
                        top: 50,
                        left: 850,
                      },
                    }}
                    onClose={handleClose}
                    MenuListProps={{
                      "aria-labelledby": "basic-button",
                    }}
                  >
                    <MenuItem
                      onClick={handleProfile}
                      sx={{ "&:hover": { backgroundColor: "#000" } }}
                    >
                      <PermIdentityIcon
                        sx={{ cursor: "pointer", color: "#feb55f" }}
                        onClick={handleClick}
                      />{" "}
                      <Typography variant="h6" color={"#feb55f"}>
                        Profile
                      </Typography>
                    </MenuItem>
                    <Divider
                      sx={{ width: "100%", backgroundColor: "#feb55f" }}
                    />
                    <MenuItem sx={{ "&:hover": { backgroundColor: "#000" } }}>
                      <FavoriteBorderIcon
                        sx={{ cursor: "pointer", color: "#feb55f" }}
                        disabled={!GlobalState.userIsLoggedIn}
                        onClick={handleClose}
                      />
                      <Typography variant="h6" color={"#feb55f"}>
                        Wish List
                      </Typography>
                    </MenuItem>
                    <Divider
                      sx={{ width: "100%", backgroundColor: "#feb55f" }}
                    />
                    <MenuItem
                      onClick={handleLogout}
                      sx={{ "&:hover": { backgroundColor: "#000" } }}
                    >
                      <LogoutIcon
                        sx={{ cursor: "pointer", color: "#feb55f" }}
                      />
                      <Typography variant="h6" color={"#feb55f"}>
                        Logout
                      </Typography>
                    </MenuItem>
                  </Menu>
                </Box>
              ) : (
                <Box
                  flex={1}
                  // sx={{ display: { xs: "none", sm: "none", md: "flex" } }}
                >
                  <PermIdentityIcon
                    sx={{ cursor: "pointer" }}
                    onClick={() => navigate("/login")}
                  />
                </Box>
              )}

              <Box flex={1}>
                <Button
                  variant="contained"
                  sx={{
                    backgroundColor: "#feb55f",
                    cursor: "pointer",
                    color: "black",
                    "&:hover": { backgroundColor: "#fff", color: "#feb55f" },
                  }}
                  onClick={addProduct}
                  //disabled={!GlobalState.userIsLoggedIn}
                >
                  Add Application
                </Button>
              </Box>
            </>
          )}
        </StyledToolbar>
      </AppBar>
    </div>
  );
};

export default Navbar;
