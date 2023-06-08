import {
  CREATE_SHOP,
  GET_ALL_SHOPS,
  GET_USER_SHOPS,
  GET_ERROR,
  IN_PROGRESS,
  DELETE_SHOP,
  UPDATE_SHOP,
  SHOP_ACTION_ATTEMPT,
  SHOP_ACTION_SUCCESS,
  SHOP_ACTION_FAILED,
  GET_SINGLE_SHOP,
} from "../types";

import axios from "axios";
import { setAlert } from "./alertactions";

export const getallshops = (data) => async (dispatch) => {
  try {
    console.log("hj");
    const res = await axios.post("https://shopulimate-api.onrender.com/shop", {
      data: data && data,
    });
    // console.log(res.data.data)
    dispatch({
      type: GET_ALL_SHOPS,
      payload: res.data,
    });
  } catch (error) {
    console.log(error.message);
  }
};
export const getusershops = () => async (dispatch) => {
  try {
    const res = await axios.get(
      `https://shopulimate-api.onrender.com/shop/usershops`
    );
    // console.log(res.data.data)
    dispatch({ type: SHOP_ACTION_ATTEMPT });
    dispatch({
      type: GET_USER_SHOPS,
      payload: res.data,
    });
  } catch (error) {
    console.log(error.message);
  }
};
export const getsingleshop = (id) => async (dispatch) => {
  try {
    const res = await axios.get(
      `https://shopulimate-api.onrender.com/shop/${id}`
    );
    console.log(res.data.data);
    dispatch({
      type: GET_SINGLE_SHOP,
      payload: res.data,
    });
  } catch (error) {
    console.log(error);
  }
};

export const addshop = (formdata, navigate) => async (dispatch) => {
  try {
    const res = await axios.post(
      "https://shopulimate-api.onrender.com/shop/add-shop",
      formdata
    );
    dispatch({
      type: CREATE_SHOP,
      payload: res.data,
    });
    dispatch({
      type: SHOP_ACTION_SUCCESS,
    });
    dispatch(setAlert(res.data.message, "success"));
    navigate("/dashboard/my-shops");
  } catch (err) {
    dispatch({
      type: SHOP_ACTION_FAILED,
    });
    dispatch(setAlert(err.response.data.message, "error"));
  }
};

export const updateshop = (shop, navigate) => async (dispatch) => {
  try {
    const res = await axios.put(
      `https://shopulimate-api.onrender.com/shop/update-shop/${shop._id}`,
      shop
    );
    dispatch({
      type: SHOP_ACTION_ATTEMPT,
    });
    dispatch({
      type: UPDATE_SHOP,
      payload: res.data,
    });
    dispatch({
      type: SHOP_ACTION_SUCCESS,
    });

    dispatch(setAlert("Shop Updated Successfully", "success"));
    navigate("/dashboard/my-shops");
  } catch (error) {
    console.log(error.message);
  }
};

export const deleteshop = (id) => async (dispatch) => {
  try {
    const res = await axios.delete(
      `https://shopulimate-api.onrender.com/shop/delete-shop/${id}`
    );
    dispatch({
      type: SHOP_ACTION_ATTEMPT,
    });
    dispatch({
      type: DELETE_SHOP,
      payload: id,
    });
    dispatch({
      type: SHOP_ACTION_SUCCESS,
    });
    dispatch(setAlert("Shop Deleted!", "success"));
  } catch (error) {
    console.log(error.message);
  }
};

// export const setCurrent = log => {
//     return {
//       type: SET_CURRENT,
//       payload: log
//     };
//   };

//   // Clear current log
//   export const clearCurrent = () => {
//     return {
//       type: CLEAR_CURRENT
//     };
//   };
