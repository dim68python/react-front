import React from "react";
import "../footer/footer.css";
import { Box, Container, Link, Typography } from "@mui/material";

const Footer = () => {
  return (
    <Box
      sx={{
        backgroundColor: "#2e2e2e",
        display: "block",
        width: "100%",
        maxHeight: "35vh",
        bottom: 0,
        color: "#feb55f",
        alignItems: "center",
        justifyContent: "center",
        position: "fixed",
      }}
    >
      <Container
        sx={{
          justifyContent: "center",
          marginTop: "4rem",
          alignContent: "center",
        }}
      >
        <Typography variant="body" align="center" color={"#feb55f"}>
          copyright &copy; {""}
          <Link href="http:127.0.0.1:8000" color={"#feb55f"}>
            Olx
          </Link>{" "}
          {new Date().getFullYear()}
          {"."}
        </Typography>
      </Container>
    </Box>
  );
};

export default Footer;
