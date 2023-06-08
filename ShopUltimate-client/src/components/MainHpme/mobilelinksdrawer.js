import * as React from "react";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import Button from "@mui/material/Button";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import MailIcon from "@mui/icons-material/Mail";
import { IconButton, Typography } from "@mui/material";
import { Close } from "@mui/icons-material";
import { Link } from "react-router-dom";

export default function MobileLinkDrawer({ open, setOpen }) {
  return (
    <div>
      <Drawer
        open={open}
        onClose={() => setOpen(false)}
        sx={{ width: "240px !important" }}
      >
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            borderBottom: "1px solid #d0d0d0",
          }}
        >
          <Box
            sx={{
              p: 2,
            }}
          >
            <Typography
              variant="h6"
              component="div"
              sx={{
                width: "100%",
                color: "#333",
                fontWeight: "700",
                letterSpacing: "1px",
                fontSize: "18px",
                textAlign: "center",
              }}
            >
              Shop
              <span style={{ color: "#64a832" }}>Ultimate</span>
            </Typography>
          </Box>
          <IconButton onClick={() => setOpen(false)} sx={{ mr: 1 }}>
            <Close />
          </IconButton>
        </Box>
        <List sx={{ width: "250px" }}>
          <Link to="/shops" style={{ textDecoration: "none", color: "black" }}>
            <ListItem disablePadding>
              <ListItemButton>
                <ListItemText primary="Shops" />
              </ListItemButton>
            </ListItem>
          </Link>
          <Link
            to="/products"
            style={{ textDecoration: "none", color: "black" }}
          >
            <ListItem disablePadding>
              <ListItemButton>
                <ListItemText primary="Products" />
              </ListItemButton>
            </ListItem>
          </Link>
          <Link to="/faq" style={{ textDecoration: "none", color: "black" }}>
            <ListItem disablePadding>
              <ListItemButton>
                <ListItemText primary="FAQ" />
              </ListItemButton>
            </ListItem>
          </Link>

          <Link
            to="/contact"
            style={{ textDecoration: "none", color: "black" }}
          >
            <ListItem disablePadding>
              <ListItemButton>
                <ListItemText primary="Contact" />
              </ListItemButton>
            </ListItem>
          </Link>
        </List>
      </Drawer>
    </div>
  );
}
