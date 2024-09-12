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
      min: z.coerce
        .number()
        .min(0)
        .optional()
        .transform((value) => (!!value ? Number(value) : undefined)),
      max: z.coerce
        .number()
        .min(0)
        .optional()
        .transform((value) => (!!value ? Number(value) : undefined)),
    })
    .optional(),
  float: z
    .object({
      min: z.coerce
        .number()
        .min(0)
        .optional()
        .transform((value) => (!!value ? Number(value) : undefined)),
      max: z.coerce
        .number()
        .min(0)
        .optional()
        .transform((value) => (!!value ? Number(value) : undefined)),
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
