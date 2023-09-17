import { Button, Typography } from "@mui/material";
import React, { useContext } from "react";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import { Card } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import StateContext from "../context/StateContext";

const Product = ({ product }) => {
  const navigate = useNavigate();
  const GlobalState = useContext(StateContext);
  return (
    <Card
      className="my-3 p-3 rounded"
      style={{ width: "100%", backgroundColor: "#fff" }}
    >
      <Card.Img
        src={
          product.photo1
            ? product.photo1
            : "https://res.cloudinary.com/dyrp3aqdq/image/upload/v1635353844/agropoultry/no-image_lcs5cq.png"
        }
        alt={product.name}
        style={{
          width: "70%",
          height: "70%",
          padding: "0.4rem",
          backgroundSize: "cover",
          cursor: "pointer",
        }}
        onClick={() => navigate(`/products/${product.id}`)}
      />
      <Card.Body>
        <Card.Title>
          <Typography
            variant="h6"
            onClick={() => navigate(`/products/${product.id}`)}
            sx={{ marginBottom: "1rem", cursor: "pointer" }}
          >
            {product.name}
          </Typography>
        </Card.Title>
        <Card.Text>{product.description.substring(0, 20)}...</Card.Text>
        <Card.Footer
          style={{ justifyContent: "center", alignContent: "center" }}
        >
          <Button
            //fullWidth
            variant="outlined"
            sx={{
              marginBottom: "0.2rem",
              borderBlockColor: "transparent",
              backgroundColor: "#000",
              width: "90%",
              color: "#feb55f",
              justifyContent: "center",
              cursor: "pointer",
              "&:hover": { backgroundColor: "#feb55f", color: "#fff" },
            }}
            onClick={() => navigate(`/products/${product.id}`)}
          >
            Product Details
          </Button>
        </Card.Footer>
      </Card.Body>
    </Card>
  );
};

export default Product;
