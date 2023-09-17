import React from 'react';
import { Grid, Paper, Typography } from "@mui/material";

const ResetPasswordDone = () => {
const paperType = { width: 400, margin: "20px auto", padding: "30px 20px" };
  return (
    <div>
       <Grid>
        <Paper style={paperType} elevation={20}>
          <Grid align="center" sx={{ marginBottom: "10px" }}>
            <h2 style={{marginBottom:20, color:'#feb55f', fontWeight:900}}>Password Reset Sent</h2>
            <Typography variant="caption" sx={{fontSize:12, fontWeight:700}}>
            We’ve emailed you instructions for setting your password, if an account exists with the email you entered. You should receive them shortly.

If you don’t receive an email, please make sure you’ve entered the address you registered with, and check your spam folder.
            </Typography>
          </Grid>
          
          
        </Paper>
      </Grid>
    </div>
  )
}

export default ResetPasswordDone;
