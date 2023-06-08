// import React from "react";
import { styled } from "@mui/material/styles";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import ButtonBase from "@mui/material/ButtonBase";
import StorefrontOutlinedIcon from "@mui/icons-material/StorefrontOutlined";
import { useSelector, useDispatch } from "react-redux";
import { Container } from "@mui/system";
import {
  removefromcart,
  cartitemdecreament,
  cartitemincreament,
} from "../../redux/actions/cartactions";
import {
  Box,
  Button,
  Avatar,
  IconButton,
  Fab,
  Backdrop,
  CircularProgress,
} from "@mui/material";
import { Delete, Add, Remove } from "@mui/icons-material";
import Nav from "../layouts/nav";

import * as React from "react";

import { Link } from "react-router-dom";
import HeaderV2 from "../layouts/headerV2";

export default function UserCart(props) {
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart);
  const loading = useSelector((state) => state.cart.loading);

  const getcount = () => {
    let items = 0;
    for (let index = 0; index < cart?.carts?.length; index++) {
      const element = cart?.carts[index]?.cartItems;
      items += element?.length;
    }
    return items;
  };

  return (
    <div style={{ minHeight: "100vh", background: "rgba(243,244,246,0.7)" }}>
      <HeaderV2 />
      {loading && (
        <Backdrop
          sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
          open={true}
        >
          <CircularProgress color="inherit" />
        </Backdrop>
      )}
      <Container>
        {getcount() ? (
          <Typography variant="h5" sx={{ mt: 5, mb: 3, fontWeight: "bold" }}>
            Shopping Cart ({getcount()})
          </Typography>
        ) : (
          <Box>
            <Typography variant="h5" sx={{ mt: 5, mb: 3, fontWeight: "bold" }}>
              No Items in cart
            </Typography>
            <Link to="/shops">
              <Button variant="contained" color="success">
                Go Back Shopping!
              </Button>
            </Link>
          </Box>
        )}
        <Grid container spacing={2}>
          <Grid xs={12} md={8}>
            {cart?.carts?.map((cartt) => {
              return (
                <Paper sx={{ mt: 2, mb: 2, p: 2 }}>
                  <Box
                    sx={{
                      borderBottom: "1px solid #e5e7eb",
                      pb: 1,
                      display: "flex",
                      justifyContent: "space-between",
                    }}
                  >
                    <Box sx={{ display: "flex" }}>
                      <StorefrontOutlinedIcon sx={{ mr: 1 }} />
                      <Typography sx={{ textTransform: "capitalize" }}>
                        {cartt?.store?.shopname}
                      </Typography>
                    </Box>
                    <Box>
                      <Typography>
                        <b>Total ${cartt?.carttotal}</b>
                      </Typography>
                    </Box>
                  </Box>

                  {cartt?.cartItems &&
                    cartt?.cartItems?.map((row, index) => (
                      <Box
                        sx={{
                          pt: 1,
                          pb: 1,
                          borderBottom:
                            cartt?.cartItems[index + 1] && "1px solid #e5e7eb",
                        }}
                      >
                        <Box sx={{ display: "flex" }}>
                          <Box>
                            <Avatar
                              variant="square"
                              src={row.product.images[0]}
                              sx={{ width: 100, height: 100 }}
                            ></Avatar>
                          </Box>
                          <Box sx={{ width: "100%" }}>
                            <Grid container>
                              <Grid item xs={8}>
                                <Typography
                                  variant="h6"
                                  sx={{
                                    ml: 2,
                                    fontWeight: "bold",
                                    fontSize: "17px",
                                  }}
                                >
                                  {row.product.productTitle}
                                </Typography>
                              </Grid>
                              <Grid item xs={4} sx={{ textAlign: "right" }}>
                                <IconButton
                                  sx={{ color: "#009f7f" }}
                                  onClick={() =>
                                    dispatch(
                                      removefromcart(
                                        row.product._id,
                                        cartt._id,
                                        cartt.store
                                      )
                                    )
                                  }
                                >
                                  <Delete />
                                </IconButton>
                              </Grid>
                            </Grid>
                            <Box sx={{ ml: 2, mt: -1 }}>
                              <Typography
                                variant="h6"
                                sx={{
                                  fontSize: "15px",
                                }}
                              >
                                ${row.product.price} x {row.quantity}
                              </Typography>
                            </Box>
                            <Box sx={{ ml: 2, mt: 1 }}>
                              <Box
                                sx={{ display: "flex", alignItems: "center" }}
                              >
                                <IconButton
                                  sx={{
                                    mr: 1,
                                    borderRadius: "3px !important",
                                    background: "#f5f5f5",
                                  }}
                                  size="small"
                                  onClick={() =>
                                    dispatch(
                                      cartitemincreament(
                                        row.product._id,
                                        cartt._id,
                                        cartt.store
                                      )
                                    )
                                  }
                                >
                                  <Add sx={{ fontSize: "medium" }} />
                                </IconButton>
                                <Typography sx={{ mr: 1 }}>
                                  {row.quantity}
                                </Typography>
                                <IconButton
                                  sx={{
                                    background: "#f5f5f5",
                                    borderRadius: "3px !important",
                                  }}
                                  onClick={() =>
                                    dispatch(
                                      cartitemdecreament(
                                        row.product._id,
                                        cartt._id,
                                        cartt.store
                                      )
                                    )
                                  }
                                  size="small"
                                >
                                  <Remove sx={{ fontSize: "medium" }} />
                                </IconButton>
                                {/* <Button
                                  variant="contained"
                                  size="small"
                                  sx={{ boxShadow: "0" }}
                                  onClick={() =>
                                    dispatch(
                                      cartitemincreament(
                                        row.product._id,
                                        cartt._id,
                                        cartt.store
                                      )
                                    )
                                  }
                                >
                                  <Add />
                                </Button>
                                <Button sx={{ boxShadow: "0" }} size="small">
                                  {row.quantity}
                                </Button>
                                <Button
                                  disabled={row.quantity == 1}
                                  variant="contained"
                                  sx={{ boxShadow: "0" }}
                                  size="small"
                                  onClick={() =>
                                    dispatch(
                                      cartitemdecreament(
                                        row.product._id,
                                        cartt._id,
                                        cartt.store
                                      )
                                    )
                                  }
                                >
                                  <Remove />
                                </Button> */}
                              </Box>
                            </Box>
                          </Box>
                        </Box>
                      </Box>
                    ))}
                </Paper>
              );
            })}
          </Grid>
          <Grid item xs={12} md={4}>
            {getcount() ? (
              <Paper
                sx={{
                  p: 2,
                }}
              >
                <Typography variant="h5">Summary</Typography>
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    mt: 1,
                    mb: 1,
                  }}
                >
                  <Typography sx={{ fontWeight: "bold", fontSize: "18px" }}>
                    Total
                  </Typography>
                  <Typography sx={{ fontWeight: "bold", fontSize: "18px" }}>
                    ${cart.cartTotal}
                  </Typography>
                </Box>
                <Link to="/checkout" style={{ textDecoration: "none" }}>
                  <Button
                    variant="contained"
                    fullWidth
                    sx={{
                      background: "#009f7f",
                      "&:hover": { background: "#009f7f" },
                    }}
                  >
                    Proceed To Checkout
                  </Button>
                </Link>
              </Paper>
            ) : null}
          </Grid>
        </Grid>
      </Container>
    </div>
  );
}
