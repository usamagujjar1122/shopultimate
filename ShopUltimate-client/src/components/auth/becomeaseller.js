import {
  Box,
  Button,
  TextField,
  Paper,
  Container,
  Typography,
  CircularProgress,
} from "@mui/material";
import axios from "axios";
import React from "react";
import { useDispatch } from "react-redux";
import { setAlert } from "../../redux/actions/alertactions";
import HeaderV2 from "../layouts/headerV2";
import OtpInput from "react-otp-input";
import "./styles.css";
import {
  Check,
  ConfirmationNumber,
  Verified,
  VerifiedOutlined,
} from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import { SELLER_CONFIRM } from "../../redux/types";
export default function BecomeSeller() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [loading, setloading] = React.useState(false);
  const [otp, setotp] = React.useState();

  const handlesubmit = async (e) => {
    e.preventDefault();
    if (!otp || otp.length < 5) {
      return dispatch(setAlert("Please Enter 5 Digit OTP", "error"));
    }
    setloading(true);
    try {
      const res = await axios.post(
        "https://shopulimate-api.onrender.com/user/sellerconfirm",
        {
          otp,
        }
      );
      dispatch(setAlert(res.data.message, "success"));
      dispatch({ type: SELLER_CONFIRM, payload: res?.data?.user_ });
      if (res.data.user_) {
        navigate("/dashboard");
      }
      setloading(false);
    } catch (error) {
      console.log(error);
      dispatch(setAlert(error.response.data.message, "error"));
      setloading(false);
    }
  };
  return (
    <>
      <HeaderV2 />
      <Container
        sx={{
          minHeight: "70vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexDirection: "column",
        }}
      >
        <Paper
          sx={{
            p: 3,
            display: "flex",
            justifyContent: "center",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Typography sx={{ mb: 1, fontWeight: "bold", fontSize: "23px" }}>
            Please Enter Varification Code
          </Typography>
          <OtpInput
            value={otp}
            onChange={(value) => setotp(value)}
            numInputs={5}
            separator={<span style={{ width: "8px" }}></span>}
            shouldAutoFocus={true}
            hasErrored
            inputStyle={{
              border: "1px solid #d0d0d0",
              borderRadius: "8px",
              width: "40px",
              height: "40px",
              fontSize: "20px",
              color: "#000",
              fontWeight: "400",
              caretColor: "blue",
            }}
            focusStyle={{
              border: "1px solid #CFD3DB",
              outline: "none",
            }}
          />
          {loading ? (
            <Button
              variant="contained"
              color="success"
              disabled
              fullWidth
              sx={{ mt: 2 }}
            >
              <CircularProgress size={20} />>
            </Button>
          ) : (
            <Button
              variant="contained"
              color="success"
              fullWidth
              sx={{ mt: 2 }}
              onClick={handlesubmit}
              endIcon={<Check />}
            >
              Verify
            </Button>
          )}
        </Paper>
      </Container>
    </>
  );
}
