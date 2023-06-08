import { Filter1, KeyboardArrowDown, Tune } from "@mui/icons-material";
import {
  Box,
  Button,
  CircularProgress,
  Menu,
  MenuItem,
  Paper,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import MobileCatageryDrawer from "./mobilecatagerydrawer";
export default function MobileSide({ group, setgroup, setct }) {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [opend, setOpend] = React.useState(false);

  const [sticky, setSticky] = React.useState(null);

  const open = Boolean(anchorEl);
  const catageries = useSelector((state) => state.catageries.catageries);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const isSticky = () => {
    /* Method that will fix header after a specific scrollable */
    const scrollTop = window.scrollY;
    scrollTop >= 670 ? setSticky(true) : setSticky(false);
  };
  useEffect(() => {
    window.addEventListener("scroll", isSticky);
    return () => {
      window.removeEventListener("scroll", isSticky);
    };
  }, []);
  return (
    <>
      <Paper
        sx={{
          py: 2,
          display: { md: "flex", xs: "flex", lg: "none" },
          justifyContent: "space-between",
          alignItems: "center",
          borderRadius: "0",
          boxShadow: "0",
          borderBottom: "1px solid #d0d0d0",
          borderLeft: "1px solid #d0d0d0",
          position: sticky ? "fixed" : null,
          top: "55px",
          width: "100%",
          zIndex: "99",
        }}
      >
        <Button
          startIcon={<Tune />}
          onClick={() => setOpend(true)}
          variant="outlined"
          sx={{
            ml: 2,
            color: "#1f2937",
            borderColor: "#d0d0d0",
            background: "rgba(243,244,246,0.7)",
            textTransform: "capitalize",
            "&:hover": {
              color: "1f2937",
              borderColor: "#d0d0d0",
              background: "rgba(243,244,246,0.7)",
            },
          }}
        >
          Filter
        </Button>
        <Box>
          <Button
            onClick={handleClick}
            aria-controls={open ? "account-menu" : undefined}
            aria-haspopup="true"
            aria-expanded={open ? "true" : undefined}
            variant="outlined"
            endIcon={<KeyboardArrowDown />}
            sx={{
              mr: 2,
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
              style: {
                maxHeight: 250,
              },
              elevation: 0,
              sx: {
                overflow: "auto",
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
                  right: 14,
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
                  onClick={() => {
                    setgroup(cat);
                    setct(cat._id);
                  }}
                  sx={{
                    fontSize: "11px",
                    color: "rgb(75,85,99)",
                    fontWeight: "600",
                  }}
                >
                  {cat.name}
                </MenuItem>
              ))}
          </Menu>
        </Box>
      </Paper>
      <MobileCatageryDrawer open={opend} setOpen={setOpend} />
    </>
  );
}
