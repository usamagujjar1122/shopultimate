import React from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";

import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../../redux/actions/authactions";
import LoginIcon from "@mui/icons-material/Login";
import Login from "../auth/login";
import PersonIcon from "@mui/icons-material/Person";
import Signup from "../auth/signup";
import Badge from "@mui/material/Badge";
import { styled } from "@mui/material/styles";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import logo from "../../images/logo.png";
import {
  ListItemText,
  Avatar,
  Tooltip,
  Menu,
  MenuItem,
  ListItemIcon,
  MenuList,
} from "@mui/material";
import { ArrowDownward, AssuredWorkload, Person } from "@mui/icons-material";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
const settings = ["Profile", "Account", "Dashboard", "Logout"];

// import MenuIcon from '@mui/icons-material/Menu';

const StyledBadge = styled(Badge)(({ theme }) => ({
  "& .MuiBadge-badge": {
    right: -3,
    top: 13,
    border: `2px solid ${theme.palette.background.paper}`,
    padding: "0 4px",
  },
}));
const Nav = () => {
  const navigate = useNavigate();
  const [open, setOpen] = React.useState(false);
  const [opensignup, setOpensignup] = React.useState(false);
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);

  const auth = useSelector((state) => state.auth);
  const cart = useSelector((state) => state.cart);

  const dispatch = useDispatch();
  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };
  const handlelogout = (event) => {
    event.preventDefault();
    dispatch(logout());
  };
  const handleClickOpen = () => {
    // event.preventDefault()
    setOpen(true);
  };
  const handleClickOpenSignup = () => {
    // event.preventDefault()
    setOpensignup(true);
  };

  const authnav = (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar
        position="static"
        sx={{
          background: "white",
        }}
      >
        <Toolbar>
          <AssuredWorkload sx={{ color: "#333", mr: 1 }} />
          <Typography
            onClick={() => navigate("/")}
            variant="h6"
            component="div"
            sx={{
              flexGrow: 1,
              color: "#333",
              textTransform: "uppercase",
              fontWeight: "bold",
              letterSpacing: "1px",
              cursor: "pointer",
            }}
          >
            Shop
            <span style={{ color: "#64a832" }}>Ultimate</span>
          </Typography>

          {auth.user?.role === "seller" ? (
            <Link
              to="/dashboard"
              sx={{ textDecoration: "none", color: "white" }}
            >
              <Typography sx={{ mr: 0.5, fontWeight: "bold" }}>
                Dashboard
              </Typography>
            </Link>
          ) : (
            <Button
              variant="contained"
              sx={{
                background: "#009f7f",
                "&:hover": {
                  backgroundColor: "#009f7f",
                },
              }}
            >
              Become a Seller
            </Button>
          )}

          <Link to="/cart">
            <IconButton aria-label="cart">
              <StyledBadge
                badgeContent={cart ? cart?.cartItems?.length : 1}
                color="secondary"
              >
                <ShoppingCartIcon sx={{ color: "#009f7f", ml: 1, mr: 1 }} />
              </StyledBadge>
            </IconButton>
          </Link>
          <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="Open settings">
              <Box
                onClick={handleOpenUserMenu}
                sx={{ p: 0, display: "flex", alignItems: "center" }}
              >
                <IconButton>
                  <Avatar alt={auth.user ? auth.user.username : ""} />
                </IconButton>
                <Typography
                  sx={{
                    ml: 0.5,
                    mr: 0.5,
                    fontWeight: "bold",
                    textTransform: "capitalize",
                    color: "#009f7f",
                  }}
                >
                  {auth.user ? auth.user.username : ""}
                </Typography>
                <IconButton sx={{ p: 0 }}>
                  <ArrowDropDownIcon sx={{ color: "#009f7f" }} />
                </IconButton>
              </Box>
            </Tooltip>
            <Menu
              sx={{ mt: "45px" }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              <MenuItem>
                <Link
                  to="profile"
                  style={{ textDecoration: "none", color: "#333" }}
                >
                  Profile
                </Link>
              </MenuItem>
              <MenuItem>
                <Link
                  to="myorders"
                  style={{ textDecoration: "none", color: "#333" }}
                >
                  Orders
                </Link>
              </MenuItem>
              <MenuItem>
                <Link
                  to="whishlist"
                  style={{ textDecoration: "none", color: "#333" }}
                >
                  Whish List
                </Link>
              </MenuItem>

              <MenuItem>
                <Link
                  to=""
                  style={{ textDecoration: "none", color: "#333" }}
                  onClick={handlelogout}
                >
                  Logout
                </Link>
              </MenuItem>
            </Menu>
          </Box>
        </Toolbar>
      </AppBar>
    </Box>
  );
  if (auth.isAuthenticated) {
    return <>{authnav}</>;
  } else {
    return (
      <>
        <Box sx={{ flexGrow: 1 }}>
          <AppBar position="static" sx={{ background: "white" }}>
            <Toolbar>
              <AssuredWorkload sx={{ color: "#333", mr: 1 }} />
              <Typography
                onClick={() => navigate("/")}
                variant="h6"
                component="div"
                sx={{
                  flexGrow: 1,
                  color: "#333",
                  textTransform: "uppercase",
                  fontWeight: "bold",
                  letterSpacing: "1px",
                  cursor: "pointer",
                }}
              >
                Shop
                <span style={{ color: "#64a832" }}>Ultimate</span>
              </Typography>
              <Link
                to="/shops"
                style={{
                  textDecoration: "none",
                  color: "#009f7f",
                  marginRight: "20px",
                  marginTop: "-3px",
                }}
              >
                Shops
              </Link>
              <Link
                to="/products"
                style={{
                  textDecoration: "none",
                  color: "#009f7f",
                  marginRight: "20px",
                  marginTop: "-3px",
                }}
              >
                Products
              </Link>
              <Button
                variant="text"
                startIcon={<LoginIcon />}
                sx={{ color: "#009f7f" }}
                onClick={handleClickOpen}
              >
                <Link
                  to="/login"
                  style={{
                    textDecoration: "none",
                    color: "#009f7f",
                    fontWeight: "bold",
                  }}
                >
                  Login
                </Link>
              </Button>
              <Button
                variant="text"
                startIcon={<PersonIcon />}
                sx={{ color: "#009f7f" }}
                onClick={handleClickOpenSignup}
              >
                <Link
                  to="/register"
                  style={{
                    textDecoration: "none",
                    color: "#009f7f",
                    fontWeight: "bold",
                  }}
                >
                  Register
                </Link>
              </Button>
            </Toolbar>
          </AppBar>
        </Box>
      </>
    );
  }
};

export default Nav;
