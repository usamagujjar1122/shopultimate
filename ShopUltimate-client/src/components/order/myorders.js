import React, { useEffect } from "react";
import ShoppingBagOutlinedIcon from "@mui/icons-material/ShoppingBagOutlined";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import SupportAgentOutlinedIcon from "@mui/icons-material/SupportAgentOutlined";
import PersonIcon from "@mui/icons-material/Person";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import CreditCardIcon from "@mui/icons-material/CreditCard";
import ShoppingBagIcon from "@mui/icons-material/ShoppingBag";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";

import {
  Pagination,
  Stack,
  Paper,
  Box,
  Container,
  Typography,
  Chip,
  IconButton,
  Grid,
} from "@mui/material";
import Nav from "../layouts/nav";
import { useDispatch, useSelector } from "react-redux";
import { getorders_c } from "../../redux/actions/orderactions";
import { Link } from "react-router-dom";
import HeaderV2 from "../layouts/headerV2";
import { Close, Done, Refresh } from "@mui/icons-material";
import moment from "moment";
const Myorders = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getorders_c());
  }, []);
  const orders = useSelector((state) => state.order.c_orders);
  return (
    <>
      <HeaderV2 />
      <Container>
        <Stack direction="row" spacing={1} sx={{ mt: 3 }}>
          <ShoppingBagIcon fontSize="large" sx={{ color: "red " }} />

          <Typography variant="h4" sx={{ fontWeight: "bold" }}>
            My Orders
          </Typography>
        </Stack>
        <Box sx={{ m: 1, p: 1 }}>
          <Grid container sx={{}} spacing={2}>
            <Grid item xs={2.4}>
              <Typography
                sx={{ fontWeight: "bold", color: "#7D879C", fontSize: "18px" }}
              >
                Order Status
              </Typography>
            </Grid>
            <Grid item xs={2.4}>
              <Typography
                sx={{ fontWeight: "bold", color: "#7D879C", fontSize: "18px" }}
              >
                Delivery Status
              </Typography>
            </Grid>
            <Grid item xs={2.4}>
              <Typography
                sx={{ fontWeight: "bold", color: "#7D879C", fontSize: "18px" }}
              >
                Payment Status
              </Typography>
            </Grid>

            <Grid item xs={2.4}>
              <Typography
                sx={{ fontWeight: "bold", color: "#7D879C", fontSize: "18px" }}
              >
                Date Purchased
              </Typography>
            </Grid>

            <Grid item xs={2.4}>
              <Typography
                sx={{ fontWeight: "bold", color: "#7D879C", fontSize: "18px" }}
              >
                Total
              </Typography>
            </Grid>

            <Grid item xs={2.4}>
              <Box></Box>
            </Grid>
          </Grid>
        </Box>
        {/* ############# */}
        <Box>
          {orders && orders?.length > 0 ? (
            orders.map((order) => {
              return (
                <Paper sx={{ m: 1, p: 1, borderRadius: "5px" }}>
                  <Grid container sx={{ alignItems: "center" }} spacing={2}>
                    <Grid item xs={2.4}>
                      <Chip
                        label={order?.orderstatus}
                        size="small"
                        sx={{
                          borderRadius: "5px",
                          // color: "#FFCD4E",
                          background: "#E7F9ED",
                          fontWeight: "bold",
                          color:
                            order.orderstatus == "Accepted"
                              ? "rgb(51, 208, 103)"
                              : "Declined"
                              ? "#E94560"
                              : "#FFCD4E",
                        }}
                      />
                    </Grid>
                    <Grid item xs={2.4}>
                      <Chip
                        label={order?.deliverystatus}
                        size="small"
                        sx={{
                          borderRadius: "5px",
                          // color: "#FFCD4E",
                          background: "#E7F9ED",
                          fontWeight: "bold",
                          color:
                            order?.deliverystatus === "Pending"
                              ? "rgb(51, 208, 103)"
                              : "#FFCD4E",
                          "& .MuiChip-deleteIcon": {
                            color:
                              order?.deliverystatus === "Pending"
                                ? "rgb(51, 208, 103)"
                                : "#FFCD4E",
                          },
                        }}
                        deleteIcon={
                          order?.deliverystatus === "Delivered" ? (
                            <Done />
                          ) : (
                            <Refresh />
                          )
                        }
                        onDelete={() => {
                          return;
                        }}
                      />
                    </Grid>

                    <Grid item xs={2.4}>
                      <Chip
                        label={order?.ispaid}
                        sx={{
                          borderRadius: "5px",
                          background: "#E7F9ED",
                          color:
                            order?.ispaid === "Paid"
                              ? "rgb(51, 208, 103)"
                              : "#E94560",
                          "& .MuiChip-deleteIcon": {
                            color:
                              order?.ispaid === "Paid"
                                ? "rgb(51, 208, 103)"
                                : "#E94560",
                          },
                          // flexDirection: "row-reverse",
                        }}
                        // variant="outlined"
                        size="small"
                        deleteIcon={
                          order?.ispaid === "Paid" ? <Done /> : <Close />
                        }
                        onDelete={() => {
                          return;
                        }}
                      ></Chip>
                    </Grid>

                    <Grid item xs={2.4}>
                      <Typography>
                        {moment(order?.createdat).fromNow()}
                      </Typography>
                    </Grid>

                    <Grid
                      item
                      xs={2.4}
                      sx={{ display: "flex", alignItems: "center" }}
                    >
                      <Typography>${order.ordertotal}</Typography>

                      <Link to={`/order/${order._id}`}>
                        <IconButton>
                          <ArrowForwardIcon />
                        </IconButton>
                      </Link>
                    </Grid>
                  </Grid>
                </Paper>
              );
            })
          ) : (
            <Paper sx={{ p: 2 }}>
              <Typography>You Donot Have Any Active Orders</Typography>
            </Paper>
          )}
        </Box>
      </Container>
    </>
  );
};
export default Myorders;
