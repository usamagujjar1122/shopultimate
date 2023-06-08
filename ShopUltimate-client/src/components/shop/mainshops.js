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
  IconButton,
  Tooltip,
} from "@mui/material";
import notfound from "../../images/notfound.svg";
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
import InfiniteScroll from "react-infinite-scroll-component";
import nopreview from "../../images/nopreview.png";
import {
  PRODUCT_ACTION_ATTEMPT,
  SHOP_ACTION_ATTEMPT,
  SHOP_ACTION_SUCCESS,
} from "../../redux/types";
import authreducer from "../../redux/reducers/authreducer";
import { getallshops } from "../../redux/actions/shopactions";
import Shopcard from "./shopcard";
import { Link, useParams } from "react-router-dom";
import {
  FilterAlt,
  FilterList,
  FilterListOff,
  Search,
  TextFieldsRounded,
} from "@mui/icons-material";
import ShopFilter from "./filtershops";
import Header from "../MainHpme/header";
import HeaderV2 from "../layouts/headerV2";

export default function ShopHome() {
  const [PageNumber, setPageNumber] = useState(1);
  const [open, setOpen] = useState(true);
  const [storename, setstorename] = useState("");
  const [brand, setbrand] = useState();
  const [catagery, setcatgery] = useState("");
  const [country, setcountry] = useState("");

  const shops = useSelector((state) => state.shop.shops);
  const loading = useSelector((state) => state.shop.isLoading);
  const catageries = useSelector((state) => state.catageries.catageries);

  const auth = useSelector((state) => state.auth);
  const params = useParams();
  const observer = useRef();
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch({ type: SHOP_ACTION_ATTEMPT });
    dispatch(getallshops(null));
  }, [PageNumber, dispatch]);
  const filteredItems = useMemo(() => {
    return shops?.filter((item) => {
      return (
        item.shopname?.toLowerCase().includes(storename?.toLowerCase()) &&
        item.catagery?.toLowerCase().includes(catagery?.toLowerCase())
      );
    });
  }, [shops, storename, catagery]);
  const loadmore = () => {
    console.log(PageNumber);
    setPageNumber((prevState) => prevState + 1);
  };
  const handlefilter = () => {
    if (!storename && !country && !catagery) {
      dispatch(getallshops(null));
    }
    const data = {
      shopname: storename,
      country: country,
      catagery: catagery,
    };
    dispatch(getallshops(data));
  };
  const handleclear = () => {
    setOpen(!open);
    dispatch(getallshops(null));
  };
  return (
    <div>
      {/* <Nav /> */}
      <HeaderV2 />

      <Container sx={{ mt: 8 }}>
        <Box sx={{ mb: 2 }}>
          <Typography
            sx={{ fontSize: "32px", textAlign: "center", color: "#333" }}
          >
            Find Your Perfact Store Here
          </Typography>
        </Box>
        <Box sx={{ textAlign: "right" }}>
          <ShopFilter
            brand={brand}
            setbrand={setbrand}
            storename={storename}
            setstorename={setstorename}
            catagery={catagery}
            setcatgery={setcatgery}
            country={country}
            setcountry={setcountry}
            handlefilter={handlefilter}
          />
        </Box>
        {loading && (
          <Stack alignItems="center" sx={{ marginTop: 2, marginBottom: 2 }}>
            <CircularProgress disableShrink />
          </Stack>
        )}
        <Grid container spacing={2} sx={{ mt: 2 }}>
          {shops
            ? // <Grid container spacing={2}>
              filteredItems.map((item) => (
                <Shopcard
                  key={item._id}
                  name={item.shopname}
                  streetaddress={item.streetaddress}
                  image={
                    item.shopavatar.length > 0 ? item.shopavatar[0] : nopreview
                  }
                  country={item.country && item.country}
                  city={item.city && item.city}
                  // owner={item.owner.username}
                  id={item._id}
                />
              ))
            : // </Grid>
              !loading && (
                <Typography sx={{ p: 2, textAlign: "center" }}>
                  No Shops Available
                </Typography>
              )}
        </Grid>
        {filteredItems?.length == 0 && (
          <>
            <img
              src={notfound}
              style={{ width: 300, display: "block", margin: "0 auto" }}
            />
            <Typography
              sx={{
                textAlign: "center",
                fontWeight: "bold",
                color: "#333",
                mt: 1,
              }}
            >
              No Result Found :)
            </Typography>
          </>
        )}

        {!loading && shops?.length > 15 && (
          <Stack alignItems="center">
            <Button
              color="primary"
              onClick={loadmore}
              variant="contained"
              sx={{ marginTop: 2 }}
            >
              Load More
            </Button>
          </Stack>
        )}
      </Container>
    </div>
  );
}
