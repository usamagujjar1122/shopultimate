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
  Drawer,
} from "@mui/material";
import Nav from "../layouts/nav";
import { setAlert } from "../../redux/actions/alertactions";
import { useDispatch, useSelector } from "react-redux";
import UserSideBar from "./userSideBar";
import { addaddress } from "../../redux/actions/addressactions";
import { Link, useNavigate } from "react-router-dom";
import HeaderV2 from "../layouts/headerV2";
import { Send } from "@mui/icons-material";

const AddAddress = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [email, setemail] = useState();
  const [phone, setphone] = useState();
  const [country, setcountry] = useState();
  const [city, setcity] = useState();
  const [postalcode, setpostalcode] = useState();
  const [streetaddress, setstreetaddress] = useState();

  const loading = useSelector((state) => state.address.loading);
  const submitform = async (event) => {
    event.preventDefault();

    const formData = { email, phone, country, city, postalcode, streetaddress };
    dispatch(addaddress(formData, navigate));
  };

  //
  const anchor = "left";
  const [state, setState] = useState({ left: false });
  const toggleDrawer = (anchor, open) => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }

    setState({ ...state, [anchor]: open });
  };

  return (
    <>
      <HeaderV2 />
      <Container>
        <Box sx={{ display: "flex", justifyContent: "space-between", mt: 3 }}>
          <Stack direction="row" spacing={1} alignItems="center">
            <LocationOnIcon fontSize="large" sx={{ color: "red " }} />
            <Typography variant="h5" sx={{ fontWeight: "bold" }}>
              Add Address
            </Typography>
          </Stack>
          <Box sx={{ display: "flex" }}>
            <Link
              to="/settings/deliveryaddress"
              style={{ textDecoration: "none" }}
            >
              <Button
                component="h2"
                sx={{
                  color: "#f44336",
                  backgroundColor: "#ffebee",
                  textTransform: "capitalize",
                  padding: "10px 20px",
                }}
              >
                Back to addresses
              </Button>
            </Link>
            <IconButton
              color="inherit"
              aria-label="open drawer"
              edge="start"
              onClick={toggleDrawer(anchor, true)}
              sx={{ mr: 2, display: { md: "none" }, marginLeft: "16px" }}
            >
              <MenuIcon />
            </IconButton>
          </Box>
        </Box>
        <Paper sx={{ marginTop: "20px" }}>
          <Box
            component="form"
            method="post"
            onSubmit={submitform}
            sx={{ padding: "25px" }}
          >
            <Grid container rowSpacing={5} columnSpacing={5}>
              <Grid item md={6} xs={12}>
                <TextField
                  id="outlined-basic"
                  label="Email"
                  variant="outlined"
                  color="error"
                  fullWidth
                  value={email}
                  size="small"
                  // error={nameErr}
                  onChange={(e) => setemail(e.target.value)}
                />
              </Grid>
              <Grid item md={6} xs={12}>
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
              <Grid item md={6} xs={12}>
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
              <Grid item md={6} xs={12}>
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
              <Grid item md={6} xs={12}>
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
              <Grid item md={6} xs={12}>
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
            <Box sx={{ textAlign: "right" }}>
              <Button
                type="submit"
                endIcon={<Send />}
                omponenet="h2"
                variant="contained"
                color="error"
                sx={{ marginTop: "30px" }}
              >
                Add Address
              </Button>
            </Box>
          </Box>
        </Paper>
        <React.Fragment key={anchor}>
          <Drawer
            anchor={anchor}
            open={state[anchor]}
            onClose={toggleDrawer(anchor, false)}
          >
            <UserSideBar />
          </Drawer>
        </React.Fragment>
      </Container>
    </>
  );
};

export default AddAddress;
