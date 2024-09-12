import { Action, ACTIONS_TYPE, State } from "./types";

export const skinsReducer = (state: State, action: Action): State => {
  switch (action.type) {
    case ACTIONS_TYPE.FETCH_START:
      return { ...state, isLoading: true, errorMessage: undefined };
    case ACTIONS_TYPE.FETCH_SUCCESS:
      return {
        ...state,
        items: action.payload,
        isLoading: false,
        isEmptyList: !action.payload.length,
      };
    case ACTIONS_TYPE.FILTER_START:
      return { ...state, isFiltering: true };
    case ACTIONS_TYPE.FILTER_SUCCESS:
      return {
        ...state,
        items: action.payload,
        isFiltering: false,
        isEmptyList: !action.payload.length,
      };

    case ACTIONS_TYPE.SET_EMPTY_LIST:
      return { ...state, isEmptyList: true };
    default:
      return state;
  }
};
