import { AddBox, Save } from "@mui/icons-material";
import {
  Typography,
  Box,
  Paper,
  Stack,
  Grid,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Avatar,
  TextField,
  Button,
  Chip,
} from "@mui/material";
import moment from "moment";
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import {
  getsingleorder,
  updateorder,
} from "../../../redux/actions/orderactions";
export default function OrderDetails() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const params = useParams();
  const id = params.id;
  const order = useSelector((state) => state.order.order);

  const [orderstatus, setorderstatus] = useState("");
  const [deliverystatus, setdeliverystatus] = useState("");
  useEffect(() => {
    dispatch(getsingleorder(id));
  }, []);
  useEffect(() => {
    setorderstatus(order.orderstatus);
    setdeliverystatus(order.deliverystatus);
  }, [order]);
  const handleupdate = async () => {
    const formdata = {
      orderstatus,
      deliverystatus,
    };
    dispatch(updateorder(formdata, order._id, navigate));
  };
  return (
    <>
      <Box>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            mb: 2,
            alignItems: "center",
          }}
        >
          <Typography sx={{ fontWeight: "bold" }}>Order Details</Typography>
          <Box>
            <Button
              endIcon={<Save />}
              variant="contained"
              onClick={handleupdate}
            >
              Save Changes
            </Button>
          </Box>
        </Box>
        <Paper sx={{ p: 2 }}>
          <Stack direction="row" spacing={2} sx={{ mb: 2 }}>
            <Typography sx={{ color: " rgb(125, 135, 156)" }}>
              Order ID: <span style={{ color: "#333" }}>{order?._id}</span>
            </Typography>
            <Typography sx={{ color: " rgb(125, 135, 156)" }}>
              Purchase Date:{" "}
              <span style={{ color: "#333" }}>
                {moment(order?.createdat).fromNow()}
              </span>
            </Typography>
          </Stack>
          <Grid container spacing={2} sx={{ mb: 2 }}>
            <Grid item md={6} xs={12}>
              {/* <FormControl fullWidth> */}
              <InputLabel id="demo-simple-select-label">
                Order Status
              </InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                // defaultValue={orderstatus}
                value={orderstatus}
                label="Order Status"
                fullWidth
                disabled={order?.orderstatus != "Incomming" ? true : false}
                onChange={(e) => {
                  setorderstatus(e.target.value);
                }}
              >
                <MenuItem value="Incomming">Incomming</MenuItem>
                <MenuItem value={"Accepted"}>Accept</MenuItem>
                <MenuItem value={"Decline"}>Decline</MenuItem>
              </Select>
              {/* </FormControl> */}
            </Grid>
            <Grid item md={6} xs={12}>
              {/* <FormControl fullWidth> */}
              <InputLabel id="demo-simple-select-label">
                Delivery Status
              </InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={deliverystatus}
                fullWidth
                disabled={
                  order.orderstatus == "Accepted" || "Declined" ? false : true
                }
                label="Delivery Status"
                onChange={(e) => {
                  setdeliverystatus(e.target.value);
                }}
              >
                <MenuItem value={"Processing"}>Processing</MenuItem>
                <MenuItem value={"Pending"}>Pending</MenuItem>
                <MenuItem value={"Delivered"}>Delivered</MenuItem>
              </Select>
              {/* </FormControl> */}
            </Grid>
          </Grid>
          <Box sx={{ mt: 1 }}>
            {order?.items?.map((p) => {
              return (
                <Stack direction="row" spacing={2} sx={{ mb: 2 }}>
                  <Avatar
                    variant="rounded"
                    sx={{ width: 70, height: 70 }}
                    src={p?.product?.images[0]}
                  ></Avatar>
                  <Box>
                    <Typography sx={{ fontWeight: "bold", mb: 0.5 }}>
                      {p?.product?.productTitle}
                    </Typography>

                    <Typography sx={{ color: " rgb(125, 135, 156)" }}>
                      ${p?.product?.price} x {p.quantity}
                    </Typography>
                  </Box>
                </Stack>
              );
            })}
          </Box>
        </Paper>
        <Grid container spacing={2}>
          <Grid item md={6} xs={12}>
            <Paper sx={{ p: 2, mt: 2, height: "225px" }}>
              <Typography sx={{ fontWeight: "bold", mb: 1 }}>
                Delivery Address
              </Typography>
              <Typography>
                {order?.deliverydetails?.streetaddress},
                {order?.deliverydetails?.city},{order?.deliverydetails?.country}
              </Typography>
              <Typography sx={{ fontWeight: "bold", mb: 1, mt: 1 }}>
                Custome Note
              </Typography>
              <Typography>Please Deliver as soon as Possible !</Typography>
            </Paper>
          </Grid>

          <Grid item md={6} xs={12}>
            <Paper sx={{ p: 2, mt: 2 }}>
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
                  ${order?.ordertotal}
                </Typography>
              </Box>
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  mb: 0.5,
                }}
              >
                <Typography sx={{ color: "#7D879C" }}>Shipping</Typography>
                <Box sx={{ display: "flex", alignItems: "center" }}>
                  <Typography sx={{ fontWeight: "bold", mr: 1 }}>$</Typography>
                  <TextField
                    sx={{ width: "60px" }}
                    size="small"
                    value="10"
                    type="number"
                  />
                </Box>
              </Box>
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  borderBottom: "1px solid #d0d0d0",
                  pb: 1,
                }}
              >
                <Typography sx={{ color: "#7D879C" }}>Discount</Typography>
                <Box sx={{ display: "flex", alignItems: "center" }}>
                  <Typography sx={{ fontWeight: "bold", mr: 1 }}>$</Typography>

                  <TextField
                    sx={{ width: "60px" }}
                    size="small"
                    value="10"
                    type="number"
                  />
                </Box>
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
                  ${order?.ordertotal}
                </Typography>
              </Box>
            </Paper>
          </Grid>
        </Grid>
      </Box>
    </>
  );
}
