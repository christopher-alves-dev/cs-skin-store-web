import { z } from "zod";

// Definindo o esquema de validação com zod
const schema = z.object({
  name: z.string().optional(), // Campo opcional
  category: z.string().optional(), // Campo opcional
  price: z
    .tuple([z.number().min(0), z.number().min(0)])
    .optional()
    .refine((value) => !value || value[1] >= value[0], {
      // Valida que o segundo número (max) é maior ou igual ao primeiro (min)
      message: "O segundo valor do preço deve ser maior ou igual ao primeiro.",
    }),
  float: z
    .tuple([z.number().min(0), z.number().min(0)])
    .optional()
    .refine((value) => !value || value[1] >= value[0], {
      // Valida que o segundo número (max) é maior ou igual ao primeiro (min)
      message: "O segundo valor do float deve ser maior ou igual ao primeiro.",
    }),
  orderBy: z
    .object({
      label: z.string(),
      value: z.string(),
    })
    .optional(), // Objeto opcional contendo label e value como strings
  orderDirection: z
    .object({
      label: z.string(),
      value: z.string(),
    })
    .optional(), // Objeto opcional contendo label e value como strings
});

// Tipagem para os dados validados
export type FilterFormData = z.infer<typeof schema>;
