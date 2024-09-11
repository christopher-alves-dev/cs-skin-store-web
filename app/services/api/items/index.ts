import qs from "qs";
import { api } from "..";
import { FindAllParams } from "./types";

const index = (params?: FindAllParams) =>
  api.get("/items", {
    params,
    paramsSerializer(queryParams) {
      return qs.stringify(queryParams, { arrayFormat: "repeat" });
    },
  });

export const itemsApi = {
  index,
};
