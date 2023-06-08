import products from "../../components/product/products";
import {
  CREATE_SHOP,
  DELETE_SHOP,
  GET_ALL_SHOPS,
  SHOP_ACTION_ATTEMPT,
  SHOP_ACTION_FAILED,
  UPDATE_SHOP,
  SHOP_ACTION_SUCCESS,
  GET_SINGLE_SHOP,
  GET_USER_SHOPS,
} from "../types";

const initialState = {
  shops: [],
  shop:null,
  usershops: [],
  notification: null,
  isLoading: false,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case SHOP_ACTION_ATTEMPT:
      return {
        ...state,
        isLoading: true,
      };
    case SHOP_ACTION_FAILED:
      return {
        ...state,
        isLoading: false,
      };
    case SHOP_ACTION_SUCCESS:
      return {
        ...state,
        isLoading: false,
      };
    case GET_ALL_SHOPS:
      return {
        ...state,
        shops:action.payload.data,
          
        isLoading: false,
      };
    case GET_USER_SHOPS:
      return {
        ...state,
        usershops: action.payload.data,
        isLoading: false,
      };
    case GET_SINGLE_SHOP:
      return {
        ...state,
        shop: action.payload.data,
        isLoading: false,
      };
    case CREATE_SHOP:
      return {
        ...state,
        shops: [...state.shops, action.payload.data],
        usershops: [...state.usershops, action.payload.data],

        isLoading: false,
      };
    case DELETE_SHOP:
      return {
        ...state,
        shops: state.shops.filter((shop) => shop._id !== action.payload),
        usershops: state.usershops.filter(
          (shop) => shop._id !== action.payload
        ),

        isLoading: false,
      };
    case UPDATE_SHOP:
      return {
        ...state,
        shops: state.shops.map((shop) =>
          shop._id === action.payload.data._id ? action.payload.data : shop
        ),
        usershops: state.usershops.map((shop) =>
          shop._id === action.payload.data._id ? action.payload.data : shop
        ),
        isLoading: false,
      };
    //   case SEARCH_LOGS:
    //     return {
    //       ...state,
    //       logs: action.payload
    //     };
    //   case SET_CURRENT:
    //     return {
    //       ...state,
    //       current: action.payload
    //     };
    //   case CLEAR_CURRENT:
    //     return {
    //       ...state,
    //       current: null
    //     };
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
