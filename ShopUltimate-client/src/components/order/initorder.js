import { styled } from "@mui/material/styles";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import { useSelector, useDispatch } from "react-redux";
import { Container } from "@mui/system";
import { Box, Button, ButtonGroup, Avatar } from "@mui/material";

import Nav from "../layouts/nav";

import * as React from "react";
import { useNavigate } from "react-router-dom";

import { Link } from "react-router-dom";
import { Createorder } from "../../redux/actions/orderactions";
import Userpayment from "../stripe/userpayment";

export default function Initorder(props) {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const cart = useSelector((state) => state.cart);
  const shipping = useSelector((state) => state.shipping.shipping);
  const loading = useSelector((state) => state.order.loading);

  const createorder = (e, cartid) => {
    dispatch(Createorder(cartid, navigate));
  };
  return (
    <>
      <Container sx={{ mb: 3 }}>
        <Typography variant="h6" sx={{ mt: 3, fontWeight: "bold" }}>
          Review Orders
        </Typography>
        {cart.carts.map((cart) => {
          return (
            <Box>
              <Paper sx={{ mt: 2, mb: 2 }}>
                <Grid container sx={{ background: "#cccccc", padding: 1 }}>
                  <Grid item>
                    <Typography variant="h6">Order Items</Typography>
                  </Grid>
                </Grid>
                {cart.cartItems.map((item) => {
                  return (
                    <Grid container sx={{ padding: 1 }}>
                      <Grid
                        item
                        xs={2}
                        sx={{ display: "flex", alignItems: "center" }}
                      >
                        {item.product.images[0] ? (
                          <img src={item.product.images[0]} width="100" />
                        ) : (
                          <Avatar>A</Avatar>
                        )}
                      </Grid>
                      <Grid item xs={4}>
                        <Typography variant="h6">
                          {item.product.productTitle}
                        </Typography>
                        <Typography variant="p">
                          {item.product.price} x {item.quantity}{" "}
                        </Typography>
                      </Grid>
                      <Grid
                        item
                        xs={4}
                        sx={{ display: "flex", alignItems: "center" }}
                      >
                        <Typography>{item.product.shop.shopname}</Typography>
                      </Grid>
                    </Grid>
                  );
                })}
              </Paper>
              <Paper
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  padding: 2,
                  mb: 2,
                }}
              >
                <Typography variant="h6">Shipping Address</Typography>
                <Typography variant="p">
                  {shipping.streetaddress} {shipping.city} {shipping.country}
                </Typography>
              </Paper>
              <Paper sx={{ padding: 2 }}>
                <Typography variant="h6">Order Summery</Typography>
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    pt: 1,
                  }}
                >
                  <Typography variant="h6" sx={{ fontSize: "16px", pb: 1 }}>
                    Sub Total
                  </Typography>
                  <Typography variant="p">{cart.carttotal}</Typography>
                </Box>
                <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                  <Typography variant="h6" sx={{ fontSize: "16px", pb: 1 }}>
                    Shipping Fee{" "}
                  </Typography>
                  <Typography variant="p">----</Typography>
                </Box>
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    borderBottom: "1px solid #cccccc",
                  }}
                >
                  <Typography
                    variant="h6"
                    sx={{
                      fontSize: "16px",
                      pb: 1,
                    }}
                  >
                    Discount{" "}
                  </Typography>
                  <Typography variant="p">$0</Typography>
                </Box>

                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    pt: 1,
                  }}
                >
                  <Typography variant="h6">Total </Typography>
                  <Typography variant="p">${cart.cartTotal}</Typography>
                </Box>
              </Paper>
              {loading ? (
                <Button variant="contained" sx={{ mt: 2 }} fullWidth disabled>
                  Createing....
                </Button>
              ) : (
                <Button
                  variant="contained"
                  sx={{ mt: 2 }}
                  fullWidth
                  onClick={(e) => createorder(e, cart._id)}
                >
                  Place Order
                </Button>
              )}
            </Box>
          );
        })}
      </Container>
    </>
  );
}
