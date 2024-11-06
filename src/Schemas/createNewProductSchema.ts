import { z } from "zod";
import { removeBRLCurrencyFormatting } from "../helpers/currencyHelper";

export const createNewProductSchema = z.object({
  name: z
    .string()
    .min(1, { message: "O preenchimento do nome é obrigatório." })
    .min(3, { message: "O nome deve ter pelo menos 3 caracteres." })
    .max(100, { message: "O nome deve ter no máximo 100 caracteres." }),

  value: z
    .string()
    .min(1, { message: "O preenchimento do valor é obrigatório." })
    .transform((value) => removeBRLCurrencyFormatting(value))
    .refine((value) => value > 0, { message: "O valor deve ser maior do que 0." }),

  description: z
    .string()
    .min(1, { message: "O preenchimento da descrição é obrigatório" })
    .min(3, { message: "A descrição deve ter pelo menos 3 caracteres." })
    .max(1000, { message: "A descrição deve ter no máximo 1000 caracteres." }),
});

export type CreateNewProductSchemaType = Omit<z.infer<typeof createNewProductSchema>, "value"> & {
  value: string | number;
};
