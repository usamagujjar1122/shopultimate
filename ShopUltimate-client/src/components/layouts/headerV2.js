import React, { useEffect } from "react";
import {
  Avatar,
  Box,
  Button,
  MenuItem,
  Stack,
  TextField,
  Typography,
  Menu,
  InputAdornment,
  CircularProgress,
  Tooltip,
  ListItemIcon,
  Chip,
} from "@mui/material";
import { Link, Navigate, useNavigate } from "react-router-dom";
import Paper from "@mui/material/Paper";
import InputBase from "@mui/material/InputBase";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import SearchIcon from "@mui/icons-material/Search";
import DirectionsIcon from "@mui/icons-material/Directions";
import {
  ArrowDownwardSharp,
  AssuredWorkload,
  KeyboardArrowDown,
  LocalShipping,
  LocationCity,
  Logout,
  PersonAdd,
  Search,
  ShoppingBag,
  ShoppingCartSharp,
} from "@mui/icons-material";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../redux/actions/authactions";
import axios from "axios";
import { setAlert } from "../../redux/actions/alertactions";
function AuthHeader() {
  const profile = useSelector((state) => state.profile?.profile);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth);
  const [loadings, setloadings] = React.useState(false);

  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const handlesubmit = async () => {
    setloadings(true);
    try {
      const res = await axios.get(
        "https://shopulimate-api.onrender.com/user/becomeaseller"
      );

      dispatch(
        setAlert(
          "Seller request Added you will be informed once its approved",
          "info"
        )
      );

      setloadings(false);
    } catch (error) {
      console.log(error);
      setloadings(false);
    }
  };
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        background: "white",
        boxShadow: "0.5px 0.5px 3px rgb(59,159,127)",
        //   position: sticky ? "fixed" : null,
        //   width: sticky ? "100%" : "auto",
        borderBottom: "1px solid #d0d0d0",
        height: "90px",
        lineHeight: "90px",
        zIndex: "100",
        // px: 3,
      }}
    >
      <Box sx={{ display: "flex", ml: 3 }}>
        <AssuredWorkload sx={{ color: "#333", mr: 1, mt: 0.5 }} />
        <Link to="/">
          {" "}
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
            Shop
            <span style={{ color: "#64a832" }}>Ultimate</span>
          </Typography>
        </Link>
      </Box>
      <Box sx={{ display: { lg: "flex", md: "flex", xs: "none" }, mr: 3 }}>
        <Stack direction="row" spacing={4}>
          <Link
            to="/shops"
            style={{
              textDecoration: "none",
              color: "#1f2937",
              fontSize: "18px",
            }}
          >
            Shop
          </Link>
          <Link
            to="/products"
            style={{
              textDecoration: "none",
              color: "#1f2937",
              fontSize: "18px",
            }}
          >
            Products
          </Link>
          <Link
            to="/faq"
            style={{
              textDecoration: "none",
              color: "#1f2937",
              fontSize: "18px",
            }}
          >
            FAQ
          </Link>
          <Link
            to="/contact"
            style={{
              textDecoration: "none",
              color: "#1f2937",
              fontSize: "18px",
            }}
          >
            Contact
          </Link>
        </Stack>
        <Stack direction="row" spacing={2} sx={{ alignItems: "center" }}>
          <Tooltip title="Shopping Cart">
            <Link to="/cart">
              <IconButton sx={{ ml: 1 }}>
                <ShoppingCartSharp />
              </IconButton>
            </Link>
          </Tooltip>
          <Box sx={{ ml: 3, mr: 1 }}>
            {auth?.user?.role == "seller" ? (
              <Link to="/dashboard">
                <Button
                  sx={{
                    background: "rgb(0,159,127)",
                    color: "white",
                    fontWeight: "semi-bold",

                    fontSize: "0.875rem",
                    textTransform: "capitalize",
                    "&:hover": { background: "rgb(0,159,127)" },
                  }}
                >
                  Dashboard
                </Button>
              </Link>
            ) : loadings ? (
              <Button
                disabled
                variant="contained"
                sx={
                  {
                    // background: "rgb(0,159,127)",
                    // color: "white",
                    // fontWeight: "semi-bold",
                    // fontSize: "0.875rem",
                    // textTransform: "capitalize",
                    // "&:hover": { background: "rgb(0,159,127)" },
                  }
                }
              >
                <CircularProgress size={20} />
              </Button>
            ) : (
              <Button
                disabled={auth?.user?.seller_request}
                onClick={handlesubmit}
                sx={{
                  background: "rgb(0,159,127)",
                  color: "white",
                  fontWeight: "semi-bold",

                  fontSize: "0.875rem",
                  textTransform: "capitalize",
                  "&:hover": { background: "rgb(0,159,127)" },
                }}
              >
                Become a Seller
              </Button>
            )}
          </Box>
          <Box>
            <Chip
              onClick={handleClick}
              //   size="small"
              //   sx={{ ml: 2 }}
              aria-controls={open ? "account-menu" : undefined}
              aria-haspopup="true"
              aria-expanded={open ? "true" : undefined}
              avatar={<Avatar src={profile?.image} />}
              label={auth?.user?.username}
              variant="outlined"
              sx={{ fontWeight: "600" }}
            />
            <Menu
              anchorEl={anchorEl}
              id="account-menu"
              open={open}
              onClose={handleClose}
              onClick={handleClose}
              PaperProps={{
                elevation: 0,
                sx: {
                  overflow: "visible",
                  filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
                  mt: 1.5,
                  "& .MuiAvatar-root": {
                    width: 32,
                    height: 32,
                    ml: -0.5,
                    mr: 1,
                  },
                  "&:before": {
                    content: '""',
                    display: "block",
                    position: "absolute",
                    top: 0,
                    right: 14,
                    width: 10,
                    height: 10,
                    bgcolor: "background.paper",
                    transform: "translateY(-50%) rotate(45deg)",
                    zIndex: 0,
                  },
                },
              }}
              transformOrigin={{ horizontal: "right", vertical: "top" }}
              anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
            >
              <MenuItem onClick={() => navigate("/settings/profile")}>
                <ListItemIcon>
                  <PersonAdd fontSize="small" />
                </ListItemIcon>
                Profile
              </MenuItem>
              <MenuItem onClick={() => navigate("/settings/orders")}>
                <ListItemIcon>
                  <ShoppingBag fontSize="small" />
                </ListItemIcon>
                Orders
              </MenuItem>
              <MenuItem onClick={() => navigate("/settings/deliveryaddress")}>
                <ListItemIcon>
                  <LocalShipping fontSize="small" />
                </ListItemIcon>
                Address
              </MenuItem>
              <MenuItem onClick={() => dispatch(logout())}>
                <ListItemIcon>
                  <Logout fontSize="small" />
                </ListItemIcon>
                Logout
              </MenuItem>
            </Menu>
          </Box>
        </Stack>
      </Box>
    </Box>
  );
}

function NAuthHeader() {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        background: "white",
        boxShadow: "1px 1px 8px rgb(59,159,127)",
        //   position: sticky ? "fixed" : null,
        //   width: sticky ? "100%" : "auto",
        borderBottom: "1px solid #d0d0d0",
        height: "90px",
        lineHeight: "90px",
        zIndex: "100",
        // px: 3,
      }}
    >
      <Box sx={{ display: "flex", ml: 3 }}>
        <AssuredWorkload sx={{ color: "#333", mr: 1, mt: 0.5 }} />
        <Link to="/">
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
            Shop
            <span style={{ color: "#64a832" }}>Ultimate</span>
          </Typography>
        </Link>
      </Box>
      <Box sx={{ display: { lg: "flex", md: "flex", xs: "none" }, mr: 3 }}>
        <Stack direction="row" spacing={4}>
          <Link
            to="/shops"
            style={{
              textDecoration: "none",
              color: "#1f2937",
              fontSize: "18px",
            }}
          >
            Shop
          </Link>
          <Link
            to="/products"
            style={{
              textDecoration: "none",
              color: "#1f2937",
              fontSize: "18px",
            }}
          >
            Products
          </Link>
          <Link
            to="/faq"
            style={{
              textDecoration: "none",
              color: "#1f2937",
              fontSize: "18px",
            }}
          >
            FAQ
          </Link>
          <Link
            to="/contact"
            style={{
              textDecoration: "none",
              color: "#1f2937",
              fontSize: "18px",
            }}
          >
            Contact
          </Link>
        </Stack>
        <Stack direction="row" spacing={2} sx={{ alignItems: "center" }}>
          <Box sx={{ ml: 3, mr: 1 }}>
            <Link to="/register" style={{ textDecoration: "none" }}>
              <Button
                sx={{
                  background: "rgb(0,159,127)",
                  color: "white",
                  fontWeight: "semi-bold",

                  fontSize: "0.875rem",
                  textTransform: "capitalize",
                  "&:hover": { background: "rgb(0,159,127)" },
                }}
              >
                Join
              </Button>
            </Link>
          </Box>
        </Stack>
      </Box>
    </Box>
  );
}

export default function HeaderV2() {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [sticky, setSticky] = React.useState(null);
  // const [group, setgroup] = React.useState();

  const open = Boolean(anchorEl);
  const auth = useSelector((state) => state.auth.isAuthenticated);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  return <>{auth ? <AuthHeader /> : <NAuthHeader />}</>;
}
