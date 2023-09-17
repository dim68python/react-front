import React from "react";
import { Grid,Typography,Paper } from "@mui/material";

const CreationInfo = () => {
  const paperType = { width: 400, margin: "20px auto", padding: "30px 20px" };
  //const textFieldType = { marginBottom: "10px" };
  return (
    <div>
      <Grid>
        <Paper style={paperType} elevation={20}>
          <Grid align="center" sx={{ marginBottom: "10px" }}>
            <Typography variant="h5">
              Thanks for signing up!To activate your
              account, please click the link sent to you!.
            </Typography>
          </Grid>
        </Paper>
      </Grid>
    </div>
  );
};

export default CreationInfo;
