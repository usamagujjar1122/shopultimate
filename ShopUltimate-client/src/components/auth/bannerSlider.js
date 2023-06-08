import React, { Component } from "react";
import Slider from "react-slick";
import {Box} from "@mui/material";
import Productcard from "../product/productcard";
export default class PauseOnHover extends Component {
  render() {
    var settings = {
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
    };
    return (
        <Slider {...settings}>
          <Box><Productcard
                                    name="Camera"
                                    image={["https://bazar-react.vercel.app/_next/image?url=%2Fassets%2Fimages%2Fproducts%2FElectronics%2F4.LumixDSLR.png&w=1920&q=75"]}
                                    price="$122"
                                /></Box>
          <Box><Productcard
                                    name="Camera"
                                    image={["https://bazar-react.vercel.app/_next/image?url=%2Fassets%2Fimages%2Fproducts%2FElectronics%2F4.LumixDSLR.png&w=1920&q=75"]}
                                    price="$122"
                                /></Box>
          <Box><Productcard
                                    name="Camera"
                                    image={["https://bazar-react.vercel.app/_next/image?url=%2Fassets%2Fimages%2Fproducts%2FElectronics%2F4.LumixDSLR.png&w=1920&q=75"]}
                                    price="$122"
                                /></Box>
          <Box><Productcard
                                    name="Camera"
                                    image={["https://bazar-react.vercel.app/_next/image?url=%2Fassets%2Fimages%2Fproducts%2FElectronics%2F4.LumixDSLR.png&w=1920&q=75"]}
                                    price="$122"
                                /></Box>
          <Box><Productcard
                                    name="Camera"
                                    image={["https://bazar-react.vercel.app/_next/image?url=%2Fassets%2Fimages%2Fproducts%2FElectronics%2F4.LumixDSLR.png&w=1920&q=75"]}
                                    price="$122"
                                /></Box>
        </Slider>
    );
  }
}