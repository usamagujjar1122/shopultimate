import { Grid, Container, Box } from "@mui/material";
import {
  React,
  useRef,
  useCallback,
  useEffect,
  useState,
  Fragment,
} from "react";
import { useDispatch, useSelector } from "react-redux";
import { getproducts } from "../../redux/actions/productactions";
import Productcard from "../product/productcard";
import Nav from "./nav";
import InfiniteScroll from "react-infinite-scroll-component";
import { PRODUCT_ACTION_ATTEMPT } from "../../redux/types";
import authreducer from "../../redux/reducers/authreducer";

export default function Home() {
  const [PageNumber, setPageNumber] = useState(1);
  // const [hasMore, setHasMore] = useState(false);
  const products = useSelector((state) => state.products.products);
  const hasMore = useSelector((state) => state.products.hasMore);

  const isLoadingp = useSelector((state) => state.products.isLoadingp);

  const count = useSelector((state) => state.products.count);
  const auth = useSelector((state) => state.auth);

  const observer = useRef();
  const dispatch = useDispatch();
  useEffect(() => {
    if (!auth.isLoading) {
      dispatch(getproducts(1));
      setPageNumber((prevState) => prevState + 1);
    }
  }, [dispatch, auth.isLoading]);

  const fetchContacts = () => {
    setPageNumber((prevState) => prevState + 1);
    setTimeout(() => {
      if (hasMore) {
        dispatch(getproducts(PageNumber));
      }
    }, 1000);
  };

  const productDetails = products ? (
    <InfiniteScroll
      dataLength={products.length}
      next={fetchContacts}
      hasMore={hasMore}
      loader={<h4 className="cardLoader">Loading ...</h4>}
    >
      {
        <Container sx={{ mt: 3 }}>
          <Grid container spacing={2}>
            {products.map((item) => (
              <Productcard
                key={item._id}
                name={item.productTitle}
                image={item.images && item.images[0]}
                shop={item.shop && item.shop.shopname}
                price={item.price}
                id={item._id}
              />
            ))}
          </Grid>
        </Container>
      }
    </InfiniteScroll>
  ) : (
    <h3>No Records</h3>
  );
  return (
    <div>
      <Nav />
      {productDetails}
      {/* {products.length > 0 ? (
        <Container sx={{ mt: 3 }}>
          <Grid container spacing={2}>
            {products.map((item) => (
              <Productcard
                key={item._id}
                name={item.productTitle}
                image={item.images && item.images[0]}
                shop={item.shop && item.shop.shopname}
                price={item.price}
              />
            ))}
          </Grid>
        </Container>
      ) : (
        "loading.."
      )} */}
    </div>
  );
}
