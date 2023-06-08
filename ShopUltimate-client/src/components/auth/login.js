import {
  Typography,
  Box,
  TextField,
  Button,
  Container,
  InputLabel,
  Stack,
  InputAdornment,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Nav from "../layouts/nav";
import Loading from "../layouts/loading";

import { login, inprogress } from "../../redux/actions/authactions";
import GoogleIcon from "@mui/icons-material/Google";
import SendIcon from "@mui/icons-material/Send";
import { Link, useNavigate } from "react-router-dom";
import { AssuredWorkload, Email } from "@mui/icons-material";
import HeaderV2 from "../layouts/headerV2";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const loading = useSelector((state) => state.auth.inprogress);
  const auth = useSelector((state) => state.auth.isAuthenticated);

  useEffect(() => {
    if (auth) {
      return navigate("/");
    }
  }, [auth]);
  const submitform = async (event) => {
    event.preventDefault();
    let formData = {
      email: email,
      password: password,
    };
    dispatch(inprogress(true));
    dispatch(login(formData));
  };

  return (
    <>
      <Nav />
      <Container maxWidth="md">
        <Box sx={{ mt: 3, p: 2 }}>
          <Box sx={{ textAlign: "center" }}>
            <Typography
              variant="h6"
              component="div"
              sx={{
                flexGrow: 1,
                color: "#333",
                textTransform: "uppercase",
                fontWeight: "bold",
                letterSpacing: "1px",
              }}
            >
              <AssuredWorkload
                sx={{ color: "#333", mr: 1, position: "relative", top: "4px" }}
              />
              Shop
              <span style={{ color: "#64a832" }}>Ultimate</span>
            </Typography>
          </Box>
          <Typography
            sx={{
              textAlign: "center",
              fontWeight: "bold",
              mt: 1,
            }}
          >
            Login with your Email & Password
          </Typography>
          <Box component="form" method="post" onSubmit={submitform}>
            <TextField
              variant="outlined"
              label="Email"
              fullWidth
              size="small"
              sx={{ mt: 1 }}
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              name="email"
            />

            <TextField
              variant="outlined"
              fullWidth
              label="Password"
              size="small"
              sx={{ mt: 1, mb: 1 }}
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              name="password"
            />

            <Button
              size="medium"
              variant="contained"
              type="submit"
              fullWidth
              endIcon={<SendIcon />}
              sx={{
                background: "#009f7f",
                "&:hover": {
                  background: "#009f7f",
                },
              }}
            >
              Login
            </Button>
            <Typography sx={{ mt: 1, textAlign: "center" }}>Or</Typography>
            <Button
              sx={{ mt: 1 }}
              variant="contained"
              startIcon={<GoogleIcon />}
              fullWidth
            >
              Continue With Google
            </Button>
          </Box>
        </Box>
        <Box sx={{ pl: 2, pr: 2, pb: 2 }}>
          <Typography align="center">
            Not Have An Account <Link to="/register">Register</Link>
          </Typography>
        </Box>
      </Container>{" "}
      <Loading isloading={loading} />
    </>
  );
}
