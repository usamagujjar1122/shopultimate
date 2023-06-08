import { React, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { getsingleshop } from "../../redux/actions/shopactions";
import Nav from "../layouts/nav";
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import {
  Grid,
  Container,
  Stack,
  Paper,
  Typography,
  Box,
  List,
  ListItem,
  ListItemText,
  Avatar,
  Rating,
  Button,
  InputLabel,
  Autocomplete,
  Chip,
  Checkbox,
  TextField,
  Pagination,
} from "@mui/material";
import Productcard from "../product/productcard";
import CircularProgress from "@mui/material/CircularProgress";

import {
  PRODUCT_ACTION_ATTEMPT,
  SHOP_ACTION_ATTEMPT,
  SHOP_ACTION_SUCCESS,
} from "../../redux/types";
import {
  Facebook,
  MessageOutlined,
  FilterAlt,
  Phone,
  NearMe,
  Preview,
  Description,
} from "@mui/icons-material";
import { green } from "@mui/material/colors";
import HeaderV2 from "../layouts/headerV2";

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
export default function ShopView() {
  const [value, setValue] = useState(0);

  const params = useParams();
  const dispatch = useDispatch();

  const loading = useSelector((state) => state.shop.isLoading);

  const shopdata = useSelector((state) => state.shop.shop);

  useEffect(() => {
    dispatch({ type: SHOP_ACTION_ATTEMPT });

    dispatch(getsingleshop(params.id));
  }, []);
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  if (loading) {
    return (
      <Stack alignItems="center" sx={{ marginTop: 2, marginBottom: 2 }}>
        <CircularProgress disableShrink />
      </Stack>
    );
  }
  return (
    <div style={{ background: "rgb(243,244,246)", paddingBottom: "30px" }}>
      <HeaderV2 />
      <Container sx={{ mt: 3 }} maxWidth="xl">
        <Grid container spacing={2}>
          <Grid item md={3} xs={12}>
            <Paper sx={{ p: 2, height: "80vh", borderRadius: "8px" }}>
              <Box
                sx={{
                  pb: 2,
                  borderBottom: "1px solid #d0d0d0",
                  // display: "flex",
                  // justifyContent: "space-between",
                  // alignItems: "center",
                }}
              >
                <Stack spacing={2} sx={{}}>
                  <Box sx={{ display: "flex", justifyContent: "center" }}>
                    <Avatar
                      src={shopdata?.shopavatar[0]}
                      variant="rounded"
                      sx={{
                        width: 150,
                        height: 150,
                      }}
                    ></Avatar>
                  </Box>
                  <Box>
                    <Typography
                      variant="h6"
                      sx={{
                        fontWeight: "bold",
                        textAlign: "center",
                        textTransform: "capitalize",
                      }}
                    >
                      {shopdata?.shopname}
                    </Typography>
                    <Stack
                      direction="row"
                      spacing={1}
                      sx={{ alignItems: "center", justifyContent: "center" }}
                    >
                      <Rating
                        name="read-only"
                        value={5}
                        readOnly
                        size="small"
                      />
                      <Typography sx={{ textAlign: "center" }}>(5)</Typography>
                    </Stack>
                  </Box>
                </Stack>
                <Stack
                  spacing={1}
                  direction="row"
                  sx={{ justifyContent: "center", mt: 1 }}
                >
                  <Box>
                    <Button
                      variant="contained"
                      endIcon={<MessageOutlined />}
                      sx={{ background: "#009f7f" }}
                    >
                      Message
                    </Button>
                  </Box>
                  <Box></Box>
                </Stack>
              </Box>
              <Box sx={{ p: 2 }}>
                <Box sx={{ mb: 2 }}>
                  <Typography sx={{ fontWeight: "bold" }}>Address</Typography>
                  <Typography>
                    {" "}
                    {shopdata?.streetaddress +
                      ", " +
                      shopdata?.city +
                      ", " +
                      shopdata?.country}
                  </Typography>
                </Box>
                <Box>
                  <Typography sx={{ fontWeight: "bold" }}>Phone</Typography>
                  <Typography>{shopdata?.shopphone}</Typography>
                </Box>
                <Box>
                  <Typography sx={{ fontWeight: "bold", mt: 1 }}>
                    Description
                  </Typography>
                  <Typography>{shopdata?.aboutShop}</Typography>
                </Box>
              </Box>
            </Paper>
          </Grid>
          <Grid item md={9} xs={12}>
            <Box
              sx={{
                wdith: "100%",
                height: "300px",
                backgroundImage: `url(${shopdata?.shopbanner[0]})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
                backgroundRepeat: "no-repeat",
                borderRadius: "12px",
              }}
            ></Box>
            {/* <img
              // variant="rounded"
              src={shopdata[0]?.shopbanner[0]}
              style={{ width: "100%", height: "300px" }}
            ></img> */}
            <Box>
              {shopdata ? (
                <Box
                  sx={{
                    mt: 2,
                    display: "grid",
                    gridTemplateColumns:
                      "repeat(auto-fill, minmax(230px, 1fr))!important",
                    gap: "10px",
                  }}
                >
                  {shopdata.products.length > 0
                    ? shopdata.products.map((item) => (
                        <Productcard
                          key={item._id}
                          name={item.productTitle}
                          image={item.images && item.images}
                          price={item.price}
                          id={item._id}
                          shopid={shopdata._id}
                          discount={item.discount}
                        />
                      ))
                    : "This Shop Has No Active Products"}
                </Box>
              ) : (
                <Stack
                  alignItems="center"
                  sx={{ marginTop: 2, marginBottom: 2 }}
                >
                  <CircularProgress disableShrink />
                </Stack>
              )}
            </Box>
          </Grid>
        </Grid>

        {/* <img
            src={shopdata[0]?.shopbanner[0]}
            width="100%"
            height="200vh"
          ></img> */}
      </Container>
    </div>
  );
}
