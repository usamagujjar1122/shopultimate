import React, { Component, useEffect } from "react";
import "./App.css";
// import Signup from "./components/user/signup";
import Verify from "./components/auth/verify";
import { connect } from "react-redux";
import { loadUser } from "./redux/actions/authactions";
import Products from "./components/product/products";
import { Route, Link, BrowserRouter, Routes } from "react-router-dom";
import PrivateRoute from "./components/auth/privetroute";
import setauthtoken from "./redux/setauthtoken";
import Dashboard from "./components/SellerDashboard/dashboard";
import Alert from "./components/layouts/alerts";
// import Home from "./components/layouts/home";
import { getproducts } from "./redux/actions/productactions";
import { getcart } from "./redux/actions/cartactions";
// import Cart from "./components/cart/cartsteps";
import UserCart from "./components/cart/usercart";
import {
  getcatageries,
  getcatagerieslist,
} from "./redux/actions/catageryactions";
import ShopHome from "./components/shop/mainshops";
import ShopView from "./components/shop/shopview";
import ProductView from "./components/product/productview";
// import CheckoutandReview from "./components/checkout/shipping";
import Myorders from "./components/order/myorders";
import OrderDetails from "./components/order/OrderDetails";
import Register from "./components/auth/signup";
import Login from "./components/auth/login";
import Productlisting from "./components/product/allproductslist";
import EditProfile from "./components/userdashboard/editProfile";

// import LandingPage from "./components/user/landingPage";
// import AddressList from "./components/userdashboard/AddressList";
// import CartItemslisting from "./components/cart/cartItemlisting";
import CheckoutandReview from "./components/checkout/shipping";
import { getprofile } from "./redux/actions/profileactions";
import UserPayment from "./components/stripe/userpayment";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import { loadstripe } from "./redux/actions/authactions";
import AdminDashboard from "./components/AdminDashboard/dashboard";
import Treeview from "./components/treeview";
import Main from "./components/MainHpme";
import UserDashboard from "./components/userdashboard/dashboard";
import UserProfile from "./components/userdashboard/userProfile";
import AddressList from "./components/userdashboard/AddressList";
import AddAddress from "./components/userdashboard/AddAddress";
import BecomeSeller from "./components/auth/becomeaseller";
import CustomRoute from "./components/auth/customroute";
import CustomizedAccordions from "./components/MainHpme/FAQ";
import Contact from "./components/MainHpme/contact";
// import SellerDashboard from "./components/SellerDashboard.js/maindashboard";

if (localStorage.token) {
  setauthtoken(localStorage.token);
}

const stripePromise = loadStripe(
  "pk_test_51IIqvWEeXLQyBq0Sx642zY9vJvi2JiLHGxQWpZ4ZcUKLyxaScjfltndaM4UD13xuWErm9HHKwfw2iaJg4zc27wzv00rzLMHWND"
);

class App extends Component {
  componentDidMount() {
    this.props.loadUser();
    this.props.getcart();
    this.props.getcatageries();
    this.props.getcatagerieslist();
  }

  render() {
    return (
      <BrowserRouter>
        <Elements stripe={stripePromise}>
          <div>
            <Alert open={true} />
            <Routes>
              <Route path="" element={<Main />} />
              <Route path="/faq" element={<CustomizedAccordions />} />
              <Route path="/contact" element={<Contact />} />

              {/* <Route path="Seller-Dashboard" element={<SellerDashboard />} /> */}
              {/* <Route path="payment" element={<UserPayment />} /> */}

              {/* <Route path="test" element={<AddAddress />} />
            <Route path="landingpage" element={<LandingPage />} /> */}

              {/* <Route path="pay" element={<UserPayment />} /> */}
              <Route
                path="become-seller"
                element={<PrivateRoute component={BecomeSeller} />}
              />
              <Route
                path="settings/profileview"
                element={<PrivateRoute component={UserProfile} />}
              />
              <Route
                path="settings/profile"
                element={<PrivateRoute component={EditProfile} />}
              />

              <Route
                path="settings/deliveryaddress"
                element={<PrivateRoute component={AddressList} />}
              />
              <Route
                path="settings/deliveryaddress/addaddress"
                element={<PrivateRoute component={AddAddress} />}
              />
              <Route
                path="settings/orders"
                element={<PrivateRoute component={Myorders} />}
              />

              <Route path="order-details:/id" element={<OrderDetails />} />

              {/* <Route path="test1" element={<AddressList />} /> */}

              <Route path="register" element={<Register />} />
              <Route path="login" element={<Login />} />
              <Route path="products" element={<Productlisting />} />

              <Route path="/shops" element={<ShopHome />} />
              {/* <Route path="/verify/:id" element={<Verify />} /> */}
              <Route
                path="/dashboard/*"
                element={
                  <CustomRoute roles={["admin", "seller"]}>
                    <Dashboard />
                  </CustomRoute>
                }
              >
                {/* <Route path="products" element={<Products />} />
              <Route path="shops" element={<Shops />} />
              <Route path="create-shop" element={<Addshop />} /> */}
              </Route>
              <Route
                path="/manage/*"
                element={
                  <CustomRoute roles={["admin"]}>
                    <AdminDashboard />
                  </CustomRoute>
                }
              >
                {/* <Route path="products" element={<Products />} />
              <Route path="shops" element={<Shops />} />
              <Route path="create-shop" element={<Addshop />} /> */}
              </Route>

              <Route path="products" element={<Products />} />
              <Route path="/shop/:id" element={<ShopView />} />
              <Route path="/product/:id" element={<ProductView />} />

              {/* <Route path="shops" element={<Shops />} /> */}

              {/* <Route path="cart" element={<Cart />} /> */}
              {/* <Route path="cartitems" element={<CartItemlisting />} /> */}
              {/* <Route path="shipping" element={<Shipping />} /> */}
              <Route path="order/:id" element={<OrderDetails />} />
              <Route path="myorders" element={<Myorders />} />

              <Route
                path="cart"
                element={<PrivateRoute component={UserCart} />}
              />
              <Route
                path="checkout"
                element={<PrivateRoute component={CheckoutandReview} />}
              />

              {/* <Route path="/Dashboard" element={<Dashboard />} /> */}
            </Routes>
          </div>
        </Elements>
      </BrowserRouter>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    auth: state.auth,
    products: state.products,
    alerts: state.alerts,
  };
};
export default connect(mapStateToProps, {
  loadUser,
  getproducts,
  getcart,
  getcatageries,
  getcatagerieslist,
})(App);
