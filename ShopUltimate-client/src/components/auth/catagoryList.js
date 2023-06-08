import * as React from 'react';
import ListSubheader from '@mui/material/ListSubheader';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Collapse from '@mui/material/Collapse';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import DraftsIcon from '@mui/icons-material/Drafts';
import SendIcon from '@mui/icons-material/Send';
import ExpandLess from '@mui/icons-material/ExpandLess';
import MenuIcon from '@mui/icons-material/Menu';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import ExpandMore from '@mui/icons-material/ExpandMore';
import StarBorder from '@mui/icons-material/StarBorder';
import Divider from '@mui/material/Divider';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import ElectricalServicesOutlinedIcon from '@mui/icons-material/ElectricalServicesOutlined';
import BreakfastDiningOutlinedIcon from '@mui/icons-material/BreakfastDiningOutlined';
import IcecreamOutlinedIcon from '@mui/icons-material/IcecreamOutlined';
import LocalDiningOutlinedIcon from '@mui/icons-material/LocalDiningOutlined';
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

const CatagoryList = () => {
    const [open, setOpen] = React.useState(false);
    const handleClick = () => {
        setOpen(!open);
    };
    return ( 
        <Box sx={{position:{xs:"absolute", md:"sticky"},top:"0%", width:"300px", left:{xs:"-60%", md:"0%"},transition : "left 0.5s",zIndex:"2" }} id="slide" >
                    <Paper sx={{position:{xs:"fixed",md:"relative"},top:"0%", width: "300px", height: "100vh" }}>
                        <List
                            sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}
                            component="nav"
                            aria-labelledby="nested-list-subheader"
                            subheader={
                                <ListSubheader component="div" id="nested-list-subheader">
                                    <Typography variant="h5" mt="16px"> Catagories </Typography>
                                    <Divider />
                                </ListSubheader>
                            }
                        >
                            <ListItemButton>
                                <ListItemIcon>
                                    <ElectricalServicesOutlinedIcon />
                                </ListItemIcon>
                                <ListItemText primary="Electronics" />
                            </ListItemButton>
                            <ListItemButton>
                                <ListItemIcon>
                                    <BreakfastDiningOutlinedIcon />
                                </ListItemIcon>
                                <ListItemText primary="Breakfast" />
                            </ListItemButton>
                            <ListItemButton>
                                <ListItemIcon>
                                    <IcecreamOutlinedIcon />
                                </ListItemIcon>
                                <ListItemText primary="Frozen" />
                            </ListItemButton>
                            <ListItemButton onClick={handleClick}>
                                <ListItemIcon>
                                    <LocalDiningOutlinedIcon />
                                </ListItemIcon>
                                <ListItemText primary="Vegetables" />
                                {open ? <ExpandMore /> : <KeyboardArrowRightIcon />}
                            </ListItemButton>
                            <Collapse in={open} timeout="auto" unmountOnExit>
                                <List component="div" disablePadding>
                                    <ListItemButton sx={{ pl: 4 }}>
                                        <ListItemIcon>
                                            <StarBorder />
                                        </ListItemIcon>
                                        <ListItemText primary="Sub-catagory" />
                                    </ListItemButton>
                                </List>
                            </Collapse>
                            <ListItemButton>
                                <ListItemIcon>
                                    <IcecreamOutlinedIcon />
                                </ListItemIcon>
                                <ListItemText primary="Frozen" />
                            </ListItemButton>
                            <ListItemButton>
                                <ListItemIcon>
                                    <IcecreamOutlinedIcon />
                                </ListItemIcon>
                                <ListItemText primary="Frozen" />
                            </ListItemButton>
                        </List>
                    </Paper>
                </Box>

     );
}
 
export default CatagoryList;