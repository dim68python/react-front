import React, { useState } from "react";
import { Typography, Grid } from "@mui/material";

const SubCategory = ({ child }) => {
  const [show, setShow] = useState(false);
  return (
    <Grid item xs={4} key={child.id}>
      <Typography variant="p" sx={{ "&:hover": { cursor: "pointer" } }}>
        {child.title}
      </Typography>
    </Grid>
  );
};

export default SubCategory;
