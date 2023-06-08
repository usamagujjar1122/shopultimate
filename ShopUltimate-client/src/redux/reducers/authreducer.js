import {
  REGISTER_SUCCESS,
  // REGISTER_FAIL,
  USER_LOADED,
  AUTH_ERROR,
  LOGIN_SUCCESS,
  IN_PROGRESS,
  REMOVE_ALERT,
  VERIFY_EMAIL,
  LOGOUT,
  LOAD_STRIPE,
  STRIPE_ACCOUNT_CREATE,
  SELLER_CONFIRM,
  GET_ALL_USERS,
  DELETE_USER,
  // LOGIN_FAIL,
  // LOGOUT
} from "../types";

const initialState = {
  token: localStorage.getItem("token"),
  isAuthenticated: null,
  isLoading: true,
  user: null,
  inprogress: false,
  notification: null,
  nextstep: false,
  users: [],
};
export default function (state = initialState, action) {
  switch (action.type) {
    case USER_LOADED:
      return {
        ...state,
        isAuthenticated: true,
        user: action.payload.data,
        isLoading: false,
      };
    case AUTH_ERROR:
      localStorage.removeItem("token");
      return {
        ...state,
        isAuthenticated: false,
        token: null,
        user: null,
        isLoading: false,
      };
    case LOGIN_SUCCESS:
      // localStorage.setItem('token',action.payload.token)
      return {
        ...state,
        user: action.payload.data,
        isAuthenticated: true,
        isLoading: false,
        token: action.payload.token,
      };
    case REGISTER_SUCCESS:
      return {
        ...state,
        registerstatus: action.payload,
        inprogress: false,
        notification: action.payload.message,
        nextstep: true,
      };
    case VERIFY_EMAIL:
      return {
        ...state,
        inprogress: false,
        notification: action.payload.message,
        nextstep: false,
      };
    case GET_ALL_USERS:
      return {
        ...state,
        users: action?.payload?.users,
      };
    case DELETE_USER:
      return {
        ...state,
        users: state.users.filter((u) => u._id != action.payload),
      };
    case STRIPE_ACCOUNT_CREATE:
      return {
        ...state,
      };
    case SELLER_CONFIRM:
      return {
        ...state,
        user: action.payload,
      };
    case IN_PROGRESS:
      return { ...state, inprogress: action.payload };
    case LOGOUT:
      return { ...state, user: null, isAuthenticated: false, token: null };
    default:
      return state;
  }
}
