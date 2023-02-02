import {
  ADD_BILLING,
  ADD_PAGE,
  FILTER_SEARCH,
  GET_BILLING,
  IS_LOADING,
  REMOVE_BILLING,
  UPDATE_BILLING,
} from "./ActionTypes";

const Reducer = (state, action) => {
  switch (action.type) {
    case ADD_BILLING:
      const check = state.allBill?.filter(
        (info) => info._id === action.payload._id
      );
      if (!check) {
        return {
          ...state,
          allBill: action.payload,
        };
      } else {
        return {
          ...state,
          allBill: [
            ...state.allBill?.filter((info) => info._id !== action.payload._id),
            action.payload,
          ],
        };
      }

    case GET_BILLING:
      return {
        ...state,
        isLoading: false,
        allBill: action.payload,
      };

    case REMOVE_BILLING:
      const remove = state.allBill?.filter(
        (data) => data._id !== action.payload
      );

      return {
        ...state,
        allBill: remove,
      };

    case UPDATE_BILLING:
      return {
        ...state,
        updateState: action.payload,
      };

    case FILTER_SEARCH:
      return {
        ...state,

        search: action.payload,
      };

    default:
      return state;
  }
};

export default Reducer;
