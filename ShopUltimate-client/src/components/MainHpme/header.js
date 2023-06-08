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
  ListItemIcon,
} from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import Paper from "@mui/material/Paper";
import InputBase from "@mui/material/InputBase";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import SearchIcon from "@mui/icons-material/Search";
import DirectionsIcon from "@mui/icons-material/Directions";
import { KeyboardArrowDown, ShoppingCart } from "@mui/icons-material";
import {
  ArrowDownwardSharp,
  AssuredWorkload,
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
export default function Header({ group, setgroup, ct, setct }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [anchorE2, setAnchorE2] = React.useState(null);
  const [loadings, setloadings] = React.useState(false);

  const [sticky, setSticky] = React.useState(null);
  // const [group, setgroup] = React.useState();
  const auth = useSelector((state) => state.auth);

  const open = Boolean(anchorEl);
  const openp = Boolean(anchorE2);

  const catageries = useSelector((state) => state.catageries.catageries);
  const profile = useSelector((state) => state.profile?.profile);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClickp = (event) => {
    setAnchorE2(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleClosep = () => {
    setAnchorE2(null);
  };
  const isSticky = () => {
    /* Method that will fix header after a specific scrollable */
    const scrollTop = window.scrollY;
    scrollTop >= 300 ? setSticky(true) : setSticky(false);
  };
  useEffect(() => {
    window.addEventListener("scroll", isSticky);
    return () => {
      window.removeEventListener("scroll", isSticky);
    };
  }, []);
  const handlesubmit = async () => {
    setloadings(true);
    try {
      const res = await axios.get(
        "https://shopulimate-api.onrender.com/user/becomeaseller"
      );
      dispatch(
        setAlert(
          "Seller Request Added You will inform once its approved",
          "info"
        )
      );
      setloadings(false);
      // navigate("become-seller");
    } catch (error) {
      console.log(error);
      setloadings(false);
    }
  };
  // useEffect(() => {
  //   if (!group) {
  //     setgroup(catageries[Math.floor(Math.random() * catageries.length)]);
  //   }
  // }, [catageries]);
  return (
    <>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          background: sticky ? "white" : null,
          position: sticky ? "fixed" : null,
          width: sticky ? "100%" : "auto",
          borderBottom: sticky ? "1px solid #d0d0d0" : null,
          height: "90px",
          lineHeight: "90px",
          zIndex: "100",
          // px: 3,
        }}
      >
        <Box>
          <Stack
            direction="row"
            spacing={2}
            sx={{ alignItems: "center", ml: 3 }}
          >
            <Box>
              <Link to="/" style={{ textDecoration: "none" }}>
                <Typography
                  variant="h6"
                  component="div"
                  sx={{
                    flexGrow: 1,
                    color: "#333",
                    fontWeight: "700",
                    letterSpacing: "1px",
                    fontSize: "25px",
                  }}
                >
                  Shop
                  <span style={{ color: "#64a832" }}>Ultimate</span>
                </Typography>
              </Link>
            </Box>
            <Box sx={{ display: { lg: "block", md: "none", xs: "none" } }}>
              <Button
                size="large"
                onClick={handleClick}
                aria-controls={open ? "account-menu" : undefined}
                aria-haspopup="true"
                aria-expanded={open ? "true" : undefined}
                variant="outlined"
                endIcon={<KeyboardArrowDown />}
                sx={{
                  color: "rgb(0,159,127)",
                  borderColor: "#d0d0d0",
                  background: "white",
                  textTransform: "capitalize",
                  "&:hover": {
                    color: "rgb(0,159,127)",
                    borderColor: "#d0d0d0",
                    background: "white",
                  },
                }}
              >
                {catageries.length ? (
                  group && group?.name
                ) : (
                  <CircularProgress size={22} />
                )}
              </Button>
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
                    filter: "drop-shadow(0px 1px 4px rgba(0,0,0,0.32))",
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
                      left: 14,
                      width: 10,
                      height: 10,
                      bgcolor: "background.paper",
                      transform: "translateY(-50%) rotate(45deg)",
                      zIndex: 0,
                    },
                  },
                }}
                transformOrigin={{ horizontal: "left", vertical: "top" }}
                anchorOrigin={{ horizontal: "left", vertical: "bottom" }}
              >
                {catageries &&
                  catageries.map((cat) => (
                    <MenuItem
                      sx={{
                        fontSize: "11px",
                        color: "rgb(75,85,99)",
                        fontWeight: "600",
                      }}
                      onClick={() => {
                        setgroup(cat);
                        setct(cat._id);
                      }}
                    >
                      {cat.name}
                    </MenuItem>
                  ))}
              </Menu>
            </Box>
          </Stack>
        </Box>
        <Box
          component="form"
          sx={{
            display: { lg: sticky ? "flex" : null, md: "none", xs: "none" },
            alignItems: "center",
            // width: "80%",
            // flex: "2",
            // display: "flex",
            // alignItems: "center",
          }}
        >
          <TextField
            // size="small"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon />
                </InputAdornment>
              ),
            }}
            sx={{
              ml: 1,
              mt: 1,
              "& .css-1o9s3wi-MuiInputBase-input-MuiOutlinedInput-input": {
                padding: "0 !important",
                height: "43px",
              },
              // background: "rgba(243,244,246,0.7)",
            }}
            placeholder="Search for products..."
            // inputProps={{ "aria-label": "search google maps" }}
          />
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
            {auth?.isAuthenticated ? (
              <>
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
                  <Avatar
                    sx={{ cursor: "pointer" }}
                    onClick={handleClickp}
                    //   size="small"
                    //   sx={{ ml: 2 }}
                    aria-controls={openp ? "account-menu" : undefined}
                    aria-haspopup="true"
                    aria-expanded={openp ? "true" : undefined}
                    src={profile?.image && profile?.image}
                  ></Avatar>
                  <Menu
                    anchorEl={anchorE2}
                    id="account-menu"
                    open={openp}
                    onClose={handleClosep}
                    onClick={handleClosep}
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
                    <MenuItem onClick={() => navigate("/cart")}>
                      <ListItemIcon>
                        <ShoppingCart fontSize="small" />
                      </ListItemIcon>
                      Cart
                    </MenuItem>
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
                    <MenuItem
                      onClick={() => navigate("/settings/deliveryaddress")}
                    >
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
              </>
            ) : (
              <Box sx={{ ml: 3, mr: 1 }}>
                <Link to="/login">
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
            )}
          </Stack>
        </Box>
      </Box>
    </>
  );
}
