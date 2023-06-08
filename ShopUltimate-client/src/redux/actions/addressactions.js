import {
  GET_ADDRESS,
  ADD_ADDRESS,
  ADDRESS_ACTION_ATTEMPT,
  ADDRESS_ACTION_SUCCESS,
  ADDRESS_ACTION_FAILED,
  DELETE_ADDRESS,
  UPDATE_ADDRESS,
  SET_CURRENT_ADDRESS,
  CLEAR_CURRENT_ADDRESS,
} from "../types";
import axios from "axios";
import { setAlert } from "./alertactions";
import { SettingsPowerRounded } from "@mui/icons-material";

export const addaddress = (formData, navigate, setopen) => async (dispatch) => {
  try {
    // const page = 1;
    dispatch({ type: ADDRESS_ACTION_ATTEMPT });

    const res = await axios.post(
      `https://shopulimate-api.onrender.com/address/addaddress`,
      formData
    );
    dispatch({
      type: ADD_ADDRESS,
      payload: res.data,
    });
    dispatch(setAlert("Delivery Address Added Sussessfully", "success"));
    if (navigate) {
      navigate("/settings/deliveryaddress");
    }
    if (setopen) {
      setopen(false);
    }
  } catch (error) {
    console.log(error);
    dispatch({
      type: ADDRESS_ACTION_FAILED,
    });
    dispatch(setAlert(error.response.data.message, "error"));
  }
};
export const getaddress = () => async (dispatch) => {
  try {
    // const page = 1;
    dispatch({ type: ADDRESS_ACTION_ATTEMPT });

    const res = await axios.get(`https://shopulimate-api.onrender.com/address`);
    console.log(res);
    dispatch({
      type: GET_ADDRESS,
      payload: res.data,
    });
  } catch (error) {
    console.log(error);
  }
};
export const deleteaddress = (id) => async (dispatch) => {
  try {
    // const page = 1;
    dispatch({ type: ADDRESS_ACTION_ATTEMPT });

    const res = await axios.delete(
      `https://shopulimate-api.onrender.com/address/${id}`
    );
    console.log(res);
    dispatch({
      type: DELETE_ADDRESS,
      payload: res.data,
    });
    dispatch(setAlert("Address Delete Successfully", "success"));
  } catch (error) {
    console.log(error);
  }
};

export const updateaddress = (formData, open) => async (dispatch) => {
  try {
    // const page = 1;
    dispatch({ type: ADDRESS_ACTION_ATTEMPT });

    const res = await axios.put(
      `https://shopulimate-api.onrender.com/address/${formData.id}`,
      formData
    );
    dispatch({
      type: UPDATE_ADDRESS,
      payload: res.data,
    });
    dispatch({
      type: CLEAR_CURRENT_ADDRESS,
    });
    dispatch(setAlert("Address Updated Successfully", "success"));
    open(false);
  } catch (error) {
    console.log(error);
  }
};
export const setcurrentaddress = (address) => async (dispatch) => {
  // caches.log(address);
  try {
    // const page = 1;
    // dispatch({ type: ADDRESS_ACTION_ATTEMPT });

    dispatch({
      type: SET_CURRENT_ADDRESS,
      payload: address,
    });
  } catch (error) {
    console.log(error);
  }
};
