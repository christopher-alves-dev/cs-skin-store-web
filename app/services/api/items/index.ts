import qs from "qs";
import { api } from "..";
import { FindAllParams, FindAllResponse } from "./types";

const index = (params?: FindAllParams) =>
  api.get<FindAllResponse>("/items", {
    params,
    paramsSerializer(queryParams) {
      return qs.stringify(queryParams, { arrayFormat: "comma" });
    },
  });

export const itemsApi = {
  index,
};
