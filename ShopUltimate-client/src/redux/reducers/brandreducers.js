import {
  GET_BRAND,
  ADD_BRAND,
  DELETE_BRAND,
  UPDATE_BRAND,
  BRAND_ACTION_ATTEMPT,
  BRAND_ACTION_SUCCESS,
  BRAND_ACTION_FAILED,
} from "../types";

const initialState = {
  loading: false,
  brands: [],
};

export default (state = initialState, action) => {
  switch (action.type) {
    case GET_BRAND:
      return {
        ...state,
        loading: false,
        brands: action.payload.data,
      };
    case ADD_BRAND:
      return {
        ...state,
        loading: false,
        brands: [...state.brands, action.payload.data],
      };
    case DELETE_BRAND:
      return {
        ...state,
        loading: false,
        brands: state.addressess.filter(
          (brand) => brand._id != action.payload.id
        ),
      };
    case UPDATE_BRAND:
      return {
        ...state,
        loading: false,
        brands: state.brands.map((brand) =>
          brand._id === action.payload.data._id ? action.payload.data : brand
        ),
      };
    case BRAND_ACTION_ATTEMPT:
      return {
        ...state,
        loading: true,
      };
    case BRAND_ACTION_SUCCESS:
      return {
        ...state,
        loading: false,
      };
    case BRAND_ACTION_FAILED:
      return {
        ...state,
        loading: false,
      };
    default:
      return state;
  }
};
