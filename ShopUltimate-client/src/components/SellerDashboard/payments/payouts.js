import {
  Box,
  Button,
  CircularProgress,
  Paper,
  Typography,
} from "@mui/material";

import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { connectstripe } from "../../../redux/actions/authactions";
import AccountBalanceIcon from "@mui/icons-material/AccountBalance";
import { useNavigate } from "react-router-dom";
import axios from "axios";
export default function Payouts() {
  const [loading, setloading] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const stripecreate = async () => {
    dispatch(connectstripe());
  };
  const auth = useSelector((state) => state.auth);
  const check = async () => {
    setloading(true);

    try {
      const res = await axios.get(
        "https://shopulimate-api.onrender.com/order/check"
      );
      console.log(res?.data?.account?.charges_enabled);
      if (res?.data?.account?.charges_enabled) {
        return navigate("/dashboard/mypayments");
      }
      setloading(false);
    } catch (error) {
      console.log(error);
      setloading(false);
    }
  };
  useEffect(() => {
    check();
  }, []);
  return (
    <Box sx={{ minHeight: "100vh" }}>
      {loading ? (
        <CircularProgress />
      ) : (
        <Paper
          sx={{
            p: 3,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexDirection: "column",
          }}
        >
          <Button
            onClick={stripecreate}
            startIcon={<AccountBalanceIcon />}
            variant="contained"
          >
            Payout
          </Button>
          <Typography sx={{ color: "#333", fontWeight: "bold", mt: 2 }}>
            Set up your bank details to start recieving your payments
          </Typography>
        </Paper>
      )}
    </Box>
  );
}
