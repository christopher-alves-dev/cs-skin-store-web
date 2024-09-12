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
        .transform((value) => (!!value ? Number(value) : undefined)),
      max: z
        .union([z.string(), z.number().min(0)])
        .optional()
        .transform((value) => (value === "" ? undefined : Number(value))),
    })
    .optional(),
  float: z
    .object({
      min: z
        .union([z.string(), z.number().min(0)])
        .optional()
        .transform((value) => (value === "" ? undefined : Number(value))),
      max: z
        .union([z.string(), z.number().min(0)])
        .optional()
        .transform((value) => (value === "" ? undefined : Number(value))),
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
