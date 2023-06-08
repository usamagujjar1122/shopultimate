import {
  GET_ADDRESS,
  ADD_ADDRESS,
  DELETE_ADDRESS,
  UPDATE_ADDRESS,
  ADDRESS_ACTION_ATTEMPT,
  ADDRESS_ACTION_SUCCESS,
  ADDRESS_ACTION_FAILED,
  SET_CURRENT_ADDRESS,
  CLEAR_CURRENT_ADDRESS,
} from "../types";

const initialState = {
  loading: false,
  addressess: [],
  currentaddress: null,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case GET_ADDRESS:
      return {
        ...state,
        loading: false,
        addressess: action.payload.data,
      };
    case ADD_ADDRESS:
      return {
        ...state,
        loading: false,
        addressess: [...state.addressess, action.payload.data],
      };
    case DELETE_ADDRESS:
      return {
        ...state,
        loading: false,
        addressess: state.addressess.filter(
          (address) => address._id != action.payload.id
        ),
      };
    case UPDATE_ADDRESS:
      return {
        ...state,
        loading: false,
        addressess: state.addressess.map((address) =>
          address._id === action.payload.data._id
            ? action.payload.data
            : address
        ),
      };
    case ADDRESS_ACTION_ATTEMPT:
      return {
        ...state,
        loading: true,
      };
    case ADDRESS_ACTION_SUCCESS:
      return {
        ...state,
        loading: false,
      };
    case ADDRESS_ACTION_FAILED:
      return {
        ...state,
        loading: false,
      };
    case SET_CURRENT_ADDRESS:
      return {
        ...state,
        currentaddress: action.payload,
        loading: false,
      };
    case CLEAR_CURRENT_ADDRESS:
      return {
        ...state,
        currentaddress: null,
        loading: false,
      };
    default:
      return state;
  }
};
