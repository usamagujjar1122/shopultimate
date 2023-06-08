import { createTheme, styled, ThemeProvider } from "@mui/material/styles";
import {
  Box,
  Toolbar,
  CssBaseline,
  Typography,
  IconButton,
  Tooltip,
} from "@mui/material";
import MuiAppBar from "@mui/material/AppBar";
import { Brightness4, Brightness7, Home, Menu } from "@mui/icons-material";
import { useMemo, useState } from "react";
import { Outlet, useNavigate, Route, Routes } from "react-router-dom";
import SideList from "./sidelist";
// import Addshop from "../shop/createshop";

const drawerWidth = 240;

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(["width", "margin"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

export default function AdminDashboard() {
  const [open, setOpen] = useState(true);
  const [dark, setDark] = useState(false);

  const darkTheme = useMemo(
    () =>
      createTheme({
        palette: {
          mode: dark ? "dark" : "light",
        },
      }),
    [dark]
  );

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const navigate = useNavigate();
  return (
    <ThemeProvider theme={darkTheme} sx={{}}>
      <Box
        sx={{
          display: "flex",
          background: "#F6F9FC",
          paddingBottom: "30px",
          "& .css-k008qs": { width: "100%" },
        }}
      >
        <CssBaseline />
        <AppBar
          position="fixed"
          open={open}
          sx={{ background: !dark && "white",boxShadow:"0",borderBottom:"1px solid #e3e9ef" }}
        >
          <Toolbar>
            <IconButton
              color="inherit"
              aria-label="open drawer"
              onClick={handleDrawerOpen}
              edge="start"
              sx={{
                marginRight: 5,
                ...(open && { display: "none" }),
              }}
            >
              <Menu sx={{color:"#333"}}/>
            </IconButton>
            <Tooltip title="Go back to home page">
              <IconButton sx={{ mr: 1 }} onClick={() => navigate("/")}>
                <Home />
              </IconButton>
            </Tooltip>
            <Typography
              variant="h6"
              noWrap
              component="div"
              sx={{ flexGrow: 1,color:"#333" }}
            >
              Dashboard
            </Typography>
            <IconButton onClick={() => setDark(!dark)}>
              {dark ? <Brightness7 /> : <Brightness4 />}
            </IconButton>
          </Toolbar>
        </AppBar>
        <SideList {...{ open, setOpen }} />
      </Box>
      {/* <Routes>
        <Route path="create-shop" element={<Addshop />} />
      </Routes> */}
    </ThemeProvider>
  );
}
