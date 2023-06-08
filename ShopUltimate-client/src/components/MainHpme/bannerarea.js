import { Search } from "@mui/icons-material";
import { Box, Button, TextField, Typography } from "@mui/material";
import React, { useMemo, useState } from "react";
import { useSelector } from "react-redux";
import bg from "../../images/bg/electronics.jpg";
import Header from "./header";
export default function BannerArea({
  group,
  setgroup,
  ct,
  setct,
  bgdata,
  producttitle,
  setproducttitle,
}) {
  return (
    <>
      <Box
        sx={{
          display: { lg: "block", md: "block", xs: "none" },
          position: "relative",
          width: "100%",
          height: "100vh",
          backgroundImage: `url(${bgdata?.img})`,
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <Header group={group} setgroup={setgroup} ct={ct} setct={setct} />
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%,-50%)",
            display: "flex",
            flexDirection: "column",
            textAlign: "center",
          }}
        >
          <Typography
            variant="h1"
            sx={{ fontSize: "42px", fontWeight: "bold", color: "#1f2937" }}
          >
            {bgdata?.heading}
          </Typography>
          <Typography sx={{ fontSize: "19px", color: "#1f2937", mt: 1, mb: 2 }}>
            {bgdata?.subheading}
          </Typography>
          <Box sx={{ position: "relative" }}>
            <TextField
              placeholder="Search Your Products From Here"
              fullWidth
              sx={{ background: "white", width: "100%" }}
              value={producttitle}
              onChange={(e) => setproducttitle(e.target.value)}
            />
            <Button
              startIcon={<Search />}
              size="large"
              sx={{
                height: "100%",
                width: "120px",
                position: "absolute",
                top: "0",
                right: "0",
                background: "rgb(0,159,127)",
                color: "white",
                fontWeight: "bold",

                textTransform: "capitalize",
                "&:hover": { background: "rgb(0,159,127)" },
              }}
            >
              Search
            </Button>
          </Box>
        </Box>
      </Box>
      <Box
        sx={{
          display: { xs: "flex", md: "none", lg: "none" },
          alignItems: "center",
          width: "100%",
          // boxShadow: "1px 2px 4px black",
          borderBottom: "1px solid #d0d0d0",
          py: 1,
          position: "fixed",
          top: "0",
          background: "white",
          zIndex: "100",
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
            fontSize: "25px",
            textAlign: "center",
          }}
        >
          Shop
          <span style={{ color: "#64a832" }}>Ultimate</span>
        </Typography>
      </Box>
    </>
  );
}
