import React from "react";
import Nav from "../layouts/nav";
import {
  Grid,
  TextField,
  Button,
  Typography,
  Paper,
  Alert,
  Box,
  IconButton,
  Container,
  Tooltip,
  Avatar,
  Stack,
  Backdrop,
  CircularProgress,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { useState, useEffect } from "react";
import { styled } from "@mui/material/styles";
import {
  getaddress,
  setcurrentaddress,
} from "../../redux/actions/addressactions";
import { Edit } from "@mui/icons-material";
import Updateaddress from "../userdashboard/updateaddress";
import { Createorder } from "../../redux/actions/orderactions";
import { Link, useNavigate } from "react-router-dom";
import { selectedGridRowsCountSelector } from "@mui/x-data-grid";
import Userpayment from "../stripe/userpayment";
import HeaderV2 from "../layouts/headerV2";
import AddAddressDialog from "./addressdialog";
import { OrderActionAttempt } from "../../redux/types";
// import { addshipping, getshipping } from "../../redux/actions/shippingactions";
const Input = styled("input")({
  display: "none",
});
export default function CheckoutandReview(props) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const address = useSelector((state) => state.address.addressess);

  const [open, setOpen] = React.useState(false);
  const [aopen, setaOpen] = React.useState(false);

  const [paymentid, setpaymentid] = React.useState(null);

  const [selected, setSelected] = React.useState(null);
  const cart = useSelector((state) => state.cart);
  const loading = useSelector((state) => state.order.loading);
  // const [currentaddress, setcurrentaddress] = useState(null);

  // const loading = useSelector((state) => state.shipping.loading);

  //   const error = useSelector((state) => state.errors);
  useEffect(() => {
    dispatch(getaddress());
  }, []);
  const handleupdate = async (address) => {
    dispatch(setcurrentaddress(address));
    // setcurrentaddress(address);
    setOpen(true);
  };
  // const submitform = (event) => {
  //   event.preventDefault();
  //   const formData = { email, phone, country, city, postalcode, streetaddress };
  //   dispatch(addshipping(formData));
  //   if (!loading) {
  //     props.next();
  //   }
  // };
  // if (loading) {
  //   return "loading";
  // }
  const createorder = () => {
    const orderids = cart?.carts.map((cart) => cart._id);
    // console.log(orderids);
    console.log(paymentid);
    dispatch({ type: OrderActionAttempt });

    dispatch(
      Createorder(orderids, selected, navigate, paymentid, cart?.cartTotal)
    );
  };
  return (
    <Box sx={{ minHeight: "100vh", background: "rgba(243,244,246,0.7)" }}>
      <HeaderV2 />
      <Container maxWidth="lg">
        <Grid container spacing={2}>
          <Grid item md={8} xs={12}>
            <Paper sx={{ p: 2, mt: 3 }}>
              <Button onClick={() => setaOpen(true)}>Add New Address</Button>
              <Box sx={{ display: "flex", flexWrap: "wrap" }}>
                {address && address.length > 0
                  ? address.map((item) => (
                      <Box
                        key={item._id}
                        onClick={() => setSelected(item)}
                        sx={{
                          p: 2,
                          border:
                            selected?._id == item?._id
                              ? "1px solid orange"
                              : "1px solid #d0d0d0",
                          m: 1,
                          cursor: "pointer",
                          position: "relative",
                        }}
                      >
                        <Tooltip title="Edit Address">
                          <IconButton
                            sx={{ position: "absolute", top: "5px", right: 0 }}
                            onClick={() => handleupdate(item)}
                          >
                            <Edit />
                          </IconButton>
                        </Tooltip>
                        <Typography>
                          Delivered to <b>{item?.user?.username}</b>
                        </Typography>
                        <Typography>
                          Email <b>{item?.email}</b>
                        </Typography>
                        <Typography>
                          Phone <b>{item?.phone}</b>
                        </Typography>
                        <Typography>
                          Location{" "}
                          <b>
                            {item?.streetaddress} {item?.city} {item?.country}
                          </b>
                        </Typography>
                      </Box>
                    ))
                  : null}
              </Box>
            </Paper>
            <Typography variant="h6" sx={{ mt: 3, fontWeight: "bold" }}>
              Review Orders
            </Typography>

            {cart?.carts?.map((cart) => {
              return (
                <Paper sx={{ p: 2, mb: 2 }}>
                  <Link to="/">
                    <Typography
                      variant="h6"
                      sx={{
                        textTransform: "capitalize",
                        fontSize: "15px",
                        fontWeight: "light",
                      }}
                    >
                      {cart?.store?.shopname + "  " + cart?.store?._id}
                    </Typography>
                  </Link>

                  {cart.cartItems.map((item) => {
                    return (
                      <Stack
                        direction="row"
                        spacing={1}
                        sx={{ mt: 1, borderBottom: "1px solid #d0d0d0", pb: 2 }}
                      >
                        <Avatar
                          src={item?.product?.images[0]}
                          variant="rounded"
                          sx={{
                            border: "1px solid #d0d0d0",
                            width: 50,
                            height: 50,
                            mr: 1,
                          }}
                        ></Avatar>
                        <Box>
                          <Typography
                            variant="p"
                            sx={{ display: "block", fontWeight: "bold" }}
                          >
                            {item.product.productTitle}
                          </Typography>
                          <Typography variant="p" sx={{ fontSize: "14px" }}>
                            {`Qty: ${item.quantity} Price: $${item.product.price}`}
                          </Typography>
                        </Box>
                        <Box></Box>
                      </Stack>
                    );
                  })}
                  <Box sx={{ display: "flex", justifyContent: "right", mt: 2 }}>
                    <Typography>{cart?.cartItems?.length} Item(s)</Typography>
                    <Typography sx={{ color: "red", ml: 1 }}>
                      Sub Total: ${cart?.carttotal}
                    </Typography>
                  </Box>
                </Paper>
              );
            })}
          </Grid>
          <Grid item md={4} xs={12}>
            <Paper sx={{ p: 2, mt: 3 }}>
              <Typography
                variant="h6"
                sx={{ fontWeight: "bold", mb: 1, fontSize: "15px" }}
              >
                Order Summary
              </Typography>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  mb: 0.5,
                }}
              >
                <Typography sx={{ color: "#7D879C" }}>Sub Total</Typography>
                <Typography sx={{ fontWeight: "bold" }}>
                  ${cart?.cartTotal}
                </Typography>
              </Box>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  mb: 0.5,
                }}
              >
                <Typography sx={{ color: "#7D879C" }}>Shipping</Typography>
                <Typography sx={{ fontWeight: "bold" }}>-</Typography>
              </Box>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  borderBottom: "1px solid #d0d0d0",
                  pb: 1,
                }}
              >
                <Typography sx={{ color: "#7D879C" }}>Discount</Typography>
                <Typography sx={{ fontWeight: "bold" }}>-</Typography>
              </Box>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  mt: 1,
                  mb: 1,
                }}
              >
                <Typography
                  variant="h6"
                  sx={{ fontWeight: "bold", fontSize: "15px" }}
                >
                  Total
                </Typography>
                <Typography sx={{ fontWeight: "bold" }}>
                  ${cart?.cartTotal}
                </Typography>
              </Box>
            </Paper>
            <Paper sx={{ mt: 2, p: 2 }}>
              <Box>
                {" "}
                <Userpayment
                  createorder={createorder}
                  setpaymentid={setpaymentid}
                  paymentid={paymentid}
                />
              </Box>
            </Paper>
          </Grid>
        </Grid>
        {loading && (
          <Backdrop
            sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
            open={true}
          >
            <CircularProgress color="inherit" />
          </Backdrop>
        )}
        <Updateaddress
          open={open}
          setOpen={setOpen}
          // currentaddress={currentaddress}
          // setcurrentaddress={setcurrentaddress}
        />
        <AddAddressDialog open={aopen} setOpen={setaOpen} />
      </Container>
    </Box>
  );
}
