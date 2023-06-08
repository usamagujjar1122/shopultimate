import { applyInitialState } from "@mui/x-data-grid/hooks/features/columns/gridColumnsUtils";
import {
  ADD_PRODUCT_IMAGE,
  DELETE_PRODUCT_IMAGE,
  CLEAR_PRODUCT_IMAGE,
} from "../types";

const initialState = {
  imagestosend: [],
};
export default (state = initialState, action) => {
  switch (action.type) {
    case ADD_PRODUCT_IMAGE:
      return {
        ...state,
        imagestosend: [...state.imagestosend, action.payload],
      };
    case DELETE_PRODUCT_IMAGE:
      return {
        ...state,
        imagestosend: state.imagestosend.filter(
          (url) => url !== action.payload
        ),
      };
    case CLEAR_PRODUCT_IMAGE:
      return {
        ...state,
        imagestosend: [],
      };

    default:
      return state;
  }
};
