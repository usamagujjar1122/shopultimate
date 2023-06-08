import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import Nav from '../layouts/nav'
import Box from '@mui/material/Box';
import { Grid, TextField, Button, Typography,Alert } from "@mui/material";
import {verifyemail,inprogress,clearalert} from '../../redux/actions/authactions'
import { useState } from 'react';


export default function Verify(props) {
    const [otp, setotp] = useState('');
    const { id } = useParams();
    const dispatch = useDispatch()
    const error = useSelector((state) => state.errors);
    const auth = useSelector((state) => state.auth);
    const submitform = (event) => {
        event.preventDefault()
        const formData = {
            id:id,
            otp:otp
        }
        dispatch(inprogress(true))
        dispatch(verifyemail(formData))
        setotp('')
    }
    console.log(otp)
    
  return (
    <>
        <Nav />
        <Grid container direction="column" alignItems="center" justify="center" justifyContent="center">
                    <Box component="form" sx={{width: 700,}} style={{ marginTop: "2em" }} method="post" onSubmit={submitform}>
                    <Typography variant="h4" style={{ marginBottom: "10px" }}>Enter Otp</Typography>
                    {error.message ?  <Alert onClose={() => {dispatch(clearalert())}} style={{ marginBottom: "10px" }} variant="filled" severity="error">{error.message}</Alert>: null}
                    {auth.notification ?  <Alert onClose={() => {}} style={{ marginBottom: "10px" }} variant="filled" severity="success">{auth.notification}</Alert>: null}

                    
                <TextField
                        variant="outlined"
                        label="otp"
                        fullWidth
                        size="small"
                        style={{ marginBottom: "1em" }}
                        type="text" placeholder="otp..." value={otp} onChange={(e) => setotp(e.target.value)} name="otp"
                    />
                   
                    {auth.inprogress ? 
                    <Button size="medium" variant="contained" color="primary" type="submit" disabled>
                        Sending....
                    </Button>
                    : 
                    <Button size="medium" variant="contained" color="primary" type="submit">
                        Verify
                    </Button>
                    }
                    
                   
                </Box>

                </Grid>
    </>
  )
}
