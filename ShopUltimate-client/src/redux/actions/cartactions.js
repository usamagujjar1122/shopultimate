import {
  GET_USER_CART,
  ADD_TO_CART,
  REMOVE_ITEM_FROM_CART,
  CART_QUANTITY_INCREAMENT,
  CART_QUANTITY_DECREAMENT,
  CART_GRAND_TOTAL,
  CART_ACTION_ATTEMPT,
  CART_ACTION_SUCCESS,
  CART_ACTION_FAILED,
} from "../types";
import axios from "axios";
import store from "../store";
import { setAlert } from "./alertactions";
export const getcart = () => async (dispatch) => {
  try {
    dispatch({ type: CART_ACTION_ATTEMPT });
    const res = await axios.get("https://shopulimate-api.onrender.com/cart");
    // console.log(res.data.data)

    dispatch({
      type: GET_USER_CART,
      payload: res.data,
    });
    dispatch({ type: CART_ACTION_SUCCESS });

    dispatch({
      type: CART_GRAND_TOTAL,
    });
  } catch (error) {
    console.log(error);
    dispatch({ type: CART_ACTION_FAILED });
  }
};

export const addtocart = (id, shopid) => async (dispatch) => {
  try {
    dispatch({ type: CART_ACTION_ATTEMPT });

    const res = await axios.post(
      `https://shopulimate-api.onrender.com/cart/additemtocart/${id}`
    );

    dispatch({
      type: ADD_TO_CART,
      payload: {
        id: id,
        product: res.data.product,
        carttotal: res.data.data,
        shopid: shopid,
        cart: res.data.data,
      },
    });
    dispatch(setAlert("Item Added to cart", "success"));
    dispatch({ type: CART_ACTION_SUCCESS });

    dispatch({
      type: CART_GRAND_TOTAL,
    });
  } catch (error) {
    console.log(error);
    dispatch({ type: CART_ACTION_FAILED });
  }
};
export const removefromcart = (id, cartid, storeid) => async (dispatch) => {
  try {
    dispatch({ type: CART_ACTION_ATTEMPT });

    const res = await axios.post(
      `https://shopulimate-api.onrender.com/cart/removeitemfromcart/${id}`,
      { storeid }
    );

    dispatch({
      type: REMOVE_ITEM_FROM_CART,
      payload: { id, cartid, data: res.data },
    });
    dispatch({
      type: CART_GRAND_TOTAL,
    });
    dispatch({ type: CART_ACTION_SUCCESS });

    dispatch(setAlert("Item removed from cart", "success"));
  } catch (error) {
    console.log(error);
    dispatch({ type: CART_ACTION_FAILED });
  }
};
export const cartitemincreament = (id, cartid, storeid) => async (dispatch) => {
  try {
    dispatch({ type: CART_ACTION_ATTEMPT });

    const res = await axios.post(
      `https://shopulimate-api.onrender.com/cart/cartitemincreament/${id}`,
      { storeid }
    );
    dispatch(setAlert("Item Quantity Increases", "success"));
    console.log(res.data);

    dispatch({
      type: CART_QUANTITY_INCREAMENT,
      payload: { id: id, data: res.data, cartid: cartid },
    });
    dispatch({ type: CART_ACTION_SUCCESS });

    dispatch({
      type: CART_GRAND_TOTAL,
    });
  } catch (error) {
    console.log(error);
    dispatch({ type: CART_ACTION_FAILED });
  }
};
export const cartitemdecreament = (id, cartid, storeid) => async (dispatch) => {
  try {
    dispatch({ type: CART_ACTION_ATTEMPT });

    const res = await axios.post(
      `https://shopulimate-api.onrender.com/cart/cartitemdecreament/${id}`,
      { storeid }
    );
    dispatch(setAlert("Item Quantity Decreased", "success"));
    console.log(res.data);

    dispatch({
      type: CART_QUANTITY_DECREAMENT,
      payload: { id: id, cartid: cartid, data: res.data },
    });
    dispatch({ type: CART_ACTION_SUCCESS });

    dispatch({
      type: CART_GRAND_TOTAL,
    });
  } catch (error) {
    console.log(error);
    dispatch({ type: CART_ACTION_FAILED });
  }
};
