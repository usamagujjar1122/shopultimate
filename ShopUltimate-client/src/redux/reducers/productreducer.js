import products from "../../components/product/products";
import {
  GET_PRODUCT,
  SET_LOADING,
  LOGS_ERROR,
  ADD_PRODUCT,
  DELETE_PRODUCT,
  UPDATE_PRODUCT,
  SEARCH_LOGS,
  SET_CURRENT,
  CLEAR_CURRENT,
  GET_PRODUCTS,
  PRODUCT_ACTION_ATTEMPT,
  PRODUCT_ACTION_FAILED,
  PRODUCT_ACTION_SUCCESS,
  GET_USER_PRODUCTS,
  PRODUCTS_BY_CATAGERY,
} from "../types";

const initialState = {
  products: [],
  c_products: [],
  current: null,
  isLoadingp: false,
  error: null,
  userproducts: [],
  count: null,
  product: null,
  hasMore: true,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case PRODUCT_ACTION_ATTEMPT:
      return {
        ...state,

        isLoadingp: true,
      };
    case PRODUCT_ACTION_FAILED:
      return {
        ...state,
        isLoadingp: false,
      };
    case PRODUCT_ACTION_SUCCESS:
      return {
        ...state,
        isLoadingp: false,
      };
    case GET_PRODUCTS:
      return {
        ...state,
        isLoadingp: false,

        products: action.payload.data,
      };
    case PRODUCTS_BY_CATAGERY:
      return {
        ...state,
        isLoadingp: false,
        c_products: action.payload.data,
      };
    case GET_USER_PRODUCTS:
      return {
        ...state,
        userproducts: action.payload.data,
        isLoadingp: false,
      };
    case GET_PRODUCT:
      return {
        ...state,
        product: action.payload.data,
        isLoadingp: false,
      };
    case ADD_PRODUCT:
      return {
        ...state,
        products: [...state.products, action.payload.data],
        userproducts: [...state.userproducts, action.payload.data],

        isLoadingp: false,
      };
    case DELETE_PRODUCT:
      return {
        ...state,
        products: state.products.filter(
          (product) => product._id !== action.payload
        ),
        userproducts: state.userproducts.filter(
          (product) => product._id !== action.payload
        ),
        isLoadingp: false,
      };
    case UPDATE_PRODUCT:
      return {
        ...state,
        products: state.products.map((product) =>
          product._id === action.payload.data._id
            ? action.payload.data
            : product
        ),
        userproducts: state.userproducts.map((product) =>
          product._id === action.payload.data._id
            ? action.payload.data
            : product
        ),
        isLoadingp: false,
      };
    //   case SEARCH_LOGS:
    //     return {
    //       ...state,
    //       logs: action.payload
    //     };
    case SET_CURRENT:
      return {
        ...state,
        current: action.payload,
      };
    case CLEAR_CURRENT:
      return {
        ...state,
        current: null,
      };
    //   case SET_LOADING:
    //     return {
    //       ...state,
    //       loading: true
    //     };
    //   case LOGS_ERROR:
    //     console.error(action.payload);
    //     return {
    //       ...state,
    //       error: action.payload
    //     };
    default:
      return state;
  }
};
