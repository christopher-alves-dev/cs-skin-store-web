import { parseCurrencyToNumber } from "@/app/utils/parse-currency-to-number";
import { z } from "zod";

export const schema = z.object({
  name: z.string().optional(),
  category: z
    .object({
      label: z.string(),
      value: z.string(),
    })
    .optional(),
  price: z
    .object({
      min: z
        .union([z.string(), z.number().min(0)])
        .optional()
        .transform(parseCurrencyToNumber),
      max: z
        .union([z.string(), z.number().min(0)])
        .optional()
        .transform(parseCurrencyToNumber),
    })
    .optional(),
  float: z
    .object({
      min: z
        .union([z.string(), z.number().min(0)])
        .optional()
        .transform(parseCurrencyToNumber),
      max: z
        .union([z.string(), z.number().min(0)])
        .optional()
        .transform(parseCurrencyToNumber),
    })
    .optional(),
  orderBy: z
    .object({
      label: z.string(),
      value: z.string(),
    })
    .optional(),
  orderDirection: z
    .object({
      label: z.string(),
      value: z.string(),
    })
    .optional(),
});

export type FilterFormData = z.infer<typeof schema>;
