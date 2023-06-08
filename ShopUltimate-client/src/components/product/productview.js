import { React, useEffect, useState } from "react";
import Nav from "../layouts/nav";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { getproduct } from "../../redux/actions/productactions";
import { Send, ShoppingCart } from "@mui/icons-material";
import { addtocart } from "../../redux/actions/cartactions";
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import {
  Grid,
  Container,
  Paper,
  Typography,
  Button,
  Stack,
  Box,
  Rating,
  Avatar,
  TextField,
  Chip,
} from "@mui/material";

import CircularProgress from "@mui/material/CircularProgress";
import HeaderV2 from "../layouts/headerV2";
import { setAlert } from "../../redux/actions/alertactions";

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}
export default function ProductView() {
  const [currimage, setCurrImage] = useState(null);
  const [value, setValue] = useState(0);

  const params = useParams();
  const dispatch = useDispatch();
  const loading = useSelector((state) => state.products.isLoadingp);

  const product = useSelector((state) => state.products.product);
  const auth = useSelector((state) => state.auth.isAuthenticated);

  useEffect(() => {
    // dispatch({ type: SHOP_ACTION_ATTEMPT });

    dispatch(getproduct(params.id));
  }, []);
  if (loading) {
    return (
      <Stack alignItems="center" sx={{ marginTop: 2, marginBottom: 2 }}>
        <CircularProgress disableShrink />
      </Stack>
    );
  }
  const changeimage = (e, item) => {
    setCurrImage([item]);
  };
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  if (loading) {
    return <CircularProgress />;
  }
  return (
    <div>
      <HeaderV2 />
      {/* <SwipeableTextMobileStepper images={product && product.images} /> */}
      <Container sx={{ marginTop: 5 }}>
        <Box sx={{}}>
          <Grid container spacing={2}>
            <Grid item xs={6}>
              <Box
                sx={{
                  minHeight: 450,
                  maxHeight: 450,
                  display: "flex",
                  alignItems: "center",
                }}
              >
                <img
                  src={product && product.images[0]}
                  style={{
                    maxWidth: "100%",
                    maxHeight: 450,
                    display: "block",
                    margin: "0 auto",
                  }}
                ></img>
              </Box>
              <Stack direction="row" spacing={2}>
                {product
                  ? product.images.map((item) => {
                      return (
                        <Box
                          sx={{
                            width: "100px",
                            height: "100px",
                            border: "1px solid #d0d0d0",
                            p: 0.5,
                            borderRadius: "6px",
                          }}
                          onClick={(e) => changeimage(e, item)}
                        >
                          <img
                            src={item}
                            style={{ width: "100%", height: "100%" }}
                          ></img>
                        </Box>
                      );
                    })
                  : "No Images"}
              </Stack>
            </Grid>
            <Grid item xs={6}>
              <Box sx={{ borderBottom: "1px solid #d0d0d0", p: 2 }}>
                <Typography
                  variant="h5"
                  sx={{
                    fontWeight: "600",
                    fontSize: "1.7rem",
                    color: "rgb(31,41,55)",
                  }}
                >
                  {product && product.productTitle}
                </Typography>
                <Typography
                  variant="h5"
                  sx={{
                    fontWeight: "light",
                    color: "rgb(0,159,127)",
                    fontSize: "16px",
                    mt: 1,
                    mb: 1,
                  }}
                >
                  1 pc(s)
                </Typography>

                {/* <Stack direction="row" spacing={1} sx={{ alignItems: "center" }}>
                <Typography>Rated:</Typography>
                <Rating value={4}></Rating>
                <Typography>(46)</Typography>
              </Stack> */}

                <Typography
                  variant="h4"
                  sx={{
                    fontWeight: "bold",
                    color: "rgb(0,159,127)",
                    mt: 1,
                    mb: 1,
                  }}
                >
                  ${product && product.price}
                </Typography>
                {auth ? (
                  <Button
                    size="large"
                    sx={{
                      // marginTop: 2,
                      background: "rgb(0,159,127)",
                      boxShadow: "0",
                      "&:hover": {
                        background: "rgb(0,159,127)",
                        boxShadow: "0",
                      },
                    }}
                    variant="contained"
                    startIcon={<ShoppingCart />}
                    onClick={() =>
                      dispatch(addtocart(product._id, product?.shop?._id))
                    }
                  >
                    Add To Cart
                  </Button>
                ) : (
                  <Button
                    size="large"
                    sx={{
                      // marginTop: 2,
                      background: "rgb(0,159,127)",
                      boxShadow: "0",
                      "&:hover": {
                        background: "rgb(0,159,127)",
                        boxShadow: "0",
                      },
                    }}
                    variant="contained"
                    startIcon={<ShoppingCart />}
                    onClick={() =>
                      dispatch(
                        setAlert("Please login to add product to cart", "info")
                      )
                    }
                  >
                    Add To Cart
                  </Button>
                )}
              </Box>
              <Box sx={{ p: 2 }}>
                <Box
                  sx={{ display: "flex", mt: 2, alignItems: "center", mb: 2 }}
                >
                  <Typography
                    sx={{
                      mr: 2,
                      fontWeight: "500",
                      color: "rgb(31,41,55)",
                      fontSize: "18px",
                    }}
                  >
                    Catagery
                  </Typography>
                  <Chip
                    label={product && product.catagery?.catagery_name}
                    variant="outlined"
                    sx={{
                      borderColor: "#d0d0d0",
                      borderRadius: "4px",
                      color: "rgb(31,41,55)",
                      fontSize: "16px",
                    }}
                  />
                  <Chip
                    label={product && product.brand}
                    variant="outlined"
                    sx={{
                      ml: 1,
                      borderColor: "#d0d0d0",
                      borderRadius: "4px",
                      color: "rgb(31,41,55)",
                      fontSize: "16px",
                    }}
                  />
                </Box>

                <Typography>
                  <Link
                    to={`/shop/${product?.shop?._id}`}
                    style={{
                      textDecoration: "none",
                      fontSize: "16px",
                    }}
                  >
                    Store:
                    <span
                      style={{
                        textDecoration: "underline",
                        color: "rgb(0,159,127)",
                        fontSize: "14px",
                      }}
                    >
                      {product && product.shop?.shopname}
                    </span>
                  </Link>
                </Typography>
              </Box>
            </Grid>
          </Grid>
        </Box>
        <Box
          sx={{
            border: "1px solid #d0d0d0",
            p: 2,
            mt: 2,
            mb: 2,
          }}
        >
          <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
            <Tabs
              value={value}
              onChange={handleChange}
              aria-label="basic tabs example"
            >
              <Tab label="Product Descriptions" {...a11yProps(0)} />
              <Tab label="Product Reviews" {...a11yProps(1)} />
            </Tabs>
          </Box>
          <TabPanel value={value} index={0}>
            {product && product.productDescription}
          </TabPanel>
          <TabPanel value={value} index={1}>
            <Box>
              <Stack direction="row" spacing={1} sx={{ alignItems: "center" }}>
                <Avatar sx={{ width: 56, height: 56 }}></Avatar>
                <Box>
                  <Typography sx={{ fontWeight: "bold" }}>Jon Doe</Typography>
                  <Stack
                    direction="row"
                    spacing={1}
                    sx={{ alignItems: "center" }}
                  >
                    <Rating value={4}></Rating>
                    <Typography>(46)</Typography>
                    <Typography>2 Days Ago</Typography>
                  </Stack>
                </Box>
              </Stack>
              <Typography sx={{ mt: 1 }}>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Varius
                massa id ut mattis. Facilisis vitae gravida egestas ac account.
              </Typography>
            </Box>
            <Box sx={{ mt: 3 }}>
              <Typography
                variant="h4"
                sx={{ fontWeight: "bold", fontSize: "22px" }}
              >
                Write a Review for this product
              </Typography>
              <Typography sx={{ fontWeight: "bold", mt: 1, mb: 1 }}>
                Your Rating *
              </Typography>
              <Rating value="4"></Rating>
              <Typography sx={{ fontWeight: "bold", mt: 1, mb: 1 }}>
                Your Review *
              </Typography>
              <TextField
                multiline
                rows={4}
                maxRows={6}
                placeholder="Write A review"
                fullWidth
              />
              <Button
                variant="contained"
                color="success"
                endIcon={<Send />}
                sx={{ mt: 1 }}
              >
                Submit
              </Button>
            </Box>
          </TabPanel>
        </Box>
      </Container>
    </div>
  );
}
