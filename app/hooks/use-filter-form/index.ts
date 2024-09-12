import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { FilterFormData, schema } from "./schema";

export const useFilterForm = () => {
  const formMethods = useForm<FilterFormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      category: undefined,
      float: undefined,
      name: undefined,
      orderBy: undefined,
      orderDirection: undefined,
      price: undefined,
    },
  });

  return {
    formMethods,
  };
};
