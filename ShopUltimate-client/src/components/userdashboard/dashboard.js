import { Box } from "@mui/material";
import { Route, Routes } from "react-router-dom";
import Nav from "../layouts/nav";
import Myorders from "../order/myorders";
import OrderDetails from "../order/OrderDetails";
import AddAddress from "./AddAddress";
import AddressList from "./AddressList";
import EditProfile from "./editProfile";
import UserProfile from "./userProfile";
import UserSideBar from "./userSideBar";

const UserDashboard = () => {
    return ( 
        <>
        <Nav />
            <Box sx={{ display: "flex" }}>
                <Box sx={{ margin: {md:"25px 20px 25px 40px"}, display: { xs: "none", md: "block" } }} >
                    <UserSideBar id="sidebar"/>
                </Box>
                <Box sx={{ width: "100%", margin: "0px 30px 25px 30px" }}>
                        <Routes>
                             <Route path="/" element={<UserProfile />} />
                             <Route path="/edit-profile" element={<EditProfile />} />
                             <Route path="/address-list" element={<AddressList />} />  
                             <Route path="/add-address" element={<AddAddress />} />  
                             <Route path="/orders" element={<Myorders />}/>  
                             <Route path="/order-details" element={<OrderDetails />}/>  
                        </Routes>
                </Box>
            </Box>
        </>
     );
}
 
export default UserDashboard;