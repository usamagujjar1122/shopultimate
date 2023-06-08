import {
  CreateOrder,
  OrderActionAttempt,
  OrderActionSuccess,
  OrderActionFailed,
  GET_DASHBOARD_ORDERS,
  GET_USER_ORDERS,
  GET_SINGLE_ORDER,
  UPDATE_ORDER,
  ORDER_COMPLETE,
  GET_ALL_ORDERS,
} from "../types";

const initialState = {
  c_orders: [],
  s_orders: [],
  loading: null,
  orders: [],
  order: {},
};

export default (state = initialState, action) => {
  switch (action.type) {
    case CreateOrder:
      return {
        ...state,
        loading: false,
      };
    case OrderActionAttempt:
      return {
        ...state,
        loading: true,
      };
    case OrderActionSuccess:
      return {
        ...state,
        loading: false,
      };
    case OrderActionFailed:
      return {
        ...state,
        loading: false,
      };
    case GET_DASHBOARD_ORDERS:
      return {
        ...state,
        loading: false,
        s_orders: action.payload,
      };
    case GET_SINGLE_ORDER:
      return {
        ...state,
        loading: false,
        order: action.payload,
      };
    case GET_ALL_ORDERS:
      return {
        ...state,
        loading: false,
        orders: action.payload,
      };
    case GET_USER_ORDERS:
      return {
        ...state,
        loading: false,
        c_orders: action.payload,
      };
    case UPDATE_ORDER:
      return {
        ...state,
        loading: false,
        s_orders: state.s_orders.map((order) =>
          order._id === action.payload.order._id ? action.payload.order : order
        ),
      };
    case ORDER_COMPLETE:
      return {
        ...state,
        loading: false,
        c_orders: state.s_orders.map((order) =>
          order._id === action.payload.order._id ? action.payload.order : order
        ),
      };
    default:
      return state;
  }
};
