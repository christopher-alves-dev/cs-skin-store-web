import { useForm } from "react-hook-form";
import { FilterFormData } from "./schema";

export const useFilterForm = () => {
  const formMethods = useForm<FilterFormData>();

  return {
    formMethods,
  };
};
