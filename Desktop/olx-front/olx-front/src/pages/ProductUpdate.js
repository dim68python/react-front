import React, { useState, useEffect, useContext } from "react";
import {
  Button,
  Grid,
  Paper,
  TextField,
  CircularProgress,
  Typography,
  Snackbar,
  Alert,
  FormControlLabel,
  Checkbox,
  MenuItem,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useImmerReducer } from "use-immer";
import axios from "axios";
import DispatchContext from "../context/DispatchContext";
import StateContext from "../context/StateContext";
import NoImage from "../assets/images/no-image.png";
import { Label } from "@material-ui/icons";

const baseUrl = "https://8000-dee68-ilx-m1qv6b8vv9s.ws-eu104.gitpod.io/api";
//const baseUrl = "https://ilx-3022db9b1ed6.herokuapp.com/api";

const ProductUpdate = (props) => {
  const paperType = {
    margin: "20px auto",
    padding: "30px 20px",
    border: "2px solid #feb55f",
  };
  const textFieldType = { marginBottom: "10px" };
  const navigate = useNavigate();
  const [cats, setCats] = useState([]);
  const [loading, setLoading] = useState(true);
  const GlobalState = useContext(StateContext);
  const initialState = {
    nameValue: props.productData.name,
    priceValue: props.productData.price,
    categoryValue: props.productData.category,
    statusValue: "True",
    descriptionValue: props.productData.description,
    quantityValue: props.productData.quantity,
    photo1Value: "",
    photo2Value: "",
    photo3Value: "",
    photo4Value: "",
    photo5Value: "",
    sendRequest: 0,
    openSnack: false,
    disabledBtn: false,
    uploadedImages: [],
    productNameErrors: {
      hasErrors: false,
      errorMessage: "",
    },
    descriptionErrors: {
      hasErrors: false,
      errorMessage: "",
    },
    categoryErrors: {
      hasErrors: false,
      errorMessage: "",
    },
    priceErrors: {
      hasErrors: false,
      errorMessage: "",
    },
    quantityErrors: {
      hasErrors: false,
      errorMessage: "",
    },
  };

  console.log("data", props.productData);

  function ReducerFunction(draft, action) {
    switch (action.type) {
      case "catchNameChange":
        draft.nameValue = action.nameChosen;
        draft.productNameErrors.hasErrors = false;
        draft.productNameErrors.errorMessage = "";
        break;
      case "catchPriceChange":
        draft.priceValue = action.priceChosen;
        draft.priceErrors.hasErrors = false;
        draft.priceErrors.errorMessage = "";
        break;
      case "catchQuantityChange":
        draft.quantityValue = action.quantityChosen;
        draft.quantityErrors.hasErrors = false;
        draft.quantityErrors.errorMessage = "";
        break;
      case "catchStatusChange":
        draft.statusValue = action.statusChosen;
        break;
      case "catchCategoryChange":
        draft.categoryValue = action.categoryChosen;
        draft.categoryErrors.hasErrors = false;
        draft.categoryErrors.errorMessage = "";
        break;
      case "catchDescriptionChange":
        draft.descriptionValue = action.descriptionChosen;
        draft.descriptionErrors.hasErrors = false;
        draft.descriptionErrors.errorMessage = "";
        break;
      case "catchPhoto1Image":
        draft.photo1Value = action.photo1Chosen;
        break;
      case "catchPhoto2Image":
        draft.photo2Value = action.photo2Chosen;
        break;
      case "catchPhoto3Image":
        draft.photo3Value = action.photo3Chosen;
        break;
      case "catchPhoto4Image":
        draft.photo4Value = action.photo4Chosen;
        break;
      case "catchPhoto5Image":
        draft.photo5Value = action.photo5Chosen;
        break;
      case "catchUploadedImages":
        draft.uploadedImages = action.imagesChosen;
        break;
      case "changeSendRequest":
        draft.sendRequest = draft.sendRequest + 1;
        break;
      case "openTheSnack":
        draft.openSnack = true;
        break;
      case "disableTheBtn":
        draft.disabledBtn = true;
        break;
      case "catchProductNameChange":
        if (action.productNameChosen.length === 0) {
          draft.productNameErrors.hasErrors = true;
          draft.productNameErrors.errorMessage =
            "This field must not be empty!";
        }
        break;
      case "catchDescriptionErrors":
        if (action.descriptionChosen.length === 0) {
          draft.descriptionErrors.hasErrors = true;
          draft.descriptionErrors.errorMessage = "This field must not be empty";
        }
        break;
      case "catchCategoryNameChange":
        if (action.categoryNameChosen.length === 0) {
          draft.categoryErrors.hasErrors = true;
          draft.categoryErrors.errorMessage = "This is a required field!";
        }
        break;
      case "catchPriceValueChange":
        if (action.priceValueChosen.length === 0) {
          draft.priceErrors.hasErrors = true;
          draft.priceErrors.errorMessage = "Product must have a price!";
        } else if (/^\d+$/.test(action.priceValueChosen) !== true) {
          draft.priceErrors.hasErrors = true;
          draft.priceErrors.errorMessage = "Only numbers allowed";
        }
        break;
      case "catchQuantityValueChange":
        if (action.quantityValueChosen.length === 0) {
          draft.quantityErrors.hasErrors = true;
          draft.quantityErrors.errorMessage = "This is a required field!";
        } else if (/^\d+$/.test(action.quantityValueChosen) !== true) {
          draft.quantityErrors.hasErrors = true;
          draft.quantityErrors.errorMessage = "Only numbers allowed";
        } else if (action.quantityValueChosen === "0") {
          draft.quantityErrors.hasErrors = true;
          draft.quantityErrors.errorMessage = "Quantity can not be zero!";
        }

        break;
      case "emptyNameValue":
        draft.productNameErrors.hasErrors = true;
        draft.productNameErrors.errorMessage = "This field must not be empty!";
        break;
      case "emptyDescriptionValue":
        draft.descriptionErrors.hasErrors = true;
        draft.descriptionErrors.errorMessage = "This field must not be empty!";
        break;
      case "emptyPriceValue":
        draft.priceErrors.hasErrors = true;
        draft.priceErrors.errorMessage = "This field must not be empty!";
        break;
      case "emptyQuantityValue":
        draft.quantityErrors.hasErrors = true;
        draft.quantityErrors.errorMessage = "This field must not be empty!";
        break;
      case "emptyCategoryValue":
        draft.categoryErrors.hasErrors = true;
        draft.categoryErrors.errorMessage = "This field must not be empty!";
        break;
      default:
        return;
    }
  }

  const [state, dispatch] = useImmerReducer(ReducerFunction, initialState);

  //get categories
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

  //gets main categories
  const categories = cats.reduce((arr, category) => {
    let cat = { ...category };
    delete cat.children;
    arr.push(cat);
    return arr;
  }, []);
  //console.log("categories: ", categories);
  //gets subcategories
  const subcategories = cats.reduce((arr, category) => {
    let sub = category.children;
    arr = [...arr, ...sub];
    return arr;
  }, []);
  //console.log("subcategories", subcategories);
  const allCats = categories.concat(subcategories);
  console.log("allCats", allCats);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("form submitted");
    if (state.nameValue === "") {
      dispatch({ type: "emptyNameValue" });
      window.scrollTo(0, 0);
    } else if (state.descriptionValue === "") {
      dispatch({ type: "emptyDescriptionValue" });
      window.scrollTo(0, 0);
    } else if (state.priceValue === "") {
      dispatch({ type: "emptyPriceValue" });
      window.scrollTo(0, 0);
    } else if (state.quantityValue === "") {
      dispatch({ type: "emptyQuantityValue" });
      window.scrollTo(0, 0);
    } else if (state.categoryValue === "") {
      dispatch({ type: "emptyCategoryValue" });
      window.scrollTo(0, 0);
    } else if (
      !state.productNameErrors.hasErrors &&
      !state.descriptionErrors.hasErrors &&
      !state.categoryErrors.hasErrors &&
      !state.priceErrors.hasErrors &&
      !state.quantityErrors.hasErrors &&
      state.statusValue
    ) {
      dispatch({ type: "changeSendRequest" });
      dispatch({ type: "disableTheBtn" });
    }
  };

  const deleteBtn = {
    backgroundColor: "red",
  };
  // catching all photos changes
  useEffect(() => {
    if (state.uploadedImages[0]) {
      dispatch({
        type: "catchPhoto1Image",
        photo1Chosen: state.uploadedImages[0],
      });
    }
  }, [state.uploadedImages[0]]);

  useEffect(() => {
    if (state.uploadedImages[1]) {
      dispatch({
        type: "catchPhoto2Image",
        photo2Chosen: state.uploadedImages[1],
      });
    }
  }, [state.uploadedImages[1]]);

  useEffect(() => {
    if (state.uploadedImages[2]) {
      dispatch({
        type: "catchPhoto3Image",
        photo3Chosen: state.uploadedImages[2],
      });
    }
  }, [state.uploadedImages[2]]);

  useEffect(() => {
    if (state.uploadedImages[3]) {
      dispatch({
        type: "catchPhoto4Image",
        photo4Chosen: state.uploadedImages[3],
      });
    }
  }, [state.uploadedImages[3]]);

  useEffect(() => {
    if (state.uploadedImages[4]) {
      dispatch({
        type: "catchPhoto5Image",
        photo5Chosen: state.uploadedImages[4],
      });
    }
  }, [state.uploadedImages[4]]);

  //update product
  useEffect(() => {
    if (state.sendRequest) {
      async function UpdateProduct() {
        const formData = new FormData();
        formData.append("name", state.nameValue);
        formData.append("description", state.descriptionValue);
        formData.append("category", state.categoryValue);
        formData.append("price", state.priceValue);
        formData.append("status", state.statusValue);
        formData.append("quantity", state.quantityValue);
        formData.append("photo1", state.photo1Value);
        formData.append("photo2", state.photo2Value);
        formData.append("photo3", state.photo3Value);
        formData.append("photo4", state.photo4Value);
        formData.append("photo5", state.photo5Value);
        formData.append("seller", GlobalState.userId);
        try {
          const response = await axios.patch(
            `${baseUrl}/products/${props.productData.id}/update/`,
            formData,
            {
              headers: {
                "Content-Type": "multipart/form-data;  charset=UTF-8",
                Accept: "application/json",
              },
            }
          );
          console.log(response.data);
          dispatch({ type: "openTheSnack" });
        } catch (error) {
          console.log(error.response);
        }
      }
      UpdateProduct();
    }
  }, [state.sendRequest]);

  //success message before redirect
  useEffect(() => {
    if (state.openSnack) {
      setTimeout(() => {
        navigate("/");
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
    <div>
      <Grid container>
        <Paper
          style={paperType}
          elevation={20}
          sx={{ width: { xs: "100%", sm: "80%", md: "60%" } }}
        >
          <Grid align="center" sx={{ marginBottom: "10px" }} item xs={12}>
            <Typography variant="h4">Update Product</Typography>
            <Typography variant="caption">
              Please enter correct values to update the product
            </Typography>
          </Grid>
          <Grid item xs={2}></Grid>
          <Grid
            item
            xs={8}
            align="center"
            sx={{ marginRight: "auto", marginLeft: "auto" }}
          >
            <form onSubmit={handleSubmit}>
              <TextField
                fullWidth
                label="Name"
                name="name"
                type="text"
                variant="standard"
                value={state.nameValue}
                placeholder="Enter a valid name for product"
                style={textFieldType}
                onChange={(e) =>
                  dispatch({
                    type: "catchNameChange",
                    nameChosen: e.target.value.trim(),
                  })
                }
                onBlur={(e) =>
                  dispatch({
                    type: "catchProductNameChange",
                    productNameChosen: e.target.value.trim(),
                  })
                }
                error={state.productNameErrors.hasErrors ? true : false}
                helperText={state.productNameErrors.errorMessage}
              />
              <Grid container justifyContent={"center"}>
                <Grid
                  item
                  xs={12}
                  sx={{ marginTop: "20px", marginBottom: "20px" }}
                >
                  <TextField
                    fullWidth
                    label="Description"
                    name="description"
                    multiline
                    rows={6}
                    type="text"
                    variant="outlined"
                    value={state.descriptionValue}
                    placeholder="Enter a brief description of product"
                    style={textFieldType}
                    //required
                    onChange={(e) =>
                      dispatch({
                        type: "catchDescriptionChange",
                        descriptionChosen: e.target.value.trim(),
                      })
                    }
                    onBlur={(e) =>
                      dispatch({
                        type: "catchDescriptionErrors",
                        descriptionChosen: e.target.value.trim(),
                      })
                    }
                    error={state.descriptionErrors.hasErrors ? true : false}
                    helperText={state.descriptionErrors.errorMessage}
                  />
                </Grid>
              </Grid>

              <Grid container justifyContent={"space-between"}>
                <Grid item xs={5}>
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={state.statusValue}
                        onChange={(e) =>
                          dispatch({
                            type: "catchStatusChange",
                            statusChosen: e.target.checked,
                          })
                        }
                      />
                    }
                    label="Status"
                  />
                </Grid>
                <Grid item xs={5}>
                  <TextField
                    fullWidth
                    label="Category"
                    name="category"
                    variant="standard"
                    //value={state.categoryValue}
                    placeholder="Enter category of product"
                    style={textFieldType}
                    select
                    defaultValue={""}
                    onChange={(e) =>
                      dispatch({
                        type: "catchCategoryChange",
                        categoryChosen: e.target.value,
                      })
                    }
                    onBlur={(e) =>
                      dispatch({
                        type: "catchCategoryNameChange",
                        categoryNameChosen: e.target.value,
                      })
                    }
                    error={state.categoryErrors.hasErrors ? true : false}
                    helperText={state.categoryErrors.errorMessage}
                  >
                    {allCats.map((cat) => (
                      <MenuItem key={cat.id} value={cat.id}>
                        {cat.title}
                      </MenuItem>
                    ))}
                  </TextField>
                </Grid>
              </Grid>
              <Grid container justifyContent={"center"}>
                <Grid item xs={4}></Grid>
                <Grid item xs={4}>
                  <ul>
                    {state.photo1Value ? <li>{state.photo1Value.name}</li> : ""}
                    {state.photo2Value ? <li>{state.photo2Value.name}</li> : ""}
                    {state.photo3Value ? <li>{state.photo3Value.name}</li> : ""}
                    {state.photo4Value ? <li>{state.photo4Value.name}</li> : ""}
                    {state.photo5Value ? <li>{state.photo5Value.name}</li> : ""}
                  </ul>
                </Grid>
                <Grid item xs={4}></Grid>
              </Grid>
              <Grid container justifyContent={"center"}>
                <Grid
                  item
                  xs={12}
                  sx={{ marginTop: "20px", marginBottom: "20px" }}
                >
                  <Button
                    variant="contained"
                    fullWidth
                    component="label"
                    sx={{
                      backgroundColor: "#feb55f",
                      "&:hover": {
                        backgroundColor: "#000",
                        color: "feb55f",
                      },
                    }}
                    disabled={!GlobalState.userIsLoggedIn}
                    style={textFieldType}
                  >
                    Upload Images (Max 5)
                    <input
                      type="file"
                      name="photos"
                      id="photos"
                      accept="image/png, image/gif, image/jpeg, image/jpg"
                      hidden
                      onChange={(e) =>
                        dispatch({
                          type: "catchUploadedImages",
                          imagesChosen: e.target.files,
                        })
                      }
                      multiple
                    />
                  </Button>
                </Grid>
              </Grid>
              <Grid container justifyContent={"space-between"}>
                <Grid item xs={5}>
                  <TextField
                    fullWidth
                    label="Price"
                    name="price"
                    //type="number"
                    variant="standard"
                    value={state.priceValue}
                    placeholder="Enter price for product"
                    style={textFieldType}
                    sx={{ marginTop: "20px", marginBottom: "20px" }}
                    required
                    onChange={(e) =>
                      dispatch({
                        type: "catchPriceChange",
                        priceChosen: e.target.value.trim(),
                      })
                    }
                    onBlur={(e) =>
                      dispatch({
                        type: "catchPriceValueChange",
                        priceValueChosen: e.target.value.trim(),
                      })
                    }
                    error={state.priceErrors.hasErrors ? true : false}
                    helperText={state.priceErrors.errorMessage}
                  />
                </Grid>
                <Grid item xs={5}>
                  <TextField
                    fullWidth
                    label="Quantity"
                    name="quantity"
                    variant="standard"
                    value={state.quantityValue}
                    placeholder="Enter quantity of product"
                    style={textFieldType}
                    sx={{ marginTop: "20px", marginBottom: "20px" }}
                    required
                    onChange={(e) =>
                      dispatch({
                        type: "catchQuantityChange",
                        quantityChosen: e.target.value.trim(),
                      })
                    }
                    onBlur={(e) =>
                      dispatch({
                        type: "catchQuantityValueChange",
                        quantityValueChosen: e.target.value.trim(),
                      })
                    }
                    error={state.quantityErrors.hasErrors ? true : false}
                    helperText={state.quantityErrors.errorMessage}
                  />
                </Grid>
              </Grid>
              <Button
                variant="contained"
                fullWidth
                style={textFieldType}
                type="submit"
                sx={{
                  backgroundColor: "#feb55f",
                  color: "white",
                  "&:hover": { backgroundColor: "black", color: "#feb55f" },
                  marginTop: "20px",
                  marginBottom: "20px",
                }}
                disabled={state.disabledBtn}
              >
                Update Product
              </Button>
            </form>
            <Button
              variant="contained"
              style={deleteBtn}
              onClick={props.closeDialog}
            >
              Cancel
            </Button>
          </Grid>
          <Grid item xs={2}></Grid>
        </Paper>
      </Grid>
      <Snackbar
        open={state.openSnack}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert severity="success">
          You have successfully updated your application!
        </Alert>
      </Snackbar>
    </div>
  );
};

export default ProductUpdate;
