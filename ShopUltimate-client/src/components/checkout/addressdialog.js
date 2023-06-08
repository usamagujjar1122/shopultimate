import * as React from "react";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import { useState } from "react";
// import { makeStyles } from "@material-ui/core";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import {
  Container,
  Box,
  Paper,
  Stack,
  Typography,
  Avatar,
  Button,
  paperClasses,
  Grid,
  TextField,
  Dialog,
  DialogTitle,
} from "@mui/material";
// import Nav from "../../layouts/nav";
import { setAlert } from "../../redux/actions/alertactions";
import { useDispatch, useSelector } from "react-redux";
// import UserSideBar from "../userSideBar";
import { addaddress } from "../../redux/actions/addressactions";
import { useNavigate } from "react-router-dom";

const AddAddressDialog = ({ open, setOpen }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [email, setemail] = useState();
  const [phone, setphone] = useState();
  const [country, setcountry] = useState();
  const [city, setcity] = useState();
  const [postalcode, setpostalcode] = useState();
  const [streetaddress, setstreetaddress] = useState();

  const loading = useSelector((state) => state.address.loading);

  const bar = document.getElementById("sidebar");
  const handleSlide = () => {
    if (bar.style.left === "-60%") {
      bar.style.left = "0%";
    } else {
      bar.style.left = "-60%";
    }
  };
  const submitform = async (event) => {
    event.preventDefault();
    const formData = { email, phone, country, city, postalcode, streetaddress };
    dispatch(addaddress(formData, null, setOpen));
  };

  return (
    <>
      <Dialog open={open}>
        <DialogTitle>Add New Address</DialogTitle>
        <Box sx={{ display: "flex", position: "relative", pb: 2 }}>
          <Box sx={{ width: "100%" }}>
            <Box sx={{}}>
              <Box
                component="form"
                method="post"
                onSubmit={submitform}
                sx={{ padding: "0 25px" }}
              >
                <TextField
                  id="outlined-basic"
                  label="Email"
                  variant="outlined"
                  color="error"
                  fullWidth
                  value={email}
                  size="small"
                  sx={{ mb: 1 }}
                  // error={nameErr}
                  onChange={(e) => setemail(e.target.value)}
                />

                <TextField
                  id="outlined-basic"
                  label="Phone"
                  value={phone}
                  variant="outlined"
                  color="error"
                  fullWidth
                  size="small"
                  sx={{ mb: 1 }}
                  type={Number}
                  //   error={numberErr}
                  onChange={(e) => setphone(e.target.value)}
                />
                <TextField
                  id="outlined-basic"
                  label="Postal Code"
                  value={postalcode}
                  variant="outlined"
                  sx={{ mb: 1 }}
                  color="error"
                  fullWidth
                  size="small"
                  //   type={Number}
                  //   error={numberErr}
                  onChange={(e) => setpostalcode(e.target.value)}
                />
                <TextField
                  id="outlined-basic"
                  label="City"
                  value={city}
                  variant="outlined"
                  color="error"
                  sx={{ mb: 1 }}
                  fullWidth
                  size="small"
                  //   type={Number}
                  //   error={numberErr}
                  onChange={(e) => setcity(e.target.value)}
                />
                <TextField
                  id="outlined-basic"
                  label="Countrye"
                  value={country}
                  variant="outlined"
                  color="error"
                  fullWidth
                  sx={{ mb: 1 }}
                  size="small"
                  //   type={Number}
                  //   error={numberErr}
                  onChange={(e) => setcountry(e.target.value)}
                />
                <TextField
                  id="outlined-basic"
                  label="Strret Address"
                  value={streetaddress}
                  variant="outlined"
                  color="error"
                  sx={{ mb: 1 }}
                  fullWidth
                  size="small"
                  //   type={Number}
                  //   error={numberErr}
                  onChange={(e) => setstreetaddress(e.target.value)}
                />
                <Box sx={{ textAlign: "right" }}>
                  <Button
                    type="submit"
                    omponenet="h2"
                    color="error"
                    sx={{ marginTop: "20px" }}
                  >
                    Add Address
                  </Button>
                  <Button
                    omponenet="h2"
                    color="error"
                    sx={{ marginTop: "20px" }}
                    onClick={() => setOpen(false)}
                  >
                    Cancle
                  </Button>
                </Box>
              </Box>
            </Box>
          </Box>
        </Box>
      </Dialog>
    </>
  );
};

export default AddAddressDialog;
