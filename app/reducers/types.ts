import { Skin } from "../services/api/items/types";

export enum ACTIONS_TYPE {
  FETCH_START = "FETCH_START",
  FETCH_SUCCESS = "FETCH_SUCCESS",
  FILTER_START = "FILTER_START",
  FILTER_SUCCESS = "FILTER_SUCCESS",
  FETCH_ERROR = "FETCH_ERROR",
  SET_EMPTY_LIST = "SET_EMPTY_LIST",
}

export type State = {
  items: Skin[];
  isLoading: boolean;
  isFiltering: boolean;
  isEmptyList: boolean;
  errorMessage?: string;
};

export type Action =
  | { type: ACTIONS_TYPE.FETCH_START }
  | { type: ACTIONS_TYPE.FETCH_SUCCESS; payload: Skin[] }
  | { type: ACTIONS_TYPE.FILTER_START }
  | { type: ACTIONS_TYPE.FILTER_SUCCESS; payload: Skin[] }
  | { type: ACTIONS_TYPE.SET_EMPTY_LIST };
