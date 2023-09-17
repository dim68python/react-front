import React, { useState, useEffect } from "react";
import {
  Grid,
  Typography,
  CircularProgress,
  TextField,
  InputAdornment,
  Button,
  //   Paper,
  //   Divider,
  Container,
} from "@mui/material";
import { useParams } from "react-router-dom";
import axios from "axios";
import map from "../assets/images/map.png";
import searchBtn from "../assets/images/search.svg";
import Product from "./Product";

const baseUrl = "https://8000-dee68-ilx-m1qv6b8vv9s.ws-eu104.gitpod.io/api";
//const baseUrl = "https://ilx-3022db9b1ed6.herokuapp.com/api";

const SearchItem = () => {
  //const [cats, setCats] = useState([]);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const params = useParams();

  //get categories from endpoint
  //   useEffect(() => {
  //     const source = axios.CancelToken.source();
  //     async function GetAllcats() {
  //       try {
  //         await axios
  //           .get(baseUrl + "/categories/", { cancelToken: source.token })
  //           .then((response) => {
  //             console.log(response.data);
  //             setCats(response.data);
  //             setLoading(false);
  //           });
  //       } catch (error) {
  //         console.log("Response data:", error.response);
  //       }
  //     }
  //     GetAllcats();
  //     return () => {
  //       source.cancel();
  //     };
  //   }, []);

  //get all products from endpoint
  useEffect(() => {
    const source = axios.CancelToken.source();
    async function GetAllproducts() {
      try {
        await axios
          .get(`${baseUrl}/products/`, { cancelToken: source.token })
          .then((response) => {
            console.log(response.data);
            setProducts(response.data);
            setLoading(false);
          });
      } catch (error) {
        console.log("Response data:", error.response);
      }
    }
    GetAllproducts();
    return () => {
      source.cancel();
    };
  }, []);

  const results = products.filter(
    (product) => product.seller_county === params.county.toUpperCase()
  );

  console.log(results);

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
    <>
      <div className="gridline">
        <Grid container direction={"row"} justifyContent={"center"} spacing={1}>
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
              value={params.county.toUpperCase()}
              disabled
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
                    <Button variant="text" disabled>
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
        {/* {!isOpen ? (
          ""
        ) : (
          <Paper
            elevation={24}
            zindex={100}
            open={isOpen}
            sx={{
              width: "80%",
              height: "45vh",
              position: "absolute",
              top: "200px",
              justifyContent: "center",
              alignContent: "center",
              backgroundColor: "#f2f4f5",
              marginRight: "auto",
              marginLeft: "auto",
              border: "2px solid #fff",
              padding: "10px",
              display: "block",
              fontSize: { xs: "50%", sm: "60%", md: "100%" },
            }}
          >
            <Grid container display={"flex"} direction={"row"} spacing={3}>
              {counties.map((county, index) => (
                <Grid item xs={2}>
                  <span key={index} style={{ cursor: "pointer" }}>
                    <Typography
                      variant="body2"
                      sx={{
                        "&:hover": { backgroundColor: "#feb55f" },
                      }}
                      onClick={(e) => {
                        setIsOpen(!isOpen);
                        setCounty(e.target.firstChild.textContent);
                      }}
                    >
                      {county.name}
                    </Typography>
                  </span>
                </Grid>
              ))}
            </Grid>
          </Paper>
        )} */}
      </div>
      <Grid container>
        <Grid item xs={12} align="center">
          {results.length === 0 ? (
            <Typography
              variant="h5"
              sx={{
                marginTop: "1.5rem",
                marginBottom: "1.5rem",
                marginLeft: "auto",
                marginRight: "auto",
              }}
            >
              No results
            </Typography>
          ) : (
            ""
          )}
        </Grid>
      </Grid>
      <div
        style={{
          backgroundColor: "#c2c2c2",
          width: "100%",
          // height: "40vh",
          marginTop: "30px",
        }}
      >
        <Grid container>
          <Grid item align="center" xs={12}>
            <Typography
              variant="h3"
              sx={{
                marginRight: "auto",
                marginLeft: "auto",
                marginTop: "25px",
                marginBottom: "25px",
              }}
            >
              {params.county.toUpperCase()} - APPLICATIONS
            </Typography>
          </Grid>
          {results ? (
            <Container>
              <Grid
                container
                align="center"
                spacing={1}
                sx={{
                  marginRight: "auto",
                  marginLeft: "auto",
                  marginBottom: "100px",
                  justifyContent: "center",
                }}
              >
                {results.map((product) => (
                  <Grid item xs={6} md={3} sm={4} key={product.id}>
                    <Product product={product} />
                  </Grid>
                ))}
              </Grid>
            </Container>
          ) : (
            <Container>
              <Grid
                container
                align="center"
                spacing={1}
                sx={{
                  marginRight: "auto",
                  marginLeft: "auto",
                  marginBottom: "100px",
                  justifyContent: "center",
                }}
              >
                <Typography variant="h5">No Results</Typography>
              </Grid>
            </Container>
          )}
        </Grid>
      </div>
    </>
  );
};

export default SearchItem;
