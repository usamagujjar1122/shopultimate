import {
  Typography,
  Box,
  TextField,
  Button,
  Container,
  InputLabel,
} from "@mui/material";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Nav from "../layouts/nav";
import Loading from "../layouts/loading";

import {
  signup,
  inprogress,
  clearalert,
} from "../../redux/actions/authactions";
import GoogleIcon from "@mui/icons-material/Google";
import SendIcon from "@mui/icons-material/Send";
import { Link, useNavigate } from "react-router-dom";
import { AssuredWorkload } from "@mui/icons-material";

export default function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmpassword, setconfirmPassword] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const loading = useSelector((state) => state.auth.inprogress);
  const auth = useSelector((state) => state.auth.isAuthenticated);

  const submitform = async (event) => {
    event.preventDefault();

    let formData = {
      email: email,
      username: name,
      password: password,
    };
    dispatch(inprogress(true));
    dispatch(signup(formData, navigate));
  };
  if (auth) {
    return navigate("/");
  }
  return (
    <>
      <Nav />
      <Container maxWidth="md" sx={{ mt: 3 }}>
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
          Create Your Account Here
        </Typography>
        <Box>
          <Box component="form" method="post" onSubmit={submitform}>
            <TextField
              variant="outlined"
              fullWidth
              label="User Name"
              size="small"
              sx={{ mt: 1 }}
              type="text"
              placeholder="Jon Doe"
              value={name}
              onChange={(e) => setName(e.target.value)}
              name="name"
            />

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
              label="Password"
              fullWidth
              size="small"
              sx={{ mt: 1 }}
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              name="password"
            />

            <TextField
              variant="outlined"
              label="Confirm Password"
              fullWidth
              size="small"
              sx={{ mt: 1, mb: 1 }}
              type="password"
              placeholder="*******"
              value={confirmpassword}
              onChange={(e) => setconfirmPassword(e.target.value)}
              name="confirmpassword"
            />
            <Button
              size="medium"
              variant="contained"
              color="primary"
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
              Register
            </Button>
            <Button
              sx={{ mt: 2 }}
              variant="contained"
              startIcon={<GoogleIcon />}
              fullWidth
            >
              Continue With Google
            </Button>
          </Box>
        </Box>
        <Box sx={{ pl: 2, pr: 2, pb: 2, mt: 2 }}>
          <Typography align="center">
            Already have an Account <Link to="/login">Login</Link>
          </Typography>
        </Box>
      </Container>{" "}
      <Loading isloading={loading} />
    </>
  );
}
