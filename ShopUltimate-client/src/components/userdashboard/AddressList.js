import LocationOnIcon from "@mui/icons-material/LocationOn";
import * as React from "react";
import { Link } from "react-router-dom";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
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
  IconButton,
  Drawer,
} from "@mui/material";
import Nav from "../layouts/nav";
import { useDispatch, useSelector } from "react-redux";

import UserSideBar from "./userSideBar";
import { useEffect, useState } from "react";
import {
  deleteaddress,
  getaddress,
  setcurrentaddress,
} from "../../redux/actions/addressactions";
import Updateaddress from "./updateaddress";
import HeaderV2 from "../layouts/headerV2";

const AddressList = () => {
  const [open, setOpen] = useState(false);
  const [currentaddress, Setcurrentaddress] = useState(null);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getaddress());
  }, []);

  const address_ = useSelector((state) => state.address.addressess);
  const handleupdate = async (address) => {
    dispatch(setcurrentaddress(address));
    Setcurrentaddress(address);
    setOpen(true);
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
              Address List
            </Typography>
          </Stack>
          <Box sx={{ display: "flex" }}>
            <Link
              to="/settings/deliveryaddress/addaddress"
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
                Add addresses
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
        <Box mt="20px">
          {address_?.length > 0 ? (
            address_.map((address) => (
              <Paper sx={{ mt: "20px", p: "8px 16px", borderRadius: "5px" }}>
                <Grid
                  container
                  sx={{
                    alignItems: "center",
                    justifyContent: "space-between",
                  }}
                  spacing={2}
                >
                  <Grid item xs={2}>
                    <Typography>{address?.user?.username}</Typography>
                  </Grid>
                  <Grid item xs={5}>
                    <Typography noWrap>
                      {address?.streetaddress} {", "}
                      {address?.city} {", "}
                      {address?.country}
                    </Typography>
                  </Grid>

                  <Grid item xs={2}>
                    <Typography>{address?.phone}</Typography>
                  </Grid>

                  <Grid
                    item
                    xs={3}
                    sx={{ display: "flex", justifyContent: "center" }}
                  >
                    <Typography>
                      <IconButton
                        onClick={() => {
                          handleupdate(address);
                        }}
                      >
                        <EditIcon />
                      </IconButton>
                      <IconButton
                        onClick={() => dispatch(deleteaddress(address?._id))}
                      >
                        <DeleteIcon />
                      </IconButton>
                    </Typography>
                  </Grid>
                </Grid>
              </Paper>
            ))
          ) : (
            <Paper sx={{ p: 2 }}>
              <Typography>You Donot Have Any Delivery Address.</Typography>
            </Paper>
          )}
          {/* <Paper sx={{ mt: "20px", p: "8px 16px", borderRadius: "5px" }}>
              <Grid
                container
                sx={{ alignItems: "center", justifyContent: "space-between" }}
                spacing={2}
              >
                <Grid item xs={2}>
                  <Typography>Ralf Edward</Typography>
                </Grid>
                <Grid item xs={5}>
                  <Typography noWrap>
                    777 Brockton Avenue, Abington MA 2351
                  </Typography>
                </Grid>

                <Grid item xs={2}>
                  <Typography>+1927987987498</Typography>
                </Grid>

                <Grid item xs={2}>
                  <Typography>
                    <IconButton>
                      <EditIcon />
                    </IconButton>
                    <IconButton>
                      <DeleteIcon />
                    </IconButton>
                  </Typography>
                </Grid>
              </Grid>
            </Paper> */}
        </Box>
        <Updateaddress
          open={open}
          setOpen={setOpen}
          currentaddress={currentaddress}
          setcurrentaddress={setcurrentaddress}
        />
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

export default AddressList;
