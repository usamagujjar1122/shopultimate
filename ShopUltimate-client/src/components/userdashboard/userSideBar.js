// import * as React from "react"
import ListSubheader from '@mui/material/ListSubheader'
// import List from '@mui/material/List'
// import ListItemButton from '@mui/material/ListItemButton'
// import ListItemIcon from '@mui/material/ListItemIcon'
// import ListItemText from '@mui/material/ListItemText'
import CreditCardOutlinedIcon from '@mui/icons-material/CreditCardOutlined'
import LocationOnOutlinedIcon from '@mui/icons-material/LocationOnOutlined'
import ShoppingBagOutlinedIcon from '@mui/icons-material/ShoppingBagOutlined'
import PersonOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined'
import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined'
import SupportAgentOutlinedIcon from '@mui/icons-material/SupportAgentOutlined'
// import {
//     Container,
//     Box,
//     Paper,
//     Stack,
//     Typography,
//     Avatar,
//     Button,
//     paperClasses,
//     Grid,
//     TextField,
// } from "@mui/material"
import { NavLink, Link, useLocation } from "react-router-dom"

//   export default function UserSidebar() {

//     return ( 



//      );
// }


import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import List from '@mui/material/List';
import Paper from '@mui/material/Paper';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import MailIcon from '@mui/icons-material/Mail';
import MenuIcon from '@mui/icons-material/Menu';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';

import { useParams } from 'react-router-dom';
import { useState } from 'react'




const UserSideBar = (params) => {
    const location = useLocation();
    const style = {
        color:"#c00",
        borderLeft : "5px solid #c00"
    }
    const [styles,setStyles] = useState() 
    const [styles1,setStyles1] = useState() 
    const [styles2,setStyles2] = useState() 
    React.useEffect(()=>{
        setStyles()
        setStyles1()
        setStyles2()
        if(location.pathname === '/user/' || location.pathname === '/user/edit-profile'){
            setStyles(style)
        }
        else if(location.pathname === '/user/orders' || location.pathname === '/user/order-details'){
            setStyles1(style)
        }
        else if(location.pathname === '/user/address-list' || location.pathname === '/user/add-address'){
            setStyles2(style)
        }

    },[location.pathname])
    return (
        <Paper sx={{ width: "300px", height: { xs: "100vh", md: "inherit" }, zIndex: "2" }} id="sidebar" >
            <List
                sx={{ maxWidth: 360, bgcolor: 'background.paper', }}
                component="nav"
                aria-labelledby="nested-list-subheader"
                subheader={
                    <ListSubheader component="div" id="nested-list-subheader">
                        Dashboard
                    </ListSubheader>
                }
            >
                <NavLink to="/user/" style={{textDecoration:"none", color:"black"}}>
                    <ListItemButton  style={styles}>
                        <ListItemIcon >
                        <PersonOutlinedIcon />
                        </ListItemIcon>
                        <ListItemText primary="Profile Info" />
                        <Typography>12</Typography>
                    </ListItemButton>
                </NavLink>
                <NavLink to="/user/orders" style={{textDecoration:"none", color:"black"}}>
                    <ListItemButton  style={styles1}>
                        <ListItemIcon>
                            <ShoppingBagOutlinedIcon />
                        </ListItemIcon>
                        <ListItemText primary="Orders" />
                        <Typography>12</Typography>
                    </ListItemButton>
                </NavLink >
                <NavLink to="address-list"  style={{textDecoration:"none", color:"black"}}    >
                    <ListItemButton  style={styles2}>
                        <ListItemIcon>
                            <LocationOnOutlinedIcon />
                        </ListItemIcon>
                        <ListItemText primary="Addresses" />
                        <Typography>12</Typography>
                    </ListItemButton>
                </NavLink>
            </List>
        </Paper>
    );
}

export default UserSideBar;
