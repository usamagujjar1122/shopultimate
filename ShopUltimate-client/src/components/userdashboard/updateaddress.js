import React, { useEffect, useState } from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { updateaddress } from "../../redux/actions/addressactions";
import { useDispatch, useSelector } from "react-redux";
import { Grid } from "@mui/material";
import { CLEAR_CURRENT_ADDRESS } from "../../redux/types";
export default function Updateaddress(props) {
  const dispatch = useDispatch();
  const currentaddress = useSelector((state) => state.address.currentaddress);
  const [open, setOpen] = React.useState(false);
  const [email, setemail] = useState();
  const [phone, setphone] = useState();
  const [country, setcountry] = useState();
  const [city, setcity] = useState();
  const [postalcode, setpostalcode] = useState();
  const [streetaddress, setstreetaddress] = useState();

  const handleClickOpen = () => {
    props.setOpen(true);
  };

  useEffect(() => {
    setemail(currentaddress?.email);
    setphone(currentaddress?.phone);
    setcountry(currentaddress?.country);
    setcity(currentaddress?.city);
    setpostalcode(currentaddress?.postalcode);
    setstreetaddress(currentaddress?.streetaddress);
  }, [currentaddress]);
  // useEffect(() => {
  //   props.setcurrentaddress(null);
  // }, [dispatch]);
  const handleClose = () => {
    props.setOpen(false);
    dispatch({ type: CLEAR_CURRENT_ADDRESS });
  };
  const handleupdate = () => {
    const formData = {
      email,
      phone,
      country,
      city,
      postalcode,
      streetaddress,
      id: currentaddress?._id,
    };
    dispatch(updateaddress(formData, props.setOpen));
    dispatch({ type: CLEAR_CURRENT_ADDRESS });
  };
  return (
    <Dialog open={props.open} onClose={handleClose}>
      <DialogTitle>Update Address</DialogTitle>
      <DialogContent>
        <Grid container rowSpacing={5} columnSpacing={5} >
          <Grid item xs={12} marginTop="10px">
            <TextField
              id="outlined-basic"
              label="Email"
              variant="outlined"
              color="error"
              fullWidth
              // defaultValue={currentaddress?.email}
              value={email}
              size="small"
              // error={nameErr}
              onChange={(e) => setemail(e.target.value)}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              id="outlined-basic"
              label="Phone"
              value={phone}
              variant="outlined"
              color="error"
              fullWidth
              size="small"
              type={Number}
              //   error={numberErr}
              onChange={(e) => setphone(e.target.value)}
            />
            </Grid>
          <Grid item xs={12}>
            <TextField
              id="outlined-basic"
              label="Postal Code"
              value={postalcode}
              variant="outlined"
              color="error"
              fullWidth
              size="small"
              //   type={Number}
              //   error={numberErr}
              onChange={(e) => setpostalcode(e.target.value)}
            />
            </Grid>
          <Grid item xs={12}>
            <TextField
              id="outlined-basic"
              label="City"
              value={city}
              variant="outlined"
              color="error"
              fullWidth
              size="small"
              //   type={Number}
              //   error={numberErr}
              onChange={(e) => setcity(e.target.value)}
            />
            </Grid>
          <Grid item xs={12}>
            <TextField
              id="outlined-basic"
              label="Country"
              value={country}
              variant="outlined"
              color="error"
              fullWidth
              size="small"
              //   type={Number}
              //   error={numberErr}
              onChange={(e) => setcountry(e.target.value)}
            />
            </Grid>
          <Grid item xs={12}>
            <TextField
              id="outlined-basic"
              label="Strret Address"
              value={streetaddress}
              variant="outlined"
              color="error"
              fullWidth
              size="small"
              //   type={Number}
              //   error={numberErr}
              onChange={(e) => setstreetaddress(e.target.value)}
            />
          </Grid>
        </Grid>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Cancel</Button>
        <Button onClick={handleupdate}>Update</Button>
      </DialogActions>
    </Dialog>
  );
}
