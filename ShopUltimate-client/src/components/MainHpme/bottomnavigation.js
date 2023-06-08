import {
  CardTravel,
  Home,
  Menu,
  Person,
  Search,
  Shop,
  ShoppingCart,
} from "@mui/icons-material";
import { Box, IconButton, Paper } from "@mui/material";
import * as React from "react";
import { Link } from "react-router-dom";
import MobileLinkDrawer from "./mobilelinksdrawer";

export default function BottomBar() {
  const [open, setOpen] = React.useState(false);
  return (
    <>
      <Paper
        sx={{
          display: { xs: "flex", lg: "none", md: "none" },
          justifyContent: "space-between",
          py: 1,
          width: "100%",
          zIndex: "1000",
          position: "fixed",
          bottom: "0",
        }}
      >
        <IconButton onClick={() => setOpen(true)}>
          <Menu sx={{ color: "#1f2937", fontSize: "26px" }} />
        </IconButton>
        <Link to="/">
          <IconButton>
            <Search sx={{ color: "#1f2937", fontSize: "26px" }} />
          </IconButton>
        </Link>
        <Link to="/">
          <IconButton>
            <Home sx={{ color: "#1f2937", fontSize: "26px" }} />
          </IconButton>
        </Link>
        <Link to="/cart">
          <IconButton>
            <ShoppingCart sx={{ color: "#1f2937", fontSize: "26px" }} />
          </IconButton>
        </Link>
        <Link to="/login">
          <IconButton>
            <Person sx={{ color: "#1f2937", fontSize: "26px" }} />
          </IconButton>
        </Link>
      </Paper>
      <MobileLinkDrawer open={open} setOpen={setOpen} />
    </>
  );
}
