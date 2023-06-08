import * as React from "react";
import { useState } from "react";
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import PersonIcon from '@mui/icons-material/Person';
import { getprofile } from "../../redux/actions/profileactions";

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
    Drawer,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import UserSideBar from "./userSideBar";
import { useEffect } from "react";
import { getaddress } from "../../redux/actions/addressactions";
import { NavLink, useParams } from "react-router-dom";

const UserProfile =  () => {
    const user = useSelector((state) => state.auth.user);
    const [id, setId] = useState('');
    const [nameErr, setNameErr] = useState(false);
    const [address, setAddress] = useState('');
    const [addressErr, setAddressErr] = useState(false);
    const [number, setNumber] = useState('');
    const [numberErr, setNumberErr] = useState(false);
    const dispatch = useDispatch();
    const getId = ()=>{
        
    }
    useEffect(() => {
        getId();
        dispatch(getprofile(user))
        dispatch(getaddress())
    }, [])
    const profile = useSelector((state) => state.profile.profile);
    const address_ = useSelector((state) => state.address.addressess);



    // 
    const anchor = "left";
    const [state, setState] = useState({ left: false });
    const toggleDrawer = (anchor, open) => (event) => {
        if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
            return;
        }
        setState({ ...state, [anchor]: open });
    };
    return (
        <>

            <Box sx={{ display: "flex", justifyContent: "space-between", mt: 3 }}>
                <Stack direction="row" spacing={1} alignItems="center">
                    <PersonIcon fontSize="large" sx={{ color: "red " }} />

                    <Typography variant="h5" sx={{ fontWeight: "bold" }}>
                        Profile
                    </Typography>

                </Stack>
                <Box sx={{ display: "flex", mt: "20px" }}>
                    <NavLink to="/user/edit-profile" style={{ textDecoration: "none" }}><Button component="h2" sx={{ color: "#f44336", backgroundColor: "#ffebee", textTransform: "capitalize", padding: "10px 20px" }}>Edit profile</Button></NavLink>
                    <IconButton
                        color="inherit"
                        aria-label="open drawer"
                        edge="start"
                        onClick={toggleDrawer(anchor, true)}
                        sx={{ mr: 2, display: { md: 'none' }, marginLeft: "16px" }}
                    >
                        <MenuIcon />
                    </IconButton>
                </Box>
            </Box>
            {user &&
                <>
                
                    <Grid container sx={{ mt: "20px", display: "flex", justifyContent: "space-between", alignItems: "center" }} spacing={3}>
                        <Grid item xs={12} md={6}  sx={{height:"100%"}}>
                            <Paper sx={{ padding:"20px",display: "flex", alignItems: "center", justifyContent: "space-between",height:"70px"}}>
                                <Box display="flex" >
                                    <Avatar sx={{ width: 56, height: 56 }} src={profile.image}></Avatar>
                                    <Box ml="10px">
                                        <Typography variant="h5" textTransform="capitalize">{user.username}</Typography>
                                        <Typography display="flex">Balance: <Typography color="#d32f2f">$500</Typography></Typography>
                                    </Box>
                                </Box>
                                <Typography variant="h5" component="p" align="right">Rank</Typography>
                            </Paper>
                        </Grid >
                        <Grid item sx={{ flex: "1" }}>
                            <Paper sx={{ padding: "20px", textAlign: "center",display: "flex", alignItems: "center", flexDirection: "column", gap: "5px" }} >
                                <Typography lineHeight="1" variant="h5" color="#d32f2f">6</Typography>
                                <Typography  variant="small" sx={{ fontSize: "14px", color: "gray" , width:"40px"}}>All orders </Typography>
                            </Paper>
                        </Grid  >
                        <Grid item sx={{ flex: "1" }}>
                            <Paper sx={{ padding: "20px", textAlign: "center", display: "flex", alignItems: "center", flexDirection: "column", gap: "5px" }}>
                                <Typography lineHeight="1" variant="h5" color="#d32f2f">6</Typography>
                                <Typography variant="small" sx={{ fontSize: "14px", color: "gray" }}>Awaiting payments</Typography>
                            </Paper>
                        </Grid >
                        <Grid item sx={{ flex: "1" }}>
                            <Paper sx={{ padding: "20px", textAlign: "center", display: "flex", alignItems: "center", flexDirection: "column", gap: "5px" }}>
                                <Typography lineHeight="1" variant="h5" color="#d32f2f">6</Typography>
                                <Typography variant="small" sx={{ fontSize: "14px", color: "gray" }}>Awaiting shipment</Typography>
                            </Paper>
                        </Grid >
                        <Grid item sx={{ flex: "1" }}>
                            <Paper sx={{ padding: "20px", textAlign: "center", display: "flex", alignItems: "center", flexDirection: "column", gap: "5px" }}>
                                <Typography lineHeight="1" variant="h5" color="#d32f2f">6</Typography>
                                <Typography variant="small" sx={{ fontSize: "14px", color: "gray" }}>Awaiting delivery</Typography>
                            </Paper>
                        </Grid>
                    </Grid>
                    <Paper padding="20px" mt="20px">
                        <Grid container sx={{ display: "flex", flexDirection: { xs: "column", sm: "row" }, justifyContent: "space-around", padding: "20px", mt: "20px" }}>
                            <Grid item><Typography variant="caption" color="gray">Name <Typography color="black" textTransform="capitalize">{user.username}</Typography></Typography></Grid>
                            <Grid item><Typography variant="caption" color="gray">Email<Typography color="black">{user.email}</Typography></Typography></Grid>
                            {address_.map(item => (<Grid item><Typography variant="caption" color="gray">Address<Typography color="black">{item.streetaddress}</Typography></Typography></Grid>))}
                            <Grid item><Typography variant="caption" color="gray">Phone Number<Typography color="black">{profile.phone}</Typography></Typography></Grid>
                            <Grid item><Typography variant="caption" color="gray">Joining date<Typography color="black">{user.createdat.slice(0,10)}</Typography></Typography></Grid>
                        </Grid>
                    </Paper>
                </>
            }
            <React.Fragment key={anchor}>
                <Drawer
                    anchor={anchor}
                    open={state[anchor]}
                    onClose={toggleDrawer(anchor, false)}
                >
                    <UserSideBar />
                </Drawer>
            </React.Fragment>
        </>
    );
}

export default UserProfile;