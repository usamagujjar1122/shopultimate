import { Grid } from "@mui/material";
import React, { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getproductsbycatagery } from "../../redux/actions/productactions";
import BannerArea from "./bannerarea";
import BottomBar from "./bottomnavigation";
import CardSlider from "./cardsslider";
import SideTreeview from "./fsidebar";
import Header from "./header";
import MobileSide from "./mobileside";
import ProductGrid from "./productgrid";
import data from "./bgdata";
export default function Main() {
  const dispatch = useDispatch();
  const [group, setgroup] = React.useState();
  const [currentcat, setcurreentcat] = React.useState();
  const [producttitle, setproducttitle] = useState("");
  const products = useSelector((state) => state.products.c_products);

  const filteredItems = useMemo(() => {
    return products?.filter((item) => {
      return item.productTitle
        ?.toLowerCase()
        .includes(producttitle?.toLowerCase());
    });
  }, [producttitle, products]);
  const catageries = useSelector((state) => state.catageries.catageries);

  useEffect(() => {
    if (!group) {
      setgroup(catageries[Math.floor(Math.random() * catageries.length)]);
    }
  }, [catageries]);
  useEffect(() => {
    if (group) {
      setcurreentcat(group?._id);
    }
  }, [group]);
  useEffect(() => {
    dispatch(getproductsbycatagery(currentcat ? currentcat : group?._id));
  }, [currentcat]);
  useEffect(() => {
    if (!currentcat) {
      setcurreentcat(group?._id);
    }
  }, []);

  const bgdata = data.find(
    (d) => d.name.toLocaleLowerCase() == group?.name.toLocaleLowerCase()
  );

  return (
    <>
      <BannerArea
        group={group}
        setgroup={setgroup}
        ct={currentcat}
        setct={setcurreentcat}
        bgdata={bgdata}
        producttitle={producttitle}
        setproducttitle={setproducttitle}
      />
      <CardSlider />
      <Grid
        container
        spacing={2}
        sx={{ minHeight: "60vh", borderTop: "1px solid #d0d0d0" }}
      >
        <Grid item lg={2} md={12}>
          <SideTreeview cat={group} ct={currentcat} setct={setcurreentcat} />
        </Grid>
        <Grid item lg={10} md={12}>
          <ProductGrid
            group={group}
            setgroup={setgroup}
            ct={currentcat}
            setct={setcurreentcat}
            filteredItems={filteredItems}
          />
        </Grid>
      </Grid>
      <BottomBar />
    </>
  );
}
