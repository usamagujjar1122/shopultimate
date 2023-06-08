import {
  ADD_PRODUCT_IMAGE,
  DELETE_PRODUCT_IMAGE,
  CLEAR_PRODUCT_IMAGE,
} from "../types";
export const addproductimage = (url) => async (dispatch) => {
  try {
    console.log(url);
    dispatch({ type: ADD_PRODUCT_IMAGE, payload: url });
  } catch (error) {
    console.log(error);
  }
};
export const removeproductimage = (url) => async (dispatch) => {
  try {
    dispatch({ type: DELETE_PRODUCT_IMAGE, payload: url });
  } catch (error) {
    console.log(error);
  }
};
