import { loadStripe } from "@stripe/stripe-js";
import axios from "axios";
import setauthtoken from "../setauthtoken";
import {
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  USER_LOADED,
  AUTH_ERROR,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT,
  GET_ERROR,
  IN_PROGRESS,
  REMOVE_ALERT,
  VERIFY_EMAIL,
  PASSWORD_CHANGE,
  LOAD_STRIPE,
  STRIPE_ACCOUNT_CREATE,
  GET_ALL_USERS,
  DELETE_USER,
} from "../types";

import { setAlert } from "./alertactions";

export const loadUser = () => async (dispatch) => {
  if (localStorage.token) {
    setauthtoken(localStorage.token);
  }
  try {
    const res = await axios.get("https://shopulimate-api.onrender.com/user");

    dispatch({
      type: USER_LOADED,
      payload: res.data,
    });
    dispatch({
      type: IN_PROGRESS,
      payload: false,
    });
  } catch (err) {
    localStorage.removeItem("token");

    dispatch({
      type: AUTH_ERROR,
      payload: err,
    });
    dispatch({
      type: IN_PROGRESS,
      payload: false,
    });
  }
};

export const signup = (formData, navigate) => async (dispatch) => {
  try {
    const res = await axios.post(
      "https://shopulimate-api.onrender.com/user/signup",
      formData
    );
    dispatch({
      type: REGISTER_SUCCESS,
      payload: res.data,
    });
    dispatch(setAlert(res.data.message, "success"));
    navigate("/login");
  } catch (err) {
    console.log(err.response.data);

    dispatch({
      type: IN_PROGRESS,
      payload: false,
    });
    dispatch(setAlert(err.response.data.message, "error"));
  }
};
export const verifyemail = (formData) => async (dispatch) => {
  try {
    const res = await axios.post(
      "https://shopulimate-api.onrender.com/user/verify",
      formData
    );
    dispatch({
      type: VERIFY_EMAIL,
      payload: res.data,
    });
  } catch (err) {
    console.log(err.response.data);
    dispatch({
      type: GET_ERROR,
      payload: err.response,
    });
    dispatch({
      type: IN_PROGRESS,
      payload: false,
    });
  }
};

// Login User
export const login = (formData) => async (dispatch) => {
  // const body = { email, password };

  try {
    const res = await axios.post(
      "https://shopulimate-api.onrender.com/user/login",
      formData
    );
    localStorage.setItem("token", res.data.token);
    window.location.href = "/";

    dispatch({
      type: LOGIN_SUCCESS,
      payload: res.data,
    });
    dispatch({
      type: IN_PROGRESS,
      payload: false,
    });
    dispatch(setAlert(res.data.message, "success"));
  } catch (err) {
    dispatch({
      type: IN_PROGRESS,
      payload: false,
    });
    dispatch(setAlert(err.response.data.message, "error"));
  }
};
export const passwordchange = (formData, navigate) => async (dispatch) => {
  // const body = { email, password };

  try {
    const res = await axios.post(
      "https://shopulimate-api.onrender.com/user/passwordchange",
      formData
    );

    dispatch({
      type: PASSWORD_CHANGE,
      // payload: res.data,
    });

    dispatch(setAlert(res.data.message, "success"));
    dispatch(logout());
    navigate("/login");
  } catch (err) {
    dispatch(setAlert(err.response.data.message, "error"));
  }
};
export const getallusers = () => async (dispatch) => {
  // const body = { email, password };

  try {
    const res = await axios.get(
      "https://shopulimate-api.onrender.com/user/users"
    );

    dispatch({
      type: GET_ALL_USERS,
      payload: res.data,
    });
  } catch (err) {
    console.log(err);
    // dispatch(setAlert(err.response.data.message, "error"));
  }
};
export const deleteuser = (id) => async (dispatch) => {
  // const body = { email, password };

  try {
    const res = await axios.delete(
      `https://shopulimate-api.onrender.com/user/user/${id}`
    );

    dispatch({
      type: DELETE_USER,
      payload: id,
    });
  } catch (err) {
    console.log(err);
    // dispatch(setAlert(err.response.data.message, "error"));
  }
};
export const connectstripe = () => async (dispatch) => {
  // const body = { email, password };

  try {
    const res = await axios.get(
      "https://shopulimate-api.onrender.com/order/connect"
    );

    dispatch({
      type: STRIPE_ACCOUNT_CREATE,
      payload: res.data,
    });

    dispatch(setAlert(res.data.message, "success"));
    console.log(res?.data?.account_?.url);
    window.location.href = res?.data?.account_?.url;
  } catch (err) {
    dispatch(setAlert(err.response.data.message, "error"));
  }
};
export const inprogress = (status) => async (dispatch) => {
  dispatch({
    type: IN_PROGRESS,
    payload: status,
  });
};
export const clearalert = () => {
  return {
    type: REMOVE_ALERT,
  };
};

// Logout
export const logout = () => async (dispatch) => {
  localStorage.removeItem("token");
  window.location.href = "/";

  dispatch({ type: LOGOUT });

  dispatch({
    type: IN_PROGRESS,
    payload: false,
  });
};
// export const loadstripe = () => async (dispatch) => {
//   try {
//     // const page = 1;
//     const stripe = await loadStripe(
//       "pk_test_51IIqvWEeXLQyBq0Sx642zY9vJvi2JiLHGxQWpZ4ZcUKLyxaScjfltndaM4UD13xuWErm9HHKwfw2iaJg4zc27wzv00rzLMHWND"
//     );
//     console.log(stripe);
//     dispatch({ type: LOAD_STRIPE, payload: stripe });
//   } catch (error) {
//     console.log(error);
//   }
// };
