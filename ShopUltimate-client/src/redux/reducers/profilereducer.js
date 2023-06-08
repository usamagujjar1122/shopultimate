import {
  DELETE_PROFILE,
  GET_PROFILE,
  PROFILE_ACTION_SUCCESS,
  PROFILE_ACTION_ATTEMPT,
  PROFILE_ACTION_FAILED,
  UPDATE_PROFILE,
} from "../types";

const initialState = {
  loading: false,
  profile: {},
};

export default (state = initialState, action) => {
  switch (action.type) {
    case GET_PROFILE:
      return {
        ...state,
        loading: false,
        profile: action.payload.data,
      };
    // case ADD_BRAND:
    //   return {
    //     ...state,
    //     loading: false,
    //     brands: [...state.brands, action.payload.data],
    //   };
    case DELETE_PROFILE:
      return {
        ...state,
        loading: false,
        profile: {},
      };
    case UPDATE_PROFILE:
      return {
        ...state,
        loading: false,
        profile: action.payload.data,
      };
    case PROFILE_ACTION_ATTEMPT:
      return {
        ...state,
        loading: true,
      };
    case PROFILE_ACTION_SUCCESS:
      return {
        ...state,
        loading: false,
      };
    case PROFILE_ACTION_FAILED:
      return {
        ...state,
        loading: false,
      };
    default:
      return state;
  }
};
