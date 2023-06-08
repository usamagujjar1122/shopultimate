import {
  CreateOrder,
  OrderActionAttempt,
  OrderActionFailed,
  GET_DASHBOARD_ORDERS,
  GET_USER_ORDERS,
  GET_SINGLE_ORDER,
  UPDATE_ORDER,
  SET_ALERT,
  ORDER_COMPLETE,
  GET_ALL_ORDERS,
  OrderActionSuccess,
} from "../types";
import axios from "axios";
import { setAlert } from "./alertactions";

export const Createorder =
  (cartids, selected, navigate, paymentid, amount) => async (dispatch) => {
    try {
      console.log(paymentid);
      // const page = 1;
      dispatch({ type: OrderActionAttempt });
      console.log(cartids);
      const res = await axios.post(
        "https://shopulimate-api.onrender.com/order/create-order",
        {
          cartids,
          deliverydetails: selected,
          paymentid: paymentid,
          amount,
        }
      );
      dispatch({
        type: CreateOrder,
        payload: res.data,
      });
      dispatch(
        setAlert(
          "Order Created Sussfully. Visit Order Page To View The Order Status",
          "info"
        )
      );
      navigate("/");
    } catch (error) {
      dispatch(setAlert(error.response.data.message, "error"));
    }
  };
export const getorders_s = () => async (dispatch) => {
  try {
    // const page = 1;
    dispatch({ type: OrderActionAttempt });

    const res = await axios.get(
      "https://shopulimate-api.onrender.com/order/orderss"
    );
    console.log(res.data);
    dispatch({
      type: GET_DASHBOARD_ORDERS,
      payload: res.data?.order,
    });
  } catch (error) {
    console.log(error);
  }
};

export const getorders_c = () => async (dispatch) => {
  try {
    // const page = 1;
    dispatch({ type: OrderActionAttempt });

    const res = await axios.get(
      "https://shopulimate-api.onrender.com/order/ordersc"
    );
    dispatch({
      type: GET_USER_ORDERS,
      payload: res.data?.order,
    });
  } catch (error) {
    console.log(error);
  }
};
export const getallorders = () => async (dispatch) => {
  try {
    // const page = 1;
    dispatch({ type: OrderActionAttempt });

    const res = await axios.get(
      "https://shopulimate-api.onrender.com/order/all"
    );
    console.log(res.data);
    dispatch({
      type: GET_ALL_ORDERS,
      payload: res.data?.order,
    });
  } catch (error) {
    console.log(error);
  }
};
export const getsingleorder = (id) => async (dispatch) => {
  try {
    // const page = 1;
    dispatch({ type: OrderActionAttempt });

    const res = await axios.get(
      `https://shopulimate-api.onrender.com/order/${id}`
    );
    dispatch({
      type: GET_SINGLE_ORDER,
      payload: res.data?.order,
    });
    dispatch({ type: OrderActionSuccess });
  } catch (error) {
    console.log(error);
    dispatch({ type: OrderActionFailed });
  }
};

export const updateorder = (formData, id, navigate) => async (dispatch) => {
  try {
    // const page = 1;
    console.log(id);
    dispatch({ type: OrderActionAttempt });
    const res = await axios.put(
      `https://shopulimate-api.onrender.com/order/${id}`,
      formData
    );
    console.log(res.data);
    dispatch({
      type: UPDATE_ORDER,
      payload: res.data,
    });
    dispatch(setAlert("Order Updated Successfully", "info"));
    dispatch({ type: OrderActionSuccess });

    navigate("/dashboard/my-orders");
  } catch (error) {
    dispatch({ type: OrderActionFailed });
    dispatch(setAlert("Something went worng", "error"));

    console.log(error);
  }
};
export const ordercomplete = (id, navigate) => async (dispatch) => {
  try {
    // const page = 1;
    dispatch({ type: OrderActionAttempt });
    const res = await axios.put(
      `https://shopulimate-api.onrender.com/order/complete/${id}`
    );
    console.log(res.data);
    dispatch({
      type: ORDER_COMPLETE,
      payload: res.data,
    });
    dispatch(setAlert("Order Completed", "success"));
    navigate("/settings/orders");
  } catch (error) {
    console.log(error);
  }
};
