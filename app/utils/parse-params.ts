import { FilterFormData } from "../hooks/use-filter-form/schema";
import { FindAllParams } from "../services/api/items/types";

export const parseParams = (formValues: FilterFormData): FindAllParams => {
  const parsedData: FindAllParams = {};

  if (formValues.name) {
    parsedData.name = formValues.name;
  }

  if (formValues.category?.value) {
    parsedData.category = formValues.category.value;
  }

  if (formValues.price) {
    parsedData.price = [
      formValues.price.min !== undefined ? formValues.price.min : 0,
      formValues.price.max || undefined,
    ];
  }

  if (formValues.float) {
    parsedData.float = [
      formValues.float.min !== undefined ? formValues.float.min : undefined,
      formValues.float.max || undefined,
    ];
  }

  if (formValues.orderBy?.value) {
    parsedData.orderBy = formValues.orderBy.value;
  }

  if (formValues.orderDirection?.value) {
    parsedData.orderDirection = formValues.orderDirection.value;
  }

  return parsedData;
};
