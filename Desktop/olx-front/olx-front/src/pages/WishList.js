import React, { useEffect, useState, useContext } from "react";
import {
  Grid,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  CircularProgress,
  Typography,
  Snackbar,
  Alert,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useImmerReducer } from "use-immer";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import StateContext from "../context/StateContext";
import axios from "axios";

const WishList = () => {
  const baseUrl = "https://8000-dee68-ilx-m1qv6b8vv9s.ws-eu104.gitpod.io/api";
  //const baseUrl = "https://ilx-3022db9b1ed6.herokuapp.com/api";
  const [wishItems, setWishItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const GlobalState = useContext(StateContext);
  const navigate = useNavigate();

  const initialState = {
    openSnack: false,
    sendRequest: 0,
  };

  function ReducerFunction(draft, action) {
    switch (action.type) {
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
            setLoading(false);
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

  const handleDelete = (wishlist_id) => {
    //console.log("clicked");
    const formData = new FormData();
    formData.append("wishlist_id", wishlist_id);
    axios
      .post(`${baseUrl}/remove-wishlist/`, formData)
      .then((response) => {
        if (response.data.bool === true) {
          document.getElementById("row" + wishlist_id).remove();
          dispatch({ type: "openTheSnack" });
        }
      })
      .catch((err) => {
        console.log(err.response);
      });
  };

  //success message before redirect
  useEffect(() => {
    if (state.openSnack) {
      setTimeout(() => {
        setTimeout(() => {
          navigate(0);
        }, 1000);
      }, 2500);
    }
  }, [state.openSnack]);

  if (loading === true) {
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
    <Grid container justifyContent={"center"} sx={{ marginTop: "5rem" }}>
      <Grid item xs={2}></Grid>
      <Grid item xs={8}>
        <Grid container>
          <Grid item xs={2}></Grid>
          <Grid
            item
            xs={8}
            sx={{
              alignContent: "center",
              justifyContent: "center",
              margin: "auto",
            }}
          >
            <Typography
              variant="h4"
              sx={{
                marginBottom: "1rem",
                textDecoration: "underline",
              }}
            >
              {`${GlobalState.userUsername}'s wish list`.toUpperCase()}
            </Typography>
          </Grid>
          <Grid item xs={2}></Grid>
        </Grid>

        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
            <TableHead>
              <TableRow>
                <TableCell>#</TableCell>
                <TableCell>Product Image</TableCell>
                <TableCell align="right">Name</TableCell>
                <TableCell align="right">Price</TableCell>
                <TableCell align="right">Remove</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {wishItems.map((row, index) => {
                return (
                  <TableRow
                    key={row.id}
                    id={`row${row.id}`}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell component="th" scope="row">
                      {index + 1}
                    </TableCell>
                    <TableCell component="th" scope="row">
                      <img
                        src={row.product_info.photo1}
                        alt={row.product_info.name}
                        style={{ width: "3rem", height: "3rem" }}
                      />
                    </TableCell>
                    <TableCell align="right">{row.product_info.name}</TableCell>
                    <TableCell align="right">
                      ${row.product_info.price}
                    </TableCell>
                    <TableCell align="right">
                      {" "}
                      <DeleteForeverIcon
                        sx={{ color: "#f00", "&:hover": { cursor: "pointer" } }}
                        onClick={() => handleDelete(row.id)}
                      />
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </TableContainer>
        <Snackbar
          open={state.openSnack}
          anchorOrigin={{ vertical: "top", horizontal: "center" }}
        >
          <Alert severity="success">
            You have successfully deleted item from list!
          </Alert>
        </Snackbar>
      </Grid>
      <Grid item xs={2}></Grid>
    </Grid>
  );
};

export default WishList;
