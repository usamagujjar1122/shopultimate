import * as React from 'react';
import MenuIcon from '@mui/icons-material/Menu';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import Slider from "react-slick";
import {
    Container,
    Box,
    Paper,
    Stack,
    Typography,
    Avatar,
    Button,
    paperClasses,
    Grid,
    TextField,
    IconButton,
} from "@mui/material";
import { useState, useEffect } from "react";
import Productcard from '../product/productcard';
import CatagoryList from './catagoryList';
import MobileNav from './mobileNav';
import PauseOnHover from './bannerSlider';

const LandingPage = () => {

    function SampleNextArrow(props) {
        const { className, style, onClick } = props;
        return (
            <div
                className={className}
                style={{ ...style, color: "salmon", position: "absolute", left: "96%", zIndex: "2", top: "45%", lineHeight: "0" }}
                onClick={onClick}
            >
                <IconButton aria-label="delete">
                    <ArrowForwardIcon />
                </IconButton>
            </div>
        );
    }

    function SamplePrevArrow(props) {
        const { className, style, onClick } = props;
        return (
            <div
                className={className}
                style={{ ...style, color: "salmon", position: "absolute", left: "0%", zIndex: "2", top: "45%", lineHeight: "0" }}
                onClick={onClick}
            >
                <IconButton aria-label="delete">
                    <ArrowBackIcon />
                </IconButton>
            </div>
        );
    }
    const bar = document.getElementById("slide");
    const handleSlide = () => {
        if (bar.style.left === "-60%") {
            bar.style.left = "0%";
        }
        else {
            bar.style.left = "-60%";
        }
    }
    const [num, setNum] = useState(3);
    const settings = {
        infinite: true,
        speed: 500,
        slidesToShow: num,
        slidesToScroll: 1,
        nextArrow: <SampleNextArrow />,
        prevArrow: <SamplePrevArrow />
    };
    const [screen, setScreen] = useState(window.innerWidth);
    useEffect(() => {
        const handleResize = () => { setScreen(window.innerWidth); }
        if (screen <= "600") {
            setNum(1);
        } else if (screen <= "1250") {
            setNum(2);
        } else {
            setNum(3);
        }
        window.addEventListener("resize", handleResize);
        return () => {
            window.removeEventListener("resize", handleResize);
        };
    })
    return (
        <>
            <Container maxWidth="xlg" sx={{ display: "flex", mt: "20px" }}>
                {/* {} */}
                <Box sx={{ margin: { md: "25px 20px 0px 40px" }, }}>
                    <CatagoryList />
                </Box>
                <Box sx={{ width: { xs: "100%", md: "70%" } }}>
                    <Box sx={{ ml: "16px", display: "flex", justifyContent: "space-between", mt: 3, mr: 2 }}>
                        <Stack direction="column" spacing={1}>
                            <Typography variant="h5" sx={{ fontWeight: "bold" }}>
                                Popular Products
                            </Typography>
                            <Typography color="gray" variant="caption" m="0" lineHeight="0">Best collection of 2022</Typography>
                        </Stack>
                        <Box sx={{ display: "flex" }}>
                            <Button component="h2" variant="outlined" color="error">View all</Button>
                            <IconButton
                                color="inherit"
                                aria-label="open drawer"
                                edge="start"
                                onClick={handleSlide}
                                sx={{ mr: 2, display: { md: 'none' }, marginLeft: "16px" }}
                            >
                                <MenuIcon />
                            </IconButton>
                        </Box>
                    </Box>
                    <Box sx={{ m: "36px 0px" }}>
                        <Slider {...settings}>
                            <Box sx={{ maxWidth: "90%", margin: "0px 20px" }}>
                                <Productcard
                                    name="Camera"
                                    image={["https://bazar-react.vercel.app/_next/image?url=%2Fassets%2Fimages%2Fproducts%2FElectronics%2F4.LumixDSLR.png&w=1920&q=75"]}
                                    price="$122"
                                />
                            </Box>
                            <Box sx={{ maxWidth: "90%", margin: "0px 20px" }}>
                                <Productcard
                                    name="Camera"
                                    image={["https://bazar-react.vercel.app/_next/image?url=%2Fassets%2Fimages%2Fproducts%2FElectronics%2F4.LumixDSLR.png&w=1920&q=75"]}
                                    price="$122"
                                />
                            </Box>
                            <Box sx={{ maxWidth: "90%", margin: "0px 20px" }}>
                                <Productcard
                                    name="Camera"
                                    image={["https://bazar-react.vercel.app/_next/image?url=%2Fassets%2Fimages%2Fproducts%2FElectronics%2F4.LumixDSLR.png&w=1920&q=75"]}
                                    price="$122"
                                />
                            </Box>
                            <Box sx={{ maxWidth: "90%", margin: "0px 20px" }}>
                                <Productcard
                                    name="Camera"
                                    image={["https://bazar-react.vercel.app/_next/image?url=%2Fassets%2Fimages%2Fproducts%2FElectronics%2F4.LumixDSLR.png&w=1920&q=75"]}
                                    price="$122"
                                />
                            </Box>
                            <Box sx={{ maxWidth: "90%", margin: "0px 20px" }}>
                                <Productcard
                                    name="Camera"
                                    image={["https://bazar-react.vercel.app/_next/image?url=%2Fassets%2Fimages%2Fproducts%2FElectronics%2F4.LumixDSLR.png&w=1920&q=75"]}
                                    price="$122"
                                />
                            </Box>

                        </Slider>
                    </Box>


                    {/* {} */}
                    <Box sx={{ ml: "16px", display: "flex", justifyContent: "space-between", mt: 10, mr: 2 }}>
                        <Stack direction="column" spacing={1}>
                            <Typography variant="h5" sx={{ fontWeight: "bold" }}>
                                All Products
                            </Typography>
                            <Typography color="gray" variant="caption" m="0" lineHeight="0">Best collection of 2022</Typography>
                        </Stack>
                        <Box sx={{ display: "flex" }}>
                            <Button component="h2" variant="outlined" color="error">View all</Button>
                        </Box>
                    </Box>
                    <Box sx={{ m: "24px 0px" }}>
                        <Grid container spacing={5} mt="10px">
                            <Grid item xs={12} sm={6} lg={4} >
                                <Productcard
                                    name="Camera"
                                    image={["https://bazar-react.vercel.app/_next/image?url=%2Fassets%2Fimages%2Fproducts%2FElectronics%2F4.LumixDSLR.png&w=1920&q=75"]}
                                    price="$122"
                                />
                            </Grid>
                            <Grid item xs={12} sm={6} lg={4}>
                                <Productcard
                                    name="Camera"
                                    image={["https://bazar-react.vercel.app/_next/image?url=%2Fassets%2Fimages%2Fproducts%2FElectronics%2F4.LumixDSLR.png&w=1920&q=75"]}
                                    price="$122"
                                />
                            </Grid>
                            <Grid item xs={12} sm={6} lg={4}>
                                <Productcard
                                    name="Camera"
                                    image={["https://bazar-react.vercel.app/_next/image?url=%2Fassets%2Fimages%2Fproducts%2FElectronics%2F4.LumixDSLR.png&w=1920&q=75"]}
                                    price="$122"
                                />
                            </Grid>
                            <Grid item xs={12} sm={6} lg={4}>
                                <Productcard
                                    name="Camera"
                                    image={["https://bazar-react.vercel.app/_next/image?url=%2Fassets%2Fimages%2Fproducts%2FElectronics%2F4.LumixDSLR.png&w=1920&q=75"]}
                                    price="$122"
                                />
                            </Grid>
                            <Grid item xs={12} sm={6} lg={4}>
                                <Productcard
                                    name="Camera"
                                    image={["https://bazar-react.vercel.app/_next/image?url=%2Fassets%2Fimages%2Fproducts%2FElectronics%2F4.LumixDSLR.png&w=1920&q=75"]}
                                    price="$122"
                                />
                            </Grid>
                        </Grid>
                        <Box sx={{ textAlign: "center", m: "24px" }}>
                            <Button variant="contained" color="error">Load more...</Button>
                        </Box>
                    </Box>
                    <Paper sx={{ background: "lightgray", display: "flex", borderRadius: "12px", p: "32px", alignItems: "center" }}>
                        <Box sx={{ flex: "1" }}>
                            <Box>
                                <Typography>Till 10 Dec, 2021</Typography>
                                <Typography variant="h3" sx={{ fontSize: { xs: "25px", md: "50px" } }}>25% Special Off Today Only for Vegetables</Typography>
                            </Box>
                            <Box sx={{ m: "20px" }}>
                                <Button variant="contained" color="error" sx={{ textTransform: "capitalize" }}>Shop Now</Button>
                            </Box>
                        </Box>
                        <Box sx={{ flex: "1", textAlign: "center" }}>
                            <img src="https://bazar-react.vercel.app/assets/images/Groceries%20Shop/vagitable.png" alt="" width="300px" height="300px" />
                        </Box>
                    </Paper>
                </Box>

                <MobileNav />
            </Container>
        </>
    );
}

export default LandingPage;