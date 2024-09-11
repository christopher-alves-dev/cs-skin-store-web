import { FilterFormData } from "../hooks/use-filter-form/schema";
import { FindAllParams } from "../services/api/items/types";

export const parseParams = (formValues: FilterFormData): FindAllParams => {
  return {
    ...(!!formValues.name && {
      name: formValues.name,
    }),
    ...(!!formValues.category && {
      category: formValues.category,
    }),
    ...(!!formValues.orderBy?.value && {
      orderBy: formValues.orderBy.value,
    }),
    ...(!!formValues.orderDirection?.value && {
      orderDirection: formValues.orderDirection.value,
    }),
  };
};
