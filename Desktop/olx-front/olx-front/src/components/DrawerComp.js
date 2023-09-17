import React, { useState, useContext } from "react";
import {
  Drawer,
  IconButton,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Box,
  Button,
  Divider,
  Typography,
} from "@mui/material";
import MenuRoundedIcon from "@mui/icons-material/MenuRounded";
import CloseIcon from "@mui/icons-material/Close";
import PermIdentityIcon from "@mui/icons-material/PermIdentity";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import LogoutIcon from "@mui/icons-material/Logout";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import StateContext from "../context/StateContext";
import DispatchContext from "../context/DispatchContext";
import HighlightOffOutlinedIcon from "@material-ui/icons/HighlightOffOutlined";
import axios from "axios";

const baseUrl = "https://8000-dee68-ilx-m1qv6b8vv9s.ws-eu104.gitpod.io";
//const baseUrl = "https://ilx-3022db9b1ed6.herokuapp.com";

const DrawerComp = () => {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const GlobalState = useContext(StateContext);
  const GlobalDispatch = useContext(DispatchContext);

  //User logout
  function handleLogout() {
    setOpen(false);
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
    <>
      <Drawer
        anchor="right"
        open={open}
        onClose={() => setOpen(false)}
        variant="temporary"
        PaperProps={{ style: { width: "80%", backgroundColor: "#2a2e2f" } }}
      >
        <Typography
          sx={{ textAlign: "right", pt: 0, color: "#feb55f", fontSize: 20 }}
        >
          <CloseIcon onClick={() => setOpen(false)} />
        </Typography>

        <List>
          {GlobalState.userIsLoggedIn ? (
            <>
              <Divider sx={{ width: "100%", backgroundColor: "#feb55f" }} />
              <ListItemButton
                sx={{ alignItems: "center", justifyContent: "center" }}
              >
                <ListItemIcon>
                  <ListItemText>
                    <ListItemText>
                      <Box flex={1} sx={{ color: "#feb55f" }}>
                        <FavoriteBorderIcon
                          sx={{ cursor: "pointer" }}
                          //disabled={!GlobalState.userIsLoggedIn}
                          onClick={() =>
                            navigate(`/user/${GlobalState.userId}/wishlist/`)
                          }
                        />
                      </Box>
                    </ListItemText>
                  </ListItemText>
                </ListItemIcon>
              </ListItemButton>
            </>
          ) : (
            ""
          )}

          <Divider sx={{ width: "100%", backgroundColor: "#feb55f" }} />
          <ListItemButton
            sx={{ alignItems: "center", justifyContent: "center" }}
          >
            <ListItemIcon>
              <ListItemText>
                <ListItemText>
                  <Box flex={1} sx={{ color: "#feb55f" }}>
                    <PermIdentityIcon
                      sx={{ cursor: "pointer" }}
                      onClick={() =>
                        navigate(
                          `${
                            GlobalState.userIsLoggedIn ? "/profile" : "/login"
                          }`
                        )
                      }
                    />
                  </Box>
                </ListItemText>
              </ListItemText>
            </ListItemIcon>
          </ListItemButton>
          <Divider sx={{ width: "100%", backgroundColor: "#feb55f" }} />
          <ListItemButton
            sx={{ alignItems: "center", justifyContent: "center" }}
          >
            <ListItemIcon>
              <ListItemText>
                <ListItemText>
                  <Box flex={1} sx={{ color: "#feb55f" }}>
                    <Button
                      variant="contained"
                      sx={{
                        backgroundColor: "#feb55f",
                        cursor: "pointer",
                        color: "black",
                        "&:hover": {
                          backgroundColor: "#fff",
                          // color: "#feb55f",
                        },
                      }}
                      onClick={() => navigate("/add-product/")}
                    >
                      Add Application
                    </Button>
                  </Box>
                </ListItemText>
              </ListItemText>
            </ListItemIcon>
          </ListItemButton>
          {GlobalState.userIsLoggedIn ? (
            <>
              <Divider sx={{ width: "100%", backgroundColor: "#feb55f" }} />
              <ListItemButton
                sx={{ alignItems: "center", justifyContent: "center" }}
              >
                <ListItemIcon>
                  <ListItemText>
                    <ListItemText>
                      <Box
                        flex={1}
                        sx={{
                          color: "#feb55f",
                          display: "grid",
                          //rowGap: "5px",
                          gridTemplateAreas: "a1  a2  a3",
                        }}
                      >
                        <LogoutIcon
                          sx={{
                            cursor: "pointer",
                            color: "#feb55f",
                            gridArea: "a1",
                          }}
                          onClick={handleLogout}
                        />
                        <Typography
                          color={"#feb55f"}
                          sx={{ gridArea: "a3", marginLeft: "1.7rem" }}
                        >
                          Logout
                        </Typography>
                      </Box>
                    </ListItemText>
                  </ListItemText>
                </ListItemIcon>
              </ListItemButton>
            </>
          ) : (
            ""
          )}
        </List>
      </Drawer>

      <IconButton
        onClick={() => setOpen(!open)}
        sx={{ marginLeft: "auto", color: "#feb55f" }}
      >
        <MenuRoundedIcon />
      </IconButton>
    </>
  );
};

export default DrawerComp;
