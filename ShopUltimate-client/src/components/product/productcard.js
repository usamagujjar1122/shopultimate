// import * as React from "react";
import React, { Component } from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { Grid, Paper, Stack, Rating, IconButton, Tooltip } from "@mui/material";
import { styled } from "@mui/material/styles";
import { Add, Favorite, ShoppingCart, Visibility } from "@mui/icons-material";
import { addtocart } from "../../redux/actions/cartactions";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import SwipeableTextMobileStepper from "../layouts/stepper";
import { setAlert } from "../../redux/actions/alertactions";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  // padding: theme.spacing(1),
  // textAlign: "center",
  color: theme.palette.text.secondary,
}));

export default function Productcard(props) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const auth = useSelector((state) => state.auth.isAuthenticated);
  return (
    <Link to={`/product/${props.id}`} style={{ textDecoration: "none" }}>
      <Paper
        sx={{
          p: 2,
          boxShadow: "0",
          border: "1px solid #d0d0d0",
          minHeight: 300,
          position: "relative",
          transition: "0.5s",
          "&:hover": {
            transform: "translate(0,-5px)",
          },
        }}
      >
        <Box
          sx={{
            fontSize: "12px",
            backgroundColor: "#009f7f",
            width: "fit-content",
            color: "white",
            padding: "7px",
            borderRadius: "15px",
            position: "absolute",
            right: "10px",
            top: "10px",
            fontWeight: "bold",
          }}
        >
          {props?.discount}%
        </Box>
        <Box sx={{ minHeight: 250, display: "flex", alignItems: "center" }}>
          <img
            src={props?.image[0]}
            style={{
              maxHeight: 200,
              maxWidth: "100%",
              display: "block",
              margin: "0 auto",
            }}
          />
        </Box>
        <Box>
          <Typography
            sx={{
              color: "#1f2937",
              fontSize: "16px",
              fontWeight: "bold",
            }}
          >
            ${props?.price}
          </Typography>
          <Typography sx={{ fontSize: "14px", color: "#6b7280", mb: 2, mt: 1 }}>
            {props?.name}
          </Typography>
          {auth ? (
            <Button
              onClick={(e) => {
                e.preventDefault();
                dispatch(addtocart(props.id, props.shopid));
              }}
              fullWidth
              varinat="contained"
              sx={{
                background: "rgb(243,244,246)",
                position: "relative",
                textTransform: "capitalize",
                color: "rgb(75,85,99)",
                "&:hover": {
                  background: "rgb(0,159,127)",
                  color: "white",
                  "& .css-1lmlfqd": {
                    background: "rgb(0,159,127)",
                    color: "white",
                  },
                },
              }}
            >
              <Typography>Add</Typography>
              <Box
                sx={{
                  position: "absolute",
                  display: "flex",
                  alignItems: "center",
                  right: "0",
                  justifyContent: "center",
                  width: "50px",
                  height: "100%",
                  textAlign: "center",
                  // background: "rgb(229,231,235)",
                }}
              >
                <Add />
              </Box>
            </Button>
          ) : (
            <Button
              onClick={(e) => {
                e.preventDefault();
                dispatch(
                  setAlert("Please login to add products to cart", "info")
                );
              }}
              fullWidth
              varinat="contained"
              sx={{
                background: "rgb(243,244,246)",
                position: "relative",
                textTransform: "capitalize",
                color: "rgb(75,85,99)",
                "&:hover": {
                  background: "rgb(0,159,127)",
                  color: "white",
                  "& .css-1lmlfqd": {
                    background: "rgb(0,159,127)",
                    color: "white",
                  },
                },
              }}
            >
              <Typography>Add</Typography>
              <Box
                sx={{
                  position: "absolute",
                  display: "flex",
                  alignItems: "center",
                  right: "0",
                  justifyContent: "center",
                  width: "50px",
                  height: "100%",
                  textAlign: "center",
                  // background: "rgb(229,231,235)",
                }}
              >
                <Add />
              </Box>
            </Button>
          )}
        </Box>
      </Paper>
    </Link>
  );
}
