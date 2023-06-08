import {
  GET_PRODUCT,
  GET_PRODUCTS,
  ADD_PRODUCT,
  DELETE_PRODUCT,
  UPDATE_PRODUCT,
  SET_CURRENT,
  CLEAR_CURRENT,
  PRODUCT_ACTION_FAILED,
  PRODUCT_ACTION_ATTEMPT,
  GET_USER_PRODUCTS,
  CLEAR_PRODUCT_IMAGE,
  PRODUCTS_BY_CATAGERY,
  PRODUCT_ACTION_SUCCESS,
  PROFILE_ACTION_ATTEMPT,
  PROFILE_ACTION_SUCCESS,
  PROFILE_ACTION_FAILED,
} from "../types";
import axios from "axios";
import { setAlert } from "./alertactions";
import { Navigate } from "react-router-dom";

export const getproducts = () => async (dispatch) => {
  try {
    // const page = 1;
    dispatch({ type: PRODUCT_ACTION_ATTEMPT });

    const res = await axios.get(`https://shopulimate-api.onrender.com/product`);
    console.log(res.data.data);
    dispatch({
      type: GET_PRODUCTS,
      payload: res.data,
    });
  } catch (error) {
    console.log(error);
  }
};
export const getproductsbycatagery = (id) => async (dispatch) => {
  try {
    // const page = 1;
    dispatch({ type: PRODUCT_ACTION_ATTEMPT });

    const res = await axios.get(
      `https://shopulimate-api.onrender.com/product/catagery/${id}`
    );
    dispatch({
      type: PRODUCTS_BY_CATAGERY,
      payload: res.data,
    });
    dispatch({ type: PRODUCT_ACTION_SUCCESS });
  } catch (error) {
    dispatch({ type: PRODUCT_ACTION_FAILED });
  }
};
export const getuserproducts = () => async (dispatch) => {
  try {
    const res = await axios.get(
      "https://shopulimate-api.onrender.com/product/userproducts"
    );
    dispatch({
      type: GET_USER_PRODUCTS,
      payload: res.data,
    });
  } catch (error) {
    console.log(error);
  }
};
export const getproduct = (id) => async (dispatch) => {
  try {
    dispatch({ type: PRODUCT_ACTION_ATTEMPT });
    const res = await axios.get(
      `https://shopulimate-api.onrender.com/product/${id}`
    );
    dispatch({
      type: GET_PRODUCT,
      payload: res.data,
    });
    dispatch({ type: PRODUCT_ACTION_SUCCESS });
  } catch (error) {
    console.log(error);
    dispatch({ type: PRODUCT_ACTION_FAILED });
  }
};
export const addproduct = (formData, navigate) => async (dispatch) => {
  try {
    const res = await axios.post(
      "https://shopulimate-api.onrender.com/product/add-product",
      formData
    );
    console.log(res.data);
    dispatch({
      type: ADD_PRODUCT,
      payload: res.data,
    });
    dispatch(setAlert(res.data.message, "success"));
    dispatch({ type: CLEAR_PRODUCT_IMAGE });
    navigate("/dashboard/my-products");
  } catch (error) {
    console.log(error);
    dispatch({
      type: PRODUCT_ACTION_FAILED,
    });
    dispatch(setAlert(error.response.data.message, "error"));
  }
};

export const updateproduct = (product, navigate) => async (dispatch) => {
  try {
    dispatch({ type: PRODUCT_ACTION_ATTEMPT });

    const res = await axios.put(
      `https://shopulimate-api.onrender.com/product/update-product/${product.id}`,
      product
    );
    dispatch({
      type: UPDATE_PRODUCT,
      payload: res.data,
    });
    dispatch({ type: CLEAR_PRODUCT_IMAGE });

    dispatch(setAlert("Product Updated Successfully", "success"));
    navigate("/dashboard/my-products");
  } catch (error) {
    console.log(error);
  }
};

export const deleteproduct = (id) => async (dispatch) => {
  try {
    const res = axios.delete(
      `https://shopulimate-api.onrender.com/product/delete-product/${id}`
    );
    dispatch({
      type: DELETE_PRODUCT,
      payload: id,
    });
  } catch (error) {
    console.log(error);
  }
};

export const setCurrent = (log) => {
  return {
    type: SET_CURRENT,
    payload: log,
  };
};

// Clear current log
export const clearCurrent = () => {
  return {
    type: CLEAR_CURRENT,
  };
};
