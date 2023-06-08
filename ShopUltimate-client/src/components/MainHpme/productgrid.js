import React, { useEffect, useState } from "react";
import {
  Box,
  Grid,
  Paper,
  Typography,
  Button,
  CircularProgress,
} from "@mui/material";
import demo from "../../images/productdemo.webp";
import { Add } from "@mui/icons-material";
import MobileSide from "./mobileside";
import { useDispatch, useSelector } from "react-redux";
import { getproductsbycatagery } from "../../redux/actions/productactions";
import notfound from "../../images/notfound.svg";
import Productcard from "../product/productcard";

export default function ProductGrid({
  group,
  setgroup,
  ct,
  setct,
  filteredItems,
}) {
  const dispatch = useDispatch();

  // useEffect(() => {
  //   dispatch(getproductsbycatagery(group?._id));
  // }, [group]);
  const products = useSelector((state) => state.products.c_products);
  const loading = useSelector((state) => state.products.isLoadingp);

  return (
    <Box sx={{ background: "rgba(243,244,246,0.7)" }}>
      <MobileSide setgroup={setgroup} setct={setct} group={group} />
      {loading ? (
        <CircularProgress />
      ) : (
        <Grid container spacing={2} sx={{ p: 3 }}>
          {filteredItems?.length ? (
            filteredItems?.map((p) => (
              <Grid item lg={3} md={3} xs={12} sm={6}>
                <Productcard
                  key={p._id}
                  name={p.productTitle}
                  image={p.images && p.images}
                  price={p.price}
                  id={p._id}
                  discount={p.discount}
                />
                {/* <Paper
                sx={{
                  p: 2,
                  boxShadow: "0",
                  border: "1px solid #d0d0d0",
                  minHeight: 300,
                }}
              >
                <Box>
                  <img
                    src={p?.images[0]}
                    width="100%"
                    style={{ height: 200 }}
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
                    ${p?.price}
                  </Typography>
                  <Typography
                    sx={{ fontSize: "14px", color: "#6b7280", mb: 1 }}
                  >
                    {p?.productTitle}
                  </Typography>
                  <Button
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
                </Box>
              </Paper> */}
              </Grid>
            ))
          ) : (
            <Box
              sx={{
                width: "100%",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                pb: 5,
              }}
            >
              <img
                src={notfound}
                style={{
                  width: 300,
                  // display: "block",
                  margin: "10px auto",
                  maxWidth: "100%",
                }}
              />
              <Typography sx={{ color: "#333", fontWeight: "bold", mt: 1 }}>
                No Products In this catagery{" "}
              </Typography>
            </Box>
          )}
        </Grid>
      )}
    </Box>
  );
}
