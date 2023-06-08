import * as React from 'react';
import Box from '@mui/material/Box';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import RestoreIcon from '@mui/icons-material/Restore';
import FavoriteIcon from '@mui/icons-material/Favorite';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import CottageOutlinedIcon from '@mui/icons-material/CottageOutlined';
import Paper from '@mui/material/Paper';
import WindowOutlinedIcon from '@mui/icons-material/WindowOutlined';
import ShoppingBagOutlinedIcon from '@mui/icons-material/ShoppingBagOutlined';
import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined';
const MobileNav = () => {
    const [value, setValue] = React.useState(0);
    return (
        <Paper sx={{ display:{xs:"block", md:"none"}, position: 'fixed', bottom: 0, left: 0, right: 0 }} elevation={3}>
        <BottomNavigation
            showLabels
            value={value}
            onChange={(event, newValue) => {
                setValue(newValue);
            }}
        >
            <BottomNavigationAction label="Home" icon={<CottageOutlinedIcon />} />
            <BottomNavigationAction label="Catagories" icon={<WindowOutlinedIcon />} />
            <BottomNavigationAction label="Cart" icon={<ShoppingBagOutlinedIcon />} />
            <BottomNavigationAction label="Account" icon={<PersonOutlineOutlinedIcon />} />
        </BottomNavigation>
        </Paper>
    );
}

export default MobileNav;