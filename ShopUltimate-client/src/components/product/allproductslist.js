import {
  Grid,
  Container,
  Box,
  Button,
  Typography,
  Stack,
  TextField,
  Paper,
  InputLabel,
  Autocomplete,
  Chip,
  Checkbox,
  Rating,
  ImageList,
} from "@mui/material";
import {
  React,
  useRef,
  useCallback,
  useEffect,
  useState,
  Fragment,
  useMemo,
} from "react";
import { useDispatch, useSelector } from "react-redux";
import CircularProgress from "@mui/material/CircularProgress";
import Nav from "../layouts/nav";
import nopreview from "../../images/nopreview.png";

import { PRODUCT_ACTION_ATTEMPT } from "../../redux/types";

import Productcard from "./productcard";
import { Link, useParams } from "react-router-dom";
import { FilterAlt, TextFieldsRounded } from "@mui/icons-material";
import { getproducts } from "../../redux/actions/productactions";

export default function Productlisting() {
  const [PageNumber, setPageNumber] = useState(1);
  const [productname, setproductname] = useState("");
  const [range1, setrange1] = useState(0);
  const [range2, setrange2] = useState(1000000);

  const products = useSelector((state) => state.products.products);
  const loading = useSelector((state) => state.products.isLoadingp);
  const catageries = useSelector((state) => state.catageries.catageries);

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch({ type: PRODUCT_ACTION_ATTEMPT });

    dispatch(getproducts());
  }, []);

  const loadmore = () => {
    console.log(PageNumber);
    setPageNumber((prevState) => prevState + 1);
  };
  const filteredItems = useMemo(() => {
    return products?.filter((item) => {
      return (
        item.productTitle?.toLowerCase().includes(productname?.toLowerCase()) &&
        item.price >= range1 &&
        item.price <= range2
      );
    });
  }, [productname, products, range1, range2]);
  return (
    <div>
      <Nav />

      <Container sx={{ mt: 3 }} maxWidth="xl">
        {loading && (
          <Stack alignItems="center" sx={{ marginTop: 2, marginBottom: 2 }}>
            <CircularProgress disableShrink />
          </Stack>
        )}
        <Typography variant="h5">All Products List</Typography>

        <Grid container spacing={1}>
          <Grid item md={3} xs={12}>
            <Paper sx={{ p: 2, mt: 2 }}>
              <Typography variant="h6" sx={{ fontWeight: "bold", mb: 1 }}>
                Filter Products
              </Typography>
              <Box sx={{ pb: 2 }}>
                <InputLabel sx={{ mb: 1 }}>Product Name</InputLabel>
                <TextField
                  variant="outlined"
                  placeholder="Brand Store"
                  fullWidth
                  size="small"
                  value={productname}
                  onChange={(e) => setproductname(e.target.value)}
                />
              </Box>
              <Box>
                <Box sx={{ pb: 2 }}>
                  <InputLabel sx={{ mb: 1 }}>Starting Range</InputLabel>
                  <TextField
                    variant="outlined"
                    placeholder="Brand Store"
                    fullWidth
                    size="small"
                    value={range1}
                    type="number"
                    onChange={(e) => setrange1(e.target.value)}
                  />
                </Box>
                <Box sx={{ pb: 2 }}>
                  <InputLabel sx={{ mb: 1 }}>Ending Range</InputLabel>
                  <TextField
                    variant="outlined"
                    placeholder="Brand Store"
                    fullWidth
                    size="small"
                    value={range2}
                    type="number"
                    onChange={(e) => setrange2(e.target.value)}
                  />
                </Box>
              </Box>
            </Paper>
          </Grid>

          <Grid item md={9} xs={12}>
            <Box
              sx={{
                display: "grid",
                gridTemplateColumns:
                  "repeat(auto-fill, minmax(230px, 1fr))!important",
                gap: "10px",
              }}
            >
              {filteredItems?.length > 0
                ? filteredItems?.map((item) => (
                    <Productcard
                      key={item._id}
                      name={item.productTitle}
                      image={item.images && item.images}
                      price={item.price}
                      id={item._id}
                      shopid={item?.shop?._id}
                      discount={item?.discount}
                    />
                  ))
                : "No product"}
            </Box>
          </Grid>
        </Grid>
      </Container>
    </div>
  );
}
