import {
  Grid,
  Typography,
  CircularProgress,
  TextField,
  InputAdornment,
  Button,
  Paper,
  Divider,
  Container,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import map from "../assets/images/map.png";
import searchBtn from "../assets/images/search.svg";
//import noImage from "../assets/images/no-image.png";
import Product from "./Product";

const baseUrl = "https://8000-dee68-ilx-m1qv6b8vv9s.ws-eu104.gitpod.io/api";
//const baseUrl = "https://ilx-3022db9b1ed6.herokuapp.com/api";

const Home = () => {
  const [cats, setCats] = useState([]);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [county, setCounty] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [show, setShow] = useState(false);
  const [subcat, setSubCat] = useState("");
  const [selectedCat, setSelectedCat] = useState("");

  const navigate = useNavigate();

  //get categories from endpoint
  useEffect(() => {
    const source = axios.CancelToken.source();
    async function GetAllcats() {
      try {
        await axios
          .get(baseUrl + "/categories/", { cancelToken: source.token })
          .then((response) => {
            console.log(response.data);
            setCats(response.data);
            setLoading(false);
          });
      } catch (error) {
        console.log("Response data:", error.response);
      }
    }
    GetAllcats();
    return () => {
      source.cancel();
    };
  }, []);

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
  //gets main categories
  const categories = cats.reduce((arr, category) => {
    let cat = { ...category };
    delete cat.children;
    arr.push(cat);
    return arr;
  }, []);
  console.log("categories: ", categories);
  //gets subcategories
  const subcategories = cats.reduce((arr, category) => {
    let sub = category.children;
    arr = [...arr, ...sub];
    return arr;
  }, []);
  console.log("subcategories", subcategories);

  //get subcategories of a given parent

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

  const handleChange = (e) => {
    setCounty(e.target.firstChild);
  };
  const handleClick = (e) => {
    setIsOpen(!isOpen);
  };

  const handleSearch = () => {
    navigate(`/search/${county.toLowerCase()}/`);
  };

  const showCategory = (e) => {
    //console.log(e.target.textContent);
    navigate(`/product/${e.target.textContent.trim()}/`);
  };

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
                        onClick={handleSearch}
                      />
                    </Button>
                  </InputAdornment>
                ),
              }}
            ></TextField>
          </Grid>
        </Grid>
        {!isOpen ? (
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
        )}
      </div>
      <Grid container justifyContent="center" align="center" marginTop="60px">
        <Typography
          variant="h3"
          component="h3"
          sx={{ fontWeight: 500, color: "#3e3e3e" }}
        >
          MAIN CATEGORIES
        </Typography>
      </Grid>
      <Grid align="center" container spacing={5} marginTop="55px">
        {cats.map((cat, index) => {
          return (
            <Grid item sx={{ cursor: "pointer" }} xs={2} key={index}>
              <div>
                <img
                  src={cat.image}
                  width={50}
                  style={{ backgroundColor: "#feb55f", borderRadius: 50 }}
                  alt="symbol"
                />
                <Typography
                  variant="body2"
                  onClick={(e) => {
                    if (cat.children.length > 0) {
                      setShow(!show);
                      setSelectedCat(cat.id);
                      console.log(e.target.firstChild.textContent);
                      console.log(cat.id);
                    } else {
                      navigate(`/product/${e.target.textContent.trim()}/`);
                    }
                  }}
                >
                  {cat.title}
                </Typography>
              </div>
            </Grid>
          );
        })}
      </Grid>

      {!show ? (
        ""
      ) : (
        <div
          style={{
            justifyContent: "center",
            marginRight: "auto",
            marginLeft: "auto",
          }}
        >
          <Paper
            elevation={24}
            zindex={100}
            open={show}
            sx={{
              width: "80%",
              height: "35vh",
              position: "relative",
              justifyContent: "center",
              alignContent: "center",
              backgroundColor: "#f2f4f5",
              marginRight: "auto",
              marginLeft: "auto",
              border: "2px solid #fff",
              padding: "10px",
              display: "block",
            }}
          >
            <Grid container>
              <h4
                style={{
                  marginBottom: "10px",
                  marginTop: "10px",
                  marginRight: "auto",
                  marginLeft: "auto",
                  alignContent: "center",
                }}
              >{`All ${
                categories.filter((cat) => cat.id === selectedCat)[0].title
              } - applications`}</h4>
            </Grid>
            <Divider sx={{ width: "100%" }} />
            <Grid
              container
              display={"flex"}
              direction={"row"}
              spacing={3}
              align="center"
              justifyContent={"center"}
              marginTop={2}
            >
              {subcategories
                .filter((sub) => sub.parent === selectedCat)
                .map((child) => (
                  <Grid item xs={4} key={child.id}>
                    <Typography
                      variant="p"
                      sx={{ "&:hover": { cursor: "pointer" } }}
                      onClick={showCategory}
                    >
                      {child.title}
                    </Typography>
                  </Grid>
                ))}
            </Grid>
          </Paper>
        </div>
      )}
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
                marginTop: "15px",
                marginBottom: "15px",
              }}
            >
              VIP - APPLICATIONS
            </Typography>
          </Grid>
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
              {products.map((product) => (
                <Grid item xs={6} md={3} sm={4} key={product.id}>
                  <Product product={product} />
                </Grid>
              ))}
            </Grid>
          </Container>
        </Grid>
      </div>
    </>
  );
};

export default Home;
