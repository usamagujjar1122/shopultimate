import {
  GET_CATAGERY,
  ADD_CATAGERY,
  GET_CATAGERY_LIST,
  GET_SINGLE_CATAGERY,
  UPDATE_CATAGERY,
  SINGLE_CATAGERY_TREE,
} from "../types";
import axios from "axios";
import { setAlert } from "./alertactions";

export const getcatageries = () => async (dispatch) => {
  try {
    // const page = 1;
    // dispatch({ type: PRODUCT_ACTION_ATTEMPT });

    const res = await axios.get(
      `https://shopulimate-api.onrender.com/catagery`
    );
    dispatch({
      type: GET_CATAGERY,
      payload: res.data,
    });
  } catch (error) {
    console.log(error);
  }
};
export const getcatagerieslist = () => async (dispatch) => {
  try {
    // const page = 1;
    // dispatch({ type: PRODUCT_ACTION_ATTEMPT });

    const res = await axios.get(
      `https://shopulimate-api.onrender.com/catagery/list`
    );
    dispatch({
      type: GET_CATAGERY_LIST,
      payload: res.data.categoryList,
    });
  } catch (error) {
    console.log(error);
  }
};
export const getsinglecatagery = (name) => async (dispatch) => {
  try {
    // console.log(id);
    // const page = 1;
    // dispatch({ type: PRODUCT_ACTION_ATTEMPT });

    // const res = await axios.get(`https://shopulimate-api.onrender.com/catagery/${id}`);
    dispatch({
      type: GET_SINGLE_CATAGERY,
      payload: name,
    });
  } catch (error) {
    console.log(error);
  }
};
export const addcatagery = (formData) => async (dispatch) => {
  try {
    const res = await axios.post(
      "https://shopulimate-api.onrender.com/catagery/addcatagery",
      formData
    );
    console.log(res.data);
    dispatch({
      type: ADD_CATAGERY,
      payload: res.data,
    });
    dispatch(setAlert(res.data.message, "success"));
  } catch (error) {
    console.log(error);
    dispatch(setAlert(error.response.data.message, "error"));
  }
};
export const editcatagery = (formData, id) => async (dispatch) => {
  try {
    const res = await axios.put(
      `https://shopulimate-api.onrender.com/catagery/${id}`,
      formData
    );
    dispatch({
      type: UPDATE_CATAGERY,
      payload: res?.data?.catagery,
    });
    dispatch(setAlert("Updated", "success"));
  } catch (error) {
    console.log(error);
    dispatch(setAlert(error.response.data.message, "error"));
  }
};
export const getsinglecatagerytree = (id) => async (dispatch) => {
  try {
    console.log(id);
    const res = await axios.get(
      `https://shopulimate-api.onrender.com/catagery/catagery/${id}`
    );
    console.log(res);
    dispatch({
      type: SINGLE_CATAGERY_TREE,
      payload: res.data,
    });
  } catch (error) {
    console.log(error);
  }
};
