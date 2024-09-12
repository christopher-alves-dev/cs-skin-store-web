import { FilterFormData } from "../hooks/use-filter-form/schema";
import { FilterRange, FindAllParams } from "../services/api/items/types";

const isValidValue = <G>(value: G): boolean =>
  value !== undefined && (typeof value !== "string" || value.trim() !== "");

const addParam = <T extends object, K extends keyof T>(
  target: T,
  key: K,
  value: T[K]
) => {
  if (isValidValue(value)) {
    target[key] = value;
  }
};

const parseRangeParams = (
  min?: number,
  max?: number
): FilterRange | undefined => {
  if (min !== undefined || max !== undefined) {
    return [min ?? undefined, max ?? undefined];
  }
  return undefined;
};

export const parseParams = (formValues: FilterFormData): FindAllParams => {
  const parsedData: FindAllParams = {};

  addParam(parsedData, "name", formValues.name);
  addParam(parsedData, "category", formValues.category?.value);

  const price = parseRangeParams(formValues.price?.min, formValues.price?.max);
  const float = parseRangeParams(formValues.float?.min, formValues.float?.max);

  addParam(parsedData, "price", price);
  addParam(parsedData, "float", float);

  addParam(parsedData, "orderBy", formValues.orderBy?.value);
  addParam(parsedData, "orderDirection", formValues.orderDirection?.value);

  return parsedData;
};
