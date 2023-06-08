import * as React from "react";
import { styled, useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import CssBaseline from "@mui/material/CssBaseline";
import MuiAppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";

import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import {
  Assignment,
  AssignmentOutlined,
  AssuredWorkload,
  Dashboard,
  FiberManualRecord,
  Logout,
  Payment,
  PermIdentity,
  Star,
  Storefront,
  ViewInAr,
} from "@mui/icons-material";
import { Avatar, Collapse, Stack, Tooltip } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { Link, Routes, Route } from "react-router-dom";
import Addshop from "../SellerDashboard/shops/createshop";
import Shops from "../SellerDashboard/shops/shops";
import Addproduct from "../SellerDashboard/products/addproduct";
import Products from "../SellerDashboard/products/products";
import EditShop from "../SellerDashboard/shops/shopeditmodel";
import EditProduct from "./products/updateproduct";
import Orders from "./orders/dashboardorders";
import OrderDetails from "./orders/sellerorderdetails";
import Stats from "./stats";
import Payouts from "./payments/payouts";
import Payments from "./payments/payments";
import { logout } from "../../redux/actions/authactions";
const drawerWidth = 240;

const Main = styled("main", { shouldForwardProp: (prop) => prop !== "open" })(
  ({ theme, open }) => ({
    flexGrow: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: `-${drawerWidth}px`,
    ...(open && {
      transition: theme.transitions.create("margin", {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen,
      }),
      marginLeft: 0,
      width: "100%",
    }),
  })
);

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  transition: theme.transitions.create(["margin", "width"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: `${drawerWidth}px`,
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
  justifyContent: "space-between",
}));

export default function SideList({ open, setOpen }) {
  const dispatch = useDispatch();
  const profile = useSelector((state) => state.profile.profile);
  const user = useSelector((state) => state.auth?.user);

  const [openl, setOpenl] = React.useState(false);
  const [openp, setOpenp] = React.useState(false);
  const [openo, setOpeno] = React.useState(false);

  const theme = useTheme();
  // const [open, setOpen] = React.useState(false);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };
  const handleClick = () => {
    setOpenl(!openl);
  };
  const handleClickp = () => {
    setOpenp(!openp);
  };
  const handleClicko = () => {
    setOpeno(!openo);
  };
  return (
    <Box sx={{ display: "flex" }}>
      <Drawer
        // PaperProps={{
        //   sx: {
        //     backgroundColor: "#009f7f",
        //     color: "white",
        //   },
        // }}
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            width: drawerWidth,
            boxSizing: "border-box",
          },
        }}
        variant="persistent"
        anchor="left"
        open={open}
      >
        <DrawerHeader>
          <AssuredWorkload
            sx={{
              color: "#333",
              mr: 0.5,
              fontSize: "18px",
              position: "relative",
              top: "-2px",
            }}
          />
          <Typography
            variant="h6"
            component="div"
            sx={{
              flexGrow: 1,
              color: "#333",
              textTransform: "uppercase",
              fontWeight: "bold",
              letterSpacing: "1px",
              fontSize: "14px",
            }}
          >
            Shop
            <span style={{ color: "#64a832" }}>Ultimate</span>
          </Typography>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === "ltr" ? (
              <ChevronLeftIcon />
            ) : (
              <ChevronRightIcon />
            )}
          </IconButton>
        </DrawerHeader>
        <Divider />

        <List
          sx={{
            width: "100%",
            maxWidth: 360,
            bgcolor: "background.paper",
            "& .css-cveggr-MuiListItemIcon-root": { minWidth: "40px" },
          }}
          component="nav"
          aria-labelledby="nested-list-subheader"
        >
          <Link
            to="/dashboard"
            style={{ textDecoration: "none", color: "#333" }}
          >
            <ListItemButton>
              <ListItemIcon>
                <Dashboard />
              </ListItemIcon>
              <ListItemText primary="Dashboard" />
            </ListItemButton>
          </Link>
          <ListItemButton onClick={handleClick}>
            <ListItemIcon>
              <Storefront />
            </ListItemIcon>
            <ListItemText primary="Shops" />
            {openl ? <ExpandLess /> : <ExpandMore />}
          </ListItemButton>
          <Collapse in={openl} timeout="auto" unmountOnExit>
            <List
              component="div"
              disablePadding
              sx={{
                "& .css-cveggr-MuiListItemIcon-root": { minWidth: "20px" },
              }}
            >
              <Link
                to="my-shops"
                style={{ textDecoration: "none", color: "black" }}
              >
                <ListItemButton sx={{ pl: 4 }}>
                  <ListItemIcon>
                    <FiberManualRecord sx={{ fontSize: "8px" }} />
                  </ListItemIcon>

                  <ListItemText primary="My Shops" />
                </ListItemButton>
              </Link>
              <Link
                to="create-shop"
                style={{ textDecoration: "none", color: "black" }}
              >
                <ListItemButton sx={{ pl: 4 }}>
                  <ListItemIcon>
                    <FiberManualRecord sx={{ fontSize: "8px" }} />
                  </ListItemIcon>

                  <ListItemText primary="Add Shop" />
                </ListItemButton>
              </Link>
            </List>
          </Collapse>
          <ListItemButton onClick={handleClickp}>
            <ListItemIcon>
              <ViewInAr />
            </ListItemIcon>
            <ListItemText primary="Products" />
            {openp ? <ExpandLess /> : <ExpandMore />}
          </ListItemButton>
          <Collapse in={openp} timeout="auto" unmountOnExit>
            <List
              component="div"
              disablePadding
              sx={{
                "& .css-cveggr-MuiListItemIcon-root": { minWidth: "20px" },
              }}
            >
              <Link
                to="my-products"
                style={{ textDecoration: "none", color: "black" }}
              >
                <ListItemButton sx={{ pl: 4 }}>
                  <ListItemIcon>
                    <FiberManualRecord sx={{ fontSize: "8px" }} />
                  </ListItemIcon>
                  <ListItemText primary="My Products" />
                </ListItemButton>
              </Link>
              <Link
                to="add-product"
                style={{ textDecoration: "none", color: "black" }}
              >
                <ListItemButton sx={{ pl: 4 }}>
                  <ListItemIcon>
                    <FiberManualRecord sx={{ fontSize: "8px" }} />
                  </ListItemIcon>
                  <ListItemText primary="Add Product" />
                </ListItemButton>
              </Link>
            </List>
          </Collapse>
          <ListItemButton onClick={handleClicko}>
            <ListItemIcon>
              <AssignmentOutlined />
            </ListItemIcon>
            <ListItemText primary="Orders" />
            {openo ? <ExpandLess /> : <ExpandMore />}
          </ListItemButton>
          <Collapse in={openo} timeout="auto" unmountOnExit>
            <List
              component="div"
              disablePadding
              sx={{
                "& .css-cveggr-MuiListItemIcon-root": { minWidth: "20px" },
              }}
            >
              <Link
                to="/dashboard/my-orders"
                style={{ textDecoration: "none", color: "black" }}
              >
                <ListItemButton sx={{ pl: 4 }}>
                  <ListItemIcon>
                    <FiberManualRecord sx={{ fontSize: "8px" }} />
                  </ListItemIcon>
                  <ListItemText primary="My Orders" />
                </ListItemButton>
              </Link>
            </List>
          </Collapse>
          <Link to="/dashboard/payouts">
            <ListItemButton>
              <ListItemIcon>
                <Payment />
              </ListItemIcon>
              <ListItemText primary="Payments" />
            </ListItemButton>
          </Link>

          <Link to="/settings/profile">
            <ListItemButton>
              <ListItemIcon>
                <PermIdentity />
              </ListItemIcon>
              <ListItemText primary="Profile" />
            </ListItemButton>
          </Link>
        </List>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            textAlign: "center",
          }}
        >
          <Avatar
            src={profile?.image}
            sx={{ width: 100, height: 100, alignSelf: "center" }}
          ></Avatar>
          <Typography
            sx={{
              fontWeight: "bold",
              mt: 1,
              mb: 1,
              textTransform: "capitalize",
            }}
          >
            {user?.username}
          </Typography>
          <Box>
            <Tooltip title="Logout">
              <IconButton>
                <Logout onClick={() => dispatch(logout())} />
              </IconButton>
            </Tooltip>
          </Box>
        </Box>
      </Drawer>

      <Main open={open}>
        <DrawerHeader />
        <Routes>
          <Route path="/" element={<Stats />} />
          <Route path="my-shops" element={<Shops />} />
          <Route path="create-shop" element={<Addshop />} />
          <Route path="edit-shop/:id" element={<EditShop />} />
          <Route path="my-products" element={<Products />} />
          <Route path="add-product" element={<Addproduct />} />
          <Route path="edit-product/:id" element={<EditProduct />} />
          <Route path="my-orders/" element={<Orders />} />
          <Route path="modify-order/:id" element={<OrderDetails />} />
          <Route path="payouts" element={<Payouts />} />
          <Route path="mypayments" element={<Payments />} />
        </Routes>
      </Main>
    </Box>
  );
}

// export default SideList;
