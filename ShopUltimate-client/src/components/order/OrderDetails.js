import * as React from "react";
import ShoppingBagOutlinedIcon from "@mui/icons-material/ShoppingBagOutlined";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import SupportAgentOutlinedIcon from "@mui/icons-material/SupportAgentOutlined";
import PersonIcon from "@mui/icons-material/Person";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import CreditCardIcon from "@mui/icons-material/CreditCard";
import ShoppingBagIcon from "@mui/icons-material/ShoppingBag";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import moment from "moment";
import {
  Pagination,
  Container,
  Box,
  Paper,
  Stack,
  Typography,
  Avatar,
  Grid,
  Button,
  CircularProgress,
  FormGroup,
  FormControlLabel,
  Switch,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import Nav from "../layouts/nav";
import HeaderV2 from "../layouts/headerV2";
import {
  getsingleorder,
  ordercomplete,
} from "../../redux/actions/orderactions";
import { useNavigate, useParams } from "react-router-dom";
import { Check, Refresh, Rule } from "@mui/icons-material";
const OrderDetails = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const params = useParams();
  const order = useSelector((state) => state.order.order);
  const loading = useSelector((state) => state.order.loading);

  React.useEffect(() => {
    dispatch(getsingleorder(params.id));
  }, []);
  const handlecomplete = async () => {
    dispatch(ordercomplete(order?._id, navigate));
  };
  return (
    <>
      <HeaderV2 />
      {loading ? (
        <Box sx={{ display: "flex", justifyContent: "center", mt: 3 }}>
          <CircularProgress />
        </Box>
      ) : (
        <Container>
          <Box sx={{ display: "flex", justifyContent: "space-between", mt: 2 }}>
            <Stack direction="row" spacing={1}>
              <ShoppingBagIcon fontSize="large" sx={{ color: "red " }} />

              <Typography variant="h4" sx={{ fontWeight: "bold" }}>
                Order Details
              </Typography>
            </Stack>
            <Stack direction="row" spacing={1}>
              <FormGroup>
                <FormControlLabel
                  control={
                    <Switch
                      defaultChecked={order?.iscompleted}
                      disabled={order?.iscompleted}
                      onChange={handlecomplete}
                    />
                  }
                  label="Mark order as completed"
                />
              </FormGroup>
              <Button
                variant="contained"
                color="success"
                endIcon={
                  order?.orderstatus == "Accepted" ? <Check /> : <Rule />
                }
              >
                {order?.orderstatus}
              </Button>
              <Button
                variant="contained"
                color="success"
                endIcon={
                  order?.deliverystatus == "Delivered" ? <Check /> : <Refresh />
                }
              >
                {order?.deliverystatus}
              </Button>
              <Button variant="contained" endIcon={<Check />}>
                {order.ispaid}
              </Button>
            </Stack>
          </Box>

          <Paper sx={{ mt: 2 }}>
            <Box
              sx={{
                background: "#F3F5F9",
                display: "flex",
                justifyContent: "space-between",
                p: 2,
                flexWrap: "wrap",
              }}
            >
              <Typography>
                <span style={{ color: "#7D879C" }}>Order ID:</span> {order?._id}
              </Typography>
              <Typography>
                <span style={{ color: "#7D879C" }}>Placed ON:</span>{" "}
                {moment(order?.createdat).fromNow()}
              </Typography>
            </Box>
            {order?.items?.map((p) => (
              <Box sx={{ display: "flex ", p: 3 }}>
                <Box sx={{}}>
                  <Avatar
                    variant="square"
                    sx={{ width: 56, height: 56, mr: 2 }}
                    src={p?.product?.images[0]}
                  ></Avatar>
                </Box>
                <Box>
                  <Typography sx={{ fontWeight: "bold" }}>
                    {p?.product?.productTitle}
                  </Typography>
                  <Typography sx={{ color: "#7D879C" }}>
                    {p?.product?.price} x {p.quantity}
                  </Typography>
                </Box>
              </Box>
            ))}
          </Paper>
          <Grid container spacing={2}>
            <Grid item md={6} xs={12}>
              <Paper sx={{ p: 3, mt: 3 }}>
                <Typography variant="h6" sx={{ fontWeight: "bold", mb: 1 }}>
                  Delivery Details
                </Typography>
                <Typography variant="h6" sx={{ fontSize: "16px" }}>
                  <strong>Full Address : </strong>
                  {order?.deliverydetails?.streetaddress},
                  {order?.deliverydetails?.city},
                  {order?.deliverydetails?.country}
                </Typography>
                <Typography variant="h6" sx={{ fontSize: "16px" }}>
                  <strong>Phone : </strong>
                  {order?.deliverydetails?.phone},
                </Typography>
                <Typography variant="h6" sx={{ fontSize: "16px" }}>
                  <strong>Email : </strong>
                  {order?.deliverydetails?.email},
                </Typography>
                <Typography variant="h6" sx={{ fontSize: "16px" }}>
                  <strong>Postal Code : </strong>
                  {order?.deliverydetails?.postalcode},
                </Typography>
              </Paper>
            </Grid>
            <Grid item md={6} xs={12}>
              <Paper sx={{ p: 3, mt: 3 }}>
                <Typography variant="h6" sx={{ fontWeight: "bold", mb: 1 }}>
                  Order Summary
                </Typography>
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    mb: 1,
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
                    justifyContent: "space-between",
                    mb: 1,
                  }}
                >
                  <Typography sx={{ color: "#7D879C" }}>Shipping</Typography>
                  <Typography sx={{ fontWeight: "bold" }}>---</Typography>
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
                  <Typography sx={{ fontWeight: "bold" }}>---</Typography>
                </Box>
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    mt: 1,
                    mb: 1,
                  }}
                >
                  <Typography sx={{ fontWeight: "bold" }}>Total</Typography>
                  <Typography sx={{ fontWeight: "bold" }}>
                    ${order?.ordertotal}
                  </Typography>
                </Box>
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    borderTop: "1px solid #d0d0d0",
                    pt: 1,
                  }}
                >
                  <Typography sx={{ fontWeight: "bold" }}>Paid</Typography>
                  <Typography sx={{ fontWeight: "bold" }}>
                    {order?.ispaid}
                  </Typography>
                </Box>
                <Box>
                  <Button
                    variant="contained"
                    fullWidth
                    disabled={order?.ispaid == "Paid"}
                    sx={{ mt: 1, borderRadius: "20px" }}
                  >
                    Pay Now
                  </Button>
                </Box>
              </Paper>
            </Grid>
          </Grid>
        </Container>
      )}
    </>
  );
};
export default OrderDetails;
