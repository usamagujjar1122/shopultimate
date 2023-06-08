import { Box, IconButton } from "@mui/material";
import React, { useEffect } from "react";
import img1 from "../../images/offer-1.webp";
import img2 from "../../images/offer-2.webp";
import img3 from "../../images/offer-3.webp";
import img4 from "../../images/offer-4.webp";
import img5 from "../../images/offer-5.webp";
import Slider from "react-slick";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useState } from "react";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
export default function CardSlider() {
  const sm = useMediaQuery("(min-width:0px)");
  const md = useMediaQuery("(min-width:600px)");
  const lg = useMediaQuery("(min-width:1200px)");
  const [x, X] = useState(3);
  useEffect(() => {
    if (lg) {
      X(3);
    } else if (md) {
      X(2);
    } else if (sm) {
      X(1);
    }
  }, [lg, md, sm]);
  function SampleNextArrow(props) {
    const { style, onClick, slideCount, currentSlide } = props;
    return (
      <div
        style={{
          ...style,
          right: "0%",
          top: "40%",
          position: "absolute",
          zIndex: 1,
        }}
        onClick={onClick}
      >
        <IconButton
          sx={{
            display: currentSlide === slideCount - x ? "none" : "flex",
            border: "1px solid silver",
            backgroundColor: "white",
            "&:hover": { backgroundColor: "rgb(0,159,127)", color: "white" },
          }}
        >
          <ChevronRightIcon />
        </IconButton>
      </div>
    );
  }

  function SamplePrevArrow(props) {
    const { currentSlide, style, onClick } = props;
    return (
      <div
        style={{
          ...style,
          left: "0%",
          top: "40%",
          position: "absolute",
          zIndex: 1,
        }}
        onClick={onClick}
      >
        <IconButton
          sx={{
            display: currentSlide === 0 ? "none" : "flex",
            border: "1px solid silver",
            backgroundColor: "white",
            "&:hover": { backgroundColor: "rgb(0,159,127)", color: "white" },
          }}
        >
          <ChevronLeftIcon />
        </IconButton>
      </div>
    );
  }
  const settings = {
    infinite: false,
    speed: 500,
    slidesToShow: x,
    slidesToScroll: 1,
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
  };
  return (
    <>
      <Box
        sx={{
          p: 3,
          // borderBottom: "1px solid #d0d0d0",
          marginTop: { xs: "50px", md: "0px" },
        }}
      >
        <Slider {...settings}>
          <Box sx={{ textAlign: "-webkit-center" }}>
            <img src={img1} width="90%" />
          </Box>
          <Box sx={{ textAlign: "-webkit-center" }}>
            <img src={img2} width="90%" />
          </Box>
          <Box sx={{ textAlign: "-webkit-center" }}>
            <img src={img3} width="90%" />
          </Box>
          <Box sx={{ textAlign: "-webkit-center" }}>
            <img src={img4} width="90%" />
          </Box>
          <Box sx={{ textAlign: "-webkit-center" }}>
            <img src={img5} width="90%" />
          </Box>
        </Slider>
      </Box>
    </>
  );
}
