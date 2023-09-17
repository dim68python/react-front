import React from 'react'
import { useParams, useNavigate } from 'react-router';
import { Button, Grid, Paper, Typography } from '@mui/material'
// import DispatchContext from "../context/DispatchContext";
// import StateContext from "../context/StateContext";
import axios from 'axios';

const Activate = () => {
  const paperType = { width: 400, margin: "20px auto", padding: "30px 20px" };
  const params = useParams();
  const navigate = useNavigate();
  // const GlobalState = useContext(StateContext);
  // const GlobalDispatch = useContext(DispatchContext);
  //console.log('params', params);
  const URL = "https://ilx-3022db9b1ed6.herokuapp.com/auth/users/activation/";
 async function ActivateAccount(){
  try {
    await axios.post(URL, {'uid': params.uid, 'token': params.token});
    navigate('/login');
  } catch (error) {
    console.log(error.response);
  }
 }

  return (
    <div>
      <Grid>
        <Paper style={paperType} elevation={20}>
          <Grid align="center" sx={{ marginBottom: "10px" }}>
            <Typography variant="h5">
              Please use the button below to activate your account.
            </Typography>
            <Button variant='contained' onClick={ActivateAccount}>Activate</Button>
          </Grid>
        </Paper>
      </Grid>
    </div>
  )
}

export default Activate
